/* global React */

// ── 아이콘 (fill-only, viewBox 0 0 20 20, icon-design 스펙: solid fill·무 opacity·무 stroke) ──
// reels.html은 variant-a.jsx를 로드하지 않으므로 동일 이름 재정의 충돌 없음.
const RIconReels = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="16" height="16" rx="4.5" fill="currentColor"/>
    <path d="M2.4 6.5H17.6" stroke="#fff" strokeWidth="1.3"/>
    <path d="M6.6 2.3L9 6.3" stroke="#fff" strokeWidth="1.3"/>
    <path d="M11 2.3L13.4 6.3" stroke="#fff" strokeWidth="1.3"/>
    <path d="M8.4 9.3L13 11.8L8.4 14.3V9.3Z" fill="#fff"/>
  </svg>
);
const RIconZap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12 2L3.5 11.5H9L8 18L16.5 8.5H11L12 2Z" fill="currentColor"/>
  </svg>
);
const RIconRefresh = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 3.5a6.5 6.5 0 0 0-5.7 3.4H6.5a1 1 0 1 1 0 2H2.5a1 1 0 0 1-1-1V3.9a1 1 0 1 1 2 0v1.2A8.5 8.5 0 0 1 18.5 10a1 1 0 1 1-2 0A6.5 6.5 0 0 0 10 3.5Z"
      fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M3.5 10a1 1 0 0 1 1 1 6.5 6.5 0 0 0 11.2 4.5H13.5a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1V18a1 1 0 1 1-2 0v-1.2A8.5 8.5 0 0 1 2.5 11a1 1 0 0 1 1-1Z"
      fill="currentColor"/>
  </svg>
);
const RIconCheck = ({ size = 20, color = '#2B85CC' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M16.7 5.3a1.2 1.2 0 0 1 0 1.7l-8 8a1.2 1.2 0 0 1-1.7 0L3.3 11.3a1.2 1.2 0 0 1 1.7-1.7L8 12.7l7.1-7.1c.5-.5 1.2-.5 1.7 0z"
      fill={color}/>
  </svg>
);
const RIconX = ({ size = 18, color = '#B0B8C1' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M4.3 4.3a1.2 1.2 0 0 1 1.7 0L10 8.3l4-4a1.2 1.2 0 1 1 1.7 1.7L11.7 10l4 4a1.2 1.2 0 0 1-1.7 1.7L10 11.7l-4 4a1.2 1.2 0 0 1-1.7-1.7L8.3 10 4.3 6a1.2 1.2 0 0 1 0-1.7z"
      fill={color}/>
  </svg>
);
const RIconStar = ({ size = 24, color = '#E8B84B' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2L12.4 7.3L18.1 8L13.9 12L15 18L10 15L5 18L6.1 12L1.9 8L7.6 7.3L10 2Z" fill={color}/>
  </svg>
);
const RIconArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L15.6 11H3a1 1 0 1 1 0-2h12.6l-4.3-4.3a1 1 0 0 1 0-1.4z"
      fill="currentColor"/>
  </svg>
);
const RIconChat = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.8L3 18.5V15H4a2 2 0 0 1-2-2V4Z"
      fill="currentColor"/>
    <rect x="5" y="7" width="8" height="1.6" rx="0.8" fill="#fff"/>
    <rect x="5" y="10" width="5" height="1.6" rx="0.8" fill="#fff"/>
  </svg>
);
const RIconYoutube = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="18" height="10" rx="3" fill="#EF4452"/>
    <path d="M8.5 7.5L13.5 10L8.5 12.5V7.5Z" fill="#fff"/>
  </svg>
);
const RIconInstagram = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="17" height="17" rx="4.5" fill="currentColor"/>
    <circle cx="10" cy="10" r="4" fill="#fff"/>
    <circle cx="10" cy="10" r="2.1" fill="currentColor"/>
    <circle cx="14.6" cy="5.4" r="1.3" fill="#fff"/>
  </svg>
);
const RIconTrendUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M12.5 3h5.5a1 1 0 0 1 1 1v5.5a1 1 0 1 1-2 0V6.9l-6.5 6.5-3-3-5.3 5.2a1 1 0 0 1-1.4-1.4l6-5.9a1 1 0 0 1 1.4 0l3 3 5.8-5.8H12.5a1 1 0 1 1 0-2z"
      fill="currentColor"/>
  </svg>
);
const RIconSearch = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="6" fill="currentColor"/>
    <circle cx="8.5" cy="8.5" r="3.4" fill="#fff"/>
    <rect x="12.4" y="13" width="6.2" height="2.6" rx="1.3" transform="rotate(45 12.4 13)" fill="currentColor"/>
  </svg>
);
const RIconClock = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 4.8a1 1 0 0 1 1 1V9.6l2.5 1.5a1 1 0 1 1-1 1.7l-3-1.8a1 1 0 0 1-.5-.9V5.8a1 1 0 0 1 1-1z"
      fill="#fff"/>
  </svg>
);
const RIconAlert = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 1.5L19 17.5H1L10 1.5Z" fill="currentColor"/>
    <rect x="9" y="7" width="2" height="5" rx="1" fill="#fff"/>
    <circle cx="10" cy="14.4" r="1.1" fill="#fff"/>
  </svg>
);
const RIconUpload = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M14.2 8.6A4.5 4.5 0 1 0 6 10.1A3 3 0 0 0 6.5 16H13.5A2.5 2.5 0 0 0 14 11H13.6A4.5 4.5 0 0 0 14.2 8.6Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd"
      d="M10 4L6.8 8H9V13.5H11V8H13.2L10 4Z" fill="#fff"/>
  </svg>
);

const REELS_REQUEST_URL = 'https://gobangmkt.github.io/billytour_request/reels.html';

