javascript
import { ICON_B64, WORDMARK_B64, FOOTER_LOGO_B64 } from "../lib/images";

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --navy-deep: #0C1B28;
          --navy: #123246;
          --teal-mid: #1D5266;
          --teal-soft: #E7F0EF;
          --cream: #FAF7F1;
          --cream-warm: #F3EEE3;
          --ink: #1C2B33;
          --ink-soft: #4A5A63;
          --gold: #C9A44C;
          --gold-deep: #A5842F;
          --line: #DCD4C4;
          --max-width: 1180px;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: 'Public Sans', -apple-system, sans-serif;
          background: var(--cream);
          color: var(--ink);
          font-size: 18px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3 {
          font-family: 'Source Serif 4', Georgia, serif;
          color: var(--navy);
          margin: 0;
          font-weight: 500;
        }
        a { color: inherit; }
        img, svg { display: block; max-width: 100%; }
        .wrap { max-width: var(--max-width); margin: 0 auto; padding: 0 32px; }
        .nav { background: var(--navy-deep); padding: 18px 0; }
        .nav-brand { display: flex; align-items: center; gap: 12px; }
        .nav-brand img.nav-icon { height: 30px; width: auto; }
        .nav-brand img.nav-wordmark-img { height: 16px; width: auto; }
        .nav-links { display: flex; gap: 36px; list-style: none; margin: 0 0 0 144px; padding: 0; font-family: 'Poppins', sans-serif; }
        .nav-links a { text-decoration: none; font-size: 0.98rem; font-weight: 500; color: var(--cream); padding: 6px 2px; border-bottom: 2px solid transparent; }
        .nav-links a:hover { border-color: var(--gold); }
        .nav-toggle { display: none; background: none; border: 1px solid var(--cream); color: var(--cream); font-size: 1rem; padding: 8px 14px; border-radius: 4px; cursor: pointer; }
        .hero-banner { position: relative; overflow: hidden; background: linear-gradient(160deg, #1D5266 0%, #16374A 42%, #0C1B28 100%); color: var(--cream); }
        .hero-banner::before { content: ""; position: absolute; top: 0; right: 0; width: 46%; height: 62%; background: rgba(74, 116, 148, 0.28); transform: skewX(-8deg) translateX(6%); pointer-events: none; }
        .hero-banner .wrap { position: relative; z-index: 1; }
        .hero-content { padding: 40px 0 84px; }
        .hero-grid { display: grid; grid-template-columns: 1.35fr 1fr; gap: 64px; align-items: start; }
        .eyebrow { font-family: 'Public Sans', sans-serif; font-size: 1.32rem; font-weight: 600; letter-spacing: 0.01em; color: var(--gold); margin-bottom: 24px; max-width: 640px; line-height: 1.5; }
        .hero-icon { height: 56px; width: auto; margin-bottom: 28px; opacity: 0.95; }
        .mission { font-size: 2.6rem; line-height: 1.28; color: var(--cream); max-width: 620px; }
        .mission em { font-style: italic; color: var(--gold); }
        .subhead { margin-top: 26px; font-family: 'Public Sans', sans-serif; font-size: 1.2rem; line-height: 1.6; color: rgba(250, 247, 241, 0.72); max-width: 560px; }
        .signup-card { background: linear-gradient(180deg, #C9DBDD 0%, #FAF7F1 38%, #FAF7F1 100%); border-radius: 8px; padding: 40px 36px; color: var(--ink); box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.45); }
        .signup-card h2 { color: var(--navy); font-size: 1.5rem; margin-bottom: 8px; }
        .signup-price { font-family: 'Public Sans', sans-serif; color: var(--gold-deep); font-weight: 700; font-size: 1.05rem; margin-bottom: 24px; }
        .signup-price span { color: var(--ink-soft); font-weight: 400; font-size: 0.95rem; }
        .field { margin-bottom: 18px; }
        .field label { display: block; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 8px; }
        .field input, .field select { width: 100%; padding: 13px 14px; font-size: 1rem; font-family: 'Public Sans', sans-serif; border: 2px solid #6FA3AE; border-radius: 4px; background: #DCEAEC; color: var(--ink); }
        .btn-subscribe { width: 100%; padding: 15px 18px; margin-top: 6px; background: var(--gold); color: var(--navy-deep); font-family: 'Public Sans', sans-serif; font-size: 1.05rem; font-weight: 700; border: none; border-radius: 4px; cursor: pointer; }
        .btn-subscribe:hover { background: #D8B562; }
        .signup-fineprint { margin-top: 16px; font-size: 0.85rem; color: var(--ink-soft); line-height: 1.5; }
        .divider { display: flex; justify-content: center; padding: 4px 0 0; background: #16374A; }
        .divider svg, .divider-icon { width: 150px; height: 20px; margin: 40px 0; }
        .broadcast { background: linear-gradient(180deg, #16374A 0%, #0F2636 100%); padding: 56px 0 64px; color: var(--cream); }
        .broadcast .wrap { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
        .broadcast-label { font-family: 'Poppins', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
        .broadcast h2 { font-size: 1.9rem; line-height: 1.3; margin-bottom: 16px; color: var(--cream); }
        .broadcast p { color: rgba(250, 247, 241, 0.72); font-size: 1.08rem; margin-bottom: 22px; }
        .broadcast-link { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; color: var(--cream); border-bottom: 2px solid var(--gold); padding-bottom: 2px; }
        .video-frame { position: relative; aspect-ratio: 16 / 10; background: linear-gradient(150deg, #2A6478 0%, #16374A 60%, #0C1B28 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(250, 247, 241, 0.12); }
        .play-btn { position: relative; width: 74px; height: 74px; border-radius: 50%; background: rgba(250, 247, 241, 0.14); border: 1.5px solid rgba(250, 247, 241, 0.5); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .video-caption { position: absolute; bottom: 18px; left: 22px; color: var(--cream); font-size: 0.9rem; font-weight: 500; letter-spacing: 0.02em; }
        .pillars { padding: 72px 0 80px; background: #0F2636; }
        .pillars-head { max-width: 640px; margin-bottom: 48px; }
        .pillars-head .eyebrow { color: var(--gold); }
        .pillars-head h2 { font-size: 2rem; line-height: 1.35; color: var(--cream); }
        .pillar-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .pillar-card { background: rgba(250, 247, 241, 0.05); border: 1px solid rgba(250, 247, 241, 0.14); border-top: 3px solid var(--gold); border-radius: 6px; padding: 30px 26px; }
        .pillar-num { font-family: 'Source Serif 4', serif; font-style: italic; font-size: 0.95rem; color: var(--gold); margin-bottom: 14px; }
        .pillar-card h3 { font-size: 1.2rem; margin-bottom: 10px; line-height: 1.35; color: var(--cream); }
        .pillar-card p { margin: 0; color: rgba(250, 247, 241, 0.68); font-size: 0.98rem; line-height: 1.55; }
        .closing { position: relative; overflow: hidden; background: linear-gradient(160deg, #1D5266 0%, #16374A 45%, #0C1B28 100%); color: var(--cream); padding: 74px 0; text-align: center; }
        .closing h2 { color: var(--cream); font-size: 1.9rem; max-width: 620px; margin: 0 auto 16px; line-height: 1.4; }
        .closing p { color: rgba(250, 247, 241, 0.72); max-width: 520px; margin: 0 auto 30px; font-size: 1.05rem; }
        .closing .btn-subscribe { width: auto; padding: 15px 40px; display: inline-block; }
        .footer { background: var(--navy-deep); color: rgba(250, 247, 241, 0.6); padding: 40px 0; font-size: 0.9rem; }
        .footer .wrap { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-logo-img { height: 22px; opacity: 0.9; }
        .footer-links { display: flex; gap: 26px; list-style: none; padding: 0; margin: 0; font-family: 'Poppins', sans-serif; }
        .footer-links a { text-decoration: none; color: rgba(250, 247, 241, 0.75); }
        .footer-links a:hover { color: var(--gold); }
        @media (max-width: 900px) {
          .hero-grid, .broadcast .wrap { grid-template-columns: 1fr; }
          .pillar-grid { grid-template-columns: repeat(2, 1fr); }
          .mission { font-size: 2.1rem; }
          .nav-links { display: none; }
          .nav-toggle { display: inline-block; }
        }
        @media (max-width: 560px) {
          body { font-size: 17px; }
          .pillar-grid { grid-template-columns: 1fr; }
          .mission { font-size: 1.8rem; }
          .wrap { padding: 0 20px; }
        }
      `}</style>

      <nav className="nav">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <a href="#" className="nav-brand">
            <img className="nav-icon" src={`data:image/png;base64,${ICON_B64}`} alt="" />
            <img className="nav-wordmark-img" src={`data:image/png;base64,${WORDMARK_B64}`} alt="The AI Conversation" />
          </a>
          <ul className="nav-links">
            <li><a href="#">Why This Matters To You</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Ask Us</a></li>
          </ul>
          <button className="nav-toggle" aria-label="Open menu" style={{ marginLeft: "auto" }}>Menu</button>
        </div>
      </nav>

      <div className="hero-banner">
        <div className="hero-content">
          <div className="wrap hero-grid">
            <div>
              <img className="hero-icon" src={`data:image/png;base64,${ICON_B64}`} alt="" />
              <div className="eyebrow">As we teach AI to be more like us,<br />AI will teach us more about ourselves.</div>
              <h1 className="mission">We won&apos;t tell you what to think about AI. We&apos;ll tell you what it means for your life. <em>Then you decide.</em></h1>
              <p className="subhead">A weekly conversation for those who&apos;ve lived enough history to recognize when they&apos;re standing in the middle of it.</p>
            </div>

            <form className="signup-card" onSubmit={(e) => e.preventDefault()}>
              <h2>Join the Conversation</h2>
              <div className="signup-price">$12<span>/month, billed monthly</span></div>

              <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="you@email.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="source">How did you hear about us? (optional)</label>
                <select id="source">
                  <option value="">Select one</option>
                  <option>A talk or community event</option>
                  <option>Word of mouth</option>
                  <option>Search</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Other</option>
                </select>
              </div>

              <button className="btn-subscribe" type="submit">Subscribe Now</button>
              <p className="signup-fineprint">Cancel anytime. One weekly conversation &mdash; no spam, no noise.</p>
            </form>
          </div>
        </div>
      </div>

      <section className="broadcast">
        <div className="divider">
          <img className="divider-icon" src={`data:image/png;base64,${ICON_B64}`} alt="" />
        </div>
        <div className="wrap">
          <div>
            <div className="broadcast-label">This Week&apos;s Conversation</div>
            <h2>Monday mornings, a few minutes with Jack &mdash; not a lecture, a conversation.</h2>
            <p>Every Monday, a short video breaks down one real way AI is showing up in your life this week &mdash; in your doctor&apos;s office, your retirement account, your grandchild&apos;s classroom, or your town hall &mdash; followed by the deeper-dive links waiting for you on the site.</p>
            <a href="#" className="broadcast-link">Watch last week&apos;s conversation &rarr;</a>
          </div>
          <div className="video-frame">
            <button className="play-btn" aria-label="Play this week's video">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M8 5.5V20.5L21 13L8 5.5Z" fill="#FAF7F1" />
              </svg>
            </button>
            <div className="video-caption">This week&apos;s broadcast &middot; 6 min</div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="wrap">
          <div className="pillars-head">
            <div className="eyebrow">Four conversations, every week</div>
            <h2>The parts of your life AI is already touching &mdash; whether anyone asked you or not.</h2>
          </div>
          <div className="pillar-grid">
            <div className="pillar-card">
              <div className="pillar-num">I.</div>
              <h3>AI in Healthcare</h3>
              <p>What&apos;s changing at the doctor&apos;s office, in diagnosis, and in caregiving &mdash; and what it means for you and the people you look after.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-num">II.</div>
              <h3>Retirement &amp; Personal Finance</h3>
              <p>Retirement planning in the age of AI advisors, smarter tools, and the scams that come with both.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-num">III.</div>
              <h3>Education</h3>
              <p>From your grandchildren&apos;s classrooms to your own next chapter &mdash; how AI is reshaping learning at every age.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-num">IV.</div>
              <h3>Government</h3>
              <p>How AI is showing up in your town hall, your ballot box, and the benefits you rely on &mdash; at every level.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <h2>You&apos;ve seen more change than most. This is one more worth understanding on your own terms.</h2>
          <p>One conversation a week. No jargon, no hype, no one telling you what to think.</p>
          <button className="btn-subscribe" type="button">Join the Conversation &mdash; $12/month</button>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <img className="footer-logo-img" src={`data:image/png;base64,${FOOTER_LOGO_B64}`} alt="The AI Conversation" />
          <ul className="footer-links">
            <li><a href="#">Why This Matters To You</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Ask Us</a></li>
            <li><a href="#">Subscribe</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
