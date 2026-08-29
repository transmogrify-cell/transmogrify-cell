<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Himanshu Chandela — Software Engineer & Competitive Programmer</title>
<meta name="description" content="Portfolio of Himanshu Chandela — Software Engineer, Competitive Programmer, B.Tech IT @ NSUT.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#C9C6BC;
    --bg-panel:#BEBBB1;
    --cream:#F4F1E8;
    --ink:#211F1A;
    --ink-soft:#5C594F;
    --ink-faint:#88857A;
    --yellow:#EDD22E;
    --dark:#1B1A16;
    --border:rgba(33,31,26,0.16);
    --border-strong:rgba(33,31,26,0.3);
    --display:'Big Shoulders Display', sans-serif;
    --mono:'JetBrains Mono', ui-monospace, monospace;
    --sans:'Inter', sans-serif;
    --topbar-h:64px;
    --sidebar-w:230px;
    --ticker-h:38px;
  }

  *,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; }
  @media (prefers-reduced-motion: reduce){
    html{ scroll-behavior:auto; }
    *{ animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
  }

  body{
    background:var(--bg); color:var(--ink); font-family:var(--sans);
    -webkit-font-smoothing:antialiased;
    position: relative;
  }
  
  /* --- UI TOUCH 1: SVG Noise Overlay for tactile feel --- */
  body::after {
    content: "";
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.04; pointer-events: none; z-index: 999;
  }

  /* --- UI TOUCH 2: Custom Scrollbar --- */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg); border-left: 1px solid var(--border-strong); }
  ::-webkit-scrollbar-thumb { background: var(--ink-soft); }
  ::-webkit-scrollbar-thumb:hover { background: var(--ink); }

  a{ color:inherit; text-decoration:none; }
  ul{ list-style:none; }
  img{ max-width:100%; display:block; }
  ::selection{ background:var(--yellow); color:var(--ink); }
  a:focus-visible, button:focus-visible{ outline:2px solid var(--ink); outline-offset:2px; }

  .mono{ font-family:var(--mono); }

  /* ================= TOPBAR ================= */
  .topbar{
    position:fixed; top:0; left:0; right:0; height:var(--topbar-h); z-index:300;
    display:flex; align-items:center; justify-content:space-between;
    padding:0 28px; border-bottom:1px solid var(--border-strong);
    background:var(--bg);
  }
  .tb-left{ display:flex; align-items:center; gap:36px; }
  .logo{ font-family:var(--mono); font-weight:700; font-size:15px; letter-spacing:0.02em; }
  .tag-row{ font-family:var(--mono); font-size:11px; letter-spacing:0.08em; color:var(--yellow); background:var(--dark); padding:5px 10px; }
  .tag-row span{ color:#8f8b7c; }
  .coords{ font-family:var(--mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.03em; display:none; }

  .tb-right{ display:flex; align-items:center; gap:28px; }
  .status-block{ font-family:var(--mono); font-size:10.5px; color:var(--ink-soft); text-align:right; line-height:1.5; display:none; }
  .status-block b{ color:var(--ink); }
  .status-block .live{ color:#7a8f4e; font-weight:700; }
  .menu-btn{
    width:38px; height:38px; border-radius:50%; background:var(--yellow); border:none;
    font-family:var(--mono); font-size:9.5px; font-weight:700; letter-spacing:0.02em; cursor:pointer;
    display:flex; align-items:center; justify-content:center; color:var(--ink);
    transition:transform .2s ease, box-shadow .2s ease;
  }
  .menu-btn:hover{ transform:translateY(-2px); box-shadow: 0 4px 0 var(--ink); }

  /* ================= SIDEBAR ================= */
  .sidebar{
    position:fixed; top:var(--topbar-h); left:0; bottom:var(--ticker-h); width:var(--sidebar-w); z-index:250;
    border-right:1px solid var(--border-strong); padding:32px 26px; overflow-y:auto;
    display:flex; flex-direction:column; background:var(--bg);
  }
  .sb-desc{ font-family:var(--mono); font-size:10.5px; line-height:1.7; color:var(--ink-soft); letter-spacing:0.02em; text-transform:uppercase; }
  .sb-hex{ margin:22px 0 40px; }
  .sb-nav{ display:flex; flex-direction:column; gap:26px; }
  .sb-nav a{
    font-family:var(--mono); font-size:12.5px; letter-spacing:0.03em; color:var(--ink);
    display:flex; align-items:center; justify-content:space-between; transition:color .2s ease;
  }
  .sb-nav a:hover{ color:var(--ink-soft); }
  .sb-nav a .plus{ color:var(--yellow); font-weight:700; -webkit-text-stroke:0.5px var(--ink); transition:transform .2s ease; }
  .sb-nav a:hover .plus{ transform: rotate(90deg); } /* UI Touch: Rotate plus on hover */
  .sb-foot{ margin-top:auto; font-family:var(--mono); font-size:10px; color:var(--ink-faint); line-height:1.8; }

  .navtoggle{ display:none; }

  /* ================= TICKER ================= */
  .ticker{
    position:fixed; bottom:0; left:0; right:0; height:var(--ticker-h); z-index:300;
    border-top:1px solid var(--border-strong); background:var(--dark); overflow:hidden;
    display:flex; align-items:center;
  }
  .ticker-track{
    display:flex; gap:48px; white-space:nowrap; font-family:var(--mono); font-size:11px; color:#B9B6AA;
    animation:tickerScroll 32s linear infinite; padding-left:100%;
  }
  .ticker-track b{ color:var(--yellow); }
  @keyframes tickerScroll{ to{ transform:translateX(-100%); } }

  /* ================= MAIN ================= */
  .main{
    margin-left:var(--sidebar-w); padding-top:var(--topbar-h); padding-bottom:var(--ticker-h);
  }

  /* ---- HERO ---- */
  .hero{
    min-height:calc(100vh - var(--topbar-h) - var(--ticker-h));
    display:grid; grid-template-columns:1.05fr 1fr; align-items:stretch; position:relative;
    border-bottom:1px solid var(--border-strong);
  }
  .hero-copy{ padding:56px 40px 40px; display:flex; flex-direction:column; justify-content:center; position:relative; z-index:2; }
  .hero-eyebrow{ font-family:var(--mono); font-size:11px; color:var(--ink-soft); letter-spacing:0.06em; margin-bottom:18px; }

  .hero-name{
    font-family:var(--display); font-weight:700; text-transform:uppercase;
    font-size:clamp(3.6rem, 8vw, 7.5rem); line-height:0.82; letter-spacing:-0.01em; color:var(--cream);
    -webkit-text-stroke:1px rgba(33,31,26,0.5);
  }
  .hero-name .last{
    display:block; font-weight:300; color:transparent; -webkit-text-stroke:1.5px rgba(33,31,26,0.45);
    margin-top:-0.06em;
  }

  .hero-lines{ margin-top:30px; max-width:340px; }
  .hero-lines p{ font-size:14px; line-height:1.6; color:var(--ink); font-weight:500; margin-bottom:14px; }
  .hero-lines p b{ color:var(--dark); background:var(--yellow); padding:0 4px; font-weight:600; }

  .hero-stat{ margin-top:auto; padding-top:40px; }
  .hero-stat .n{ font-family:var(--display); font-weight:700; font-size:clamp(2.6rem,5vw,4.2rem); line-height:0.9; color:var(--dark); }
  .hero-stat .l{ font-family:var(--mono); font-size:10.5px; color:var(--ink-soft); letter-spacing:0.04em; margin-top:4px; }

  .hero-media{ position:relative; overflow:hidden; }
  .hero-media img{
    width:100%; height:100%; object-fit:cover; object-position:60% 22%;
    filter:grayscale(0.15) contrast(1.05) saturate(0.92);
  }
  .hero-media::after{
    content:''; position:absolute; inset:0;
    background:linear-gradient(100deg, var(--bg) 0%, transparent 22%);
  }
  .dot{ position:absolute; width:6px; height:6px; border-radius:50%; background:var(--cream); box-shadow:0 0 0 1px rgba(0,0,0,0.15); }
  .dot-line{ position:absolute; background:rgba(244,241,232,0.55); height:1px; transform-origin:left center; }

  .hero-cta{
    position:absolute; right:32px; bottom:32px; background:var(--yellow); padding:20px 24px; width:190px; z-index:3;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid var(--ink);
  }
  .hero-cta:hover { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 var(--ink); } /* UI Touch: Hard Shadow */
  
  .hero-cta .k{ font-family:var(--display); font-weight:700; font-size:1.35rem; text-transform:uppercase; line-height:1.05; color:var(--ink); }
  .hero-cta a{ display:inline-block; margin-top:14px; font-family:var(--mono); font-size:11px; letter-spacing:0.04em; text-decoration:underline; color:var(--ink); }

  .thumb-card{
    position:absolute; left:0; bottom:0; width:230px; display:flex; border-top:1px solid var(--border-strong); border-right:1px solid var(--border-strong);
    background:var(--bg); z-index:3;
  }
  .thumb-img{
    width:88px; height:88px; background:var(--dark); flex-shrink:0; padding:8px;
    display:grid; grid-template-columns:repeat(7,1fr); grid-auto-rows:1fr; gap:2px;
  }
  .thumb-img i{ background:var(--yellow); border-radius:1px; transition: opacity 0.3s ease; }
  .thumb-img i:hover { opacity: 1 !important; background: #fff; } /* UI Touch: Commit hover */
  
  .thumb-text{ padding:10px 12px; font-family:var(--mono); font-size:9.5px; color:var(--ink-soft); line-height:1.6; }
  .thumb-text b{ color:var(--ink); display:block; font-size:10px; }

  .scan-line{
    position:absolute; top:78px; right:26px; width:1px; height:110px; background:repeating-linear-gradient(to bottom, var(--ink-soft) 0 3px, transparent 3px 7px);
  }
  .scan-line::before{ content:''; position:absolute; top:-6px; left:-5px; width:0; height:0; border-left:5px solid transparent; border-right:5px solid transparent; border-bottom:8px solid var(--yellow); }

  .v-code{
    position:absolute; right:8px; top:50%; transform:translateY(-50%) rotate(180deg); writing-mode:vertical-rl;
    font-family:var(--mono); font-size:10px; color:var(--ink-faint); letter-spacing:0.08em; z-index:3;
  }

  /* ---- SECTION SHELL ---- */
  .section{ padding:100px 40px; border-bottom:1px solid var(--border-strong); }
  .sec-eyebrow{
    font-family:var(--mono); font-size:11px; letter-spacing:0.06em; color:var(--ink-soft); margin-bottom:16px;
    display:flex; align-items:center; gap:10px;
  }
  .sec-eyebrow::before{ content:''; width:26px; height:1px; background:var(--yellow); }
  .sec-title{
    font-family:var(--display); font-weight:700; text-transform:uppercase; letter-spacing:-0.01em;
    font-size:clamp(2.2rem,4.4vw,4rem); line-height:0.92; margin-bottom:48px; color:var(--dark);
  }

  /* ---- EXPERIENCE ---- */
  .xp-panel{ 
    display:grid; grid-template-columns:260px 1fr; gap:40px; border:1px solid var(--ink); 
    padding:36px; background:var(--bg-panel); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* UI Touch */
  }
  .xp-panel:hover { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 var(--yellow); } /* UI Touch */

  .xp-role{ font-family:var(--display); font-weight:600; font-size:1.6rem; text-transform:uppercase; line-height:1.05; }
  .xp-org{ font-family:var(--mono); font-size:11.5px; color:var(--ink-soft); margin-top:10px; }
  .xp-when{ font-family:var(--mono); font-size:10.5px; color:var(--ink-faint); margin-top:18px; }
  .xp-body li{ font-size:14.5px; line-height:1.7; color:var(--ink); margin-bottom:16px; padding-left:20px; position:relative; }
  .xp-body li::before{ content:'//'; position:absolute; left:0; color:var(--yellow); font-family:var(--mono); font-weight:700; -webkit-text-stroke:0.4px var(--ink); font-size:12px; top:2px; }
  .xp-body b{ background:var(--yellow); padding:0 3px; font-weight:600; }

  /* ---- PROJECTS ---- */
  .proj-list{ display:flex; flex-direction:column; border-top:1px solid var(--border-strong); }
  .proj-row{
    display:grid; grid-template-columns:70px 1fr 1.3fr; gap:30px; padding:30px 15px; 
    border-bottom:1px solid var(--border-strong); align-items:start;
    transition: background 0.3s ease, padding-left 0.3s ease; /* UI Touch */
    border-left: 0px solid var(--yellow);
  }
  .proj-row:hover { background: rgba(237, 210, 46, 0.1); border-left: 6px solid var(--yellow); padding-left: 20px; } /* UI Touch */
  
  .proj-idx{ font-family:var(--mono); font-size:12px; color:var(--ink-faint); padding-top:4px; }
  .proj-name h3{ font-family:var(--display); font-weight:600; font-size:1.7rem; text-transform:uppercase; line-height:0.95; }
  .proj-name .kicker{ font-family:var(--mono); font-size:10.5px; color:var(--ink-soft); margin-top:10px; display:block; }
  .proj-body li{ font-size:13.5px; line-height:1.65; color:var(--ink); margin-bottom:9px; padding-left:15px; position:relative; }
  .proj-body li::before{ content:'-'; position:absolute; left:0; color:var(--ink-faint); }
  .tag-list{ display:flex; flex-wrap:wrap; gap:6px; margin-top:14px; }
  .tag-list span{ font-family:var(--mono); font-size:10px; border:1px solid var(--ink); background: var(--bg); padding:3px 8px; color:var(--ink); }

  /* ---- RANKINGS ---- */
  .stat-strip{ display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--border-strong); margin-bottom:26px; }
  .stat-cell{ padding:28px 22px; border-right:1px solid var(--border-strong); transition: background 0.3s ease; }
  .stat-cell:hover { background: var(--yellow); } /* UI Touch */
  .stat-cell:last-child{ border-right:none; }
  .stat-cell .n{ font-family:var(--display); font-weight:700; font-size:clamp(1.8rem,3.2vw,2.6rem); }
  .stat-cell .n .y{ color:var(--yellow); -webkit-text-stroke:0.6px var(--ink); }
  .stat-cell:hover .n .y { color: var(--cream); } /* UI Touch */
  .stat-cell .l{ font-family:var(--mono); font-size:10px; color:var(--ink-soft); margin-top:6px; letter-spacing:0.02em; }

  .rank-strip{ display:grid; grid-template-columns:repeat(3,1fr); border:1px solid var(--border-strong); }
  .rank-cell{ padding:32px 26px; border-right:1px solid var(--border-strong); }
  .rank-cell:last-child{ border-right:none; }
  .rank-cell .platform{ font-family:var(--mono); font-size:11px; letter-spacing:0.05em; color:var(--ink-soft); margin-bottom:14px; display:flex; justify-content:space-between; }
  .rank-cell .platform em{ font-style:normal; background:var(--yellow); padding:2px 7px; font-size:10px; font-weight:700; color:var(--ink); }
  .rank-cell .rating{ font-family:var(--display); font-weight:700; font-size:2.6rem; line-height:0.9; }
  .rank-cell .sub{ font-family:var(--mono); font-size:10.5px; color:var(--ink-faint); margin:8px 0 16px; }
  .rank-underline{ height:2px; background:var(--border-strong); position:relative; margin-bottom:14px; }
  .rank-underline i{ position:absolute; left:0; top:0; height:100%; background:var(--yellow); width:0; transition:width 1.2s cubic-bezier(.2,.8,.2,1); }
  .rank-detail{ font-size:12.5px; color:var(--ink); line-height:1.6; }

  /* ---- SKILLS ---- */
  .skill-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--border-strong); border:1px solid var(--border-strong); }
  .skill-cell{ background:var(--bg); padding:30px 32px; transition: transform 0.2s ease, box-shadow 0.2s ease;}
  .skill-cell:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--border-strong); z-index: 2; position: relative; } /* UI Touch */
  .skill-cell .k{ font-family:var(--mono); font-size:10.5px; color:var(--yellow); background:var(--dark); display:inline-block; padding:4px 9px; margin-bottom:16px; letter-spacing:0.04em; }
  .chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
  .chip{ font-family:var(--mono); font-size:12px; border:1px solid var(--border-strong); padding:7px 13px; color:var(--ink); transition:all .2s ease; cursor: default; }
  .chip:hover{ background:var(--dark); color:var(--yellow); border-color:var(--dark); }

  /* ---- EDUCATION ---- */
  .edu-panel{ border:1px solid var(--border-strong); padding:40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; background:var(--bg-panel); }
  .edu-panel h3{ font-family:var(--display); font-weight:600; font-size:1.9rem; text-transform:uppercase; line-height:1; }
  .edu-panel .loc{ font-family:var(--mono); font-size:11.5px; color:var(--ink-soft); margin-top:10px; }
  .edu-panel .degree{ font-family:var(--mono); font-size:11.5px; margin-top:14px; background:var(--yellow); display:inline-block; padding:3px 8px; }
  .edu-right{ text-align:right; }
  .edu-right .cgpa{ font-family:var(--display); font-weight:700; font-size:2.6rem; }
  .edu-right .yrs{ font-family:var(--mono); font-size:11px; color:var(--ink-faint); margin-top:4px; }

  /* ---- CONTACT ---- */
  .contact-section{ padding-bottom:0; }
  .contact-grid{ display:grid; grid-template-columns:1.2fr 1fr; gap:40px; align-items:end; }
  .contact-title{ font-family:var(--display); font-weight:700; text-transform:uppercase; font-size:clamp(2.4rem,6vw,5rem); line-height:0.88; }
  .contact-sub{ font-family:var(--sans); font-size:14.5px; color:var(--ink-soft); max-width:420px; margin-top:20px; line-height:1.6; }
  .contact-list{ display:flex; flex-direction:column; gap:0; border-top:1px solid var(--border-strong); }
  .contact-list a{
    display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid var(--border-strong);
    font-family:var(--mono); font-size:13px; transition:background .2s ease, padding .2s ease;
  }
  .contact-list a:hover{ background:var(--dark); color:var(--yellow); padding-left:16px; padding-right:16px; } /* UI Touch */
  .contact-list a .arrow{ color:var(--yellow); }

  /* ---- REVEAL ---- */
  .reveal{ opacity:0; transform:translateY(24px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1); }
  .reveal.show{ opacity:1; transform:none; }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 1080px){
    .hero{ grid-template-columns:1fr; }
    .hero-media{ min-height:420px; order:-1; }
    .thumb-card, .hero-cta, .scan-line, .v-code{ display:none; }
    .stat-strip{ grid-template-columns:repeat(2,1fr); }
    .rank-strip{ grid-template-columns:1fr; }
    .rank-cell{ border-right:none; border-bottom:1px solid var(--border-strong); }
    .stat-cell:nth-child(2n){ border-right:none; }
    .stat-cell{ border-bottom:1px solid var(--border-strong); }
    .skill-grid{ grid-template-columns:1fr; }
    .contact-grid{ grid-template-columns:1fr; }
  }
  @media (max-width: 860px){
    :root{ --sidebar-w:0px; }
    .sidebar{ transform:translateX(-100%); transition:transform .3s ease; width:260px; z-index:400; }
    .sidebar.open{ transform:translateX(0); }
    .main{ margin-left:0; }
    .coords, .status-block{ display:none !important; }
    .navtoggle{ display:block; margin-left:12px; background:none; border:1px solid var(--border-strong); width:36px; height:36px; font-family:var(--mono); }
    .xp-panel{ grid-template-columns:1fr; }
    .proj-row{ grid-template-columns:1fr; gap:12px; }
    .section{ padding:72px 22px; }
    .hero-copy{ padding:40px 22px 32px; }
  }
