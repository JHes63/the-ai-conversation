"""
The AI Conversation - Content Sourcing Script
------------------------------------------------
Pulls recent headlines from RSS feeds across the newsletter's four topic
pillars, filters them down to ones that are actually AI-related, and
outputs a candidate list Jack can review each morning.

STEP 1 of the build: fetch + filter + print/save a candidate list.
STEP 2 (later): wire this up to send the results as an email digest,
and run it automatically on a schedule via GitHub Actions.
"""

import feedparser
from datetime import datetime, timedelta, timezone

# ---------------------------------------------------------------------------
# 1. CONFIG: RSS feeds grouped by pillar
# ---------------------------------------------------------------------------
# These are starter feeds to get the script running. Feed URLs change over
# time and some publishers rotate or retire them, so treat this list as a
# first draft -- Jack should swap in/out sources based on what actually
# produces good candidates once we see real output.

# PILLAR feeds -- each pillar is a general-interest feed that gets filtered
# down using AI_KEYWORDS below, since these sources cover more than just AI.
#
# To add a new pillar later (e.g. "Second Acts & Experience"), just add a
# new entry here in the same format:
#   "Your New Pillar Name": [
#       "https://example.com/feed",
#   ],
FEEDS = {
    "AI in Healthcare": [
        "https://medcitynews.com/feed/",
        "https://www.healthcaredive.com/feeds/news/",
    ],
    "Retirement & Personal Finance": [
        "https://www.kiplinger.com/feeds/all",
        "https://feeds.content.dowjones.io/public/rss/mw_topstories",
    ],
    "Education": [
        "https://www.insidehighered.com/rss.xml",
        "https://feeds.feedburner.com/EdTechK12",
    ],
    "Government": [
        "https://www.nextgov.com/rss/all/",
        "https://federalnewsnetwork.com/feed/",
    ],
}

# GENERAL AI feeds -- these sources are already 100% about AI, so we do NOT
# run the keyword filter on them. This is the "wide net" pillar: it catches
# important AI news that doesn't fit neatly into the four pillars above, so
# nothing slips through just because it wasn't phrased in an expected way.
GENERAL_AI_FEEDS = [
    "https://www.technologyreview.com/topic/artificial-intelligence/feed/",
    "https://arstechnica.com/ai/feed/",
] 

# Keywords used to filter each pillar's general feed down to AI-relevant
# stories only. Case-insensitive match against title + summary.
AI_KEYWORDS = [
    "artificial intelligence",
    " ai ",
    "ai-powered",
    "ai powered",
    "chatgpt",
    "machine learning",
    "algorithm",
    "chatbot",
    "generative ai",
    "large language model",
    "llm",
    "automation",
    "robot",
]

# Only include articles published within this many days
MAX_AGE_DAYS = 5

# Per-pillar overrides -- Education's AI-relevant stories consistently
# publish outside the default 5-day window, so it gets a wider net.
# Any pillar not listed here just uses MAX_AGE_DAYS.
PILLAR_MAX_AGE_DAYS = {
    "Education": 14, # TEMP diagnostic — confirm eSchool News AI stories exist in a wider window
}



# How many candidates to keep per pillar (top N most recent)
MAX_PER_PILLAR = 8


# ---------------------------------------------------------------------------
# 2. FETCH + FILTER
# ---------------------------------------------------------------------------
def is_ai_related(entry):
    text = f"{entry.get('title', '')} {entry.get('summary', '')}".lower()
    return any(keyword in text for keyword in AI_KEYWORDS)


def is_recent(entry, cutoff):
    published = entry.get("published_parsed") or entry.get("updated_parsed")
    if not published:
        # If we can't tell the date, keep it rather than silently drop it
        return True
    published_dt = datetime(*published[:6], tzinfo=timezone.utc)
    return published_dt >= cutoff


def fetch_pillar(pillar_name, feed_urls, cutoff, max_age_days, require_ai_keyword=True):
    candidates = []
    for url in feed_urls:
        try:
            parsed = feedparser.parse(url)
        except Exception as e:
            print(f"  [!] Could not fetch {url}: {e}")
            continue

        total_entries = len(parsed.entries)
        source_name = parsed.feed.get("title", url)

        if total_entries == 0:
            print(f"  [!] {source_name}: 0 entries returned (likely a dead/changed feed URL)")
            continue

        ai_matches = 0
        recent_matches = 0
        kept = 0

        for entry in parsed.entries:
            ai_ok = is_ai_related(entry) if require_ai_keyword else True
            if ai_ok:
                ai_matches += 1
            recent_ok = is_recent(entry, cutoff)
            if recent_ok:
                recent_matches += 1
            if ai_ok and recent_ok:
                kept += 1
                candidates.append(
                    {
                        "pillar": pillar_name,
                        "title": entry.get("title", "Untitled"),
                        "link": entry.get("link", ""),
                        "source": source_name,
                    }
                )

        keyword_note = f", {ai_matches} AI-related" if require_ai_keyword else ""
        print(f"  {source_name}: {total_entries} entries{keyword_note}, {recent_matches} within {max_age_days} days, {kept} kept")

    return candidates[:MAX_PER_PILLAR]


# ---------------------------------------------------------------------------
# 3. MAIN
# ---------------------------------------------------------------------------
def main():
    default_cutoff = datetime.now(timezone.utc) - timedelta(days=MAX_AGE_DAYS)
    all_candidates = []

    print(f"Fetching candidates published since {default_cutoff.date()} (default window)...\n")

    for pillar_name, feed_urls in FEEDS.items():
        print(f"--- {pillar_name} ---")
        max_age = PILLAR_MAX_AGE_DAYS.get(pillar_name, MAX_AGE_DAYS)
        pillar_cutoff = datetime.now(timezone.utc) - timedelta(days=max_age)
        pillar_results = fetch_pillar(pillar_name, feed_urls, pillar_cutoff, max_age)
        if not pillar_results:
            print("  (no AI-related candidates found this run)")
        all_candidates.extend(pillar_results)
        print()

    print("--- General AI News ---")
    general_results = fetch_pillar(
        "General AI News", GENERAL_AI_FEEDS, default_cutoff, MAX_AGE_DAYS, require_ai_keyword=False
    )
    if not general_results:
        print("  (no candidates found this run)")
    all_candidates.extend(general_results)
    print()

    # Save results to a plain text file for now.
    # This is what a future "send email" step will read from.
    output_path = "candidates.txt"
    with open(output_path, "w") as f:
        f.write(f"The AI Conversation - Candidate Headlines\n")
        f.write(f"Generated {datetime.now().strftime('%A, %B %d, %Y %I:%M %p')}\n")
        f.write("=" * 60 + "\n\n")

        if not all_candidates:
            f.write("No candidates found this run.\n")
        else:
            current_pillar = None
            for c in all_candidates:
                if c["pillar"] != current_pillar:
                    current_pillar = c["pillar"]
                    f.write(f"\n{current_pillar}\n" + "-" * len(current_pillar) + "\n")
                f.write(f"- {c['title']}\n  ({c['source']}) {c['link']}\n")

    print(f"Done. {len(all_candidates)} candidates written to {output_path}")


if __name__ == "__main__":
    main()
