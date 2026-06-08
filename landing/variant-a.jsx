/* global React */

// ── 아이콘 (fill-only, viewBox 0 0 20 20, icon-design 스펙: solid fill·무 opacity·무 stroke) ──
const IconGlobe = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="currentColor"/>
    <rect x="1" y="9" width="18" height="2" rx="1" fill="#fff"/>
    <rect x="9" y="1" width="2" height="18" rx="1" fill="#fff"/>
  </svg>
);
const IconCamera = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.2 3.5H12.8L14.3 5.5H17.5C18.3 5.5 19 6.2 19 7V15C19 15.8 18.3 16.5 17.5 16.5H2.5C1.7 16.5 1 15.8 1 15V7C1 6.2 1.7 5.5 2.5 5.5H5.7L7.2 3.5Z" fill="currentColor"/>
    <circle cx="10" cy="11" r="3.5" fill="#fff"/>
    <circle cx="10" cy="11" r="1.9" fill="currentColor"/>
    <circle cx="15.6" cy="8" r="1" fill="#fff"/>
  </svg>
);
const IconVideo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="5.5" width="11.5" height="9" rx="2.5" fill="currentColor"/>
    <path d="M13.5 8.3L18.5 6V14L13.5 11.7V8.3Z" fill="currentColor"/>
    <circle cx="6.5" cy="10" r="2.2" fill="#fff"/>
    <circle cx="6.5" cy="10" r="1.1" fill="currentColor"/>
  </svg>
);
const IconSubtitle = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="4" width="18" height="12" rx="3" fill="currentColor"/>
    <rect x="3.6" y="8.4" width="5.4" height="3.2" rx="1.6" fill="#fff"/>
    <rect x="11" y="8.4" width="5.4" height="3.2" rx="1.6" fill="#fff"/>
  </svg>
);
const IconImage = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1.5" y="2.5" width="17" height="15" rx="3" fill="currentColor"/>
    <circle cx="6" cy="7" r="2" fill="#fff"/>
    <path d="M1.5 15.5L6.5 10.5L9.5 13.5L12.5 11L18.5 17.5H1.5V15.5Z" fill="#fff"/>
  </svg>
);
const IconZap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12 2L3.5 11.5H9L8 18L16.5 8.5H11L12 2Z" fill="currentColor"/>
  </svg>
);
const IconUpload = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M14.2 8.6A4.5 4.5 0 1 0 6 10.1A3 3 0 0 0 6.5 16H13.5A2.5 2.5 0 0 0 14 11H13.6A4.5 4.5 0 0 0 14.2 8.6Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 4L6.8 8H9V13.5H11V8H13.2L10 4Z" fill="#fff"/>
  </svg>
);
const IconCheck = ({ size = 20, color = '#2B85CC' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M16.7 5.3a1.2 1.2 0 0 1 0 1.7l-8 8a1.2 1.2 0 0 1-1.7 0L3.3 11.3a1.2 1.2 0 0 1 1.7-1.7L8 12.7l7.1-7.1c.5-.5 1.2-.5 1.7 0z"
      fill={color}/>
  </svg>
);
const IconX = ({ size = 18, color = '#B0B8C1' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M4.3 4.3a1.2 1.2 0 0 1 1.7 0L10 8.3l4-4a1.2 1.2 0 1 1 1.7 1.7L11.7 10l4 4a1.2 1.2 0 0 1-1.7 1.7L10 11.7l-4 4a1.2 1.2 0 0 1-1.7-1.7L8.3 10 4.3 6a1.2 1.2 0 0 1 0-1.7z"
      fill={color}/>
  </svg>
);
const IconStar = ({ size = 24, color = '#E8B84B' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2L12.4 7.3L18.1 8L13.9 12L15 18L10 15L5 18L6.1 12L1.9 8L7.6 7.3L10 2Z" fill={color}/>
  </svg>
);
const IconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L15.6 11H3a1 1 0 1 1 0-2h12.6l-4.3-4.3a1 1 0 0 1 0-1.4z"
      fill="currentColor"/>
  </svg>
);
const IconChat = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.8L3 18.5V15H4a2 2 0 0 1-2-2V4Z"
      fill="currentColor"/>
    <rect x="5" y="7" width="8" height="1.6" rx="0.8" fill="#fff"/>
    <rect x="5" y="10" width="5" height="1.6" rx="0.8" fill="#fff"/>
  </svg>
);
const IconYoutube = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="18" height="10" rx="3" fill="#EF4452"/>
    <path d="M8.5 7.5L13.5 10L8.5 12.5V7.5Z" fill="#fff"/>
  </svg>
);
const IconInstagram = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="17" height="17" rx="4.5" fill="currentColor"/>
    <circle cx="10" cy="10" r="4" fill="#fff"/>
    <circle cx="10" cy="10" r="2.1" fill="currentColor"/>
    <circle cx="14.6" cy="5.4" r="1.3" fill="#fff"/>
  </svg>
);
const IconUsers = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="14.2" cy="6" r="2.8" fill="#fff"/>
    <path d="M12.2 17.5C12.2 15 13.3 12.8 15 11.7A7 7 0 0 1 19 17.5H12.2Z" fill="#fff"/>
    <circle cx="7.5" cy="6.5" r="3.5" fill="currentColor"/>
    <path d="M1 17.5C1 14.2 3.9 11.5 7.5 11.5S14 14.2 14 17.5H1Z" fill="currentColor"/>
  </svg>
);
const IconTrendUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M12.5 3h5.5a1 1 0 0 1 1 1v5.5a1 1 0 1 1-2 0V6.9l-6.5 6.5-3-3-5.3 5.2a1 1 0 0 1-1.4-1.4l6-5.9a1 1 0 0 1 1.4 0l3 3 5.8-5.8H12.5a1 1 0 1 1 0-2z"
      fill="currentColor"/>
  </svg>
);
const IconRefresh = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 3.5a6.5 6.5 0 0 0-5.7 3.4H6.5a1 1 0 1 1 0 2H2.5a1 1 0 0 1-1-1V3.9a1 1 0 1 1 2 0v1.2A8.5 8.5 0 0 1 18.5 10a1 1 0 1 1-2 0A6.5 6.5 0 0 0 10 3.5Z"
      fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M3.5 10a1 1 0 0 1 1 1 6.5 6.5 0 0 0 11.2 4.5H13.5a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1V18a1 1 0 1 1-2 0v-1.2A8.5 8.5 0 0 1 2.5 11a1 1 0 0 1 1-1Z"
      fill="currentColor"/>
  </svg>
);
const IconClock = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 4.8a1 1 0 0 1 1 1V9.6l2.5 1.5a1 1 0 1 1-1 1.7l-3-1.8a1 1 0 0 1-.5-.9V5.8a1 1 0 0 1 1-1z"
      fill="#fff"/>
  </svg>
);