</style>
</head>
<body>

<header class="topbar">
  <div class="tb-left">
    <span class="logo">HC //</span>
    <span class="tag-row">ENGINEER <span>/</span> BUILDER <span>/</span> RATED</span>
    <span class="coords">28.6139° N&nbsp;&nbsp;&nbsp;77.2090° E</span>
  </div>
  <div class="tb-right">
    <div class="status-block">
      LOCATION<br><b>NEW DELHI, INDIA</b><br><br>
      STATUS <span class="live">● AVAILABLE</span>
    </div>
    <button class="navtoggle" id="navToggle" aria-label="Toggle menu">☰</button>
    <a href="#contact" class="menu-btn">MENU</a>
  </div>
</header>

<aside class="sidebar" id="sidebar">
  <div>
    <div class="sb-desc">Portfolio platform for systems &amp; competitive engineering</div>
    <svg class="sb-hex" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <polygon points="13,1 24,7 24,19 13,25 2,19 2,7" stroke="#211F1A" stroke-opacity="0.55" stroke-width="1"/>
    </svg>
  </div>
  <nav class="sb-nav">
    <a href="#experience">EXPERIENCE <span class="plus">+</span></a>
    <a href="#projects">PROJECTS <span class="plus">+</span></a>
    <a href="#cp">RANKINGS <span class="plus">+</span></a>
    <a href="#skills">SKILLS <span class="plus">+</span></a>
    <a href="#education">EDUCATION <span class="plus">+</span></a>
    <a href="#contact">CONTACT <span class="plus">+</span></a>
    <a href="himanshu-chandela-resume.pdf" download>RESUME <span class="plus">↓</span></a>
  </nav>
  <div class="sb-foot">HC—2026<br>SESSION: PORTFOLIO<br>NSUT / NEW DELHI</div>