// ── 자체 Nav (릴스 브랜딩) ─────────────────────────────────────
function ReelsNav() {
  return (
    <nav className="nav rnav">
      <div className="container nav-inner">
        <a href="#rhero" className="nav-logo">
          <img src="assets/U_ALF.png" alt="U사장님" style={{ height: 32 }} />
          <span>빌리투어 <span className="rnav-accent">릴스</span></span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { label: '왜 릴스인가', href: '#rwhy' },
            { label: '서비스', href: '#rwhat' },
            { label: '가격', href: '#roffer' },
            { label: '진행 방식', href: '#rprocess' },
            { label: 'FAQ', href: '#rfaq' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: 'var(--border-input)', fontSize: 16, userSelect: 'none' }}>|</span>}
              <a href={item.href} className="nav-link-d" style={{
                fontSize: 15, fontWeight: 500, color: 'var(--fg-3)', padding: '4px 2px',
              }}>{item.label}</a>
            </React.Fragment>
          ))}
          <a href={REELS_REQUEST_URL} target="_blank" className="nav-cta" style={{ marginLeft: 6 }}>5만원 신청</a>
        </div>
      </div>
    </nav>
  );
}

// ── VARIANT REELS ─────────────────────────────────────────────
function VariantReels() {
  // 세로 릴스 프리뷰 — 스크롤 인터셉트로 한 번 흔들어 "재생 가능" 신호 (reduce-motion 존중)
  const phoneRef = React.useRef(null);
  const [tilt, setTilt] = React.useState(false);
  React.useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setTilt(true); setTimeout(() => setTilt(false), 1200); io.disconnect(); }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <ReelsNav />

      {/* 1. HERO */}
      <section id="rhero" className="rhero">
        <div className="rhero-bg" aria-hidden="true">
          <span className="rhero-blob rhero-blob--1" />
          <span className="rhero-blob rhero-blob--2" />
          <span className="rhero-grid" />
        </div>

        <div className="container rhero-inner">
          <div className="rhero-copy">
            <div className="rhero-badge">
              <span className="rhero-badge-dot" />
              기존 원장님 전용 · 초기 기념 50% 할인
            </div>

            <h1 className="rhero-h1">
              아직도 <span className="rh1-strike">한국어 영상 하나</span>로<br />
              방을 다 채울 수 있다고<br />
              생각하세요?
            </h1>

            <p className="rhero-sub">
              요즘 세입자는 <strong>릴스·숏츠로 방을 찾습니다.</strong><br />
              지금 안 하면, 옆 건물 원장님 릴스에 <strong>노출에서 밀립니다.</strong>
            </p>

            <div className="rhero-pricepill">
              <span className="rpp-strike">정가 100,000원</span>
              <span className="rpp-arrow"><RIconArrowRight size={18} /></span>
              <span className="rpp-now"><b>50,000</b>원</span>
              <span className="rpp-tag">50% OFF</span>
            </div>

            <div className="rhero-cta-row">
              <a href={REELS_REQUEST_URL} target="_blank" className="btn rhero-cta">
                지금 5만원에 릴스 만들기 <RIconArrowRight size={20} />
              </a>
              <span className="rhero-cta-note"><RIconRefresh size={15} /> 추가 촬영 없음 · 기존 영상 재활용</span>
            </div>
          </div>

          {/* 세로 릴스 폰 비주얼 */}
          <div className="rhero-visual">
            <div ref={phoneRef} className={`rphone ${tilt ? 'is-tilt' : ''}`}>
              <div className="rphone-notch" />
              <div className="rphone-screen">
                <video
                  className="rphone-video"
                  src="https://gobang-billytour.s3.ap-northeast-2.amazonaws.com/sample-reels.mp4"
                  poster="assets/U_ALF.png"
                  muted loop playsInline autoPlay
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="rphone-fallback" aria-hidden="true">
                  <span className="rphone-fb-ico"><RIconReels size={44} /></span>
                  <span className="rphone-fb-t">실제 제작 릴스</span>
                </div>
                <div className="rphone-ui">
                  <div className="rphone-ui-top"><RIconReels size={18} /> Reels</div>
                  <div className="rphone-ui-side">
                    <span className="rui-dot rui-dot--live" />
                    <span className="rui-count">12.4K</span>
                    <span className="rui-count">832</span>
                  </div>
                  <div className="rphone-ui-cap">@billytour · 내 방, 이렇게 보여집니다 🔥</div>
                </div>
              </div>
            </div>
            <span className="rhero-float rhero-float--yt"><RIconYoutube size={22} /> Shorts</span>
            <span className="rhero-float rhero-float--ig"><RIconInstagram size={20} /> Reels</span>
          </div>
        </div>
      </section>

      {/* 2. 공감·자극 (페인포인트) */}
      <section id="rpain" className="rpain">
        <div className="container">
          <div className="center-stack rpain-head">
            <span className="eyebrow rpain-eyebrow"><RIconAlert size={16} /> 지금 이대로면</span>
            <h2 className="section-h">
              블로그·플레이스만으론<br />
              <span className="r-accent">이제 안 보입니다</span>
            </h2>
          </div>

          <div className="rpain-grid">
            {[
              { ico: <RIconSearch size={30} />, t: '세입자는 더 이상 검색을 안 합니다', d: '플레이스·블로그를 뒤지는 대신, 피드를 넘기다 마음에 드는 방을 발견합니다.' },
              { ico: <RIconClock size={30} />, t: '한국어 영상 한 편은 한 번 보고 끝', d: '재생 한 번이면 노출이 끝납니다. 릴스는 알고리즘이 계속 다시 꺼내 보여줍니다.' },
              { ico: <RIconTrendUp size={30} />, t: '옆 건물 원장님은 이미 올리고 있습니다', d: '같은 동네, 같은 가격이면 결국 더 많이 보인 방이 먼저 나갑니다.' },
            ].map((c, i) => (
              <div key={i} className="rpain-card">
                <span className="rpain-ico">{c.ico}</span>
                <h3 className="rpain-t">{c.t}</h3>
                <p className="rpain-d">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="rpain-quote">
            <RIconAlert size={22} />
            <span>"한국어 영상만 올려둔 방"과 "릴스로 매일 노출되는 방". 세입자 눈에 먼저 띄는 건 후자입니다.</span>
          </div>
        </div>
      </section>

      {/* 3. 왜 릴스인가 (트렌드) */}
      <section id="rwhy" className="rwhy">
        <div className="container">
          <div className="center-stack rwhy-head">
            <span className="eyebrow rwhy-eyebrow">왜 지금 릴스인가</span>
            <h2 className="section-h rwhy-h">
              세입자의 눈은 이미<br />
              <span className="rwhy-accent">세로 화면</span>으로 옮겨갔습니다
            </h2>
          </div>

          <div className="rwhy-grid">
            {[
              { ico: <RIconTrendUp size={36} />, t: '숏폼 소비 급증', d: '사람들은 긴 영상보다 짧은 세로 영상을 압도적으로 더 오래, 더 자주 봅니다.' },
              { ico: <RIconZap size={36} />, t: '알고리즘이 릴스·Shorts를 밀어줍니다', d: '플랫폼이 숏폼 노출을 우대해, 팔로워가 적어도 새 시청자에게 도달합니다.' },
              { ico: <RIconReels size={36} />, t: '체류·도달에서 유리', d: '몰입형 세로 화면은 끝까지 보게 만들고, 그만큼 더 멀리 퍼져나갑니다.' },
            ].map((c, i) => (
              <div key={i} className="rwhy-card">
                <span className="rwhy-ico">{c.ico}</span>
                <h3 className="rwhy-t">{c.t}</h3>
                <p className="rwhy-d">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="rwhy-foot">
            <RIconStar size={18} /> 추세는 분명합니다 — 노출이 필요한 방일수록, 릴스가 먼저입니다.
          </p>
        </div>
      </section>

      {/* 4. 이게 다 됩니다 (상품 정의) */}
      <section id="rwhat" className="rwhat">
        <div className="container">
          <div className="center-stack rwhat-head">
            <span className="eyebrow">서비스 구성</span>
            <h2 className="section-h">기존 영상 하나로, <span className="r-accent">3채널 동시 노출</span></h2>
            <p className="section-sub">
              새로 찍을 필요 없습니다. <strong>이미 가진 빌리투어 영상</strong>을 트렌디한 릴스 1개로 재편집해<br />
              한 번에 세 곳으로 내보냅니다.
            </p>
          </div>

          {/* 플로우: 기존 영상 → 릴스 1개 → 3채널 */}
          <div className="rflow">
            <div className="rflow-step">
              <span className="rflow-ico"><RIconRefresh size={30} /></span>
              <div className="rflow-t">기존 빌리투어 영상</div>
              <div className="rflow-d">이미 찍어둔 영상 활용<br /><strong>추가 촬영 없음</strong></div>
            </div>
            <span className="rflow-arrow"><RIconArrowRight size={28} /></span>
            <div className="rflow-step is-mid">
              <span className="rflow-ico"><RIconReels size={30} /></span>
              <div className="rflow-t">트렌디한 릴스 1개</div>
              <div className="rflow-d">숏폼 문법으로 재편집<br />자막·후킹·BGM 포함</div>
            </div>
            <span className="rflow-arrow"><RIconArrowRight size={28} /></span>
            <div className="rflow-step is-multi">
              <span className="rflow-ico rflow-ico--wide">
                <RIconYoutube size={26} /><RIconInstagram size={24} />
              </span>
              <div className="rflow-t">3채널 동시 업로드</div>
              <div className="rflow-d">Shorts · 커뮤니티<br />+ 인스타 Reels</div>
            </div>
          </div>

          {/* 업로드 채널 칩 */}
          <div className="rchannels">
            <div className="rchannel-chip"><RIconYoutube size={26} /> YouTube Shorts</div>
            <div className="rchannel-chip"><RIconYoutube size={26} /> YouTube 커뮤니티</div>
            <div className="rchannel-chip rchip--ig"><RIconInstagram size={24} /> Instagram Reels</div>
          </div>

          <div className="rwhat-noshoot">
            <RIconRefresh size={18} /> <b>추가 촬영 0회.</b> 원장님은 기존 영상만 알려주시면, 나머지는 전부 저희가 합니다.
          </div>
        </div>
      </section>

      {/* 5. 가격 오퍼 */}
      <section id="roffer" className="roffer">
        <div className="container">
          <div className="center-stack roffer-head">
            <span className="eyebrow roffer-eyebrow"><RIconClock size={16} /> 초기 기념 · 한시 운영</span>
            <h2 className="section-h roffer-h">지금이 가장 <span className="roffer-accent">쌀 때</span>입니다</h2>
          </div>

          <div className="roffer-card">
            <div className="roffer-glow" aria-hidden="true" />
            <div className="roffer-inner">
              <span className="roffer-badge"><RIconReels size={18} /> 릴스 단건 · 기존 원장님 전용</span>
              <h3 className="roffer-title">릴스(숏폼) 1개 제작 + 3채널 업로드</h3>

              <div className="roffer-price">
                <span className="rop-strike">정가 100,000원</span>
                <div className="rop-now">
                  <b>50,000</b><span>원</span>
                </div>
                <span className="rop-tag">초기 기념 50% 할인 · VAT 별도</span>
              </div>

              <ul className="roffer-list">
                {[
                  '기존 영상 → 트렌디한 릴스 1개 재편집',
                  '후킹 자막 · 컷 편집 · BGM 포함',
                  'YouTube Shorts + 커뮤니티 업로드',
                  'Instagram Reels 동시 업로드',
                  '추가 촬영 없음 · 원장님 부담 0',
                ].map((t, i) => (
                  <li key={i} className="rop-li">
                    <span style={{ flexShrink: 0 }}><RIconCheck size={20} color="#2B85CC" /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <a href={REELS_REQUEST_URL} target="_blank" className="btn roffer-cta">
                5만원에 릴스 신청하기 <RIconArrowRight size={22} />
              </a>
              <div className="roffer-foot"><RIconClock size={15} /> 초기 기념 할인은 예고 없이 종료될 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 프로세스 */}
      <section id="rprocess" className="rprocess">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="center-stack rprocess-head">
            <span className="eyebrow">진행 방식</span>
            <h2 className="section-h">신청부터 업로드까지 6단계</h2>
            <p className="section-sub">
              <strong style={{ color: 'var(--fg-1)' }}>촬영 단계가 없습니다.</strong><br />
              기존 영상만 알려주시면 제작·업로드까지 전부 저희가 처리합니다.
            </p>
          </div>

          <div className="rproc-list">
            {[
              { n: 1, t: '신청', d: '릴스 신청 폼에 지점 정보와 기존 영상 링크를 입력해요.', tag: '원장님', mine: true },
              { n: 2, t: '담당자 확인', d: '담당자가 영상 확인 후 카카오톡으로 안내드려요.', tag: '빌리투어' },
              { n: 3, t: '결제', d: '안내받은 방법으로 5만원(VAT 별도) 결제 진행.', tag: '원장님', mine: true },
              { n: 4, t: '영상 확인', d: '재활용할 기존 영상과 강조 포인트를 함께 확정해요.', tag: '함께' },
              { n: 5, t: '릴스 제작', d: '숏폼 문법으로 자막·컷·BGM까지 트렌디하게 편집.', tag: '빌리투어' },
              { n: 6, t: '업로드 완료', d: 'Shorts·커뮤니티 + 인스타 Reels에 올린 뒤 링크를 전달드려요.', tag: '완료' },
            ].map((s, i) => (
              <div key={i} className="rproc-row">
                <div className="rproc-num">{s.n}</div>
                <div>
                  <div className="rproc-top">
                    <h3 className="rproc-t">{s.t}</h3>
                    <span className={`rproc-tag ${s.mine ? 'is-mine' : ''}`}>{s.tag}</span>
                  </div>
                  <p className="rproc-d">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="rfaq" className="rfaq">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="center-stack" style={{ marginBottom: 50 }}>
            <span className="eyebrow">자주 묻는 질문</span>
            <h2 className="section-h">신청 전에 확인해 주세요</h2>
          </div>
          <div className="rfaq-box">
            <FaqItem defaultOpen
              q="기존 빌리투어 영상이 없으면 신청할 수 없나요?"
              a="이 릴스 상품은 <strong>이미 촬영된 영상을 재활용</strong>하는 서비스라, 기존 영상이 있는 기존 원장님 전용이에요.<br />아직 영상이 없으시면 채널톡으로 문의 주시면 촬영부터 안내드릴게요." />
            <FaqItem
              q="어떤 영상이든 릴스로 만들 수 있나요?"
              a="네, <strong>기존 빌리투어 룸투어 영상</strong>이면 충분합니다.<br />그중 가장 보여주고 싶은 포인트를 골라 숏폼 문법으로 재편집해 드려요.<br />영상 상태에 따라 강조 포인트는 담당자가 함께 잡아드립니다." />
            <FaqItem
              q="추가 비용이 더 드나요?"
              a="아니요. <strong>5만원(VAT 별도) 한 번</strong>으로 릴스 1개 제작과 3채널 업로드까지 모두 포함입니다.<br />추가 촬영이 없으니 촬영비도 들지 않아요." />
            <FaqItem
              q="어디에 올라가나요?"
              a="한 번 제작으로 <strong>YouTube Shorts · YouTube 커뮤니티 · Instagram Reels</strong> 세 곳에 동시 업로드됩니다.<br />업로드 후 각 링크를 전달드려요." />
            <FaqItem
              q="기존 원장님 기준은 무엇인가요?"
              a="이전에 빌리투어 촬영·편집 서비스를 <strong>한 번 이상 이용</strong>하신 원장님이라면 모두 해당됩니다.<br />정확한 대상 여부는 담당자 확인 단계에서 안내드려요." />
          </div>
        </div>
      </section>

      {/* 8. Footer CTA */}
      <section id="rcta" className="rcta-sec">
        <div className="container">
          <div className="rcta-inner">
            <span className="rcta-deco" aria-hidden="true"><RIconReels size={150} /></span>
            <div className="rcta-content">
              <div className="rcta-eyebrow">기존 원장님 단독 · 초기 기념 50%</div>
              <h2 className="rcta-h">
                옆 건물보다 먼저,<br />
                <span className="rcta-accent">내 방을 릴스로 보여주세요.</span>
              </h2>
              <p className="rcta-sub">
                기존 영상 그대로, 추가 촬영 없이 — 단돈 <strong className="rcta-price">50,000원</strong>
                <span className="rcta-vat"> (VAT 별도)</span>
              </p>
              <a href={REELS_REQUEST_URL} target="_blank" className="btn btn-lg rcta-btn">
                지금 릴스로 노출 시작하기 <RIconArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 채널톡 배너 */}
      <section className="rchannel-banner">
        <div className="container">
          <div className="rcb-ico"><RIconChat size={22} /></div>
          <h2 className="rcb-h">궁금한 점이 있으신가요?</h2>
          <p className="rcb-p">릴스 제작, 어떤 영상이 되는지 무엇이든 편하게 물어보세요.</p>
          <a href={CHANNEL_URL} target="_blank" className="rcb-btn">
            <RIconChat size={20} /> 채널톡으로 문의하기
          </a>
        </div>
      </section>

      {/* 상시 플로팅 CTA */}
      <div className="float-cta-wrap">
        <span className="float-cta-badge"><RIconReels size={16} /> 초기 기념 50% · 기존 원장님 전용</span>
        <a href={REELS_REQUEST_URL} target="_blank" className="float-cta">
          5만원에 릴스 신청하기 <RIconArrowRight size={22} />
        </a>
      </div>

      {/* Footer */}
      <footer className="rfooter">
        <div className="container">
          <div className="rfooter-brand">
            <img src="assets/U_ALF.png" alt="U사장님" style={{ height: 28 }} />
            <span>U사장님 · neoflatMKT</span>
          </div>
          <p className="rfooter-p">
            빌리투어 릴스 — 기존 원장님 초기 기념 이벤트 페이지입니다.<br />
            문의: <a href={CHANNEL_URL} target="_blank" className="rfooter-link">채널톡 바로가기</a>
          </p>
          <div className="rfooter-copy">© 2026 neoflatMKT. All rights reserved.</div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ctaPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(43,133,204,0.4); } 50% { box-shadow: 0 0 0 14px rgba(43,133,204,0); } }
        @keyframes gemFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes iconPop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes blobDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-30px) scale(1.08); } }
        @keyframes livePulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.45; } }
        @keyframes phoneTilt { 0% { transform: rotate(-4deg); } 30% { transform: rotate(2deg); } 60% { transform: rotate(-1.5deg); } 100% { transform: rotate(-4deg); } }
        @keyframes floatChipY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatChipI { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

        /* ── Nav 릴스 강조 ── */
        .rnav-accent {
          color: #2B85CC;
          background: linear-gradient(135deg, #2B85CC, #1A3A6B);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── HERO ── */
        .rhero { position: relative; overflow: hidden; padding: 86px 0 100px;
          background: linear-gradient(170deg, #0D2545 0%, #16345F 46%, #1A3A6B 100%); }
        .rhero-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .rhero-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.5; }
        .rhero-blob--1 { width: 460px; height: 460px; top: -120px; right: -80px;
          background: radial-gradient(circle, #2B85CC, transparent 70%); animation: blobDrift 9s ease-in-out infinite; }
        .rhero-blob--2 { width: 380px; height: 380px; bottom: -140px; left: -60px;
          background: radial-gradient(circle, #E8B84B, transparent 70%); opacity: 0.22; animation: blobDrift 11s ease-in-out infinite reverse; }
        .rhero-grid { position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 48px 48px; mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 75%); }
        .rhero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; }

        .rhero-badge { display: inline-flex; align-items: center; gap: 8px;
          background: rgba(232,184,75,0.16); color: #F0C964; padding: 8px 17px; border-radius: 100px;
          font-size: 15px; font-weight: 700; letter-spacing: 0.2px; margin-bottom: 24px;
          border: 1px solid rgba(232,184,75,0.3); animation: fadeInUp 0.5s 0.05s ease both; }
        .rhero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #E8B84B; flex-shrink: 0; animation: livePulse 2s ease-in-out infinite; }

        .rhero-h1 { font-size: 56px; font-weight: 900; line-height: 1.2; letter-spacing: -1.4px;
          word-break: keep-all; color: #fff; margin-bottom: 24px; animation: fadeInUp 0.5s 0.12s ease both; }
        .rh1-strike { position: relative; color: rgba(255,255,255,0.55); }
        .rh1-strike::after { content: ''; position: absolute; left: -2px; right: -2px; top: 54%; height: 4px;
          background: #E8B84B; transform: rotate(-1.5deg); border-radius: 4px; }

        .rhero-sub { font-size: 22px; color: rgba(255,255,255,0.82); line-height: 1.6; word-break: keep-all;
          margin-bottom: 30px; font-weight: 500; animation: fadeInUp 0.5s 0.22s ease both; }
        .rhero-sub strong { color: #fff; font-weight: 800; }

        .rhero-pricepill { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.16);
          padding: 12px 20px; border-radius: 100px; margin-bottom: 30px; animation: fadeInUp 0.5s 0.3s ease both; }
        .rpp-strike { font-size: 18px; color: rgba(255,255,255,0.5); text-decoration: line-through;
          text-decoration-thickness: 2px; text-decoration-color: rgba(255,255,255,0.5); }
        .rpp-arrow { color: #64C2F5; display: flex; }
        .rpp-now { display: flex; align-items: baseline; color: #fff; }
        .rpp-now b { font-size: 34px; font-weight: 900; letter-spacing: -1px; }
        .rpp-now span { font-size: 18px; font-weight: 700; margin-left: 2px; }
        .rpp-tag { font-size: 14px; font-weight: 900; color: #1A3A6B; background: #E8B84B; padding: 5px 12px; border-radius: 100px; letter-spacing: 0.3px; }

        .rhero-cta-row { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; animation: fadeInUp 0.5s 0.38s ease both; }
        .rhero-cta { background: linear-gradient(135deg, #2B85CC 0%, #64C2F5 100%); color: #fff;
          font-size: 21px; font-weight: 800; padding: 20px 40px; border-radius: 100px;
          box-shadow: 0 14px 38px rgba(43,133,204,0.45); animation: ctaPulse 2.6s 0.6s ease infinite; }
        .rhero-cta:hover { transform: translateY(-2px); }
        .rhero-cta-note { display: inline-flex; align-items: center; gap: 7px; font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .rhero-cta-note svg { color: #64C2F5; }

        /* ── HERO 폰 비주얼 ── */
        .rhero-visual { position: relative; display: flex; justify-content: center; animation: fadeInUp 0.6s 0.3s ease both; }
        .rphone { position: relative; width: 246px; aspect-ratio: 9/19; border-radius: 36px;
          background: #0A1A30; padding: 9px; transform: rotate(-4deg);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 1.5px rgba(255,255,255,0.06);
          transition: transform 0.5s cubic-bezier(0.34,1.3,0.5,1); }
        .rphone:hover { transform: rotate(0deg) scale(1.02); }
        .rphone.is-tilt { animation: phoneTilt 1.2s cubic-bezier(0.45,0,0.25,1); }
        .rphone-notch { position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
          width: 64px; height: 6px; border-radius: 100px; background: rgba(255,255,255,0.18); z-index: 3; }
        .rphone-screen { position: relative; width: 100%; height: 100%; border-radius: 28px; overflow: hidden;
          background: linear-gradient(180deg, #1A3A6B, #2B85CC); }
        .rphone-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
        .rphone-fallback { position: absolute; inset: 0; z-index: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px; color: rgba(255,255,255,0.92);
          background: linear-gradient(160deg, #1A3A6B, #2B85CC 70%, #64C2F5); }
        .rphone-fb-ico { animation: gemFloat 3.4s ease-in-out infinite; }
        .rphone-fb-t { font-size: 16px; font-weight: 700; letter-spacing: 0.3px; }
        .rphone-ui { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .rphone-ui-top { position: absolute; top: 30px; left: 16px; display: flex; align-items: center; gap: 6px;
          color: #fff; font-size: 14px; font-weight: 800; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
        .rphone-ui-side { position: absolute; right: 12px; bottom: 64px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .rui-dot { width: 30px; height: 30px; border-radius: 50%; }
        .rui-dot--live { background: #EF4452; box-shadow: 0 0 0 0 rgba(239,68,82,0.6); animation: livePulse 1.8s ease-in-out infinite; }
        .rui-count { color: #fff; font-size: 12px; font-weight: 700; text-shadow: 0 1px 4px rgba(0,0,0,0.5); }
        .rphone-ui-cap { position: absolute; left: 14px; right: 50px; bottom: 18px; color: #fff; font-size: 13px;
          font-weight: 700; line-height: 1.4; text-shadow: 0 1px 6px rgba(0,0,0,0.5); }

        .rhero-float { position: absolute; display: inline-flex; align-items: center; gap: 7px;
          background: #fff; border-radius: 100px; padding: 10px 16px; font-size: 15px; font-weight: 800; color: #1A3A6B;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25); }
        .rhero-float--yt { top: 18px; left: 0; animation: floatChipY 3.4s ease-in-out infinite; }
        .rhero-float--yt svg { color: #EF4452; }
        .rhero-float--ig { bottom: 40px; right: -6px; animation: floatChipI 3.8s ease-in-out infinite; }
        .rhero-float--ig svg { color: #C13584; }

        /* ── 공통 accent ── */
        .r-accent { color: #2B85CC; }

        /* ── 2. 페인포인트 ── */
        .rpain { padding: 100px 0; background: #fff; }
        .rpain-head { margin: 0 auto 52px; max-width: 760px; }
        .rpain-eyebrow { display: inline-flex; align-items: center; gap: 7px; color: #C0392B; background: #FBEAE7; }
        .rpain-eyebrow svg { color: #E05a4a; }
        .rpain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .rpain-card { background: #F4F8FC; border-radius: 20px; padding: 34px 28px; border: 1px solid var(--border-divider);
          transition: transform 0.18s, box-shadow 0.18s; }
        .rpain-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(26,58,107,0.12); }
        .rpain-ico { display: inline-flex; align-items: center; justify-content: center; width: 58px; height: 58px;
          border-radius: 16px; background: linear-gradient(135deg, #1A3A6B, #2B85CC); color: #fff; margin-bottom: 18px; }
        .rpain-t { font-size: 21px; font-weight: 800; color: var(--fg-1); line-height: 1.35; word-break: keep-all; margin-bottom: 12px; }
        .rpain-d { font-size: 17px; color: var(--fg-3); line-height: 1.7; word-break: keep-all; }
        .rpain-quote { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 30px;
          padding: 24px 30px; border-radius: 16px; background: linear-gradient(135deg, #FDF6E3, #FBF1D5);
          border-left: 4px solid #E8B84B; }
        .rpain-quote svg { color: #B0801E; flex-shrink: 0; }
        .rpain-quote span { font-size: 19px; font-weight: 700; color: #6B5414; line-height: 1.6; word-break: keep-all; }

        /* ── 3. 왜 릴스인가 ── */
        .rwhy { padding: 96px 0; background: #1A3A6B; position: relative; overflow: hidden; }
        .rwhy::before { content: ''; position: absolute; top: -100px; right: -100px; width: 360px; height: 360px;
          border-radius: 50%; background: radial-gradient(circle, rgba(100,194,245,0.18), transparent 70%); }
        .rwhy-head { margin: 0 auto 52px; max-width: 720px; position: relative; }
        .rwhy-eyebrow { background: rgba(100,194,245,0.16); color: #64C2F5; }
        .rwhy-h { color: #fff; font-size: 40px; }
        .rwhy-accent { color: #64C2F5; }
        .rwhy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; position: relative; }
        .rwhy-card { background: rgba(255,255,255,0.08); border-radius: 20px; padding: 36px 28px;
          border: 1px solid rgba(255,255,255,0.08); transition: background 0.18s, transform 0.18s; }
        .rwhy-card:hover { background: rgba(255,255,255,0.13); transform: translateY(-3px); }
        .rwhy-ico { display: inline-flex; color: #64C2F5; margin-bottom: 16px; }
        .rwhy-t { font-size: 21px; font-weight: 800; color: #fff; line-height: 1.35; word-break: keep-all; margin-bottom: 12px; }
        .rwhy-d { font-size: 17px; color: rgba(255,255,255,0.72); line-height: 1.7; word-break: keep-all; }
        .rwhy-foot { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
          margin-top: 34px; text-align: center; font-size: 19px; font-weight: 700; color: #E8B84B; word-break: keep-all; position: relative; }

        /* ── 4. 상품 정의 ── */
        .rwhat { padding: 104px 0; background: #fff; }
        .rwhat-head { margin: 0 auto 48px; max-width: 800px; }
        .rflow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 12px; align-items: center;
          max-width: 920px; margin: 0 auto 32px; }
        .rflow-step { background: #F4F8FC; border-radius: 20px; padding: 32px 18px; text-align: center; border: 1px solid var(--border-divider); }
        .rflow-step.is-mid { background: linear-gradient(180deg, #1A3A6B, #2B85CC); border: none; box-shadow: 0 14px 34px rgba(43,133,204,0.3); }
        .rflow-step.is-mid .rflow-t { color: #fff; }
        .rflow-step.is-mid .rflow-d { color: rgba(255,255,255,0.85); }
        .rflow-step.is-mid .rflow-d strong { color: #fff; }
        .rflow-step.is-mid .rflow-ico { background: rgba(255,255,255,0.2); }
        .rflow-step.is-multi .rflow-d { color: var(--fg-3); }
        .rflow-ico { width: 60px; height: 60px; margin: 0 auto 14px; border-radius: 16px; display: flex; align-items: center;
          justify-content: center; gap: 4px; background: linear-gradient(135deg, #1A3A6B, #2B85CC); color: #fff; }
        .rflow-ico--wide { width: auto; padding: 0 18px; }
        .rflow-t { font-size: 21px; font-weight: 800; color: var(--fg-1); margin-bottom: 8px; word-break: keep-all; }
        .rflow-d { font-size: 16px; color: var(--fg-3); line-height: 1.55; word-break: keep-all; }
        .rflow-d strong { color: #2B85CC; }
        .rflow-arrow { color: #2B85CC; display: flex; justify-content: center; }

        .rchannels { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 28px; }
        .rchannel-chip { display: inline-flex; align-items: center; gap: 9px; font-size: 18px; font-weight: 800; color: var(--fg-1);
          background: #fff; border: 1px solid var(--border-input); padding: 12px 22px; border-radius: 100px;
          box-shadow: 0 4px 16px rgba(26,58,107,0.08); }
        .rchannel-chip svg { color: #EF4452; }
        .rchip--ig svg { color: #C13584; }

        .rwhat-noshoot { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
          max-width: 880px; margin: 0 auto; text-align: center; padding: 22px 28px; border-radius: 16px;
          background: linear-gradient(135deg, #EEF5FC, #E3F0FB); font-size: 19px; font-weight: 700; color: var(--fg-1); word-break: keep-all; }
        .rwhat-noshoot svg { color: #2B85CC; flex-shrink: 0; }
        .rwhat-noshoot b { color: #1A3A6B; }

        /* ── 5. 가격 오퍼 ── */
        .roffer { padding: 100px 0; background: var(--bg-app); }
        .roffer-head { margin: 0 auto 44px; max-width: 720px; }
        .roffer-eyebrow { display: inline-flex; align-items: center; gap: 7px; }
        .roffer-eyebrow svg { color: #2B85CC; }
        .roffer-accent { color: #2B85CC; }
        .roffer-card { position: relative; max-width: 640px; margin: 0 auto; border-radius: 28px; overflow: hidden;
          background: linear-gradient(180deg, #fff 0%, #F4F9FF 100%); border: 2.5px solid #2B85CC;
          box-shadow: 0 22px 56px rgba(43,133,204,0.2); }
        .roffer-glow { position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(43,133,204,0.16), transparent 70%); pointer-events: none; }
        .roffer-inner { position: relative; padding: 44px 44px 40px; }
        .roffer-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; color: #1A3A6B;
          background: #E3F0FB; padding: 9px 18px; border-radius: 100px; margin-bottom: 20px; }
        .roffer-title { font-size: 28px; font-weight: 900; color: var(--fg-1); letter-spacing: -0.6px; line-height: 1.3; word-break: keep-all; margin-bottom: 24px; }

        .roffer-price { display: flex; flex-direction: column; align-items: flex-start; gap: 6px;
          padding: 26px 30px; margin-bottom: 28px; background: linear-gradient(135deg, #1A3A6B, #2B85CC); border-radius: 20px; color: #fff; }
        .rop-strike { font-size: 19px; text-decoration: line-through; text-decoration-thickness: 2px; opacity: 0.72; }
        .rop-now { display: flex; align-items: baseline; }
        .rop-now b { font-size: 64px; font-weight: 900; letter-spacing: -3px; line-height: 1; }
        .rop-now span { font-size: 28px; font-weight: 700; margin-left: 4px; }
        .rop-tag { font-size: 15px; font-weight: 800; color: #1A3A6B; background: #E8B84B; padding: 6px 15px; border-radius: 100px; margin-top: 10px; }

        .roffer-list { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px; }
        .rop-li { display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 600; color: var(--fg-1); word-break: keep-all; }

        .roffer-cta { width: 100%; justify-content: center; background: linear-gradient(135deg, #1A3A6B 0%, #2B85CC 100%);
          color: #fff; font-size: 22px; font-weight: 800; padding: 22px 0; border-radius: 16px; animation: ctaPulse 2.6s 0.5s ease infinite; }
        .roffer-cta:hover { transform: translateY(-2px); }
        .roffer-foot { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 16px;
          font-size: 14px; font-weight: 600; color: var(--fg-3); word-break: keep-all; }
        .roffer-foot svg { color: #B0801E; flex-shrink: 0; }

        /* ── 6. 프로세스 ── */
        .rprocess { padding: 100px 0; background: #fff; }
        .rprocess-head { margin-bottom: 56px; }
        .rproc-list { display: flex; flex-direction: column; gap: 12px; }
        .rproc-row { display: grid; grid-template-columns: 56px 1fr; gap: 20px; align-items: flex-start;
          padding: 24px 28px; background: #F4F8FC; border-radius: 16px; }
        .rproc-num { width: 46px; height: 46px; border-radius: 50%; background: #1A3A6B; color: #fff; display: flex;
          align-items: center; justify-content: center; font-size: 18px; font-weight: 800; flex-shrink: 0; }
        .rproc-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
        .rproc-t { font-size: 22px; font-weight: 700; color: var(--fg-1); }
        .rproc-tag { font-size: 15px; font-weight: 700; color: #2B85CC; background: rgba(43,133,204,0.12); padding: 4px 12px; border-radius: 100px; }
        .rproc-tag.is-mine { color: #1A3A6B; background: rgba(26,58,107,0.1); }
        .rproc-d { font-size: 17px; color: var(--fg-3); line-height: 1.7; word-break: keep-all; }

        /* ── 7. FAQ ── */
        .rfaq { padding: 100px 0; background: var(--bg-app); }
        .rfaq-box { background: #fff; border-radius: 18px; padding: 8px 30px; box-shadow: 0 6px 26px rgba(26,58,107,0.07); }

        /* ── 8. Footer CTA ── */
        .rcta-sec { padding: 100px 0; background: #fff; }
        .rcta-inner { position: relative; overflow: hidden; border-radius: 28px; padding: 72px 48px; text-align: center;
          background: linear-gradient(135deg, #0D2545 0%, #1A3A6B 42%, #2B85CC 100%); color: #fff; }
        .rcta-deco { position: absolute; right: 48px; top: 50%; transform: translateY(-50%); opacity: 0.1; color: #fff;
          animation: gemFloat 4s ease-in-out infinite; }
        .rcta-content { position: relative; z-index: 1; }
        .rcta-eyebrow { font-size: 15px; font-weight: 700; letter-spacing: 1.5px; opacity: 0.72; margin-bottom: 18px; text-transform: uppercase; }
        .rcta-h { font-size: 42px; font-weight: 900; line-height: 1.25; letter-spacing: -0.8px; word-break: keep-all; margin-bottom: 16px; }
        .rcta-accent { color: #64C2F5; }
        .rcta-sub { font-size: 21px; opacity: 0.92; margin-bottom: 36px; font-weight: 600; line-height: 1.6; }
        .rcta-price { color: #E8B84B; font-weight: 900; font-size: 26px; }
        .rcta-vat { font-size: 15px; opacity: 0.7; font-weight: 500; }
        .rcta-btn { background: #fff; color: #1A3A6B; font-weight: 900; gap: 8px; font-size: 21px; padding: 20px 52px;
          animation: ctaPulse 2.6s 0.5s ease infinite; }
        .rcta-btn:hover { transform: translateY(-2px); }

        /* ── 채널톡 배너 ── */
        .rchannel-banner { padding: 64px 0; background: var(--bg-app); border-top: 1px solid var(--border-input); text-align: center; }
        .rcb-ico { width: 52px; height: 52px; margin: 0 auto 12px; border-radius: 50%; background: linear-gradient(135deg, #1A3A6B, #2B85CC);
          display: flex; align-items: center; justify-content: center; color: #fff; }
        .rcb-h { font-size: 30px; font-weight: 800; color: var(--fg-1); margin-bottom: 10px; word-break: keep-all; }
        .rcb-p { font-size: 19px; color: var(--fg-3); line-height: 1.7; margin-bottom: 32px; word-break: keep-all; }
        .rcb-btn { display: inline-flex; align-items: center; gap: 10px; background: #1A3A6B; color: #fff; padding: 16px 32px;
          border-radius: 14px; font-size: 17px; font-weight: 800; box-shadow: 0 4px 18px rgba(26,58,107,0.28); transition: transform 0.15s, box-shadow 0.15s; }
        .rcb-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,58,107,0.36); }

        /* ── Footer ── */
        .rfooter { background: var(--bg-app); padding: 48px 0 36px; border-top: 1px solid var(--border-input); }
        .rfooter-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; font-size: 15px; font-weight: 700; color: var(--fg-1); }
        .rfooter-p { font-size: 16px; color: var(--fg-3); line-height: 1.7; max-width: 520px; }
        .rfooter-link { color: var(--primary-400); font-weight: 600; }
        .rfooter-copy { margin-top: 24px; font-size: 14px; color: var(--fg-4); }

        /* ── 상시 플로팅 CTA ── */
        .float-cta-wrap { position: fixed; left: 0; right: 0; bottom: 26px; z-index: 90;
          display: flex; flex-direction: column; align-items: center; gap: 11px; pointer-events: none; animation: floatIn 0.5s 0.8s ease both; }
        .float-cta-badge { pointer-events: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 16px; font-weight: 800;
          color: #1A3A6B; background: #fff; padding: 9px 18px; border-radius: 100px; box-shadow: 0 6px 20px rgba(26,58,107,0.18); }
        .float-cta-badge svg { color: #2B85CC; }
        .float-cta { pointer-events: auto; display: inline-flex; align-items: center; gap: 12px; padding: 23px 56px; border-radius: 100px;
          background: linear-gradient(135deg, #1A3A6B 0%, #2B85CC 100%); box-shadow: 0 14px 38px rgba(26,58,107,0.42);
          color: #fff; font-size: 24px; font-weight: 800; letter-spacing: -0.3px; animation: floatBob 3.2s 1.4s ease-in-out infinite;
          transition: transform 0.16s, box-shadow 0.16s; }
        .float-cta:hover { transform: translateY(-3px); box-shadow: 0 18px 46px rgba(26,58,107,0.5); }

        @media (max-width: 880px) {
          .rhero-inner { grid-template-columns: 1fr; gap: 44px; }
          .rhero-copy { text-align: center; }
          .rhero-cta-row { align-items: center; }
          .rhero-pricepill { justify-content: center; }
          .rhero-visual { order: -1; }
        }

        @media (max-width: 640px) {
          .rhero { padding: 60px 0 76px; }
          .rhero-h1 { font-size: 34px; letter-spacing: -1px; }
          .rhero-sub { font-size: 18px; }
          .rphone { width: 210px; }

          .rpain { padding: 72px 0; }
          .rpain-grid { grid-template-columns: 1fr; }

          .rwhy { padding: 72px 0; }
          .rwhy-h { font-size: 30px; }
          .rwhy-grid { grid-template-columns: 1fr; }
          .rwhy-foot { font-size: 17px; }

          .rwhat { padding: 72px 0; }
          .rflow { grid-template-columns: 1fr; }
          .rflow-arrow { transform: rotate(90deg); }
          .rwhat-noshoot { font-size: 17px; }

          .roffer { padding: 72px 0; }
          .roffer-inner { padding: 32px 24px 30px; }
          .roffer-title { font-size: 23px; }
          .rop-now b { font-size: 52px; }
          .rop-li { font-size: 16px; }

          .rprocess { padding: 64px 0; }
          .rfaq { padding: 64px 0; }
          .rfaq-box { padding: 4px 22px; }

          .rcta-sec { padding: 64px 0; }
          .rcta-inner { padding: 48px 24px; border-radius: 20px; }
          .rcta-h { font-size: 28px; }
          .rcta-sub { font-size: 18px; }

          .float-cta-wrap { left: 12px; right: 12px; bottom: 12px; }
          .float-cta { width: 100%; justify-content: center; padding: 16px 0; border-radius: 16px; font-size: 18px; animation: none; }
          .float-cta-badge { font-size: 13px; }
          .rfooter { padding-bottom: 104px; }
        }
      `}</style>
    </div>
  );
}

window.VariantReels = VariantReels;