// ── VARIANT A ─────────────────────────────────────────────────
function VariantA() {
  const [tab, setTab] = React.useState('global');
  const [demo, setDemo] = React.useState(false);
  const segRef = React.useRef(null);
  const touched = React.useRef(false);

  // #4 토글이 화면에 '도착'하면 1회 자동 시연 → 전환 가능함을 알림
  React.useEffect(() => {
    const el = segRef.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !touched.current) {
          setDemo(true);
          setTimeout(() => setDemo(false), 1700);
          io.disconnect();
        }
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const selectTab = (t) => { touched.current = true; setDemo(false); setTab(t); };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      <LandingNav />

      {/* 1. HERO — 재구매 환기 */}
      <section id="hero" style={{ padding: '80px 0 100px', background: 'linear-gradient(180deg, #E8F0F8 0%, #fff 100%)' }}>
        <div className="container center-stack" style={{ maxWidth: 900 }}>

          <div style={{ animation: 'gemFloat 3.5s ease-in-out infinite', marginBottom: 28 }}>
            <img
              src="assets/U_ALF.png"
              alt="U사장님"
              style={{ height: 104, width: 'auto', filter: 'drop-shadow(0 8px 24px rgba(26,58,107,0.22))' }}
            />
          </div>

          {/* 기존 원장님 한정 특별 이벤트 배지 */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-surface)', color: 'var(--fg-2)',
            padding: '7px 16px', borderRadius: 100,
            fontSize: 14, fontWeight: 600, letterSpacing: '0.2px',
            border: '1px solid var(--border-default)', marginBottom: 24,
            animation: 'fadeInUp 0.5s 0.05s ease both',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-gold-deep)', flexShrink: 0 }} />
            기존 원장님 전용
          </div>

          <h1 style={{
            fontSize: 60, fontWeight: 900, lineHeight: 1.24,
            letterSpacing: '-1.2px', wordBreak: 'keep-all', color: 'var(--fg-1)',
            marginBottom: 26, marginTop: 4,
            animation: 'fadeInUp 0.5s 0.1s ease both',
          }}>
            빌리투어 하나로,<br /><span style={{ color: 'var(--primary-400)' }}>전 세계 세입자</span>를 만나세요.
          </h1>

          <p style={{
            fontSize: 25, color: 'var(--fg-2)', lineHeight: 1.55,
            wordBreak: 'keep-all', marginBottom: 12, fontWeight: 500, letterSpacing: '-0.3px',
            animation: 'fadeInUp 0.5s 0.2s ease both', maxWidth: 720,
          }}>
            <strong style={{ color: 'var(--fg-1)' }}>영어 자막·번역·썸네일</strong>에 <strong style={{ color: 'var(--fg-1)' }}>트렌디한 숏폼</strong>까지.<br />
            이 모든 걸 <strong style={{ color: 'var(--brand-gold-deep)', fontWeight: 800 }}>단돈 40만원</strong>에.
          </p>

          {/* stat strip — 새로워진 상품 요소 */}
          <div className="stat-strip" style={{ marginTop: 48, animation: 'fadeInUp 0.5s 0.3s ease both' }}>
            {[
              { n: '글로벌',  l: '영어 자막·번역·썸네일', c: 'var(--brand-navy)' },
              { n: '숏폼',    l: '바이럴 릴스 제작·대행',  c: 'var(--brand-navy)' },
              { n: '5채널',   l: 'YouTube·고방·인스타',    c: 'var(--brand-navy)' },
              { n: '40만원',  l: '전부 포함 · VAT 별도',   c: 'var(--brand-gold-deep)' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', padding: '28px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.c, letterSpacing: '-0.6px', lineHeight: 1.1 }}>{s.n}</div>
                <div style={{ fontSize: 16, color: 'var(--fg-3)', marginTop: 9, fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 무엇이 달라졌나 — 개편 소개 (동일가 업그레이드) */}
      <section id="change" style={{ padding: '104px 0', background: '#fff' }}>
        <div className="container">
          <div className="center-stack" style={{ marginBottom: 52, maxWidth: 800, margin: '0 auto 52px' }}>
            <span className="eyebrow">빌리투어 개편</span>
            <h2 className="section-h">
              예전 그 빌리투어가 아닙니다,<br />
              <span style={{ color: '#2B85CC' }}>글로벌로 새로워졌습니다</span>
            </h2>
            <p className="section-sub">
              영어 자막·번역·썸네일에 <strong style={{ color: 'var(--fg-1)' }}>하이라이트</strong>까지 더해진 글로벌.<br />
              <strong style={{ color: '#2B85CC' }}>정가 50만원</strong>을 원장님께만 특별가로 드립니다.
            </p>
          </div>

          {/* 비교표 — 기본 vs 글로벌 */}
          <CompareTable />
        </div>
      </section>

      {/* 3. 왜 지금? — 외국인 수요 + 숏폼 트렌드 */}
      <section id="why-global" style={{ background: '#1A3A6B', padding: '96px 0' }}>
        <div className="container">
          <div className="center-stack" style={{ marginBottom: 52, maxWidth: 700, margin: '0 auto 52px' }}>
            <span className="eyebrow" style={{ background: 'rgba(100,167,255,0.16)', color: '#64C2F5' }}>
              왜 지금 다시 찍어야 하나
            </span>
            <h2 className="section-h" style={{ color: '#fff', fontSize: 40 }}>
              한국어 영상만으로는<br />
              <span style={{ color: '#64C2F5' }}>절반의 세입자</span>를 놓칩니다
            </h2>
          </div>

          <div className="why-grid">
            {[
              {
                icon: <IconUsers size={36} />,
                n: '44만 명+',
                t: '서울 거주 외국인',
                d: '유학생·직장인이 유튜브로 방을 먼저 찾습니다.',
                c: '#64C2F5',
              },
              {
                icon: <IconGlobe size={36} />,
                n: '글로벌 알고리즘',
                t: '영어 자막 = 더 많은 노출',
                d: '영어 자막 하나가 해외 노출을 수배로 늘립니다.',
                c: '#64C2F5',
              },
              {
                icon: <IconClock size={36} />,
                n: '한시 운영',
                t: '기존 원장님 우선 공개',
                d: '기존 원장님께만 먼저 여는 한시 이벤트입니다.',
                c: '#64C2F5',
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '36px 28px',
                transition: 'background 0.18s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <div style={{ color: card.c, marginBottom: 16 }}>{card.icon}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: card.c, letterSpacing: '-0.5px', marginBottom: 6, lineHeight: 1.1 }}>{card.n}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14 }}>{card.t}</div>
                <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, wordBreak: 'keep-all' }}>{card.d}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32, padding: '22px 30px',
            background: 'rgba(232,184,75,0.16)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          }}>
            <IconStar />
            <span style={{ fontSize: 19, color: '#E8B84B', fontWeight: 700, wordBreak: 'keep-all' }}>
              "영어 자막 하나가 공실을 채웁니다" — 외국인 입주 수요는 이미 실재합니다.
            </span>
          </div>
        </div>
      </section>

      {/* 4. 새로워진 두 상품 — 탭 토글 */}
      <section id="products" style={{ padding: '104px 0', background: '#fff' }}>
        <div className="container">
          <div className="center-stack" style={{ marginBottom: 40, maxWidth: 760, margin: '0 auto 40px' }}>
            <span className="eyebrow">새로워진 상품</span>
            <h2 className="section-h">두 가지가 새로 생겼습니다</h2>
            <p className="section-sub">
              메인은 <strong style={{ color: 'var(--fg-1)' }}>빌리투어 글로벌</strong>.<br />
              여기에 요즘 대세인 <strong style={{ color: 'var(--fg-1)' }}>숏폼 패키지</strong>가 새로 더해졌습니다.
            </p>
          </div>

          {/* 탭 컴포넌트 카드 (헤더=탭, 본문=콘텐츠) */}
          <div className="product-switch">
            <div className={`seg ${demo ? 'is-demo' : ''}`} ref={segRef} role="tablist">
              <span
                className="seg-thumb"
                data-pos={tab === 'shorts' ? 'r' : 'l'}
                aria-hidden="true"
              />
              <button
                role="tab"
                className={`seg-btn ${tab === 'global' ? 'is-on' : ''}`}
                onClick={() => selectTab('global')}
              >
                <span className="seg-ico"><IconGlobe size={26} /></span>
                <span className="seg-name">빌리투어 글로벌</span>
                <span className="seg-price">메인 · 40만원</span>
              </button>
              <button
                role="tab"
                className={`seg-btn ${tab === 'shorts' ? 'is-on' : ''}`}
                onClick={() => selectTab('shorts')}
              >
                <span className="seg-ico"><IconZap size={26} /></span>
                <span className="seg-name">숏폼 패키지 <span className="seg-new">NEW</span></span>
                <span className="seg-price">단건 · 10만원</span>
              </button>
            </div>

            <div className="prod-panel" key={tab}>
              {tab === 'global' ? <GlobalPanel /> : <ShortsPanel />}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 특별 이벤트 오퍼 */}
      <section id="offer" style={{ background: 'var(--bg-app)', padding: '100px 0' }}>
        <div className="container">
          <div className="center-stack" style={{ marginBottom: 48, maxWidth: 780, margin: '0 auto 48px' }}>
            <span className="eyebrow">기존 원장님 전용 · 한시 운영</span>
            <h2 className="section-h">지금이 <span style={{ color: '#2B85CC' }}>가장 좋은 타이밍</span>입니다</h2>
            <p className="section-sub">
              특별 이벤트 기간 동안,<br />
              <strong style={{ color: 'var(--fg-1)' }}>글로벌 재촬영부터 숏폼 제작·업로드까지 전부</strong> 단돈 40만원에 드립니다.
            </p>
          </div>

          {/* 메인 오퍼 — 올인원 특별가 */}
          <div className="hero-offer">
            <div className="hero-offer-glow" />
            <div className="hero-offer-inner">
              <span className="hero-offer-badge"><IconCheck size={18} color="#2B85CC" /> 특별 이벤트 · 전부 포함</span>
              <h3 className="hero-offer-title">
                글로벌 + 숏폼, <span style={{ color: '#2B85CC' }}>전부 다</span>
              </h3>
              <p className="hero-offer-sub">
                재촬영부터 영어화, 숏폼 제작·업로드까지 한 번에.
              </p>

              <div className="hero-offer-price">
                <span className="hop-strike">정가 500,000원</span>
                <div className="hop-now"><b>400,000</b><span>원</span></div>
                <span className="hop-tag">특별가 · 숏폼(10만원 상당) 무료 포함 · VAT 별도</span>
              </div>

              <div className="hero-offer-list">
                {[
                  { t: '현장 방문 룸투어 촬영', kind: 'base' },
                  { t: '전문 편집 + 유튜브/고방 업로드', kind: 'base' },
                  { t: '영어 자막 삽입', kind: 'global' },
                  { t: '영어 자동번역 노출', kind: 'global' },
                  { t: '영어 썸네일 제작', kind: 'global' },
                  { t: '10~15초 하이라이트 클립', kind: 'global' },
                  { t: '트렌디한 숏폼 제작', kind: 'free' },
                  { t: '유튜브 Shorts·커뮤니티 + 인스타 Reels 동시 업로드', kind: 'free' },
                ].map((item, i) => (
                  <div key={i} className="hop-li">
                    <span style={{ flexShrink: 0 }}><IconCheck size={20} color={item.kind === 'base' ? '#2B85CC' : '#E8B84B'} /></span>
                    <span className="hop-li-t">{item.t}</span>
                    {item.kind === 'global' && <span className="hop-chip hop-chip--g">GLOBAL</span>}
                    {item.kind === 'free' && <span className="hop-chip hop-chip--f">무료</span>}
                  </div>
                ))}
              </div>

              <a href={REQUEST_URL} target="_blank" className="btn btn-primary" style={{
                width: '100%', justifyContent: 'center',
                background: 'linear-gradient(135deg, #1A3A6B 0%, #2B85CC 100%)',
                fontSize: 22, fontWeight: 800, padding: '22px 0',
                animation: 'ctaPulse 2.5s 0.5s ease infinite',
              }}>
                원장님 특별가로 신청하기 &nbsp;<IconArrowRight size={22} />
              </a>
            </div>
          </div>

          {/* 보조 옵션 — 숏폼만 (얼리버드 첫 구매) */}
          <div className="sub-offer">
            <div className="sub-offer-top">
              <div>
                <span className="sub-offer-label"><IconStar /> 얼리버드 · 첫 구매 혜택</span>
                <div className="sub-offer-title">숏폼만 따로 구매</div>
              </div>
              <div className="sub-offer-pricebox">
                <div className="sub-offer-price"><b>100,000</b><span>원</span></div>
                <div className="sub-offer-note">VAT 별도</div>
              </div>
            </div>

            <div className="sub-offer-desc">
              아직 글로벌이 부담되신다면, <strong>숏폼부터 가볍게</strong> 시작하세요.
            </div>
            <div className="sub-offer-tags">
              {['숏폼 1개 제작', '유튜브·인스타 동시 업로드', '외국어 자막'].map((t, i) => (
                <span key={i} className="sub-tag"><IconCheck size={16} color="#2B85CC" /> {t}</span>
              ))}
            </div>

            <div className="sub-offer-foot"><IconRefresh size={15} /> 영상 추가 촬영 X · 기존 영상으로 제작</div>
            <a href={REQUEST_URL} target="_blank" className="btn" style={{
              width: '100%', justifyContent: 'center',
              background: '#1A3A6B', color: '#fff',
              fontSize: 18, fontWeight: 800, padding: '18px 0', borderRadius: 14,
            }}>
              숏폼만 신청하기 &nbsp;<IconArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. 프로세스 */}
      <section id="process" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="center-stack" style={{ marginBottom: 56 }}>
            <span className="eyebrow">진행 방식</span>
            <h2 className="section-h">신청부터 업로드까지</h2>
            <p className="section-sub">
              원장님은 <strong style={{ color: 'var(--fg-1)' }}>신청 · 결제 · 촬영일 안내</strong>만.<br />
              촬영부터 편집·자막·업로드까지 <strong style={{ color: '#2B85CC' }}>전부 빌리투어가</strong> 처리합니다.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { n: 1, t: '신청',       d: '신청 폼에 지점 정보와 희망 상품(글로벌 / 숏폼만)을 입력해요.',          tag: '원장님',    c: '#1A3A6B' },
              { n: 2, t: '담당자 확인', d: '담당자가 내용 확인 후 카카오톡으로 결제 안내 및 촬영 일정을 조율해요.', tag: '빌리투어',  c: '#2B85CC' },
              { n: 3, t: '결제',       d: '안내받은 방법으로 결제 진행 — 글로벌 특별가 40만원, 숏폼만 10만원.',     tag: '원장님',    c: '#1A3A6B' },
              { n: 4, t: '현장 촬영',  d: '담당자가 직접 방문해 투어 동선으로 룸투어 영상을 촬영합니다.',           tag: '빌리투어',  c: '#2B85CC' },
              { n: 5, t: '편집·자막',  d: '촬영본 편집 후 원장님 확인 → 영어 자막·번역·썸네일 작업 진행.',          tag: '빌리투어',  c: '#2B85CC' },
              { n: 6, t: '업로드 완료', d: '유튜브, 고방, 인스타 각 채널 업로드 후 완료 URL을 전달드려요.',          tag: '완료',      c: '#2B85CC' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, alignItems: 'flex-start',
                padding: '24px 28px', background: '#F4F8FC', borderRadius: 16,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: '#1A3A6B', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, flexShrink: 0,
                }}>{s.n}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg-1)' }}>{s.t}</h3>
                    <span style={{
                      fontSize: 15, fontWeight: 700, color: s.c,
                      background: `${s.c}18`, padding: '4px 12px', borderRadius: 100,
                    }}>{s.tag}</span>
                  </div>
                  <p style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.7, wordBreak: 'keep-all' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" style={{ padding: '100px 0', background: 'var(--bg-app)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="center-stack" style={{ marginBottom: 50 }}>
            <span className="eyebrow">자주 묻는 질문</span>
            <h2 className="section-h">신청 전에 확인해 주세요</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 18, padding: '8px 30px', boxShadow: '0 6px 26px rgba(26,58,107,0.07)' }}>
            <FaqItem defaultOpen
              q="이미 빌리투어를 찍었는데, 또 찍어야 하나요?"
              a="예전 빌리투어는 한국어 영상 한 편이 전부였습니다.<br />지금은 <strong>영어 자막·번역·썸네일에 트렌디한 숏폼</strong>까지 더해졌어요.<br />외국인 세입자와 SNS 노출을 새로 잡을 수 있습니다.<br /><br />특별 이벤트 기간엔 <strong>정가 50만원 글로벌을 40만원에, 숏폼까지 무료</strong>로 드리는 게 핵심입니다." />
            <FaqItem
              q="기존 원장님이란 어떤 기준인가요?"
              a="이전에 빌리투어 서비스(촬영·편집·업로드)를 <strong>한 번 이상 이용</strong>하신 원장님이라면 모두 해당됩니다.<br />정확한 대상 여부는 담당자 확인 단계에서 안내드려요." />
            <FaqItem
              q="실제로 어디까지 촬영해 주나요?"
              a="담당자가 직접 방문해 <strong>입구 → 공용공간 → 방 내부 → 욕실 → 창문뷰</strong> 순서로 투어 동선에 맞춰 촬영합니다.<br />전문 카메라와 조명을 사용하니 원장님이 따로 준비하실 건 없어요.<br /><strong>방만 깨끗하게</strong> 해두시면 됩니다." />
            <FaqItem
              q="영어 자막은 어떻게 작성되나요?"
              a="담당자가 영상 내용을 영어로 번역해 <strong>직접 검수하여 삽입</strong>합니다.<br />시설명·지역명 등 고유명사도 최대한 반영해요.<br />YouTube 영어 번역 설정으로 <strong>글로벌 검색에도 노출</strong>됩니다." />
            <FaqItem
              q="영어 자동번역 노출이 뭔가요?"
              a="제목과 설명을 <strong>영어 버전으로 함께 등록</strong>해 둡니다.<br />평소 한국 시청자에겐 <strong>한국어 제목·설명</strong>이 그대로 보이지만,<br /><strong>YouTube 언어를 영어로 설정한 시청자</strong>에겐 같은 영상의 제목·설명이 <strong>영어로 번역되어 노출</strong>돼요.<br />덕분에 한 영상으로 국내·해외 시청자를 모두 잡을 수 있습니다." />
            <FaqItem
              q="숏폼만 따로 신청할 수 있나요?"
              a="네, <strong>숏폼만 따로 구매(10만원)</strong>도 가능합니다.<br />추가 촬영 없이 기존 영상으로 숏폼 1개를 제작해 유튜브·인스타 두 곳에 올려드려요.<br /><br />다만 특별 이벤트 기간엔 <strong>글로벌(40만원)에 숏폼이 무료로 포함</strong>되니, 글로벌 신청이 훨씬 유리합니다." />
            <FaqItem
              q="촬영 일정은 어떻게 잡히나요?"
              a="결제 완료 후 담당자가 원장님 일정에 맞춰 촬영일을 조율합니다.<br />통상 결제 후 <strong>1~2주 내</strong> 촬영이 진행돼요." />
          </div>
        </div>
      </section>

      {/* 8. Footer CTA */}
      <section id="cta" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="cta-inner" style={{
            background: 'linear-gradient(135deg, #0D2545 0%, #1A3A6B 40%, #2B85CC 100%)',
            borderRadius: 28, color: '#fff', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: 48, top: '50%', transform: 'translateY(-50%)',
              opacity: 0.1,
              animation: 'gemFloat 4s ease-in-out infinite',
            }}>
              <img src="assets/U_ALF.png" alt="" style={{ height: 160, filter: 'brightness(10)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '1.5px', opacity: 0.7, marginBottom: 20, textTransform: 'uppercase' }}>
                기존 원장님 단독 · 한시 운영
              </div>
              <h2 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.25, letterSpacing: '-0.8px', wordBreak: 'keep-all', marginBottom: 12 }}>
                한 번 찍고 끝이었던 그 방,<br />
                <span style={{ color: '#64C2F5' }}>이제 세계로 내보내세요.</span>
              </h2>
              <p style={{ fontSize: 21, opacity: 0.9, marginBottom: 36, fontWeight: 600, lineHeight: 1.6 }}>
                특별 이벤트 기간 — 글로벌 재촬영부터 숏폼까지<br />
                <span style={{ color: '#E8B84B', fontWeight: 800 }}>전부 단돈 40만원</span>에. <span style={{ fontSize: 15, opacity: 0.7, fontWeight: 500 }}>(VAT 별도)</span>
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={REQUEST_URL} target="_blank"
                   className="btn btn-lg"
                   style={{
                     background: '#fff', color: '#1A3A6B',
                     animation: 'ctaPulse 2.5s 0.5s ease infinite',
                     fontWeight: 900, gap: 8, fontSize: 21, padding: '20px 52px',
                   }}>
                  지금 내 방 글로벌로 보내기 &nbsp;<IconArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 채널톡 배너 */}
      <section style={{
        padding: '64px 0',
        background: 'var(--bg-app)',
        borderTop: '1px solid var(--border-input)',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1A3A6B, #2B85CC)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}><IconChat size={22} /></div>
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--fg-1)', marginBottom: 10, wordBreak: 'keep-all' }}>
            궁금한 점이 있으신가요?
          </h2>
          <p style={{ fontSize: 19, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 32, wordBreak: 'keep-all' }}>
            무엇이든 편하게 물어보세요.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#1A3A6B', color: '#fff',
              padding: '16px 32px', borderRadius: 14,
              fontSize: 17, fontWeight: 800, textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(26,58,107,0.28)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,58,107,0.36)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(26,58,107,0.28)';
            }}
          >
            <IconChat size={20} />
            채널톡으로 문의하기
          </a>
        </div>
      </section>

      {/* 상시 플로팅 CTA */}
      <div className="float-cta-wrap">
        <span className="float-cta-badge"><IconStar /> 기존 원장님 특별가 · 숏폼 서비스</span>
        <a href={REQUEST_URL} target="_blank" className="float-cta">
          1분 만에 신청하기 <IconArrowRight size={22} />
        </a>
      </div>

      <LandingFooter />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(43,133,204,0.35); }
          50%       { box-shadow: 0 0 0 14px rgba(43,133,204,0); }
        }
        @keyframes gemFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes iconPop {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%      { transform: scale(1.6); opacity: 0.4; }
        }
        @keyframes segNudge {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes segDemo {
          0%, 12%   { transform: translateX(0); }
          44%, 56%  { transform: translateX(100%); }
          88%, 100% { transform: translateX(0); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }

        /* ── 상시 플로팅 CTA (중앙 하단) ── */
        .float-cta-wrap {
          position: fixed; left: 0; right: 0; bottom: 26px; z-index: 90;
          display: flex; flex-direction: column; align-items: center; gap: 11px;
          pointer-events: none;
          animation: floatIn 0.5s 0.8s ease both;
        }
        .float-cta-badge {
          pointer-events: auto;
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 16px; font-weight: 800; color: #1A3A6B;
          background: #fff; padding: 9px 18px; border-radius: 100px;
          box-shadow: 0 6px 20px rgba(26,58,107,0.18);
        }
        .float-cta {
          pointer-events: auto;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 23px 56px; border-radius: 100px;
          background: linear-gradient(135deg, #1A3A6B 0%, #2B85CC 100%);
          box-shadow: 0 14px 38px rgba(26,58,107,0.42);
          color: #fff; text-decoration: none;
          font-size: 24px; font-weight: 800; letter-spacing: -0.3px;
          animation: floatBob 3.2s 1.4s ease-in-out infinite;
          transition: transform 0.16s, box-shadow 0.16s;
        }
        .float-cta:hover { transform: translateY(-3px); box-shadow: 0 18px 46px rgba(26,58,107,0.5); }

        .stat-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border-divider);
          border: 1px solid var(--border-divider);
          border-radius: 20px;
          overflow: hidden;
          width: 100%;
          max-width: 720px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── 상품 세그먼트 토글 ── */
        .product-switch {
          max-width: 980px; margin: 0 auto;
          background: #fff; border-radius: 28px;
          box-shadow: 0 24px 64px rgba(26,58,107,0.14);
          overflow: hidden;
        }
        .seg {
          --seg-pad: 10px;
          position: relative;
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          margin: 0; padding: var(--seg-pad);
          background: #DCE4EE;
          border-radius: 22px;
          box-shadow: inset 0 2px 6px rgba(26,58,107,0.14);
        }
        /* 트랙 안에서 좌우로 미끄러지는 활성 표시 */
        .seg-thumb {
          position: absolute;
          top: var(--seg-pad); bottom: var(--seg-pad); left: var(--seg-pad);
          width: calc((100% - 2 * var(--seg-pad)) / 2);
          border-radius: 15px;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          box-shadow: 0 10px 24px rgba(43,133,204,0.4);
          transition: transform 0.36s cubic-bezier(0.34, 1.3, 0.5, 1);
          z-index: 0;
        }
        .seg-thumb[data-pos="l"] { transform: translateX(0); }
        .seg-thumb[data-pos="r"] { transform: translateX(100%); }
        /* 화면 도착 시 1회 자동 시연 — 좌우로 미끄러져 전환 가능함을 알림 */
        .seg.is-demo .seg-thumb { animation: segDemo 1.7s cubic-bezier(0.45, 0, 0.25, 1) both; }
        .seg.is-demo .seg-name,
        .seg.is-demo .seg-price,
        .seg.is-demo .seg-ico { transition: none; }
        .seg-btn {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 18px 10px; border-radius: 15px; cursor: pointer;
          background: transparent;
          transition: color 0.25s ease;
        }
        .seg-ico {
          width: 44px; height: 44px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, color 0.25s;
        }
        .seg-name { font-size: 20px; font-weight: 800; }
        .seg-price { font-size: 14px; font-weight: 600; }
        .seg-new {
          font-size: 12px; font-weight: 800; color: #fff;
          background: #E8B84B; padding: 2px 8px; border-radius: 100px;
          vertical-align: middle; margin-left: 4px;
        }
        /* 비선택 */
        .seg-btn:not(.is-on) .seg-name { color: #7A8694; }
        .seg-btn:not(.is-on) .seg-price { color: #93A0AE; }
        .seg-btn:not(.is-on) .seg-ico { background: #C6D1DD; color: #8995A4; }
        /* 선택 = 미끄러져 온 thumb 위 */
        .seg-btn.is-on .seg-name,
        .seg-btn.is-on .seg-price { color: #fff; }
        .seg-btn.is-on .seg-ico { background: rgba(255,255,255,0.22); color: #fff; }

        .prod-panel { padding: 50px 40px; animation: panelIn 0.32s ease both; }

        /* ── 패널 공통 헤더 ── */
        .panel-head { text-align: center; max-width: 660px; margin: 0 auto 32px; }
        .panel-head h3 {
          font-size: 34px; font-weight: 800; color: var(--fg-1);
          line-height: 1.25; word-break: keep-all; margin-bottom: 14px;
        }
        .panel-head p { font-size: 20px; color: var(--fg-3); line-height: 1.65; word-break: keep-all; }
        .reshoot-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 16px; font-weight: 800; color: #2B85CC;
          background: #D0E8F6; padding: 8px 16px; border-radius: 100px; margin-bottom: 16px;
        }

        /* ── 미리보기 임베드 ── */
        .prod-embed { max-width: 880px; margin: 0 auto 36px; }
        .prod-embed-label {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 19px; font-weight: 800; color: var(--fg-2);
          margin-bottom: 18px;
        }
        .embed-yt {
          position: relative; width: 100%; padding-top: 56.25%;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 12px 36px rgba(26,58,107,0.16);
        }
        .embed-yt iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

        .embed-ig {
          width: 100%; max-width: 360px;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 12px 36px rgba(26,58,107,0.16);
          background: #fff;
        }
        .embed-ig iframe { width: 100%; height: 720px; display: block; border: none; }

        /* ── 숏폼: 미리보기 + 혜택 2단 ── */
        .shorts-hero {
          display: grid; grid-template-columns: 360px 1fr; gap: 48px; align-items: start;
          max-width: 960px; margin: 0 auto 36px;
        }
        .shorts-embed { display: flex; flex-direction: column; align-items: center; }
        .shorts-right { display: flex; flex-direction: column; }
        .shorts-bignum {
          display: flex; align-items: center; gap: 18px;
          padding-bottom: 24px; margin-bottom: 8px;
          border-bottom: 1px solid var(--border-divider);
        }
        .shorts-bignum b {
          font-size: 72px; font-weight: 900; letter-spacing: -3px; line-height: 0.9;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .shorts-bignum span { font-size: 19px; font-weight: 600; color: var(--fg-2); line-height: 1.5; word-break: keep-all; }
        .shorts-bignum strong { color: #1A3A6B; }
        .sbene-list { display: flex; flex-direction: column; list-style: none; }
        .sbene-item {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 22px 4px; border-bottom: 1px solid var(--border-divider);
        }
        .sbene-item:last-child { border-bottom: none; padding-bottom: 0; }
        .sbene-ico {
          width: 52px; height: 52px; flex-shrink: 0; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC); color: #fff;
        }
        .sbene-t { font-size: 24px; font-weight: 800; color: var(--fg-1); margin-bottom: 7px; word-break: keep-all; }
        .sbene-d { font-size: 18px; color: var(--fg-3); line-height: 1.6; word-break: keep-all; }

        /* ── 동시 업로드 플랫폼 강조 ── */
        .shorts-platforms {
          max-width: 960px; margin: 0 auto; text-align: center;
          padding: 34px 28px; border-radius: 22px;
          background: linear-gradient(135deg, #EEF5FC, #E3F0FB);
        }
        .sp-flow {
          display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .sp-src {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 20px; font-weight: 800; color: #fff;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          padding: 13px 22px; border-radius: 100px;
        }
        .sp-arrow { color: #2B85CC; display: flex; }
        .sp-chip {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 21px; font-weight: 800;
          padding: 12px 24px; border-radius: 100px;
          background: #fff; box-shadow: 0 4px 16px rgba(26,58,107,0.12);
        }
        .sp-yt { color: #EF4452; }
        .sp-ig { color: #C13584; }
        .sp-plus { font-size: 26px; font-weight: 900; color: var(--fg-3); }
        .sp-note { font-size: 20px; font-weight: 700; color: var(--fg-1); word-break: keep-all; }
        .sp-note b { color: #2B85CC; }

        /* ── 글로벌 패널: 2x2 임팩트 ── */
        .gpanel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .gfeat {
          display: flex; gap: 18px; align-items: flex-start;
          background: #F4F8FC;
          border-radius: 20px; padding: 28px 26px;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .gfeat:hover { box-shadow: 0 10px 30px rgba(43,133,204,0.14); transform: translateY(-2px); }
        .gfeat-ico {
          width: 60px; height: 60px; flex-shrink: 0; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC); color: #fff;
        }
        .gfeat-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; }
        .gfeat-title { font-size: 23px; font-weight: 800; color: var(--fg-1); }
        .gfeat-tag {
          font-size: 14px; font-weight: 800; color: #2B85CC;
          background: #D0E8F6; padding: 4px 11px; border-radius: 100px;
        }
        .gfeat-desc { font-size: 18px; color: var(--fg-3); line-height: 1.6; word-break: keep-all; }
        .gprice-bar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          margin-top: 24px; padding: 24px 34px;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          border-radius: 20px; color: #fff;
        }
        .gprice-label { font-size: 17px; font-weight: 600; opacity: 0.85; }
        .gprice-strike { font-size: 18px; text-decoration: line-through; opacity: 0.7; margin-top: 2px; }
        .gprice-now { font-size: 22px; font-weight: 700; display: flex; align-items: baseline; }
        .gprice-now b { font-size: 46px; font-weight: 900; letter-spacing: -1.5px; margin-right: 4px; }
        .gprice-now span {
          font-size: 14px; font-weight: 800; color: #E8B84B;
          background: rgba(232,184,75,0.18); padding: 5px 11px; border-radius: 100px; margin-left: 12px;
        }

        /* ── 숏폼 패널: 플로우 ── */
        .flow {
          display: grid; grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 12px; align-items: center; max-width: 880px; margin: 0 auto;
        }
        .flow-step {
          background: #F4F8FC;
          border-radius: 20px; padding: 30px 18px; text-align: center;
        }
        .flow-step.is-mid {
          background: linear-gradient(180deg, #1A3A6B, #2B85CC);
          box-shadow: 0 10px 28px rgba(43,133,204,0.28);
        }
        .flow-step.is-mid .flow-t { color: #fff; }
        .flow-step.is-mid .flow-d { color: rgba(255,255,255,0.85); }
        .flow-step.is-mid .flow-ico { background: rgba(255,255,255,0.2); }
        .flow-ico {
          width: 60px; height: 60px; margin: 0 auto 14px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; gap: 4px;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC); color: #fff;
        }
        .flow-ico--multi { width: auto; padding: 0 18px; }
        .flow-t { font-size: 22px; font-weight: 800; color: var(--fg-1); margin-bottom: 6px; }
        .flow-d { font-size: 18px; color: var(--fg-3); line-height: 1.5; }
        .flow-arrow { color: #2B85CC; display: flex; justify-content: center; }
        .sfree-bar {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          justify-content: center; text-align: center;
          margin-top: 28px; padding: 24px 30px;
          background: linear-gradient(90deg, #EBF3FF, #E8F2FA);
          border-radius: 18px;
          font-size: 19px; font-weight: 700; color: var(--fg-1);
        }
        .sfree-bar b { color: #1A3A6B; }

        /* ── 메인 오퍼 (올인원 특별가) ── */
        .hero-offer {
          position: relative; max-width: 720px; margin: 0 auto;
          border-radius: 28px; overflow: hidden;
          background: linear-gradient(180deg, #fff 0%, #F4F9FF 100%);
          border: 2.5px solid #2B85CC;
          box-shadow: 0 18px 50px rgba(43,133,204,0.18);
        }
        .hero-offer-glow {
          position: absolute; top: -120px; right: -120px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(43,133,204,0.16), transparent 70%);
          pointer-events: none;
        }
        .hero-offer-inner { position: relative; padding: 44px 44px 40px; }
        .hero-offer-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 16px; font-weight: 800; color: #1A3A6B;
          background: #E3F0FB;
          padding: 9px 18px; border-radius: 100px; margin-bottom: 18px;
        }
        .hero-offer-title {
          font-size: 38px; font-weight: 900; color: var(--fg-1);
          letter-spacing: -1px; line-height: 1.2; word-break: keep-all; margin-bottom: 12px;
        }
        .hero-offer-sub {
          font-size: 19px; color: var(--fg-3); line-height: 1.7; word-break: keep-all; margin-bottom: 28px;
        }
        .hero-offer-price {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
          padding: 26px 30px; margin-bottom: 30px;
          background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          border-radius: 20px; color: #fff;
        }
        .hop-strike { font-size: 18px; text-decoration: line-through; opacity: 0.72; }
        .hop-now { display: flex; align-items: baseline; }
        .hop-now b { font-size: 60px; font-weight: 900; letter-spacing: -2.5px; line-height: 1; }
        .hop-now span { font-size: 26px; font-weight: 700; margin-left: 4px; }
        .hop-tag {
          font-size: 15px; font-weight: 800; color: #1A3A6B;
          background: #fff; padding: 5px 14px; border-radius: 100px; margin-top: 10px;
        }
        .hero-offer-list { display: flex; flex-direction: column; gap: 13px; margin-bottom: 32px; }
        .hop-li { display: flex; align-items: center; gap: 11px; }
        .hop-li-t { font-size: 19px; color: var(--fg-1); font-weight: 600; word-break: keep-all; }
        .hop-chip {
          font-size: 13px; font-weight: 800; padding: 3px 11px; border-radius: 100px; flex-shrink: 0;
        }
        .hop-chip--g { color: #2B85CC; background: #D0E8F6; }
        .hop-chip--f { color: #fff; background: #E8B84B; }

        /* ── 보조 옵션 (숏폼만) ── */
        .sub-offer {
          max-width: 720px; margin: 22px auto 0;
          padding: 34px 36px; border-radius: 22px;
          background: #fff; box-shadow: 0 6px 26px rgba(26,58,107,0.07);
        }
        .sub-offer-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 16px; }
        .sub-offer-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 15px; font-weight: 800; color: #B8860B;
          background: #FBF1D5; padding: 6px 15px; border-radius: 100px; margin-bottom: 10px;
        }
        .sub-offer-label svg { width: 16px; height: 16px; }
        .sub-offer-title { font-size: 27px; font-weight: 800; color: var(--fg-1); }
        .sub-offer-pricebox { text-align: right; }
        .sub-offer-price { display: flex; align-items: baseline; justify-content: flex-end; }
        .sub-offer-price b { font-size: 40px; font-weight: 900; color: #1A3A6B; letter-spacing: -1.5px; line-height: 1; }
        .sub-offer-price span { font-size: 20px; font-weight: 700; color: #1A3A6B; margin-left: 3px; }
        .sub-offer-note { font-size: 15px; color: var(--fg-4); margin-top: 4px; }
        .sub-offer-foot {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          font-size: 15px; font-weight: 700; color: var(--fg-3);
          margin: 18px 0 14px; word-break: keep-all;
        }
        .sub-offer-foot svg { color: #2B85CC; flex-shrink: 0; }
        .sub-offer-desc { font-size: 18px; color: var(--fg-3); line-height: 1.6; word-break: keep-all; margin-bottom: 14px; }
        .sub-offer-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .sub-tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 16px; font-weight: 700; color: var(--fg-2);
          background: var(--bg-app); padding: 8px 14px; border-radius: 100px;
        }

        /* ── 비교표 (기본 vs 글로벌) ── */
        .ctable {
          border-radius: 20px; overflow: hidden; background: #fff;
          box-shadow: 0 8px 30px rgba(26,58,107,0.08);
        }
        .ct-row {
          display: grid; grid-template-columns: 1.6fr 1fr 1.3fr;
          align-items: stretch;
          border-bottom: 1px solid var(--border-divider);
        }
        .ct-row:last-child { border-bottom: none; }
        .ct-cell {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 18px 12px; min-height: 62px;
        }
        .ct-feat {
          align-items: flex-start; justify-content: center; text-align: left;
          font-size: 21px; font-weight: 700; color: var(--fg-1);
          padding-left: 28px;
        }
        .ct-global { background: #F0F7FF; }
        .ct-head .ct-cell { padding: 26px 12px; }
        .ct-head .ct-feat { align-items: flex-start; justify-content: center; font-size: 19px; font-weight: 800; color: var(--fg-2); padding-left: 28px; }
        .ct-plan { font-size: 22px; font-weight: 800; color: var(--fg-2); }
        .ct-plan-sub { font-size: 16px; font-weight: 600; color: var(--fg-4); }
        .ct-basic-h { background: var(--bg-app); }
        .ct-global-h { background: linear-gradient(135deg, #1A3A6B, #2B85CC); }
        .ct-global-h .ct-plan { color: #fff; }
        .ct-global-h .ct-plan-sub { color: rgba(255,255,255,0.82); }
        .ct-reco {
          font-size: 12px; font-weight: 800; letter-spacing: 0.5px; color: #1A3A6B;
          background: #fff; padding: 4px 13px; border-radius: 100px; margin-bottom: 6px;
        }
        .ct-new {
          font-size: 13px; font-weight: 800; color: #2B85CC;
          background: #D0E8F6; padding: 3px 10px; border-radius: 100px;
        }
        .ct-service {
          font-size: 15px; font-weight: 800; color: #1A3A6B;
          background: #E8B84B; padding: 5px 13px; border-radius: 100px;
        }
        .ct-off {
          font-size: 15px; font-weight: 900; color: #1A3A6B;
          background: #E8B84B; padding: 3px 11px; border-radius: 8px; letter-spacing: 0.3px;
        }
        .ct-price-old { font-size: 23px; font-weight: 700; color: var(--fg-4); }
        .ct-price-now { display: flex; align-items: center; gap: 9px; }
        .ct-plus-short {
          font-size: 16px; font-weight: 800; color: #1A3A6B;
          background: #E8B84B; padding: 6px 15px; border-radius: 100px; margin-top: 8px;
        }
        .ct-vat { font-size: 13px; font-weight: 600; color: var(--fg-4); margin-top: 7px; }
        .ct-price { font-size: 38px; font-weight: 900; color: #1A3A6B; letter-spacing: -1px; line-height: 1; }
        .ct-price-hl { color: #1A3A6B; }
        .ct-price-strike-old {
          font-size: 19px; font-weight: 700; color: #8A94A0;
          text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: #AAB3BE;
          margin-bottom: 3px;
        }
        .ct-price-row .ct-cell { padding-top: 22px; padding-bottom: 22px; }
        .ct-price-row { background: var(--bg-app); }
        .ct-price-row .ct-global { background: #DCEBF8; }

        .cta-inner { padding: 72px 48px; }

        @media (max-width: 640px) {
          #hero { padding: 56px 0 72px !important; }
          #hero h1 { font-size: 34px !important; letter-spacing: -1px !important; }

          .stat-strip { grid-template-columns: repeat(2, 1fr) !important; }

          .why-grid { grid-template-columns: 1fr !important; }

          .seg { --seg-pad: 7px !important; }
          .seg-btn { padding: 15px 6px !important; gap: 6px !important; }
          .seg-ico { width: 38px !important; height: 38px !important; }
          .seg-name { font-size: 16px !important; }
          .seg-price { font-size: 12px !important; }
          .prod-panel { padding: 32px 18px !important; }

          .panel-head h3 { font-size: 26px !important; }
          .panel-head p { font-size: 18px !important; }

          .shorts-hero { grid-template-columns: 1fr !important; gap: 30px !important; }
          .sbene-t { font-size: 21px !important; }
          .shorts-bignum b { font-size: 56px !important; }
          .sp-flow { gap: 10px !important; }
          .sp-src, .sp-chip { font-size: 17px !important; padding: 10px 18px !important; }
          .sp-note { font-size: 17px !important; }

          .gpanel-grid { grid-template-columns: 1fr !important; }
          .gfeat { padding: 22px 20px !important; }
          .gprice-bar { padding: 22px 22px !important; }
          .gprice-now b { font-size: 38px !important; }

          .flow { grid-template-columns: 1fr !important; }
          .flow-arrow { transform: rotate(90deg); }

          .hero-offer-inner { padding: 32px 24px 30px !important; }
          .hero-offer-title { font-size: 28px !important; }
          .hero-offer-sub { font-size: 17px !important; }
          .hop-now b { font-size: 46px !important; }
          .hop-li-t { font-size: 17px !important; }
          .sub-offer { padding: 26px 22px !important; }
          .sub-offer-pricebox { text-align: left !important; }
          .sub-offer-price { justify-content: flex-start !important; }

          .float-cta-wrap {
            left: 12px !important; right: 12px !important; bottom: 12px !important;
            transform: none !important;
          }
          .float-cta {
            width: 100% !important; justify-content: center !important;
            padding: 16px 0 !important; border-radius: 16px !important;
            font-size: 18px !important; animation: none !important;
          }
          .float-cta-badge { font-size: 13px !important; }

          .embed-ig { width: 100% !important; }
          .embed-ig iframe { height: 660px !important; }

          /* 비교표 — 3컬럼 유지, 폭만 압축 */
          .ct-row { grid-template-columns: 1.4fr 0.85fr 1.15fr !important; }
          .ct-feat { font-size: 14px !important; padding-left: 14px !important; align-items: flex-start !important; word-break: keep-all !important; }
          .ct-plan { font-size: 14px !important; word-break: keep-all !important; line-height: 1.25 !important; text-align: center !important; }
          .ct-plan-sub { display: none !important; }
          .ct-reco { font-size: 9px !important; padding: 2px 8px !important; }
          .ct-cell { padding: 14px 5px !important; min-height: 54px !important; }
          /* 가격 행 — 세로 스택 + 줄바꿈 방지 */
          .ct-price-old { font-size: 15px !important; white-space: nowrap !important; }
          .ct-price-strike-old { font-size: 11px !important; white-space: nowrap !important; }
          .ct-price-now { flex-direction: column !important; gap: 4px !important; align-items: center !important; }
          .ct-price { font-size: 16px !important; white-space: nowrap !important; }
          .ct-off { font-size: 10px !important; padding: 2px 7px !important; }
          .ct-vat { font-size: 10px !important; }

          #change { padding: 72px 0 !important; }
          #products { padding: 72px 0 !important; }
          #process { padding: 64px 0 !important; }
          #faq { padding: 64px 0 !important; }
          #cta { padding: 64px 0 !important; }
          .cta-inner { padding: 48px 24px !important; border-radius: 20px !important; }
          #cta h2 { font-size: 28px !important; }
          /* 상시 플로팅 CTA가 최하단 footer를 가리지 않도록 여백 확보 */
          footer { padding-bottom: 104px !important; }
        }
      `}</style>
    </div>
  );
}

// ── 비교표: 기본 빌리투어 vs 빌리투어 글로벌 ──────────────────
function CompareTable() {
  const rows = [
    { name: '현장 룸투어 촬영',         basic: true,  isNew: false },
    { name: '전문 편집 · 업로드',       basic: true,  isNew: false },
    { name: '영어 자막 삽입',           basic: false, isNew: true },
    { name: '영어 자동번역 노출',       basic: false, isNew: true },
    { name: '영어 썸네일 제작',         basic: false, isNew: true },
    { name: '10~15초 하이라이트',       basic: false, isNew: true },
  ];
  return (
    <div className="ctable">
      <div className="ct-row ct-head">
        <div className="ct-cell ct-feat">구성 항목</div>
        <div className="ct-cell ct-basic-h">
          <span className="ct-plan">기본 빌리투어</span>
          <span className="ct-plan-sub">예전 구성</span>
        </div>
        <div className="ct-cell ct-global-h">
          <span className="ct-reco">RECOMMENDED</span>
          <span className="ct-plan">빌리투어 글로벌</span>
          <span className="ct-plan-sub">새로워진 구성</span>
        </div>
      </div>

      {rows.map((r, i) => (
        <div key={i} className="ct-row">
          <div className="ct-cell ct-feat">{r.name}</div>
          <div className="ct-cell">
            {r.basic
              ? <IconCheck size={26} color="#A0AEC0" />
              : <IconX size={24} color="#CBD2DA" />}
          </div>
          <div className="ct-cell ct-global">
            <IconCheck size={28} color="#2B85CC" />
            {r.isNew && <span className="ct-new">NEW</span>}
            {r.service && <span className="ct-service">무료 서비스</span>}
          </div>
        </div>
      ))}

      <div className="ct-row ct-price-row">
        <div className="ct-cell ct-feat">가격</div>
        <div className="ct-cell"><span className="ct-price-old">40만원</span></div>
        <div className="ct-cell ct-global">
          <span className="ct-price-strike-old">정가 50만원</span>
          <div className="ct-price-now">
            <span className="ct-price ct-price-hl">40만원</span>
            <span className="ct-off">20% OFF</span>
          </div>
          <span className="ct-vat">VAT 별도</span>
        </div>
      </div>
    </div>
  );
}

// ── 탭 콘텐츠: 빌리투어 글로벌 ───────────────────────────────
function GlobalPanel() {
  const feats = [
    { icon: <IconCamera size={30} />,   t: '현장 방문 촬영', d: '전문 장비로 투어 동선 그대로 룸투어 촬영', tag: '직접 방문' },
    { icon: <IconSubtitle size={30} />, t: '영어 자막',     d: '영상 전 구간에 검수된 영어 자막 삽입',     tag: '전 구간' },
    { icon: <IconGlobe size={30} />,    t: '제목·설명 영어 자동번역', d: '유튜브 언어를 영어로 설정한 시청자에겐 제목·설명이 영어로 노출', tag: '해외 도달' },
    { icon: <IconImage size={30} />,    t: '영어 썸네일',    d: '외국인 클릭을 부르는 전용 썸네일 제작',     tag: '클릭률↑' },
  ];
  return (
    <div>
      <div className="panel-head">
        <h3>룸투어 영상이 <span style={{ color: '#2B85CC' }}>세계로</span> 나갑니다</h3>
        <p>방문 촬영 → 편집 → 영어화까지 <strong>올인원</strong>으로 끝냅니다.<br />원장님은 방만 비워두시면 됩니다.</p>
      </div>

      {/* 미리보기 영상 */}
      <div className="prod-embed">
        <div className="prod-embed-label"><IconYoutube size={20} /> 실제 빌리투어 글로벌 영상</div>
        <div className="embed-yt">
          <iframe
            src="https://www.youtube.com/embed/nl4vO4i_dK4"
            title="빌리투어 글로벌 미리보기"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="gpanel-grid">
        {feats.map((f, i) => (
          <div key={i} className="gfeat">
            <div className="gfeat-ico" style={{ animation: `iconPop 0.5s ${i * 0.07}s cubic-bezier(0.34,1.56,0.64,1) both` }}>{f.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="gfeat-top">
                <span className="gfeat-title">{f.t}</span>
                <span className="gfeat-tag">{f.tag}</span>
              </div>
              <div className="gfeat-desc">{f.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="gprice-bar">
        <div>
          <div className="gprice-label">이 모든 구성을</div>
          <div className="gprice-strike">정가 500,000원</div>
        </div>
        <div className="gprice-now">
          <b>400,000</b>원
          <span>특별가 · VAT 별도</span>
        </div>
      </div>
    </div>
  );
}

// ── 탭 콘텐츠: 숏폼 패키지 ───────────────────────────────────
function ShortsPanel() {
  const benefits = [
    {
      icon: <IconTrendUp size={26} />,
      t: '동시 노출로 조회수 극대화',
      d: '조회수도, 방 문의도 함께 올라갑니다.',
    },
    {
      icon: <IconZap size={26} />,
      t: '트렌드 못 따라가도 OK',
      d: '기획·편집·업로드까지 전부 대행해 드려요.',
    },
    {
      icon: <IconSubtitle size={26} />,
      t: '외국어 자막 + 영상 원본 제공',
      d: '자막은 기본, 영상 원본도 그대로 드립니다.',
    },
  ];
  return (
    <div>
      <div className="panel-head">
        <span className="reshoot-badge"><IconRefresh size={18} /> 추가 촬영 필요 없음</span>
        <h3>터지는 <span style={{ color: '#2B85CC' }}>바이럴 릴스</span>, 대신 만들어 드립니다</h3>
        <p>기존 영상으로 트렌디한 숏폼을 만들어 <strong>유튜브·인스타에 동시 업로드</strong>까지 대행합니다.</p>
      </div>

      <div className="shorts-hero">
        {/* 미리보기 — 실제 바이럴 릴스 */}
        <div className="shorts-embed">
          <div className="embed-ig">
            <iframe
              src="https://www.instagram.com/p/DYT__Gzve1L/embed"
              title="빌리투어 숏폼 미리보기"
              frameBorder="0"
              scrolling="no"
              allowtransparency="true"
            />
          </div>
        </div>

        <div className="shorts-right">
          <div className="shorts-bignum">
            <b>10만+</b>
            <span>조회수 돌파한<br /><strong>실제 제작 릴스</strong></span>
          </div>

          <ul className="sbene-list">
            {benefits.map((b, i) => (
              <li key={i} className="sbene-item">
                <span className="sbene-ico">{b.icon}</span>
                <div>
                  <div className="sbene-t">{b.t}</div>
                  <div className="sbene-d">{b.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 동시 업로드 플랫폼 강조 */}
      <div className="shorts-platforms">
        <div className="sp-flow">
          <span className="sp-src"><IconZap size={26} /> 숏폼 제작</span>
          <span className="sp-arrow"><IconArrowRight size={26} /></span>
          <span className="sp-chip sp-yt"><IconYoutube size={30} /> YouTube</span>
          <span className="sp-plus">+</span>
          <span className="sp-chip sp-ig"><IconInstagram size={30} /> Instagram</span>
        </div>
        <div className="sp-note">한 번 제작으로 <b>두 채널 동시 업로드</b> — 노출도, 조회수도 두 배로</div>
      </div>
    </div>
  );
}

window.VariantA = VariantA;
