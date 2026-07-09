python"""
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

FEEDS = {
    "AI in Healthcare": [
        "https://www.healthcareitnews.com/home/feed",
        "https://medcitynews.com/feed/",
        "https://www.fiercehealthcare.com/rss.xml",
    ],
    "Retirement & Personal Finance": [
        "https://www.kiplinger.com/feeds/all",
        "https://www.aarp.org/rss.xml",
    ],
    "Education": [
        "https://www.edweek.org/feed",
        "https://www.insidehighered.com/rss.xml",
    ],
    "Government": [
        "https://www.nextgov.com/rss/all/",
        "https://www.govtech.com/rss/all.rss",
    ],
}

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
MAX_AGE_DAYS = 3

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


def fetch_pillar(pillar_name, feed_urls, cutoff):
    candidates = []
    for url in feed_urls:
        try:
            parsed = feedparser.parse(url)
        except Exception as e:
            print(f"  [!] Could not fetch {url}: {e}")
            continue

        if parsed.bozo and not parsed.entries:
            print(f"  [!] No entries from {url} (may be a dead/changed feed URL)")
            continue

        for entry in parsed.entries:
            if is_ai_related(entry) and is_recent(entry, cutoff):
                candidates.append(
                    {
                        "pillar": pillar_name,
                        "title": entry.get("title", "Untitled"),
                        "link": entry.get("link", ""),
                        "source": parsed.feed.get("title", url),
                    }
                )

    return candidates[:MAX_PER_PILLAR]


# ---------------------------------------------------------------------------
# 3. MAIN
# ---------------------------------------------------------------------------
def main():
    cutoff = datetime.now(timezone.utc) - timedelta(days=MAX_AGE_DAYS)
    all_candidates = []

    print(f"Fetching candidates published since {cutoff.date()}...\n")

    for pillar_name, feed_urls in FEEDS.items():
        print(f"--- {pillar_name} ---")
        pillar_results = fetch_pillar(pillar_name, feed_urls, cutoff)
        if not pillar_results:
            print("  (no AI-related candidates found this run)")
        all_candidates.extend(pillar_results)
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
