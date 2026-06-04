/* global React */
const { useState } = React;

const CHANNEL_URL = 'https://u-ceo.channel.io/workflows/835955';
const REQUEST_URL = 'https://gobangmkt.github.io/billytour_request/';

// ─────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────
function LandingNav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <img src="assets/U_ALF.png" alt="U사장님" style={{ height: 32 }} />
          <span>빌리투어 글로벌</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { label: '개편 내용', href: '#change' },
            { label: '상품 소개', href: '#products' },
            { label: '특별 이벤트', href: '#offer' },
            { label: '진행 방식', href: '#process' },
            { label: 'FAQ',     href: '#faq' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: 'var(--border-input)', fontSize: 16, userSelect: 'none' }}>|</span>}
              <a href={item.href} className="nav-link-d" style={{
                fontSize: 15, fontWeight: 500, color: 'var(--fg-3)',
                padding: '4px 2px',
              }}>{item.label}</a>
            </React.Fragment>
          ))}
          <a href={REQUEST_URL} target="_blank" className="nav-cta" style={{ marginLeft: 6 }}>신청하기</a>
        </div>
      </div>
      <style>{`@media(max-width:640px){.nav-link-d{display:none}}`}</style>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ — accordion item
// ─────────────────────────────────────────────────────────────
function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{
      borderBottom: '1px solid var(--border-input)',
      padding: '20px 0',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        textAlign: 'left', fontSize: 22, fontWeight: 700, color: 'var(--fg-1)',
        padding: 0,
      }}>
        <span style={{ flex: 1, paddingRight: 16, wordBreak: 'keep-all', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{
            flexShrink: 0,
            fontSize: 13, fontWeight: 800, color: 'var(--primary-400)',
            background: 'var(--primary-100)',
            padding: '3px 9px', borderRadius: 6,
            marginTop: 2, letterSpacing: '0.5px',
          }}>Q</span>
          <span>{q}</span>
        </span>
        <span style={{
          width: 24, height: 24, flexShrink: 0,
          color: 'var(--primary-400)', fontSize: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.18s',
        }}>＋</span>
      </button>
      {open && (
        <div style={{
          marginTop: 14, fontSize: 18, color: 'var(--fg-2)',
          lineHeight: 1.75, wordBreak: 'keep-all',
        }} dangerouslySetInnerHTML={{ __html: a }} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer style={{
      background: 'var(--bg-app)', padding: '48px 0 36px',
      borderTop: '1px solid var(--border-input)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <img src="assets/U_ALF.png" alt="U사장님" style={{ height: 28 }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-1)' }}>U사장님 · neoflatMKT</span>
        </div>
        <p style={{ fontSize: 16, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 520 }}>
          빌리투어 글로벌 기존 원장님 특별 이벤트 페이지입니다.<br />
          문의: <a href={CHANNEL_URL} target="_blank" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>채널톡 바로가기</a>
        </p>
        <div style={{ marginTop: 24, fontSize: 14, color: 'var(--fg-4)' }}>
          © 2026 neoflatMKT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LandingNav, FaqItem, LandingFooter, CHANNEL_URL, REQUEST_URL });