</aside>

<div class="ticker">
  <div class="ticker-track">
    <span>LATEST COMMIT: <b>REFACTORED GEOSPATIAL ROUTING — BUS ADDA</b></span>
    <span>// PROBLEMS SOLVED: <b>1,550+</b></span>
    <span>// CONTEST RATING: <b>CF 1439 · LC 1888</b></span>
    <span>// GLOBAL STANDING: <b>TOP 1,500 — GOOGLE THE BIG CODE 2026</b></span>
    <span>// STATUS: <b>OPEN TO WORK</b></span>
  </div>
</div>

<div class="main">

  <section class="hero" id="top">
    <div class="hero-copy">
      <div class="hero-eyebrow">HUMAN / ENGINEER / B.TECH IT — NSUT '28</div>
      <h1 class="hero-name">HIMANSHU<span class="last">CHANDELA</span></h1>
      <div class="hero-lines">
        <p>I don't just <b>write code</b>. I ship systems that scale.</p>
        <p>Every rated contest is a possibility of getting better.</p>
      </div>
      <div class="hero-stat">
        <div class="n">1.5<span style="color:var(--yellow); -webkit-text-stroke:0.6px var(--ink)">K+</span></div>
        <div class="l">PROBLEMS SOLVED — LEETCODE / CODEFORCES / CODECHEF</div>
      </div>
    </div>
    <div class="hero-media">
      <img src="himanshu-photo.png" alt="Himanshu Chandela" id="heroPhoto">
      <div class="scan-line"></div>
      <div class="v-code">HC — 2026&nbsp;&nbsp;&nbsp;IN 28.61 / 77.20</div>
      <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
        <circle cx="62%" cy="38%" r="3" fill="#F4F1E8" stroke="#00000022"/>
        <circle cx="70%" cy="55%" r="3" fill="#F4F1E8" stroke="#00000022"/>
        <circle cx="55%" cy="62%" r="3" fill="#F4F1E8" stroke="#00000022"/>
        <circle cx="78%" cy="30%" r="3" fill="#F4F1E8" stroke="#00000022"/>
        <circle cx="48%" cy="45%" r="3" fill="#F4F1E8" stroke="#00000022"/>
        <line x1="62%" y1="38%" x2="70%" y2="55%" stroke="#F4F1E8" stroke-opacity="0.5" stroke-width="1"/>
        <line x1="70%" y1="55%" x2="55%" y2="62%" stroke="#F4F1E8" stroke-opacity="0.5" stroke-width="1"/>
        <line x1="62%" y1="38%" x2="78%" y2="30%" stroke="#F4F1E8" stroke-opacity="0.5" stroke-width="1"/>
        <line x1="48%" y1="45%" x2="62%" y2="38%" stroke="#F4F1E8" stroke-opacity="0.5" stroke-width="1"/>
      </svg>
      <div class="thumb-card">
        <div class="thumb-img" id="commitGraph"></div>
        <div class="thumb-text"><b>COMMIT ACTIVITY</b>LAST 12 MO<br>REPO: TRANSMOGRIFY-CELL</div>
      </div>
      <div class="hero-cta">
        <div class="k">OPEN<br>TO WORK</div>
        <a href="himanshu-chandela-resume.pdf" download>VIEW RESUME →</a>
      </div>
    </div>
  </section>

  <section class="section" id="experience">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 01 — EXPERIENCE</div>
      <h2 class="sec-title">Where I've<br>worked</h2>
      <div class="xp-panel">
        <div>
          <div class="xp-role">Data Analytics &amp; Systems Intern</div>
          <div class="xp-org">Edunet Foundation<br>Microsoft &amp; SAP TechSaksham</div>
          <div class="xp-when">NOV 2024 – DEC 2024<br>REMOTE</div>
        </div>
        <ul class="xp-body">
          <li>Engineered automated <b>Python ETL pipelines</b> to process $233K+ of dataset anomalies, reducing edge-case errors by 100% while adhering to strict unit-testing standards within an Agile team.</li>
          <li>Designed data workflows to <b>anonymize PII</b> for compliance, driving continuous improvement and 100% data consistency.</li>
          <li>Proactively collaborated with internal stakeholders to define data requirements and quantified a <b>2.1x purchasing disparity</b> to influence revenue strategy.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section" id="projects">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 02 — PROJECTS</div>
      <h2 class="sec-title">Things I've<br>built</h2>
      <div class="proj-list">
        <div class="proj-row">
          <div class="proj-idx">01</div>
          <div class="proj-name">
            <h3>Bus Adda</h3>
            <span class="kicker">DISTRIBUTED REAL-TIME TRANSIT SYSTEM</span>
          </div>
          <div>
            <ul class="proj-body">
              <li>Architected a Java Spring Boot backend with geospatial algorithms, handling 500+ concurrent requests with 30% reduced API latency.</li>
              <li>Containerized with Docker and CI/CD pipelines, raising unit test coverage.</li>
              <li>Contributed bug reports and documentation fixes to the underlying Java geospatial routing libraries.</li>
            </ul>
            <div class="tag-list"><span>JAVA</span><span>SPRING BOOT</span><span>POSTGRESQL</span><span>DOCKER</span></div>
          </div>
        </div>
        <div class="proj-row">
          <div class="proj-idx">02</div>
          <div class="proj-name">
            <h3>AI Video Metadata</h3>
            <span class="kicker">GENERATIVE AI DATA PIPELINE</span>
          </div>
          <div>
            <ul class="proj-body">
              <li>Architected a pipeline to interact with generative video AI (Google Veo), evaluating latency, prompt execution time, and payload delivery.</li>
              <li>Designed a schema to parse complex API responses and store generation metadata in PostgreSQL.</li>
            </ul>
            <div class="tag-list"><span>PYTHON</span><span>POSTGRESQL</span><span>GOOGLE VEO</span><span>REST</span></div>
          </div>
        </div>
        <div class="proj-row">
          <div class="proj-idx">03</div>
          <div class="proj-name">
            <h3>Fact Club</h3>
            <span class="kicker">PRODUCTION-GRADE CLASSIFICATION SERVICE</span>
          </div>
          <div>
            <ul class="proj-body">
              <li>Deployed and maintained a scalable cloud service on GCP Cloud Run, integrating a Python processing engine with the backend.</li>
              <li>Monitored live latency and LogLoss across evaluation datasets, troubleshooting corner cases to improve stability.</li>
            </ul>
            <div class="tag-list"><span>PYTHON</span><span>GCP CLOUD RUN</span><span>TESTING</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="cp">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 03 — RANKINGS</div>
      <h2 class="sec-title">Ranked.<br>Rated. Relentless.</h2>

      <div class="stat-strip">
        <div class="stat-cell"><div class="n"><span class="y">1,550</span>+</div><div class="l">PROBLEMS SOLVED</div></div>
        <div class="stat-cell"><div class="n">TOP <span class="y">1,500</span></div><div class="l">GOOGLE "THE BIG CODE" 2026</div></div>
        <div class="stat-cell"><div class="n"><span class="y">4.7</span>%</div><div class="l">LEETCODE GLOBAL TOP</div></div>
        <div class="stat-cell"><div class="n">C<span class="y">++</span></div><div class="l">PRIMARY CONTEST LANGUAGE</div></div>
      </div>

      <div class="rank-strip">
        <div class="rank-cell">
          <div class="platform">LEETCODE <em>KNIGHT</em></div>
          <div class="rating">1888</div>
          <div class="sub">RATED MAX · TOP 4.7% GLOBAL</div>
          <div class="rank-underline"><i data-w="78"></i></div>
          <div class="rank-detail">Best rank: 1371 in Weekly Contest 437</div>
        </div>
        <div class="rank-cell">
          <div class="platform">CODEFORCES <em>SPECIALIST</em></div>
          <div class="rating">1439</div>
          <div class="sub">RATED MAX</div>
          <div class="rank-underline"><i data-w="58"></i></div>
          <div class="rank-detail">Best rank: 1908 in Round 1093 (Div. 2)</div>
        </div>
        <div class="rank-cell">
          <div class="platform">CODECHEF <em>RATED</em></div>
          <div class="rating">#99</div>
          <div class="sub">GLOBAL RANK</div>
          <div class="rank-underline"><i data-w="88"></i></div>
          <div class="rank-detail">Achieved in Starters 231</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="skills">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 04 — SKILLS</div>
      <h2 class="sec-title">Full stack,<br>top to bottom</h2>
      <div class="skill-grid">
        <div class="skill-cell">
          <span class="k">LANGUAGES</span>
          <div class="chip-row">
            <span class="chip">C++</span><span class="chip">JAVA</span><span class="chip">PYTHON</span>
            <span class="chip">SQL</span><span class="chip">C</span><span class="chip">HTML/CSS</span><span class="chip">JAVASCRIPT</span>
          </div>
        </div>
        <div class="skill-cell">
          <span class="k">DATABASES &amp; CLOUD</span>
          <div class="chip-row">
            <span class="chip">POSTGRESQL</span><span class="chip">MYSQL</span><span class="chip">GCP · CLOUD RUN</span>
            <span class="chip">BIGQUERY</span><span class="chip">AWS</span><span class="chip">DOCKER</span><span class="chip">LINUX</span>
          </div>
        </div>
        <div class="skill-cell">
          <span class="k">BACKEND &amp; SYSTEMS</span>
          <div class="chip-row">
            <span class="chip">SPRING BOOT</span><span class="chip">REST APIS</span><span class="chip">MICROSERVICES</span>
            <span class="chip">DISTRIBUTED SYSTEMS</span><span class="chip">SYSTEM DESIGN</span>
          </div>
        </div>
        <div class="skill-cell">
          <span class="k">ENGINEERING PRACTICES</span>
          <div class="chip-row">
            <span class="chip">GIT</span><span class="chip">CI/CD</span><span class="chip">UNIT TESTING</span>
            <span class="chip">CODE REVIEWS</span><span class="chip">OSS CONTRIBUTIONS</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="education">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 05 — EDUCATION</div>
      <h2 class="sec-title">Currently<br>studying</h2>
      <div class="edu-panel">
        <div>
          <h3>Netaji Subhas University<br>of Technology (NSUT)</h3>
          <div class="loc">NEW DELHI, INDIA</div>
          <div class="degree">B.TECH — INFORMATION TECHNOLOGY</div>
        </div>
        <div class="edu-right">
          <div class="cgpa">7.17<span style="font-size:1rem; color:var(--ink-soft)">/10.0</span></div>
          <div class="yrs">2024 – 2028</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section contact-section" id="contact">
    <div class="reveal">
      <div class="sec-eyebrow">SECTOR 06 — CONTACT</div>
      <div class="contact-grid">
        <div>
          <h2 class="contact-title">Let's build<br>something.</h2>
          <p class="contact-sub">Open to internships and collaborations in backend engineering, distributed systems, and applied AI. Based in New Delhi — happy to work remote.</p>
        </div>
        <div class="contact-list">
          <a href="mailto:himanshuchandela15@gmail.com">EMAIL<span class="arrow">himanshuchandela15@gmail.com →</span></a>
          <a href="tel:+917011832301">PHONE<span class="arrow">+91 70118 32301 →</span></a>
          <a href="https://www.linkedin.com/in/himanshu-chandela-5947a6212/" target="_blank" rel="noopener">LINKEDIN<span class="arrow">himanshu-chandela →</span></a>
          <a href="https://github.com/transmogrify-cell" target="_blank" rel="noopener">GITHUB<span class="arrow">transmogrify-cell →</span></a>
        </div>
      </div>
    </div>
  </section>

</div>

<script>
  // mobile sidebar toggle
  const navToggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  navToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // rank underline fill
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.style.width = e.target.dataset.w + '%'; barIO.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.rank-underline i').forEach(el => barIO.observe(el));

  // commit-activity mini graph
  const graph = document.getElementById('commitGraph');
  for(let i=0;i<35;i++){
    const cell = document.createElement('i');
    const o = [0.12,0.12,0.25,0.4,0.7,1][Math.floor(Math.random()*6)];
    cell.style.opacity = o;
    graph.appendChild(cell);
  }
</script>

</body>
</html>
