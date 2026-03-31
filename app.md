<!-- Situations: Instant Guidance -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Situation Selection</title>
<!-- Material Symbols Link -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif", "serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        display: inline-block;
        line-height: 1;
      }
      .glass-card {
        background: rgba(255, 242, 224, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      .active-state:active {
        transform: scale(0.96);
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-xl">
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-stone-800 hover:bg-amber-50/50 p-2 rounded-full transition-colors active:scale-95 duration-300 ease-out">menu</button>
<h1 class="font-headline text-lg tracking-tight text-amber-900 font-semibold">Digital Sanctuary</h1>
</div>
<div class="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/15">
<img class="w-full h-full object-cover" data-alt="close-up portrait of a thoughtful man with a neat beard, soft studio lighting on a warm beige background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_DSkMfMMiBASAzYZefZNVbzLdJ3m-eftnRKpXGchX3-Km0suTLa3lpZJL8_b6-QXCF1Yg2exdf8nTaFHrZCIg6H2t765V2hsMEV7uI5Yjj1TSJ7a0pU37BF_6TTVkgM96y3nCi5t9cf3IVkUWP02e-ib_tAlPxS7Nvf_S0VBK2G_Cpz4DUD3ef-BBatUkR5ETr3PuOfkbqn_8DJRz9WTT98-fnLOhdnXmPd_TTI9AD-S2ZPl4XtLcqtQe0QX_1OlR3XCaeabdQk"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32">
<!-- Hero Background Decoration -->
<div class="fixed inset-0 pointer-events-none overflow-hidden">
<div class="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
<div class="absolute bottom-[-5%] left-[-5%] w-[50%] h-[30%] bg-tertiary/5 rounded-full blur-[80px]"></div>
</div>
<div class="w-full max-w-md relative z-10 text-center mb-12">
<h2 class="font-headline text-4xl text-on-surface mb-3 tracking-tight">How are you feeling?</h2>
<p class="text-on-surface-variant font-body font-light opacity-80">Seek solace through the Divine Word</p>
</div>
<!-- Grid Layout for Situation Buttons -->
<div class="w-full max-w-md grid grid-cols-2 gap-5">
<!-- Stress Button -->
<button class="active-state glass-card p-8 rounded-lg flex flex-col items-center justify-center gap-4 border border-outline-variant/10 shadow-sm transition-all duration-300 hover:bg-surface-variant/40 group">
<div class="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl">psychology</span>
</div>
<span class="font-headline text-lg text-on-surface font-medium">Stress</span>
</button>
<!-- Fear Button -->
<button class="active-state glass-card p-8 rounded-lg flex flex-col items-center justify-center gap-4 border border-outline-variant/10 shadow-sm transition-all duration-300 hover:bg-surface-variant/40 group">
<div class="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl">shield</span>
</div>
<span class="font-headline text-lg text-on-surface font-medium">Fear</span>
</button>
<!-- Rizq Button -->
<button class="active-state glass-card p-8 rounded-lg flex flex-col items-center justify-center gap-4 border border-outline-variant/10 shadow-sm transition-all duration-300 hover:bg-surface-variant/40 group">
<div class="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl">paid</span>
</div>
<span class="font-headline text-lg text-on-surface font-medium">Rizq</span>
</button>
<!-- Peace Button -->
<button class="active-state glass-card p-8 rounded-lg flex flex-col items-center justify-center gap-4 border border-outline-variant/10 shadow-sm transition-all duration-300 hover:bg-surface-variant/40 group">
<div class="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined text-3xl">spa</span>
</div>
<span class="font-headline text-lg text-on-surface font-medium">Peace</span>
</button>
</div>
<!-- Secondary Guidance Link -->
<div class="mt-12 text-center">
<p class="text-sm font-label text-on-surface-variant tracking-wide mb-2 opacity-60">OR EXPLORE BY</p>
<button class="font-headline text-primary border-b border-primary/20 pb-1 hover:border-primary transition-colors text-base italic">Recent Reflections</button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-transform duration-300 active:scale-90" href="#">
<span class="material-symbols-outlined">home</span>
</a>
<a class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 transition-transform duration-300 active:scale-90" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">explore</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-transform duration-300 active:scale-90" href="#">
<span class="material-symbols-outlined">auto_awesome_motion</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-transform duration-300 active:scale-90" href="#">
<span class="material-symbols-outlined">leaderboard</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-transform duration-300 active:scale-90" href="#">
<span class="material-symbols-outlined">settings</span>
</a>
</nav>
</body></html>

<!-- 1-Minute Pause Mode -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - 1-Minute Pause</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Inter:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>.glass-background {
    background: linear-gradient(135deg, #fff8f2 0%, #fff2e0 50%, #f3e0c2 100%)
    }
.grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.03;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBz96Nqtjfu5QxpLwyk0g31XgKP0lDO2cdvoe3a0HiLzV8jlJDN8efbSZXGCQUgnzX4-Ic4UXvWfL6MUVUPkU1jF0bRk0Zr5ZciF0MrgXq-Fxgq_jDkyzlncybmgeWPiRQdgVYoWsc63Fl_qT8nX37PWXanTLzerGyckXrsC9hee8z5-tRGAudPl1eB8X-umB0UTi-WPH4Tare7_6FlvI7bIdYLNKhDkdTBGg6D74iyYgtGQuqarT1xwwcel-FRDFMtgthYWEs5Nlw)
    }
.breathe-effect {
    opacity: 0.8;
    transition: opacity 8s ease-in-out
    }
.soft-glow {
    filter: drop-shadow(0 0 20px rgba(112, 98, 51, 0.15))
    }</style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface font-body text-on-surface selection:bg-primary-fixed overflow-hidden h-screen w-screen">
<!-- The grain texture for an heirloom manuscript feel -->
<div class="grain-overlay"></div>
<!-- Immersive Background Canvas -->
<div class="fixed inset-0 z-0">
<!-- Soft animated gradient circles mimicking light passing through vellum -->
<div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-fixed/20 blur-[120px]"></div>
<div class="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-surface-container/40 blur-[100px]"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-surface-bright/50 blur-[150px]"></div>
</div>
<!-- Main Content Shell -->
<main class="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
<!-- Top Status Indicator (Subtle/Minimal) -->
<div class="absolute top-12 left-0 w-full flex flex-col items-center gap-2">
<span class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40">Restoring Stillness</span>
<div class="h-[1px] w-8 bg-outline-variant/20"></div>
</div>
<!-- Central Ayah Experience -->
<section class="max-w-3xl flex flex-col items-center gap-16">
<!-- Arabic Script: Large, Hand-crafted Feel -->
<div class="relative">
<h1 class="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-relaxed soft-glow transition-opacity duration-[5000ms] ease-in-out" dir="rtl">
                    فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
                </h1>
<!-- Decorative Gold Accent Underneath -->
<div class="mt-8 flex justify-center opacity-30">
<span class="material-symbols-outlined text-primary-fixed-dim text-4xl" data-icon="flare">flare</span>
</div>
</div>
<!-- English Translation: Elegant Typography -->
<div class="flex flex-col items-center gap-4">
<p class="font-headline italic text-lg md:text-2xl text-on-surface-variant/80 tracking-wide">
                    "Verily, with hardship comes ease"
                </p>
<p class="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50">
                    Ash-Sharh — 94:5
                </p>
</div>
</section>
<!-- Dynamic Depth: Glassmorphic Floating Element (Abstract) -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[90%] max-w-4xl h-[400px] bg-white/10 backdrop-blur-[40px] rounded-[4rem] border border-white/20 shadow-[0_32px_64px_rgba(35,26,8,0.03)]"></div>
<!-- Progress Indicator: Extremely Minimal -->
<div class="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
<div class="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
<div class="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></div>
<div class="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
</div>
</main>
<!-- Contextual Aesthetic Elements (Blooms) -->
<div class="fixed top-20 right-20 pointer-events-none opacity-20 hidden md:block">
<img class="w-64 h-64 object-contain mix-blend-multiply filter grayscale-[20%] brightness-110" data-alt="Close-up of ethereal gold leaf texture with soft focus and warm ambient lighting against a cream background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_emQREHu1wZXbq1prbtAhAJFK0ciT9cNf21ypM0qFbL5sjpUKgo1xAxUc2ViaKhoR38E6JDAUKZS0C88WHk9XDjErsO4gIxanTvinmhF9LEX6xDorBQKAp0GN1JCuMuiMJImlzdb4XsGM9_QngrIyA9ZpwYkAeB94xgO60sBLtxmmBxrX1BeqkQ4q2e47b96F1SnibckwsgZWPFUm4BMlYLUwT-T2p5PeTuCtFikd9p4DIpe7DIGQRe4qFeAu6SCIs0cR5aeFIk"/>
</div>
<!-- Hidden Shell Navigation (Suppressed per instructions for focus mode) -->
<!-- This ensures we meet the "Zero Distractions" requirement while respecting the Design System's focus mode suppression -->
</body></html>

<!-- Situations: Premium Guidance -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Situation Selection</title>
<!-- Material Symbols Link -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif", "serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        display: inline-block;
        line-height: 1;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: 0 8px 32px 0 rgba(112, 98, 51, 0.05);
      }
      .glass-nav {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
      }
      .active-state:active {
        transform: scale(0.96);
      }
      .glow-icon {
        box-shadow: 0 0 20px rgba(245, 225, 167, 0.6);
      }
      .bg-immersive {
        background: radial-gradient(circle at 50% 50%, #fff8f2 0%, #fef3e0 100%);
      }
    </style>
</head>
<body class="bg-immersive font-body text-on-surface selection:bg-primary-fixed min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-white/40 backdrop-blur-md">
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-stone-800 p-2 rounded-full transition-colors active:scale-95">menu</button>
<h1 class="font-headline text-xl tracking-tight text-amber-950 font-bold italic">Digital Sanctuary</h1>
</div>
<div class="w-11 h-11 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden ring-2 ring-white/50 shadow-sm">
<img class="w-full h-full object-cover" data-alt="close-up portrait of a thoughtful man with a neat beard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_DSkMfMMiBASAzYZefZNVbzLdJ3m-eftnRKpXGchX3-Km0suTLa3lpZJL8_b6-QXCF1Yg2exdf8nTaFHrZCIg6H2t765V2hsMEV7uI5Yjj1TSJ7a0pU37BF_6TTVkgM96y3nCi5t9cf3IVkUWP02e-ib_tAlPxS7Nvf_S0VBK2G_Cpz4DUD3ef-BBatUkR5ETr3PuOfkbqn_8DJRz9WTT98-fnLOhdnXmPd_TTI9AD-S2ZPl4XtLcqtQe0QX_1OlR3XCaeabdQk"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center px-8 pt-28 pb-36">
<!-- Hero Background Decoration -->
<div class="fixed inset-0 pointer-events-none overflow-hidden">
<div class="absolute top-[-15%] right-[-15%] w-[80%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
<div class="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-amber-200/20 rounded-full blur-[100px]"></div>
</div>
<div class="w-full max-w-md relative z-10 text-center mb-16">
<h2 class="font-headline text-5xl text-amber-950 mb-4 tracking-tighter leading-tight">How are you <span class="italic font-normal">feeling?</span></h2>
<p class="text-on-surface-variant font-body text-lg font-light tracking-wide opacity-70">Seek solace through the Divine Word</p>
</div>
<!-- Grid Layout for Situation Buttons -->
<div class="w-full max-w-md grid grid-cols-2 gap-6">
<!-- Stress Button -->
<button class="active-state glass-card p-10 rounded-lg flex flex-col items-center justify-center gap-5 border border-white/60 transition-all duration-500 hover:bg-white/50 hover:shadow-xl group">
<div class="w-16 h-16 rounded-full bg-surface-container/60 glow-icon flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform duration-500">
<span class="material-symbols-outlined text-3xl">psychology</span>
</div>
<span class="font-headline text-xl text-on-surface font-semibold tracking-wide">Stress</span>
</button>
<!-- Fear Button -->
<button class="active-state glass-card p-10 rounded-lg flex flex-col items-center justify-center gap-5 border border-white/60 transition-all duration-500 hover:bg-white/50 hover:shadow-xl group">
<div class="w-16 h-16 rounded-full bg-surface-container/60 glow-icon flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform duration-500">
<span class="material-symbols-outlined text-3xl">shield</span>
</div>
<span class="font-headline text-xl text-on-surface font-semibold tracking-wide">Fear</span>
</button>
<!-- Rizq Button -->
<button class="active-state glass-card p-10 rounded-lg flex flex-col items-center justify-center gap-5 border border-white/60 transition-all duration-500 hover:bg-white/50 hover:shadow-xl group">
<div class="w-16 h-16 rounded-full bg-surface-container/60 glow-icon flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform duration-500">
<span class="material-symbols-outlined text-3xl">paid</span>
</div>
<span class="font-headline text-xl text-on-surface font-semibold tracking-wide">Rizq</span>
</button>
<!-- Peace Button -->
<button class="active-state glass-card p-10 rounded-lg flex flex-col items-center justify-center gap-5 border border-white/60 transition-all duration-500 hover:bg-white/50 hover:shadow-xl group">
<div class="w-16 h-16 rounded-full bg-surface-container/60 glow-icon flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform duration-500">
<span class="material-symbols-outlined text-3xl">spa</span>
</div>
<span class="font-headline text-xl text-on-surface font-semibold tracking-wide">Peace</span>
</button>
</div>
<!-- Secondary Guidance Link -->
<div class="mt-16 text-center">
<p class="text-[10px] font-label font-bold text-on-surface-variant tracking-[0.2em] mb-4 opacity-50 uppercase">Explore alternative guidance</p>
<button class="font-headline text-primary-container border-b-2 border-primary-container/10 pb-1 hover:border-primary-container transition-all text-lg italic font-medium">Recent Reflections</button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 glass-nav border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-t-[2.5rem]">
<a class="flex flex-col items-center justify-center text-stone-400 w-14 h-14 hover:text-primary transition-all active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">home</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-fixed/30 text-primary p-3 rounded-full w-14 h-14 ring-1 ring-white/50 transition-all active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">explore</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-14 h-14 hover:text-primary transition-all active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">auto_awesome_motion</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-14 h-14 hover:text-primary transition-all active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">leaderboard</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-14 h-14 hover:text-primary transition-all active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">settings</span>
</a>
</nav>
</body></html>

<!-- Home: Today for You -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Home</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<!-- Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif", "serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background: linear-gradient(135deg, #FAE7C9 0%, #E1C78F 100%);
            min-height: 100vh;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl">
<div class="flex items-center gap-4">
<button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors active:scale-95 duration-300 ease-out">
<span class="material-symbols-outlined text-stone-800 dark:text-stone-100" data-icon="menu">menu</span>
</button>
</div>
<h1 class="font-noto-serif text-lg tracking-tight text-amber-900 dark:text-amber-200 font-semibold">Digital Sanctuary</h1>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container shadow-sm">
<img alt="Profile" class="w-full h-full object-cover" data-alt="close-up portrait of a thoughtful man with a short beard in soft natural lighting, warm atmospheric tone" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSBdzOXRGNESRQg_vvy2Xzbo09z9W61UOe0_qLrCY5eWpStoe9zrwPjztWhayi99wDe9ZPsN7y1_XW4grb7vrXSRAEgbes9eyBIwXRnuGRT9MMujdqLH75hMRfHNMfSw-9btJVRbRSYFMUnhf8186Oqp1-e_PhAfmB0wXVRKULrwxVXj0r7Ja9zeuHvEKg4sc5kwv479MFtXtp0ZvQKsv2qAQhhuYvHp23MvifJxwgNzd_1YVMxpjQaGpS7HBsMyegxvXGJcA8zs"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-24 pb-32 px-6 flex flex-col items-center min-h-screen">
<!-- Header Section -->
<div class="w-full max-w-md mb-8">
<p class="font-headline italic text-primary opacity-80 text-xl tracking-tight">Today for you</p>
</div>
<!-- Central Experience Card -->
<div class="w-full max-w-md aspect-[4/5] bg-surface-container-lowest/40 backdrop-blur-3xl rounded-lg shadow-[0_8px_32px_rgba(35,26,8,0.06)] flex flex-col items-center justify-center p-8 relative overflow-hidden">
<!-- Decorative Bleed Element -->
<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
<div class="absolute -bottom-12 -left-12 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl"></div>
<!-- Content Container -->
<div class="z-10 flex flex-col items-center text-center space-y-10">
<!-- Arabic Ayah -->
<div class="space-y-4">
<span class="text-xs font-label uppercase tracking-[0.2em] text-primary/60">Surah Al-Imran 3:159</span>
<p class="font-headline text-4xl leading-relaxed text-on-surface text-right dir-rtl" style="line-height: 1.8;">
                        إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ
                    </p>
</div>
<!-- Translation Section -->
<div class="space-y-6">
<p class="font-body text-lg font-light leading-relaxed text-on-surface-variant max-w-[280px]">
                        "...Indeed, Allah loves those who rely [upon Him]."
                    </p>
<!-- Reflection Tray Mimic (Visual) -->
<div class="pt-6 border-t border-outline-variant/20">
<p class="font-headline italic text-primary/80 text-sm tracking-wide">
                            Trust in the process of your journey.
                        </p>
</div>
</div>
</div>
<!-- Interaction Hints -->
<div class="absolute bottom-8 flex flex-col items-center gap-2 opacity-30">
<span class="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Swipe for more</span>
<span class="material-symbols-outlined text-sm" data-icon="keyboard_double_arrow_down">keyboard_double_arrow_down</span>
</div>
</div>
<!-- Subtle Additional Context (Bento Style Suggestion) -->
<div class="w-full max-w-md mt-8 grid grid-cols-2 gap-4">
<div class="bg-surface-container-low/60 backdrop-blur-md p-5 rounded-DEFAULT flex flex-col justify-between h-32 hover:bg-surface-container/70 transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" data-icon="auto_stories">auto_stories</span>
<div class="space-y-1">
<p class="text-xs font-label uppercase tracking-widest text-on-surface-variant">Daily Verse</p>
<p class="font-headline text-sm font-bold text-on-surface">312 Day Streak</p>
</div>
</div>
<div class="bg-surface-container-low/60 backdrop-blur-md p-5 rounded-DEFAULT flex flex-col justify-between h-32 hover:bg-surface-container/70 transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" data-icon="psychology_alt">psychology_alt</span>
<div class="space-y-1">
<p class="text-xs font-label uppercase tracking-widest text-on-surface-variant">Reflections</p>
<p class="font-headline text-sm font-bold text-on-surface">12 Unread</p>
</div>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-2xl rounded-t-[2rem] shadow-[0_-8px_32px_rgba(0,0,0,0.04)]">
<!-- Home Active -->
<a class="flex flex-col items-center justify-center bg-amber-100/50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-full w-12 h-12 scale-90 transition-transform duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
</a>
<!-- Explore -->
<a class="flex flex-col items-center justify-center text-stone-400 dark:text-stone-600 w-12 h-12 hover:text-amber-600 dark:hover:text-amber-300 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</a>
<!-- Library/Motion -->
<a class="flex flex-col items-center justify-center text-stone-400 dark:text-stone-600 w-12 h-12 hover:text-amber-600 dark:hover:text-amber-300 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</a>
<!-- Stats -->
<a class="flex flex-col items-center justify-center text-stone-400 dark:text-stone-600 w-12 h-12 hover:text-amber-600 dark:hover:text-amber-300 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</a>
<!-- Settings -->
<a class="flex flex-col items-center justify-center text-stone-400 dark:text-stone-600 w-12 h-12 hover:text-amber-600 dark:hover:text-amber-300 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</a>
</nav>
</body></html>

<!-- Ayah Countdown Timer -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Ayah Countdown</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .glass-glow {
            background: rgba(255, 248, 242, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(112, 98, 51, 0.1);
        }
        .progress-ring__circle {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body min-h-screen flex flex-col overflow-hidden">
<!-- Top Navigation Anchor -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-xl">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-stone-800" data-icon="menu">menu</span>
</div>
<h1 class="font-noto-serif text-lg tracking-tight text-amber-900 font-semibold">Digital Sanctuary</h1>
<div class="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" data-alt="portrait of a serene man with a short beard and gentle expression in soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7zLI0D_69jE9AXI3DskSeZ4aEo2cZ2JPrWKuSis19SdyjmoygLlRgCGWKHRMBZWV2aGzWB9E0jMSDDEZw8ZA9SRFg_gXQQGgabDskSAa-K7Ei-YTe-Mo7XnXtY1yaD-zd8uHtIUJRncmI9g8NUZg0d0gKnvZj6TFDO6VjXUpVAyHbtD4OgRiAFEeHjOtc9v98lN4NNK8-mM7xevBqjGHT7Rjg3wJpIMeLb4gC-CGya-eHBc3ua5PmeIHlrshD9wXiLQ6zQSWMX34"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow flex flex-col items-center justify-center relative px-8">
<!-- Decorative Background Element -->
<div class="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
<div class="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-surface-container to-primary-fixed blur-3xl"></div>
</div>
<!-- Hero Header -->
<div class="text-center mb-16 z-10">
<span class="font-label text-xs uppercase tracking-[0.3em] text-primary mb-2 block">The Journey Continues</span>
<h2 class="font-headline text-3xl font-bold text-on-surface">Next Connection</h2>
</div>
<!-- Glassmorphic Timer Section -->
<div class="relative z-10 flex items-center justify-center">
<!-- Glowing Ring Effect -->
<div class="absolute w-72 h-72 rounded-full border border-primary-fixed/30 animate-pulse"></div>
<!-- Main Circle -->
<div class="glass-glow w-64 h-64 rounded-full shadow-[0_32px_64px_-12px_rgba(87,74,30,0.08)] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
<!-- Progress Ring -->
<svg class="absolute inset-0 w-full h-full" viewbox="0 0 100 100">
<circle class="text-outline-variant/10" cx="50" cy="50" fill="transparent" r="48" stroke="currentColor" stroke-width="2"></circle>
<circle class="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="48" stroke-linecap="round" stroke-width="2" style="stroke-dasharray: 301.59; stroke-dashoffset: 80;"></circle>
</svg>
<div class="relative">
<span class="font-headline text-5xl font-bold text-primary block mb-1">12</span>
<span class="font-label text-sm font-medium text-on-surface-variant uppercase tracking-widest">Minutes</span>
</div>
</div>
<!-- Floating Decorative Text -->
<div class="absolute -bottom-12 w-full text-center">
<p class="font-body text-sm text-stone-500 italic">"Next ayah in 12 minutes"</p>
</div>
</div>
<!-- Sub-Content Bento Elements -->
<div class="mt-24 grid grid-cols-2 gap-4 w-full max-w-sm z-10">
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col gap-2">
<span class="material-symbols-outlined text-primary text-sm" data-icon="auto_awesome">auto_awesome</span>
<span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Daily Progress</span>
<span class="font-headline text-lg text-on-surface">8/12 Verses</span>
</div>
<div class="bg-surface-container-low p-4 rounded-lg flex flex-col gap-2">
<span class="material-symbols-outlined text-tertiary text-sm" data-icon="favorite">favorite</span>
<span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Heart Rate</span>
<span class="font-headline text-lg text-on-surface">Calm</span>
</div>
</div>
</main>
<!-- Bottom Action Shell -->
<footer class="fixed bottom-0 w-full z-50 flex flex-col items-center px-4 pb-12 pt-4">
<button class="px-8 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant font-label text-xs uppercase tracking-widest hover:bg-surface-container-high transition-colors duration-300 backdrop-blur-md">
            Pause notifications
        </button>
</footer>
<!-- Bottom Navigation Shell (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12">
<span class="material-symbols-outlined" data-icon="home">home</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</div>
<div class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90">
<span class="material-symbols-outlined" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</div>
</nav>
</body></html>

<!-- Widget Gallery Preview -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      .widget-shadow {
        box-shadow: 0 8px 32px rgba(35, 26, 8, 0.04);
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface font-body text-on-surface min-h-screen pb-32">
<!-- Top App Bar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-xl">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-stone-800">menu</span>
<h1 class="font-headline text-lg tracking-tight text-amber-900 font-semibold">Widget Gallery</h1>
</div>
<div class="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant/20">
<img class="w-full h-full object-cover" data-alt="Close up portrait of a scholarly man with a warm smile and gentle eyes in soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAh_fnlcD19WOERm4kJw7wBTzYEv6pfwz4ja9ppFd6hyzbhb_XILS8MAqx4aujMuxhL1BKLDOtnw2KgOTP_hgKTeYfK6MdJuA1EEmYc9m7dpWxVbHitqfKQ4xJSUMxmSndaojgXBlca5MQb0T_gf9fJjv-PsCRYkJpHZ4RjNF8ujjCMXbyWioner3AG1YxQvZDNAJeNB91N-Y5yKKqSce2MwixHTU7drbFyyKfGuFE6NBxaL_b66jesj5WIwqWJKPAdattx3gfPGY"/>
</div>
</header>
<main class="pt-24 px-6 max-w-2xl mx-auto">
<!-- Selection Controls -->
<section class="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
<div class="flex-1 min-w-[140px]">
<label class="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-2 ml-1">Refresh Rate</label>
<div class="relative">
<select class="w-full appearance-none bg-surface-container-low border-none rounded-DEFAULT py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-fixed cursor-pointer">
<option>Every 1 Hour</option>
<option selected="">Every 3 Hours</option>
<option>Every 6 Hours</option>
<option>Daily Refresh</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
<div class="flex-1 min-w-[140px]">
<label class="block text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mb-2 ml-1">Category</label>
<div class="relative">
<select class="w-full appearance-none bg-surface-container-low border-none rounded-DEFAULT py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary-fixed cursor-pointer">
<option selected="">Daily Verses</option>
<option>Dua &amp; Azkar</option>
<option>99 Names</option>
<option>Sunnah Habits</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
</section>
<!-- Gallery Sections -->
<div class="space-y-12">
<!-- Small Widgets -->
<section>
<h2 class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-6 flex items-center gap-2">
<span class="w-8 h-[1px] bg-outline-variant/30"></span>
                    Small Form Factor
                </h2>
<div class="grid grid-cols-2 gap-6">
<!-- Glass Minimalist -->
<div class="aspect-square glass-card rounded-xl p-5 flex flex-col justify-between widget-shadow border border-white/40">
<span class="material-symbols-outlined text-on-surface-variant scale-75 origin-top-left">auto_awesome</span>
<div class="text-right">
<p class="font-headline text-2xl leading-tight text-on-surface">ٱلسَّلَٰمُ</p>
<p class="text-[9px] uppercase tracking-tighter text-on-surface-variant mt-1">Peace</p>
</div>
</div>
<!-- Warm Gold Gradient -->
<div class="aspect-square bg-gradient-to-br from-primary-container via-primary to-[#4a3f1a] rounded-xl p-5 flex flex-col justify-between widget-shadow overflow-hidden relative">
<div class="absolute inset-0 opacity-10 mix-blend-overlay">
<img class="w-full h-full object-cover" data-alt="Subtle geometric Islamic pattern texture with soft light and organic shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnj36Pm52GZ8BaLXh4lslQ1vAM2bkQcVknUey01IyIyIqwiiqtE86VB61QCBLah1RmGIJ0EZZMG72Dnqn9tRxhFkVDnEyJL4XLEdCBNlA-nJY-T0Mlh7tgHXEw6t1qwQ10EjhXa3-2gZKx9rGaKtveBTvJkswIKcxHufG3tHi4lGwRd9f96jyw2jRYHn51cUutjROkqrFMfHnSQIvxSnIRwZD_rRzVlFK1rWRpQJc5vsPyUwV7EoyEcv8pGKf_mu9Vey2-Ex9xvcM"/>
</div>
<span class="material-symbols-outlined text-on-primary-container scale-75 origin-top-left relative z-10">menu_book</span>
<div class="text-right relative z-10">
<p class="font-headline text-2xl leading-tight text-white">ٱلْقُدُّوسُ</p>
<p class="text-[9px] uppercase tracking-tighter text-on-primary-container mt-1">The Pure</p>
</div>
</div>
</div>
</section>
<!-- Medium Widgets -->
<section>
<h2 class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-6 flex items-center gap-2">
<span class="w-8 h-[1px] bg-outline-variant/30"></span>
                    Medium Dynamic
                </h2>
<div class="space-y-8">
<!-- Text-Only Minimalist -->
<div class="w-full aspect-[2/1] bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-center widget-shadow border border-outline-variant/5">
<div class="flex justify-between items-start mb-4">
<div class="bg-primary/5 px-2 py-1 rounded-md">
<span class="text-[8px] font-bold text-primary uppercase tracking-widest">Surah Al-Baqarah</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant/40 text-sm">more_horiz</span>
</div>
<p class="font-headline text-xl text-on-surface leading-loose text-right" dir="rtl">فَٱذْكُرُونِيٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِي وَلَا تَكْفُرُونِ</p>
<p class="mt-3 text-xs text-on-surface-variant italic font-light line-clamp-1">"So remember Me; I will remember you..."</p>
</div>
<!-- Editorial Glass Card -->
<div class="w-full aspect-[2/1] relative rounded-lg overflow-hidden widget-shadow">
<img class="absolute inset-0 w-full h-full object-cover" data-alt="Abstract soft focus of desert dunes at sunset with warm orange and gold hues" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeSXXQj4isi9r82M95Y-UASdDyk0GITRlxeItX7aHC-HAv0BcA8qy7YBSiXp6C-whxbSyLrEFyfxrXAsIpHtJDO_ume3iOSEOhuJok69wOXlSO9zR_kaKbmJEDCw7_CR8jAxT-0e9xK70A2IBv7aYPuFGIDjKZ-HWzEFyPDNgfw5epPvhPpNsdWX4hBODtcSbVslh_alVte7p8znnf5XeuaNmr6095UZiWkAGZnqXWEl_TYoIO7nCwFM4NmL0EtPgpZVVPauHJFpA"/>
<div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
<div class="absolute inset-0 p-6 flex flex-col justify-between text-white">
<div class="flex justify-between items-center">
<span class="text-[9px] uppercase tracking-[0.2em] font-semibold text-white/80">Reflections</span>
<span class="material-symbols-outlined scale-75">bookmark</span>
</div>
<div>
<h3 class="font-headline text-2xl mb-1">Morning Remembrance</h3>
<p class="text-[10px] opacity-70">A moment of silence before the day begins.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Featured Large -->
<section>
<h2 class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-6 flex items-center gap-2">
<span class="w-8 h-[1px] bg-outline-variant/30"></span>
                    Interactive Journey
                </h2>
<div class="w-full bg-surface-container-low rounded-lg p-8 widget-shadow relative border border-white/50 overflow-hidden">
<div class="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
<div class="relative z-10">
<div class="flex items-center gap-3 mb-6">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">stars</span>
</div>
<div>
<p class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Current Goal</p>
<p class="text-sm font-semibold">30 Days of Mindfulness</p>
</div>
</div>
<div class="space-y-3">
<div class="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
<span>Progress</span>
<span>Day 18 / 30</span>
</div>
<div class="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
<div class="w-[60%] h-full bg-primary rounded-full"></div>
</div>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 transition-transform duration-300 hover:text-amber-600">
<span class="material-symbols-outlined">home</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 transition-transform duration-300 hover:text-amber-600">
<span class="material-symbols-outlined">explore</span>
</div>
<div class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90 transition-transform duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome_motion</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 transition-transform duration-300 hover:text-amber-600">
<span class="material-symbols-outlined">leaderboard</span>
</div>
<div class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 transition-transform duration-300 hover:text-amber-600">
<span class="material-symbols-outlined">settings</span>
</div>
</nav>
</body></html>

<!-- Daily Reflections Challenge -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        body {
            background: linear-gradient(180deg, #fff8f2 0%, #f3e0c2 100%);
            min-height: 100vh;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl">
<div class="flex items-center gap-3">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-50/50 transition-colors active:scale-95 duration-300 ease-out">
<span class="material-symbols-outlined text-stone-800" data-icon="menu">menu</span>
</button>
<span class="font-noto-serif text-lg tracking-tight text-stone-800">Digital Sanctuary</span>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container shadow-sm">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Portrait of a serene man with a short beard in soft natural lighting against a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7K3O76N7fjx6BNuF5nUBktqUajTFS6TqbU9RryYmtdmvCundECsVELIMI9qRXm4sSw5spT49EjRBKQkghipxtM7_aof6pCyBaju4IseKNk5lgXIa-IjwYv6o-a4C_VAN2IDywjvKYahV1Tkljf5fKqJknNyHM-YaK9R_DNPwEMaYEWNBf4iDh5gQr6-hjZMgdmz9gYPwgKcmafvZ9zQAMxfxMFrFbFXwASf0P0kwtzDRmBaomFO2asMLQUcGoTMC_SfpT7YC9dnA"/>
</div>
</header>
<main class="pt-24 pb-32 px-6 max-w-lg mx-auto">
<!-- Header Section -->
<div class="mb-10 text-center">
<h1 class="font-headline text-4xl font-bold text-on-surface mb-2 tracking-tight">Daily Reflections</h1>
<p class="text-on-surface-variant font-label text-sm tracking-wide uppercase opacity-70">A moment of peace for your soul</p>
</div>
<!-- Global Progress Indicator -->
<div class="flex justify-center mb-12">
<div class="relative w-48 h-48 flex items-center justify-center">
<!-- Outer Glow/Ring -->
<svg class="absolute inset-0 w-full h-full -rotate-90">
<circle class="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-width="8"></circle>
<circle class="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-dasharray="552.92" stroke-dashoffset="0" stroke-linecap="round" stroke-width="8"></circle>
</svg>
<div class="text-center z-10">
<span class="block font-headline text-5xl font-bold text-primary">7/7</span>
<span class="block font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase mt-1">Day Streak</span>
</div>
<!-- Decorative Light Pulse -->
<div class="absolute inset-0 rounded-full bg-primary/5 animate-pulse blur-2xl"></div>
</div>
</div>
<!-- Challenge Cards Bento-ish Layout -->
<div class="grid gap-6">
<!-- Task 1: Save Ayah -->
<div class="glass-card rounded-lg p-6 shadow-[0_8px_32px_rgba(35,26,8,0.04)] border border-white/20 transition-transform active:scale-[0.98]">
<div class="flex items-start justify-between mb-8">
<div class="bg-primary/10 p-3 rounded-2xl">
<span class="material-symbols-outlined text-primary" data-icon="favorite" style="font-variation-settings: 'FILL' 1;">favorite</span>
</div>
<span class="font-label text-xs font-medium text-primary bg-primary-fixed/30 px-3 py-1 rounded-full">3/7 Saved</span>
</div>
<h3 class="font-headline text-2xl font-semibold mb-2">Save today's Ayah</h3>
<p class="text-on-surface-variant text-sm leading-relaxed mb-6">Build your personal treasury of wisdom one verse at a time.</p>
<!-- Progress Bar -->
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-[42%] rounded-full"></div>
</div>
</div>
<!-- Task 2: Share with Friend -->
<div class="glass-card rounded-lg p-6 shadow-[0_8px_32px_rgba(35,26,8,0.04)] border border-white/20 flex items-center justify-between group cursor-pointer hover:bg-white/50 transition-all active:scale-[0.98]">
<div class="flex items-center gap-5">
<div class="bg-secondary/10 p-4 rounded-2xl group-hover:bg-secondary/20 transition-colors">
<span class="material-symbols-outlined text-secondary text-2xl" data-icon="share">share</span>
</div>
<div>
<h3 class="font-headline text-xl font-semibold">Share with a friend</h3>
<p class="text-on-surface-variant text-sm">Spread the light of reflection</p>
</div>
</div>
<span class="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</div>
<!-- Decorative Visual Element (Asymmetric) -->
<div class="mt-4 opacity-40">
<img alt="Abstract Calligraphy" class="w-40 h-auto ml-auto grayscale sepia" data-alt="Soft ethereal close-up of flowing organic golden lines resembling abstract Arabic calligraphy on cream paper texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyPYQWQXMWPk_Acr_jYNGuCdSpANBZsu9SPwkpKSBhui21lUmt3lqVs-CAPHxve3YXjYfNEdaf_qzlBktGTRD-fQVgyVM24lVT-yXpayoOIS8Z4UOOW01or8aRsjNg74jDrWKvu_Nwooz5bQHWrBc64qoyNrwzzOWh1f3TGtnEonCegmkeL4bR1bfMbG293mrsjtOsZ3aKXob1aDakEiu5VIjhE1INUhZOcXxidp8UvnolNHDfAd40OaDR725aaSFf1n4Ng2igBLo"/>
</div>
</div>
</main>
<!-- NavigationDrawer (Suppressed on this view to prioritize Focus, but defined in system) -->
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="home">home</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</button>
<button class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90 transition-transform duration-300">
<span class="material-symbols-outlined" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</nav>
</body></html>

<!-- Collections: Auto-Generated -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - My Reflections</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif", "serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
      }
      .glass-card {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 248, 242, 0.4) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      body {
        background: radial-gradient(circle at top right, #fff2e0 0%, #fff8f2 100%);
        min-height: 100vh;
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body text-on-surface selection:bg-primary-fixed-dim">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-50/50 transition-colors active:scale-95 duration-300 ease-out">
<span class="material-symbols-outlined text-stone-800" data-icon="menu">menu</span>
</button>
<h1 class="font-noto-serif text-lg tracking-tight text-amber-900 font-semibold">Digital Sanctuary</h1>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-variant">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="portrait of a serene man in thoughtful contemplation against a soft cream background with warm natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWR58vFu-NsL2FAUKXiczT7k9sHn16b4FJ1-JZr1Y1wl-AmSzeKp0jK8zrr5LBcXxMle5IJrtMOdkRBZDnYnOD5F1idZXn_AyAy8to2zYLx90ekBkN2TKJQIayFEnNVuArQR97UuocspGDxQXYbGkxhFyM2Df5_01G5M-Rd8G7pjmB9nupkKSA0mLp-phpFWlBHdJkCSeJSNa871DTlW5-aIspp0dX5Z4vz3j6j3o10nenSd-4-NIfmwF9uRf4h84zjOshg0psH_0"/>
</div>
</header>
<main class="pt-24 pb-32 px-6 max-w-5xl mx-auto">
<!-- Header Section -->
<section class="mb-10 space-y-2">
<h2 class="font-headline text-4xl font-bold text-on-surface tracking-tight">My Reflections</h2>
<p class="text-on-surface-variant font-label text-sm tracking-wide opacity-70">Curated wisdom from your spiritual journey</p>
</section>
<!-- Bento-inspired Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Sabr Collection -->
<div class="lg:col-span-2 lg:row-span-2 group cursor-pointer">
<div class="glass-card rounded-lg p-8 h-full flex flex-col justify-between shadow-[0_-8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10">
<div>
<div class="flex justify-between items-start mb-6">
<div class="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="hourglass_empty">hourglass_empty</span>
</div>
<span class="font-label text-xs font-semibold px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant">24 Ayahs</span>
</div>
<h3 class="font-headline text-3xl font-bold text-primary mb-4">Sabr</h3>
<p class="font-noto-serif italic text-lg text-on-surface-variant leading-relaxed opacity-90 mb-6">
                            "Indeed, Allah is with the patient."
                        </p>
</div>
<div class="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
<span class="text-sm font-medium text-primary">View Collection</span>
<span class="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</div>
</div>
</div>
<!-- Shukr Collection -->
<div class="lg:col-span-2 group cursor-pointer">
<div class="glass-card rounded-lg p-6 flex flex-col justify-between shadow-[0_-8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10">
<div class="flex items-center gap-6">
<div class="w-16 h-16 bg-tertiary-container/10 rounded-full flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-tertiary text-3xl" data-icon="favorite">favorite</span>
</div>
<div class="flex-1">
<div class="flex justify-between items-center mb-1">
<h3 class="font-headline text-2xl font-bold text-on-surface">Shukr</h3>
<span class="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Updated Today</span>
</div>
<p class="text-sm text-on-surface-variant line-clamp-1 opacity-80">"If you are grateful, I will surely increase you..."</p>
</div>
</div>
</div>
</div>
<!-- Hope Collection -->
<div class="group cursor-pointer">
<div class="glass-card rounded-lg p-6 h-full flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10">
<div class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-primary-container text-2xl" data-icon="light_mode">light_mode</span>
</div>
<h3 class="font-headline text-xl font-bold text-on-surface mb-2">Hope</h3>
<p class="text-xs text-on-surface-variant leading-relaxed opacity-70 mb-4 line-clamp-3">Finding light in the darkest of moments through His mercy.</p>
<div class="mt-auto flex -space-x-2 overflow-hidden">
<div class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-surface-variant"></div>
<div class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-surface-container-high"></div>
<div class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-primary-fixed flex items-center justify-center text-[8px] font-bold">+12</div>
</div>
</div>
</div>
<!-- Tawakkul Collection -->
<div class="group cursor-pointer">
<div class="glass-card rounded-lg p-6 h-full flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10">
<div class="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-secondary text-2xl" data-icon="anchor">anchor</span>
</div>
<h3 class="font-headline text-xl font-bold text-on-surface mb-2">Tawakkul</h3>
<p class="text-xs text-on-surface-variant leading-relaxed opacity-70 mb-4 line-clamp-3">Surrendering to the Divine decree with complete heart.</p>
<div class="mt-auto flex items-center justify-between">
<span class="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">8 Reflections</span>
<span class="material-symbols-outlined text-on-surface-variant text-sm" data-icon="more_horiz">more_horiz</span>
</div>
</div>
</div>
<!-- New Collection Card -->
<div class="lg:col-span-4 group cursor-pointer">
<div class="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-surface-container-low/50">
<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-primary" data-icon="add">add</span>
</div>
<p class="font-label text-sm font-semibold text-primary uppercase tracking-widest">Create New Collection</p>
</div>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="home">home</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</button>
<button class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90">
<span class="material-symbols-outlined" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</nav>
</body></html>

<!-- Stats & Journey Progress -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Journey Progress</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts: Noto Serif & Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif", "serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        display: inline-block;
        line-height: 1;
      }
      .glass-card {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      body {
        background-color: #fff8f2;
        color: #231a08;
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body selection:bg-primary-fixed selection:text-on-primary-fixed antialiased min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-xl">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-stone-800" data-icon="menu">menu</span>
<h1 class="font-headline text-lg tracking-tight text-amber-900 font-semibold">Digital Sanctuary</h1>
</div>
<div class="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/20">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Close up portrait of a middle-aged man with a kind expression and scholarly appearance in soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9QwOOZKD-3fZcYJCaj0so5KrbtCrSS-ntxW-NHekwQvAzmnbDREcYTfL-6MYKdGcK3yxY_HOOIbB3sUDHdgQkSAgevmKLzU3hiHih00NHfL1wsFKfohtQh7a5N45v2gddotQy5rilrbOszhYwyTY2ukPpM8fuANzLID-aXUCINBzamRYuNOkswGunovzEJyVFcSXCuozJm5fjMb_IjNa0Mxe7x21Es560g54H6Yo1C1O2OX38YpTln1NyBATtiNwGNOeY9CYES0k"/>
</div>
</header>
<main class="pt-24 px-6 max-w-2xl mx-auto space-y-10">
<!-- Hero Header Section -->
<section class="space-y-2">
<p class="font-label text-xs uppercase tracking-[0.2em] text-primary/60">My Journey</p>
<h2 class="font-headline text-4xl font-bold text-on-surface">Journey Progress</h2>
<p class="text-on-surface-variant font-light leading-relaxed">A quiet reflection on your path of knowledge and devotion.</p>
</section>
<!-- Stats Grid (Bento Style) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Daily Progress Card (Bar Chart) -->
<div class="glass-card p-8 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[320px]">
<div class="space-y-1">
<h3 class="font-headline text-xl text-on-surface">Daily Ayahs</h3>
<p class="text-sm text-on-surface-variant">Target: 12 Ayahs</p>
</div>
<div class="flex items-end justify-between h-40 gap-2 mt-8">
<div class="w-full bg-surface-container-low rounded-t-full h-1/4 transition-all duration-700"></div>
<div class="w-full bg-surface-container-low rounded-t-full h-1/2 transition-all duration-700"></div>
<div class="w-full bg-surface-container-low rounded-t-full h-2/3 transition-all duration-700"></div>
<div class="w-full bg-primary-container/40 rounded-t-full h-3/4 transition-all duration-700"></div>
<div class="w-full bg-primary-container/60 rounded-t-full h-5/6 transition-all duration-700"></div>
<div class="w-full bg-primary rounded-t-full h-full transition-all duration-700 ring-4 ring-primary-fixed/20"></div>
<div class="w-full bg-surface-container-low rounded-t-full h-0"></div>
</div>
<div class="flex justify-between mt-4 text-[10px] font-label tracking-tighter text-on-surface-variant/60 uppercase">
<span>Mon</span>
<span>Tue</span>
<span>Wed</span>
<span>Thu</span>
<span>Fri</span>
<span class="text-primary font-bold">Sat</span>
<span>Sun</span>
</div>
</div>
<!-- Weekly Activity Card (Progress Ring) -->
<div class="glass-card p-8 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center space-y-6 text-center">
<div class="relative w-40 h-40">
<!-- Background Circle -->
<svg class="w-full h-full -rotate-90 transform" viewbox="0 0 100 100">
<circle class="text-surface-container-low" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-width="8"></circle>
<!-- Progress Circle (5/7 = ~71%) -->
<circle class="text-primary" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" stroke-dasharray="263.89" stroke-dashoffset="76.5" stroke-linecap="round" stroke-width="8"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="text-3xl font-headline font-bold text-on-surface">5/7</span>
<span class="text-xs font-label uppercase tracking-widest text-primary/70">Days</span>
</div>
</div>
<div class="space-y-1">
<h3 class="font-headline text-xl text-on-surface">Weekly Consistency</h3>
<p class="text-sm text-on-surface-variant px-4">You have connected with the text for 5 days this week.</p>
</div>
</div>
<!-- Streak & Milestone Card (Large) -->
<div class="md:col-span-2 glass-card p-8 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-surface-container-lowest to-surface-container-low/50">
<div class="relative flex-shrink-0 group">
<div class="absolute inset-0 bg-primary-fixed/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
<div class="relative w-32 h-32 rounded-full border border-primary-fixed/40 flex items-center justify-center">
<span class="material-symbols-outlined text-5xl text-primary" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</div>
</div>
<div class="flex-grow space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary" data-icon="temp_preferences_custom" style="font-variation-settings: 'FILL' 1;">temp_preferences_custom</span>
<span class="font-label text-sm font-semibold text-tertiary uppercase tracking-wider">312 Day Streak</span>
</div>
<h3 class="font-headline text-2xl text-on-surface">Spiritual Discipline</h3>
<p class="text-on-surface-variant leading-relaxed max-w-md">Your consistent journey is building a sanctuary within. Stay mindful and proceed with peace.</p>
<div class="pt-4 flex gap-4">
<button class="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-medium hover:opacity-90 transition-opacity">Continue Journey</button>
<button class="px-6 py-2 bg-surface-container-highest text-on-surface rounded-full text-sm font-medium hover:bg-surface-container transition-colors">View Journal</button>
</div>
</div>
</div>
</div>
<!-- Decorative Quote / Ayah Section -->
<section class="py-12 text-center space-y-6">
<div class="w-12 h-0.5 bg-primary/20 mx-auto"></div>
<p class="font-headline italic text-xl text-on-surface leading-loose max-w-lg mx-auto">
                "Indeed, in the remembrance of Allah do hearts find rest."
            </p>
<p class="font-label text-xs uppercase tracking-widest text-primary/60">Surah Ar-Ra'd 13:28</p>
</section>
</main>
<!-- NavigationDrawer (Suppressed per logic, using BottomNavBar instead) -->
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="auto_awesome_motion">auto_awesome_motion</span>
</a>
<!-- Active Tab: Stats/Leaderboard mapping -->
<a class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard" style="font-variation-settings: 'FILL' 1;">leaderboard</span>
</a>
<a class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</a>
</nav>
</body></html>

<!-- Situations: Refined Guidance -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary | Instant Guidance</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700;900&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-dim": "#131313",
              "inverse-on-surface": "#303030",
              "primary-fixed": "#ffddb2",
              "on-tertiary-fixed": "#231a08",
              "on-tertiary": "#3a2f1b",
              "on-error": "#690005",
              "on-primary-fixed": "#291800",
              "on-primary-container": "#402b0c",
              "surface-bright": "#393939",
              "tertiary-container": "#a5957b",
              "outline": "#9a8f83",
              "on-tertiary-fixed-variant": "#51452f",
              "on-secondary-fixed-variant": "#52461a",
              "error": "#ffb4ab",
              "on-tertiary-container": "#392e1a",
              "surface-container-low": "#1b1b1b",
              "surface-container-highest": "#353535",
              "secondary": "#d8c58d",
              "on-secondary": "#3a2f05",
              "background": "#131313",
              "on-secondary-fixed": "#231b00",
              "primary": "#e3c196",
              "surface-container-lowest": "#0e0e0e",
              "on-background": "#e2e2e2",
              "on-error-container": "#ffdad6",
              "tertiary-fixed": "#f3e0c2",
              "secondary-fixed-dim": "#d8c58d",
              "on-primary-fixed-variant": "#5a4321",
              "inverse-surface": "#e2e2e2",
              "on-primary": "#412d0d",
              "tertiary": "#d6c4a8",
              "secondary-container": "#55481c",
              "on-surface": "#e2e2e2",
              "on-secondary-container": "#c9b780",
              "primary-fixed-dim": "#e3c196",
              "error-container": "#93000a",
              "inverse-primary": "#735a37",
              "surface-container-high": "#2a2a2a",
              "secondary-fixed": "#f5e1a7",
              "surface": "#131313",
              "tertiary-fixed-dim": "#d6c4a8",
              "surface-tint": "#e3c196",
              "surface-variant": "#353535",
              "primary-container": "#b0926a",
              "on-surface-variant": "#d1c4b7",
              "outline-variant": "#4e453c",
              "surface-container": "#1f1f1f"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .glass-card {
        background: rgba(27, 27, 27, 0.4);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      .golden-glow {
        box-shadow: 0 0 30px rgba(176, 146, 106, 0.15);
      }
      .spotlight-bg {
        background: radial-gradient(circle at 50% -20%, #2a2a2a 0%, #131313 70%);
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface-dim text-on-surface font-body selection:bg-primary/30 min-h-screen spotlight-bg">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex items-center justify-between px-8 h-20 w-full no-border tonal-shift bg-gradient-to-b from-black/20 to-transparent">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close-up portrait of a serene person in soft warm lighting with a blurred architectural background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvMMnThNiKFcKcAROkdnixEVw5X7OQxbHqoaIjS1naxQAHg1H_ruHrhrgHCeSfV3CfjgFSHulENRitkCgZRnfUA3Cp5D1EGYTCqAr1eBCvLiC86IqXSV-BkxyiWGPUYbNyUrojr90nc_xeG49ibORUX6UzcvFvbb9GU1d5OVLW-EjsXLTgh79aBi9M1txVlxPBgzvcLbBe4IOwIPDGJXPZFblZX-K8kUjqDyjtklnegeD2_o3YYgnU8SvMXd8W9V83RMkmR-1zblY"/>
</div>
</div>
<h1 class="font-['Noto_Serif'] font-black text-[#B0926A] drop-shadow-[0_0_8px_rgba(176,146,106,0.3)] font-['Noto_Serif'] font-bold text-2xl tracking-tight">Digital Sanctuary</h1>
<button class="text-[#B0926A] hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main class="pt-32 pb-40 px-8 max-w-5xl mx-auto">
<!-- Hero Section -->
<section class="mb-14 text-center">
<h2 class="font-headline text-4xl md:text-5xl text-primary font-bold mb-4 tracking-tight">Instant Guidance</h2>
<p class="text-on-surface-variant text-lg max-w-xl mx-auto font-light leading-relaxed">
                Find spiritual clarity and comfort tailored to your current heart-state. Select a situation to begin your journey.
            </p>
</section>
<!-- Situations Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
<!-- Stress - Large Feature Card -->
<div class="md:col-span-4 bg-surface-container-low rounded-[24px] p-8 glass-card border border-outline-variant/10 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-500">
<div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
<div class="relative z-10">
<div class="w-16 h-16 bg-[#B0926A]/10 rounded-2xl flex items-center justify-center mb-6 golden-glow">
<span class="material-symbols-outlined text-[#706233] text-4xl" data-icon="water_drop">water_drop</span>
</div>
<h3 class="font-headline text-2xl text-primary font-bold mb-3">Stress</h3>
<p class="text-on-surface-variant font-light mb-8 max-w-md">Find tranquility amidst the chaos of daily life with verses and reflections centered on patience and divine ease.</p>
<button class="bg-[#B0926A] text-on-primary px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
                        Seek Calm <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
<!-- Fear - Square Card -->
<div class="md:col-span-2 bg-surface-container-low rounded-[24px] p-8 glass-card border border-outline-variant/10 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-500">
<div class="w-14 h-14 bg-[#B0926A]/10 rounded-2xl flex items-center justify-center mb-6 golden-glow">
<span class="material-symbols-outlined text-[#706233] text-3xl" data-icon="shield">shield</span>
</div>
<h3 class="font-headline text-xl text-primary font-bold mb-2">Fear</h3>
<p class="text-on-surface-variant text-sm font-light mb-6 leading-relaxed">Courage through tawakkul when the unknown feels overwhelming.</p>
<button class="text-primary font-medium flex items-center gap-1 hover:gap-3 transition-all">
                    Explore <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<!-- Rizq - Square Card -->
<div class="md:col-span-2 bg-surface-container-low rounded-[24px] p-8 glass-card border border-outline-variant/10 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-500">
<div class="w-14 h-14 bg-[#B0926A]/10 rounded-2xl flex items-center justify-center mb-6 golden-glow">
<span class="material-symbols-outlined text-[#706233] text-3xl" data-icon="shutter_speed">shutter_speed</span>
</div>
<h3 class="font-headline text-xl text-primary font-bold mb-2">Rizq</h3>
<p class="text-on-surface-variant text-sm font-light mb-6 leading-relaxed">Abundance and sustenance. Trusting the Provider in times of need.</p>
<button class="text-primary font-medium flex items-center gap-1 hover:gap-3 transition-all">
                    Explore <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<!-- Peace - Rectangular Card -->
<div class="md:col-span-2 bg-surface-container-low rounded-[24px] p-8 glass-card border border-outline-variant/10 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-500">
<div class="w-14 h-14 bg-[#B0926A]/10 rounded-2xl flex items-center justify-center mb-6 golden-glow">
<span class="material-symbols-outlined text-[#706233] text-3xl" data-icon="spa">spa</span>
</div>
<h3 class="font-headline text-xl text-primary font-bold mb-2">Peace</h3>
<p class="text-on-surface-variant text-sm font-light mb-6 leading-relaxed">Inner stillness and spiritual contentment for the restless soul.</p>
<button class="text-primary font-medium flex items-center gap-1 hover:gap-3 transition-all">
                    Explore <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<!-- Motivation - Square Card -->
<div class="md:col-span-2 bg-surface-container-low rounded-[24px] p-8 glass-card border border-outline-variant/10 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-500">
<div class="w-14 h-14 bg-[#B0926A]/10 rounded-2xl flex items-center justify-center mb-6 golden-glow">
<span class="material-symbols-outlined text-[#706233] text-3xl" data-icon="bolt">bolt</span>
</div>
<h3 class="font-headline text-xl text-primary font-bold mb-2">Motivation</h3>
<p class="text-on-surface-variant text-sm font-light mb-6 leading-relaxed">Renewing your purpose and energy through divine wisdom.</p>
<button class="text-primary font-medium flex items-center gap-1 hover:gap-3 transition-all">
                    Explore <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
<!-- Secondary Sections -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-center">
<div class="rounded-[32px] overflow-hidden aspect-[4/3] bg-surface-container-highest relative">
<img alt="Morning Reflections" class="w-full h-full object-cover" data-alt="ethereal morning sunlight streaming through a minimalist prayer room with soft shadows and floating dust particles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgvCU6NGiTbcoICx-eS0_UkKWjvDxaw_zGw5O4zohdgcfvN8xhXENfCizk1LJfB09C03g3TeHOyUhTQMK5xY3E49kUxdbb3U_8dhq0v0LZu6EiSGeaJ3KSxFDYFiTBwAgAs16EiKyEJqlq0ooy89fbT0p4IS-kL5M1Gf9YRNdvWki1Ho8pF9_SX2N0eb0-tIjAW_NkTMYF5snCmowBpFaMGpo4UYoRaW_qCChoixQX-30XOkpejiqREaxAOJpRILo7dCEYYPR9-lk"/>
<div class="absolute inset-0 bg-black/30 flex items-end p-8">
<p class="font-headline text-2xl text-white font-bold">Featured Journey: Morning Calm</p>
</div>
</div>
<div class="space-y-6">
<h4 class="font-headline text-3xl text-primary font-bold tracking-tight">Curated for Your Path</h4>
<p class="text-on-surface-variant leading-relaxed">Every situation is met with specific verses from the Quran and authentic Supplications, providing a holistic sanctuary for your digital life. Our editorial approach ensures that the guidance you receive is both deep and accessible.</p>
<ul class="space-y-4">
<li class="flex items-center gap-4 text-secondary">
<span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
<span class="font-body text-on-surface">Thematic Quranic Verses</span>
</li>
<li class="flex items-center gap-4 text-secondary">
<span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
<span class="font-body text-on-surface">Daily Adhkar &amp; Dua</span>
</li>
<li class="flex items-center gap-4 text-secondary">
<span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
<span class="font-body text-on-surface">Spiritual Journaling Prompts</span>
</li>
</ul>
</div>
</div>
</main>
<!-- Floating Action Button -->
<div class="fixed bottom-28 left-0 right-0 flex justify-center z-40 pointer-events-none">
<button class="pointer-events-auto bg-[#B0926A] text-on-primary px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 active:scale-95 transition-all group border border-primary/20">
<span class="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500" data-icon="settings_heart">settings_heart</span>
            Personalize Your Situations
        </button>
</div>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full rounded-t-[32px] z-50 bg-[#131313]/60 backdrop-blur-2xl flex justify-around items-center h-24 pb-safe px-6 no-border bg-[#1b1b1b]/40 shadow-[0_-4px_40px_rgba(0,0,0,0.5)]">
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl" data-icon="home">home</span>
</a>
<a class="relative flex items-center justify-center text-[#B0926A] after:content-[''] after:absolute after:w-12 after:h-12 after:bg-[#B0926A]/10 after:rounded-full after:blur-md active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl" data-icon="explore">explore</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl" data-icon="collections_bookmark">collections_bookmark</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl" data-icon="leaderboard">leaderboard</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl" data-icon="settings">settings</span>
</a>
</nav>
</body></html>

<!-- Home: Golden Glow Experience -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Today for You</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Noto+Serif:ital,wght@0,400;0,700;0,900;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-dim": "#131313",
              "inverse-on-surface": "#303030",
              "primary-fixed": "#ffddb2",
              "on-tertiary-fixed": "#231a08",
              "on-tertiary": "#3a2f1b",
              "on-error": "#690005",
              "on-primary-fixed": "#291800",
              "on-primary-container": "#402b0c",
              "surface-bright": "#393939",
              "tertiary-container": "#a5957b",
              "outline": "#9a8f83",
              "on-tertiary-fixed-variant": "#51452f",
              "on-secondary-fixed-variant": "#52461a",
              "error": "#ffb4ab",
              "on-tertiary-container": "#392e1a",
              "surface-container-low": "#1b1b1b",
              "surface-container-highest": "#353535",
              "secondary": "#d8c58d",
              "on-secondary": "#3a2f05",
              "background": "#131313",
              "on-secondary-fixed": "#231b00",
              "primary": "#e3c196",
              "surface-container-lowest": "#0e0e0e",
              "on-background": "#e2e2e2",
              "on-error-container": "#ffdad6",
              "tertiary-fixed": "#f3e0c2",
              "secondary-fixed-dim": "#d8c58d",
              "on-primary-fixed-variant": "#5a4321",
              "inverse-surface": "#e2e2e2",
              "on-primary": "#412d0d",
              "tertiary": "#d6c4a8",
              "secondary-container": "#55481c",
              "on-surface": "#e2e2e2",
              "on-secondary-container": "#c9b780",
              "primary-fixed-dim": "#e3c196",
              "error-container": "#93000a",
              "inverse-primary": "#735a37",
              "surface-container-high": "#2a2a2a",
              "secondary-fixed": "#f5e1a7",
              "surface": "#131313",
              "tertiary-fixed-dim": "#d6c4a8",
              "surface-tint": "#e3c196",
              "surface-variant": "#353535",
              "primary-container": "#b0926a",
              "on-surface-variant": "#d1c4b7",
              "outline-variant": "#4e453c",
              "surface-container": "#1f1f1f"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }
        .gold-glow-mesh {
            background-color: #131313;
            background-image: 
                radial-gradient(at 0% 0%, rgba(176, 146, 106, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(112, 98, 51, 0.1) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(227, 193, 150, 0.05) 0px, transparent 50%);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface-dim text-on-surface font-body selection:bg-primary/30 selection:text-primary min-h-screen gold-glow-mesh overflow-x-hidden">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex items-center justify-between px-8 h-20 w-full bg-[#131313]/60 backdrop-blur-xl no-border tonal-shift bg-gradient-to-b from-black/20 to-transparent shadow-none">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/20">
<img alt="Profile" class="w-full h-full object-cover" data-alt="close-up portrait of a serene person in soft warm lighting, cinematic depth of field, golden hour aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEIpTiGpDWX4yRP7PAuNYsTIvPC0hP23UEbbLw_GzZ-hOI8tkfkL77LZzh1jF_tdiAMhAfQYJ7OcluNsHDnnm8-A27bYUN8aHKOEZNzOu2gnzi-Z-2i0jGTriVXMTFfQcKWCApwSlxE6x3Ap0nJIxmaj1torvcWEtOlPQ0W5rTAn8nDjs8w0cU0KJXBQsTPAB1fivKOdIEJCqIS_n1LK3PevMl8aMltiEK5-SCVKgWdKSdL75rwDBd8pMh0rRK2focQRloLb26UX0"/>
</div>
<h1 class="font-['Noto_Serif'] font-black text-[#B0926A] drop-shadow-[0_0_8px_rgba(176,146,106,0.3)] text-2xl tracking-tight">Digital Sanctuary</h1>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-[#B0926A] hover:opacity-80 transition-opacity active:scale-95 duration-200">notifications</button>
</div>
</header>
<main class="pt-32 pb-40 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[707px]">
<!-- Center Piece: Today's Verse -->
<div class="relative w-full">
<!-- Breathing Hint Animation Background -->
<div class="absolute inset-0 flex items-center justify-center -z-10">
<div class="w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border-2 border-primary/20 animate-pulse-slow"></div>
<div class="absolute w-64 h-64 md:w-[400px] md:h-[400px] rounded-full border border-primary/10 animate-pulse-slow" style="animation-delay: 1s;"></div>
</div>
<!-- Main Verse Card -->
<section class="relative bg-surface-container-low/40 backdrop-blur-3xl rounded-lg p-10 md:p-16 border border-primary/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden group">
<!-- Decorative Top-Left Glow -->
<div class="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
<div class="flex flex-col items-center text-center space-y-10">
<!-- Arabic Ayah -->
<div class="w-full">
<p class="font-headline text-4xl md:text-6xl leading-relaxed text-primary drop-shadow-[0_4px_12px_rgba(176,146,106,0.2)]" dir="rtl">
                            فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
                        </p>
</div>
<!-- English Translation -->
<div class="max-w-2xl">
<p class="font-headline text-xl md:text-2xl text-on-surface leading-snug">
                            For indeed, with hardship [will be] ease.
                        </p>
</div>
<!-- Reflection -->
<div class="max-w-xl">
<p class="font-headline italic text-on-surface-variant text-lg">
                            Every winter holds the seeds of spring; trust the season you are in.
                        </p>
</div>
<!-- Breath Instruction -->
<div class="flex flex-col items-center gap-3 mt-4">
<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
<span class="material-symbols-outlined text-primary text-sm">air</span>
<span class="font-label text-xs uppercase tracking-[0.2em] text-primary">Inhale peace, exhale worry</span>
</div>
</div>
</div>
<!-- Floating Heart Button -->
<button class="absolute top-8 right-8 w-14 h-14 rounded-full bg-surface-container-highest/50 backdrop-blur-md border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-all active:scale-90 group/btn">
<span class="material-symbols-outlined text-2xl group-active/btn:fill-[1]" style="font-variation-settings: 'FILL' 0;">favorite</span>
</button>
<!-- Source Metadata -->
<div class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
<span class="font-label text-[10px] uppercase tracking-widest">Surah Ash-Sharh 94:5</span>
</div>
</section>
<!-- 'Saved to Collections' Toast (Simulated Interaction State) -->
<div class="mt-8 flex justify-center">
<div class="flex items-center gap-3 px-6 py-3 bg-surface-container-highest/80 backdrop-blur-xl border border-primary/10 rounded-full shadow-lg">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-label text-sm text-on-surface">Saved to <span class="text-primary font-bold">Daily Devotion</span></span>
</div>
</div>
</div>
<!-- Quick Insights / Bento Grid Section -->
<div class="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="md:col-span-2 bg-surface-container-low p-8 rounded-lg flex flex-col justify-between border border-outline-variant/5">
<div>
<h3 class="font-headline text-lg text-primary mb-2">Morning Reflection</h3>
<p class="text-on-surface-variant leading-relaxed">The prophet (ﷺ) used to say this prayer every morning for clarity and strength. Take a moment to sit with the silence.</p>
</div>
<div class="mt-6 flex items-center gap-4">
<button class="bg-primary px-6 py-3 rounded-full text-on-primary font-bold text-sm hover:opacity-90 transition-opacity">Read Commentary</button>
<button class="text-primary flex items-center gap-2 text-sm font-semibold">
<span class="material-symbols-outlined">share</span> Share
                    </button>
</div>
</div>
<div class="bg-primary/5 p-8 rounded-lg border border-primary/10 flex flex-col items-center text-center justify-center gap-4">
<span class="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
<p class="font-headline text-sm text-on-surface">Curated specifically for your current journey based on "Resilience".</p>
<div class="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div class="w-2/3 h-full bg-primary"></div>
</div>
<span class="text-[10px] font-label uppercase tracking-tighter opacity-60">Journey Progress 65%</span>
</div>
</div>
</main>
<!-- NavigationDrawer (Suppressed based on focal screen rule, but available in logic) -->
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full rounded-t-[32px] z-50 bg-[#131313]/60 backdrop-blur-2xl flex justify-around items-center h-24 pb-safe px-6 no-border bg-[#1b1b1b]/40 shadow-[0_-4px_40px_rgba(0,0,0,0.5)]">
<!-- Home (Active) -->
<a class="relative flex items-center justify-center text-[#B0926A] after:content-[''] after:absolute after:w-12 after:h-12 after:bg-[#B0926A]/10 after:rounded-full after:blur-md active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl">home</span>
</a>
<!-- Explore -->
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl">explore</span>
</a>
<!-- Collections -->
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl">collections_bookmark</span>
</a>
<!-- Leaderboard -->
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl">leaderboard</span>
</a>
<!-- Settings -->
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined text-3xl">settings</span>
</a>
</nav>
<!-- Floating Action Button (Suppressed based on Detail screen/Focus journey rule) -->
</body></html>

<!-- 1-Minute Pause: Dark Mode Onyx -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Inter:wght@300;400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-dim": "#131313",
              "inverse-on-surface": "#303030",
              "primary-fixed": "#ffddb2",
              "on-tertiary-fixed": "#231a08",
              "on-tertiary": "#3a2f1b",
              "on-error": "#690005",
              "on-primary-fixed": "#291800",
              "on-primary-container": "#402b0c",
              "surface-bright": "#393939",
              "tertiary-container": "#a5957b",
              "outline": "#9a8f83",
              "on-tertiary-fixed-variant": "#51452f",
              "on-secondary-fixed-variant": "#52461a",
              "error": "#ffb4ab",
              "on-tertiary-container": "#392e1a",
              "surface-container-low": "#1b1b1b",
              "surface-container-highest": "#353535",
              "secondary": "#d8c58d",
              "on-secondary": "#3a2f05",
              "background": "#131313",
              "on-secondary-fixed": "#231b00",
              "primary": "#e3c196",
              "surface-container-lowest": "#0e0e0e",
              "on-background": "#e2e2e2",
              "on-error-container": "#ffdad6",
              "tertiary-fixed": "#f3e0c2",
              "secondary-fixed-dim": "#d8c58d",
              "on-primary-fixed-variant": "#5a4321",
              "inverse-surface": "#e2e2e2",
              "on-primary": "#412d0d",
              "tertiary": "#d6c4a8",
              "secondary-container": "#55481c",
              "on-surface": "#e2e2e2",
              "on-secondary-container": "#c9b780",
              "primary-fixed-dim": "#e3c196",
              "error-container": "#93000a",
              "inverse-primary": "#735a37",
              "surface-container-high": "#2a2a2a",
              "secondary-fixed": "#f5e1a7",
              "surface": "#131313",
              "tertiary-fixed-dim": "#d6c4a8",
              "surface-tint": "#e3c196",
              "surface-variant": "#353535",
              "primary-container": "#b0926a",
              "on-surface-variant": "#d1c4b7",
              "outline-variant": "#4e453c",
              "surface-container": "#1f1f1f"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        @keyframes soft-pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.15); opacity: 0.6; }
        }
        .animate-soft-pulse {
            animation: soft-pulse 4s ease-in-out infinite;
        }
        .glow-radial {
            background: radial-gradient(circle at center, rgba(176, 146, 106, 0.15) 0%, rgba(19, 19, 19, 0) 70%);
        }
        .glass-ring {
            border: 1px solid rgba(176, 146, 106, 0.2);
            backdrop-filter: blur(12px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body overflow-hidden selection:bg-primary/30">
<!-- Immersive Background Layer -->
<div class="fixed inset-0 z-0 overflow-hidden">
<!-- Base Dark Surface -->
<div class="absolute inset-0 bg-surface-dim"></div>
<!-- Central Golden Glow -->
<div class="absolute inset-0 glow-radial"></div>
<!-- Subtle Texture Overlay -->
<div class="absolute inset-0 opacity-20" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWBszWDq3-ea2rsDS38Keeqw_-rEuQAf2ivrILvNUsWp8d1lvqEW4G6eQK09fBfqPtIDoKY1XvLXgTZ3hKexN6oyHajxX5YRQ7d-fLo_C087qG9iItDL89STO0MnL6kfz3Z9PD-ITD8fFD7hssztCg591MTgXDAq2rojvAkS0gQrCXUXmWdIYA1_eylv_8dO_-PzQQDlZ_5CY1saaNCvjm7fao-0GnCi4j798BfI1EXBs9-DM2ZynCKUnt88-nc7-BAA8SC3TiRi0');">
</div>
</div>
<!-- 1-Minute Pause Content Canvas -->
<main class="relative z-10 h-screen w-full flex flex-col items-center justify-between py-20 px-8">
<!-- Top Metadata: Countdown -->
<header class="flex flex-col items-center gap-2">
<span class="font-headline italic text-primary/60 text-xs tracking-[0.2em] uppercase">
                Auto-closing in 45s
            </span>
<div class="h-px w-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-4"></div>
</header>
<!-- Central Breathing & Ayah Section -->
<section class="flex flex-col items-center justify-center flex-1 w-full max-w-2xl gap-16">
<!-- Pulsing Breathing Ring -->
<div class="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
<!-- Inner Pulse -->
<div class="absolute inset-0 rounded-full glass-ring animate-soft-pulse"></div>
<!-- Middle Pulse (Delayed) -->
<div class="absolute inset-4 rounded-full border border-primary/10 animate-soft-pulse" style="animation-delay: 1s;"></div>
<!-- Core Glow -->
<div class="w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
<!-- Center Visual (Optional Minimal Icon) -->
<span class="material-symbols-outlined text-primary/40 text-4xl" data-icon="auto_awesome">auto_awesome</span>
</div>
<!-- The Centered Ayah -->
<div class="text-center space-y-6">
<h1 class="font-headline text-3xl md:text-5xl lg:text-6xl text-on-surface leading-relaxed text-balance" dir="rtl">
                    فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
                </h1>
<p class="font-headline italic text-on-surface-variant text-lg md:text-xl opacity-80 max-w-lg mx-auto leading-relaxed">
                    "For indeed, with hardship [will be] ease."
                </p>
</div>
</section>
<!-- Bottom Footer: Interaction Hint -->
<footer class="flex flex-col items-center gap-6">
<div class="flex flex-col items-center gap-3 opacity-40">
<span class="material-symbols-outlined text-primary text-xl animate-bounce" data-icon="keyboard_double_arrow_down">keyboard_double_arrow_down</span>
<span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Swipe down to close</span>
</div>
<!-- Decorative Accent -->
<div class="w-12 h-1 bg-surface-container-highest rounded-full"></div>
</footer>
</main>
<!-- Content-specific suppression of Navigation Shell as per "The Destination Rule" 
         This screen is task-focused and immersive, hence global nav is suppressed. -->
<!-- Ambient Light Source Image (Decorative Background Element) -->
<div class="fixed -top-40 -right-40 w-[600px] h-[600px] opacity-10 pointer-events-none">
<img alt="Golden bokeh light" class="w-full h-full object-cover rounded-full blur-[120px]" data-alt="abstract soft golden light bokeh with deep shadows and warm organic glow against a dark charcoal background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnQI9yDVYQGuHDrP6eDGpZJP4SAitvht0442JhCHoTlMi7MtegKZIOxpfXMuBsAKOxzi7hlBppmM0oARzPUQXVhW7TWglKtA7knqzCmTgVYfuAdpZSdIMZBvOuaKvAt7GqZx6Mt8YjV-PgXsKwVwRgcnlJ5VCtmDbepTcdp3e3QlCIRYEbGoarcrUkZJhUxh1oJ79IF8r8jbi_hiWtq9HQ_d4yFbzJif8wGafv-ybVytk6_WV2kSShFiNMeDKnjaJOYicA3-s1HhM"/>
</div>
</body></html>

<!-- Home: Dark Mode Onyx & Gold -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Home</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700;900&amp;family=Inter:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-dim": "#131313",
              "inverse-on-surface": "#303030",
              "primary-fixed": "#ffddb2",
              "on-tertiary-fixed": "#231a08",
              "on-tertiary": "#3a2f1b",
              "on-error": "#690005",
              "on-primary-fixed": "#291800",
              "on-primary-container": "#402b0c",
              "surface-bright": "#393939",
              "tertiary-container": "#a5957b",
              "outline": "#9a8f83",
              "on-tertiary-fixed-variant": "#51452f",
              "on-secondary-fixed-variant": "#52461a",
              "error": "#ffb4ab",
              "on-tertiary-container": "#392e1a",
              "surface-container-low": "#1b1b1b",
              "surface-container-highest": "#353535",
              "secondary": "#d8c58d",
              "on-secondary": "#3a2f05",
              "background": "#131313",
              "on-secondary-fixed": "#231b00",
              "primary": "#e3c196",
              "surface-container-lowest": "#0e0e0e",
              "on-background": "#e2e2e2",
              "on-error-container": "#ffdad6",
              "tertiary-fixed": "#f3e0c2",
              "secondary-fixed-dim": "#d8c58d",
              "on-primary-fixed-variant": "#5a4321",
              "inverse-surface": "#e2e2e2",
              "on-primary": "#412d0d",
              "tertiary": "#d6c4a8",
              "secondary-container": "#55481c",
              "on-surface": "#e2e2e2",
              "on-secondary-container": "#c9b780",
              "primary-fixed-dim": "#e3c196",
              "error-container": "#93000a",
              "inverse-primary": "#735a37",
              "surface-container-high": "#2a2a2a",
              "secondary-fixed": "#f5e1a7",
              "surface": "#131313",
              "tertiary-fixed-dim": "#d6c4a8",
              "surface-tint": "#e3c196",
              "surface-variant": "#353535",
              "primary-container": "#b0926a",
              "on-surface-variant": "#d1c4b7",
              "outline-variant": "#4e453c",
              "surface-container": "#1f1f1f"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        body {
            background-color: #000000;
            background-image: radial-gradient(circle at top right, rgba(176, 146, 106, 0.15), transparent 60%);
            min-height: 100vh;
            color: #e2e2e2;
        }
        .glass-card {
            background: rgba(19, 19, 19, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(176, 146, 106, 0.2);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body selection:bg-primary/30">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl flex items-center justify-between px-8 h-20 w-full no-border tonal-shift bg-gradient-to-b from-black/20 to-transparent shadow-none">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close-up portrait of a serene man with a short beard in soft warm indoor lighting with a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKbrUOVMD0WloUKCLUM7ozSiTOx89Zx36pyGGJiHhR8HvzNHJ2wwDzj8BhPGTViIqbnlZdsW7L5F4roDmCuDg0-kJYTd-iCvSN-h2vyhwsHHOFT1jiZilSMAh_SfkEKdAuJMIb-cj2fDiuPaPWQR6bxDRE9gMjYWMofHgomJNdvc8wPW6UYNdkq7EXMzG0rLvBRvhv6Xv1w6VmzlzrDdPi1RgTBcFD_dACIUrZbVsndcomGe2WR-9KMAIxhOF7scNicwG94d-D7MI"/>
</div>
</div>
<h1 class="font-['Noto_Serif'] font-black text-[#B0926A] drop-shadow-[0_0_8px_rgba(176,146,106,0.3)] text-2xl tracking-tight">
            Digital Sanctuary
        </h1>
<button class="text-[#B0926A] hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main class="pt-28 pb-32 px-8 max-w-5xl mx-auto space-y-12">
<!-- Hero Section: Main Ayah Card -->
<section class="relative">
<div class="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
<div class="glass-card rounded-xl p-10 md:p-14 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-6 opacity-20">
<span class="material-symbols-outlined text-6xl text-primary" data-icon="auto_awesome">auto_awesome</span>
</div>
<div class="space-y-8 relative z-10">
<div class="flex items-center justify-between">
<span class="font-label text-xs uppercase tracking-[0.2em] text-secondary">Verse of the Day</span>
<span class="font-label text-xs text-on-surface-variant">Surah Al-Baqarah 2:286</span>
</div>
<p class="font-headline text-3xl md:text-5xl text-right leading-relaxed text-[#FAE7C9] selection:bg-primary/40" dir="rtl">
                        لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
                    </p>
<div class="space-y-4 max-w-2xl">
<p class="font-headline text-xl md:text-2xl text-[#B0926A] leading-snug">
                            "Allah does not burden a soul beyond that it can bear."
                        </p>
<p class="font-body text-sm text-on-surface-variant leading-relaxed">
                            A reminder of divine mercy and the inherent strength within every soul during times of trial.
                        </p>
</div>
<div class="flex gap-4 pt-4">
<button class="bg-primary-container text-on-primary px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-lg" data-icon="menu_book">menu_book</span>
                            Reflect
                        </button>
<button class="bg-surface-container-highest/50 border border-outline-variant/20 text-[#FAE7C9] px-6 py-3 rounded-full font-medium backdrop-blur-sm hover:bg-surface-container-highest transition-all">
<span class="material-symbols-outlined text-lg" data-icon="share">share</span>
</button>
</div>
</div>
</div>
</section>
<!-- Bento Grid Insights -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Journey Progress -->
<div class="md:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between min-h-[240px]">
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline text-2xl text-primary">Your Journey</h3>
<p class="text-on-surface-variant text-sm mt-1">7 Day Spiritual Streak</p>
</div>
<div class="bg-secondary-container/30 p-3 rounded-2xl">
<span class="material-symbols-outlined text-secondary" data-icon="insights">insights</span>
</div>
</div>
<div class="mt-8 space-y-4">
<div class="flex justify-between items-end text-xs font-label uppercase tracking-widest text-on-surface-variant">
<span>Current Milestone: The Path of Gratitude</span>
<span>65%</span>
</div>
<div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-primary to-secondary w-[65%] rounded-full"></div>
</div>
</div>
</div>
<!-- Quick Action: Community -->
<div class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 flex flex-col items-center text-center justify-center gap-4 group cursor-pointer hover:bg-surface-container-high transition-all">
<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl text-primary" data-icon="group">group</span>
</div>
<div>
<h4 class="font-headline text-lg text-[#FAE7C9]">Community</h4>
<p class="text-xs text-on-surface-variant mt-1">Join 1.2k others reflecting</p>
</div>
</div>
<!-- Daily Remembrance -->
<div class="glass-card rounded-xl p-8 flex flex-col justify-between min-h-[240px]">
<span class="font-label text-[10px] uppercase tracking-widest text-secondary">Adhkar Morning</span>
<div class="space-y-2">
<p class="font-headline text-xl text-[#FAE7C9]">SubhanAllah</p>
<p class="text-sm text-on-surface-variant">Glory be to Allah</p>
</div>
<div class="flex items-center gap-4">
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full border border-surface bg-surface-container-highest overflow-hidden">
<img alt="avatar" data-alt="close-up of man face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoxDljh5ojDVTCy-qIlh9WsqbkZ2dLahpBVOL-cU1UEAwwB6ZZVHdlsJaBbXrgFXn3BNwqIHcs39ZWKktMDcZBy47diRUaeXtJ2MOAaaoSkStVxVNlfjGOP3W9VIHX11e5-o8VhWGKZ0TZV7QruQohLHbfwLx5yZTCybdzGprHNTLF-hPSHZb-Ea7EITQ0fJ0FEVA0LgM157SE38Oa2rt91f6mAF7JFAb0V112vXaRIBh1qafMqf_Y2W0hNZcpuip_-4EjbCEwDfs"/>
</div>
<div class="w-6 h-6 rounded-full border border-surface bg-surface-container-highest overflow-hidden">
<img alt="avatar" data-alt="close-up of woman face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgwZwY-3_cOp7R-ZCeJOhLzbCs5ivk48Yfz4HZ_gxsn093VEDAbeXYe7usVBNVdc-dsA7da20lRIWyPr-I9T-pyD8TTQbGFH1wBmrylNHtCub-1ccUAM1Hw3lc2JIUUv3wrLNP_wo6ifvm3x3HCMf8XaCMwJ5snGxxLttR6rNWz24aCer0SPxkvNeJNmxoVOj-1nQsNqnVGUtxDVQ-Vo_sZCKgYiOR9zmjPwT6W7QGmWppabRx0S3RPiPJlQsnCEdySYRSao-Qin4"/>
</div>
</div>
<span class="text-[10px] text-on-surface-variant">42 others chanting now</span>
</div>
</div>
<!-- Library Explore -->
<div class="md:col-span-2 relative rounded-xl overflow-hidden group min-h-[240px]">
<img alt="Library Background" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="atmospheric photo of an ancient library with dust motes dancing in shafts of sunlight, soft shadows, warm tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFsSyYsVjr5tz-rnso9ypoxzlx6SUeRrjeYShhwCJfx0HWYam361VxUc2ewmpnBXVuds55B8cWvwWXAXNswTiJ7_brdTI3FdOQyVmpYj8aJDJ442vZBOq2PIuPH_xiLQniRTfyk_ibhy1A5E29IWswP3gUyW-NJSh9hGwD_wrFQrZSIOoEmoUWmT7Zu2Rt64rHKsaWX2cMCbpaRq9yHgytfZe2-KK0V6PqXouMTDbnEGLOpVKY9MEpxilJ4Tca9cHWNLMR7CvVW_8"/>
<div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
<div class="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
<div>
<h3 class="font-headline text-2xl text-[#FAE7C9]">The Wisdom Vault</h3>
<p class="text-sm text-on-surface-variant">Explore 500+ curated reflections</p>
</div>
<button class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg">
<span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full rounded-t-[32px] z-50 bg-[#131313]/60 backdrop-blur-2xl flex justify-around items-center h-24 pb-safe px-6 no-border bg-[#1b1b1b]/40 shadow-[0_-4px_40px_rgba(0,0,0,0.5)]">
<a class="relative flex items-center justify-center text-[#B0926A] after:content-[''] after:absolute after:w-12 after:h-12 after:bg-[#B0926A]/10 after:rounded-full after:blur-md transition-all active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined" data-icon="collections_bookmark">collections_bookmark</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</a>
<a class="flex items-center justify-center text-[#706233] opacity-60 hover:text-[#E1C78F] transition-colors active:scale-90 duration-300" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</a>
</nav>
</body></html>

<!-- Settings & Personalization -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Digital Sanctuary - Settings</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container": "#ffebcd",
              "outline-variant": "#cdc6b6",
              "on-surface-variant": "#4b463b",
              "primary-container": "#706233",
              "surface-variant": "#f3e0c2",
              "surface-tint": "#6b5d2f",
              "tertiary-fixed-dim": "#ffb4ab",
              "surface": "#fff8f2",
              "inverse-primary": "#d8c58d",
              "surface-container-high": "#f9e6c8",
              "secondary-fixed": "#ffddb2",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#d8c58d",
              "on-secondary-container": "#785e3a",
              "on-surface": "#231a08",
              "secondary-container": "#fddaad",
              "tertiary": "#931a19",
              "on-primary": "#ffffff",
              "inverse-surface": "#3a2f1b",
              "on-primary-fixed-variant": "#52461a",
              "secondary-fixed-dim": "#e3c196",
              "tertiary-fixed": "#ffdad6",
              "on-error-container": "#93000a",
              "on-background": "#231a08",
              "surface-container-lowest": "#ffffff",
              "primary": "#574a1e",
              "on-secondary-fixed": "#291800",
              "background": "#fff8f2",
              "on-secondary": "#ffffff",
              "secondary": "#735a37",
              "surface-container-highest": "#f3e0c2",
              "surface-container-low": "#fff2e0",
              "on-tertiary-container": "#ffd7d2",
              "error": "#ba1a1a",
              "on-secondary-fixed-variant": "#5a4321",
              "on-tertiary-fixed-variant": "#8d1515",
              "outline": "#7c7769",
              "tertiary-container": "#b5342e",
              "surface-bright": "#fff8f2",
              "on-primary-container": "#f2dfa4",
              "on-primary-fixed": "#231b00",
              "on-error": "#ffffff",
              "on-tertiary": "#ffffff",
              "inverse-on-surface": "#ffefd6",
              "primary-fixed": "#f5e1a7",
              "on-tertiary-fixed": "#410002",
              "surface-dim": "#ead8ba"
            },
            fontFamily: {
              "headline": ["Noto Serif"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        body {
            background: radial-gradient(circle at top right, #fff2e0 0%, #fff8f2 100%);
            -webkit-tap-highlight-color: transparent;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body text-on-surface min-h-screen pb-32">
<!-- Top App Bar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-xl">
<div class="flex items-center gap-4">
<button class="p-2 hover:bg-amber-50/50 transition-colors rounded-full active:scale-95 duration-300">
<span class="material-symbols-outlined text-stone-800">menu</span>
</button>
<h1 class="font-noto-serif text-lg tracking-tight text-amber-900 font-semibold">Digital Sanctuary</h1>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container shadow-sm">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Close-up portrait of a thoughtful man with a neat beard, soft cinematic lighting, neutral desert-toned background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX8c8OD75rdnW5mXTUakGuPgfzuP5cmBxDXdcXeVjcvEMCwcfMcUEaixD7y9M1Q0ADdQrkmj8mV3puq03XgDGydta530SvYRqXWLIfuOwL0A2DOEYYl7rQz3QRJLHaG3q5vrFHQfWRfl1UYWJ5kWSvd1Bw5j3H-w4Uh96m6vJw6nr1M1P3ajCzxsYUs3fUxFOrk-g5e_PRDjEtv4DRPAlxv72zwTmaVNZ985hh438DkJQ8sJfUloaiEMsBpndMWc8MjNRU3p0SiBk"/>
</div>
</header>
<main class="pt-24 px-6 max-w-2xl mx-auto space-y-8">
<!-- Header Section -->
<section class="mb-10">
<h2 class="font-headline text-4xl text-on-surface leading-tight tracking-tight">Personalize Your Experience</h2>
<p class="text-on-surface-variant mt-2 text-lg">Create a space that resonates with your soul.</p>
</section>
<!-- Widget Settings Card -->
<div class="glass-card rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-2xl">widgets</span>
<h3 class="font-headline text-xl font-bold">Widget Settings</h3>
</div>
<!-- Interval -->
<div class="space-y-4">
<label class="text-sm font-medium text-on-surface-variant tracking-wide uppercase">Refresh Interval</label>
<div class="grid grid-cols-3 gap-3">
<button class="py-3 px-4 rounded-md bg-primary-fixed text-on-primary-fixed font-semibold text-sm transition-all hover:opacity-90 active:scale-95">1h</button>
<button class="py-3 px-4 rounded-md bg-surface-variant text-on-surface-variant font-medium text-sm transition-all hover:bg-surface-container active:scale-95">3h</button>
<div class="relative group">
<button class="w-full py-3 px-4 rounded-md bg-surface-variant text-on-surface-variant font-medium text-sm flex items-center justify-between transition-all hover:bg-surface-container">
                            Custom
                            <span class="material-symbols-outlined text-sm">expand_more</span>
</button>
</div>
</div>
</div>
<!-- Categories -->
<div class="space-y-4">
<label class="text-sm font-medium text-on-surface-variant tracking-wide uppercase">Focus Categories</label>
<div class="flex flex-wrap gap-2">
<span class="px-5 py-2 rounded-full bg-primary-fixed text-on-primary-fixed text-sm font-medium">Stress</span>
<span class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container cursor-pointer transition-colors">Fear</span>
<span class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container cursor-pointer transition-colors">Gratitude</span>
<span class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container cursor-pointer transition-colors">Patience</span>
<span class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container cursor-pointer transition-colors">Hope</span>
</div>
</div>
</div>
<!-- Appearance Card -->
<div class="glass-card rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-2xl">palette</span>
<h3 class="font-headline text-xl font-bold">Appearance</h3>
</div>
<div class="flex items-center justify-between py-2 group cursor-pointer">
<div class="space-y-1">
<p class="font-medium">Font size &amp; style options</p>
<p class="text-sm text-on-surface-variant">Customize calligraphy &amp; translation text</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
</div>
<div class="space-y-4 pt-4 border-t border-outline-variant/15">
<label class="text-sm font-medium text-on-surface-variant tracking-wide uppercase">Interface Theme</label>
<div class="flex p-1 bg-surface-container-low rounded-xl">
<button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-white shadow-sm text-primary font-semibold">
<span class="material-symbols-outlined text-[20px]">light_mode</span>
                        Light
                    </button>
<button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/30">
<span class="material-symbols-outlined text-[20px]">dark_mode</span>
                        Dark
                    </button>
<button class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/30">
<span class="material-symbols-outlined text-[20px]">settings_brightness</span>
                        Auto
                    </button>
</div>
</div>
</div>
<!-- Notifications Card -->
<div class="glass-card rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-2xl">notifications_active</span>
<div class="space-y-1">
<h3 class="font-headline text-xl font-bold leading-none">Notifications</h3>
<p class="text-on-surface-variant text-sm">Daily reminder for reflections</p>
</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-14 h-8 bg-surface-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
<!-- Danger Zone (Subtle) -->
<div class="pt-8 pb-12 text-center">
<button class="text-tertiary font-medium text-sm flex items-center justify-center gap-2 mx-auto hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined text-sm">logout</span>
                Sign out of Sanctuary
            </button>
<p class="mt-4 text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Version 2.4.0 • Digital Sanctuary</p>
</div>
</main>
<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-stone-50/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.04)] rounded-t-[2rem]">
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined">home</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined">explore</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined">auto_awesome_motion</span>
</button>
<button class="flex flex-col items-center justify-center text-stone-400 w-12 h-12 hover:text-amber-600 transition-colors">
<span class="material-symbols-outlined">leaderboard</span>
</button>
<button class="flex flex-col items-center justify-center bg-amber-100/50 text-amber-900 rounded-full w-12 h-12 scale-90 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">settings</span>
</button>
</nav>
</body></html>

import { useState, useEffect } from "react";

const verses = [
{ arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "For indeed, with hardship comes ease.", ref: "Ash-Sharh 94:5" },
{ arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", translation: "Indeed, Allah loves those who rely upon Him.", ref: "Al-Imran 3:159" },
{ arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", translation: "Allah does not burden a soul beyond that it can bear.", ref: "Al-Baqarah 2:286" },
{ arabic: "فَٱذْكُرُونِيٓ أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", ref: "Al-Baqarah 2:152" },
{ arabic: "وَإِن تَعُدُّوا۟ نِعْمَتَ اللَّهِ لَا تُحْصُوهَا", translation: "If you count Allah's blessings, you will never enumerate them all.", ref: "Ibrahim 14:34" },
];

const collections = [
{ name: "Sabr", icon: "⏳", count: 24, quote: "Indeed, Allah is with the patient.", color: "#C8A96E" },
{ name: "Shukr", icon: "♡", count: 18, quote: "If you are grateful, I will surely increase you...", color: "#B87333" },
{ name: "Hope", icon: "☀", count: 14, quote: "After every hardship, relief is near.", color: "#D4A853" },
{ name: "Tawakkul", icon: "⚓", count: 8, quote: "Surrendering to divine decree with complete heart.", color: "#8B7355" },
];

const weekDays = ["M","T","W","T","F","S","S"];
const barHeights = [25, 40, 55, 65, 78, 100, 0];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

_,_::before,\*::after{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:0;}

body,#root{
font-family:'DM Sans',sans-serif;
background:#F3E0C2;
min-height:100vh;
}

.app{
max-width:430px;
margin:0 auto;
min-height:100vh;
background:linear-gradient(165deg,#FFF8F2 0%,#FFF2E0 55%,#F5E8D0 100%);
position:relative;
overflow:hidden;
}

.ms{
font-family:'Material Symbols Outlined';
font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24;
font-size:24px;
display:inline-flex;align-items:center;justify-content:center;
line-height:1;user-select:none;
}
.ms.filled{font-variation-settings:'FILL' 1,'wght' 300,'GRAD' 0,'opsz' 24;}

.topbar{
position:sticky;top:0;z-index:50;
display:flex;align-items:center;justify-content:space-between;
padding:0 20px;height:60px;
background:rgba(255,248,242,0.82);
backdrop-filter:blur(24px);
border-bottom:0.5px solid rgba(176,146,106,0.15);
}
.app-title{
font-family:'Noto Serif',serif;font-size:17px;font-weight:700;
font-style:italic;color:#574a1e;letter-spacing:-0.3px;
}
.avatar{
width:34px;height:34px;border-radius:50%;
background:linear-gradient(135deg,#D8C58D,#B0926A);
display:flex;align-items:center;justify-content:center;
font-family:'Noto Serif',serif;font-weight:700;color:#fff;font-size:12px;
border:1.5px solid rgba(176,146,106,0.35);
flex-shrink:0;
}

.botnav{
position:fixed;bottom:0;left:50%;transform:translateX(-50%);
width:100%;max-width:430px;
display:flex;justify-content:space-around;align-items:center;
padding:10px 16px 18px;
background:rgba(255,248,242,0.92);
backdrop-filter:blur(28px);
border-top:0.5px solid rgba(176,146,106,0.15);
border-radius:22px 22px 0 0;
z-index:50;
}
.nbtn{
display:flex;flex-direction:column;align-items:center;
background:none;border:none;cursor:pointer;
padding:8px 14px;border-radius:14px;
color:#9a8f83;transition:all 0.2s;
}
.nbtn.active{background:rgba(176,146,106,0.14);color:#574a1e;}
.nbtn:active{transform:scale(0.9);}

.screen{
padding:20px 18px 100px;
height:calc(100vh - 60px);
overflow-y:auto;
}

.card{
background:rgba(255,255,255,0.52);
backdrop-filter:blur(20px);
border:0.5px solid rgba(176,146,106,0.18);
border-radius:20px;
box-shadow:0 3px 16px rgba(87,74,30,0.05);
}

.hl{font-family:'Noto Serif',serif;}
.sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#9a8f83;}
.badge{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;padding:3px 8px;border-radius:6px;background:rgba(176,146,106,0.14);color:#574a1e;}
.divider{height:0.5px;background:rgba(176,146,106,0.15);margin:14px 0;}

.arabic{font-family:'Noto Serif',serif;font-size:27px;line-height:2;color:#574a1e;text-align:right;direction:rtl;}
.trans{font-family:'Noto Serif',serif;font-style:italic;font-size:14px;color:#4b463b;line-height:1.75;text-align:center;}

.pill{padding:10px 22px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;border:none;}
.pill.p{background:#574a1e;color:#fff;}
.pill.p:hover{background:#706233;}
.pill.g{background:rgba(176,146,106,0.12);border:0.5px solid rgba(176,146,106,0.3);color:#574a1e;}
.pill:active{transform:scale(0.95);}

.chip{padding:6px 15px;border-radius:50px;font-size:13px;cursor:pointer;transition:all .2s;border:none;font-family:'DM Sans',sans-serif;}
.chip.s{background:#F5E1A7;color:#574a1e;font-weight:600;}
.chip.u{background:rgba(176,146,106,0.1);color:#7c7769;}
.chip:active{transform:scale(0.94);}

.sit-card{
background:rgba(255,255,255,0.5);backdrop-filter:blur(16px);
border:0.5px solid rgba(176,146,106,0.2);border-radius:18px;
padding:22px 16px;display:flex;flex-direction:column;
align-items:center;gap:11px;cursor:pointer;
transition:all .3s;box-shadow:0 2px 10px rgba(87,74,30,0.04);
}
.sit-card:hover{background:rgba(255,255,255,.7);transform:translateY(-2px);}
.sit-card:active{transform:scale(.96);}
.sit-icon{
width:50px;height:50px;border-radius:50%;
background:rgba(176,146,106,0.12);
display:flex;align-items:center;justify-content:center;
color:#574a1e;transition:transform .3s;
}
.sit-card:hover .sit-icon{transform:scale(1.08);}

.grid2{display:grid;grid-template-columns:1fr 1fr;gap:11px;}

.pause-over{
position:fixed;inset:0;z-index:200;
background:linear-gradient(160deg,#1a1208 0%,#231a08 60%,#1a1510 100%);
display:flex;flex-direction:column;align-items:center;justify-content:center;
padding:40px 30px;overflow:hidden;
}
@keyframes pr{0%,100%{transform:scale(1);opacity:.35;}50%{transform:scale(1.12);opacity:.7;}}
.pring{position:absolute;border-radius:50%;border:1px solid rgba(176,146,106,0.22);animation:pr 4s ease-in-out infinite;}

.tog-track{width:46px;height:25px;border-radius:13px;position:relative;cursor:pointer;transition:background .2s;}
.tog-thumb{width:19px;height:19px;border-radius:50%;background:#fff;position:absolute;top:3px;left:3px;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);}
.tog-on{background:#B0926A;} .tog-on .tog-thumb{transform:translateX(21px);}
.tog-off{background:#cdc6b6;}

@keyframes fu{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fu .4s ease forwards;}

.settings-row{
display:flex;align-items:center;justify-content:space-between;
padding:13px 0;border-bottom:0.5px solid rgba(176,146,106,0.1);cursor:pointer;
}
.settings-row:last-child{border-bottom:none;}
.settings-row:active{opacity:.7;}

.orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(55px);}

.theme-tabs{display:flex;background:rgba(176,146,106,0.1);border-radius:14px;padding:4px;gap:4px;}
.theme-tab{flex:1;padding:9px 6px;border-radius:10px;border:none;cursor:pointer;font-size:12px;font-family:'DM Sans',sans-serif;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:5px;}
.theme-tab.active{background:#fff;color:#574a1e;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.theme-tab.inactive{background:transparent;color:#9a8f83;}
`;

function TopBar() {
return (

<div className="topbar">
<span className="ms" style={{color:"#574a1e"}}>menu</span>
<span className="app-title">Digital Sanctuary</span>
<div className="avatar">مح</div>
</div>
);
}

function BottomNav({ active, go }) {
const items = [
{id:"home",icon:"home"},{id:"situations",icon:"explore"},
{id:"collections",icon:"auto_awesome_motion"},
{id:"stats",icon:"leaderboard"},{id:"settings",icon:"settings"},
];
return (

<div className="botnav">
{items.map(({id,icon})=>(
<button key={id} className={`nbtn${active===id?" active":""}`} onClick={()=>go(id)}>
<span className={`ms${active===id?" filled":""}`}>{icon}</span>
</button>
))}
</div>
);
}

/_ ─── HOME ─────────────────────────────────────────────────── _/
function Home({go, setVerse}) {
const [saved, setSaved] = useState(false);
const v = verses[0];
return (

<div className="screen">
<div className="orb" style={{width:280,height:280,top:-60,right:-60,background:"rgba(176,146,106,0.08)"}}/>
<div style={{marginBottom:18}}>
<p className="hl" style={{fontSize:20,fontStyle:"italic",color:"#574a1e",opacity:.85}}>Today for you</p>
</div>
{/_ Hero card _/}
<div className="card" style={{padding:"26px 22px",marginBottom:13,position:"relative",overflow:"hidden"}}>
<div className="orb" style={{width:100,height:100,top:-25,right:-25,background:"rgba(176,146,106,0.08)"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
<span className="badge">Verse of the Day</span>
<span style={{fontSize:10,color:"#9a8f83",letterSpacing:"0.1em"}}>{v.ref}</span>
</div>
<p className="arabic" style={{margin:"18px 0 10px"}}>{v.arabic}</p>
<p className="trans" style={{marginBottom:14}}>"{v.translation}"</p>
<div className="divider"/>
<p className="hl" style={{fontStyle:"italic",fontSize:13,color:"#7c7769",textAlign:"center",marginBottom:18}}>
Trust in the process of your journey.
</p>
<div style={{display:"flex",gap:9}}>
<button className="pill p" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500);}}>
{saved?"✓ Saved":"Save Ayah"}
</button>
<button className="pill g" onClick={()=>{setVerse(v);go("pause");}}>1-Min Pause</button>
</div>
</div>
{/_ Bento _/}
<div className="grid2" style={{marginBottom:13}}>
{[
{icon:"auto_stories",lbl:"Daily Verse",val:"312 Day Streak"},
{icon:"psychology_alt",lbl:"Reflections",val:"12 Unread",ic:"#931a19"},
].map(({icon,lbl,val,ic})=>(
<div key={lbl} className="card" style={{padding:16}}>
<span className="ms" style={{fontSize:20,color:ic||"#574a1e",marginBottom:8,display:"block"}}>{icon}</span>
<p className="sec-lbl" style={{marginBottom:3}}>{lbl}</p>
<p className="hl" style={{fontSize:15,fontWeight:700}}>{val}</p>
</div>
))}
</div>
{/_ Morning reflection _/}
<div className="card" style={{padding:20}}>
<h3 className="hl" style={{fontSize:16,fontWeight:700,marginBottom:8,color:"#574a1e"}}>Morning Reflection</h3>
<p style={{fontSize:13,color:"#4b463b",lineHeight:1.7,marginBottom:14}}>
The prophet (ﷺ) used to recite this prayer every morning for clarity and strength.
</p>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<span style={{fontSize:10,color:"#9a8f83",textTransform:"uppercase",letterSpacing:"0.12em",whiteSpace:"nowrap"}}>Progress</span>
<div style={{flex:1,height:4,background:"rgba(176,146,106,0.2)",borderRadius:2}}>
<div style={{width:"65%",height:"100%",background:"#B0926A",borderRadius:2}}/>
</div>
<span style={{fontSize:11,color:"#574a1e",fontWeight:600}}>65%</span>
</div>
</div>
</div>
);
}

/_ ─── SITUATIONS ───────────────────────────────────────────── _/
function Situations({go, setVerse}) {
const sits = [
{label:"Stress",icon:"psychology",verse:verses[0]},
{label:"Fear",icon:"shield",verse:verses[2]},
{label:"Rizq",icon:"paid",verse:verses[4]},
{label:"Peace",icon:"spa",verse:verses[2]},
{label:"Hope",icon:"light_mode",verse:verses[0]},
{label:"Motivation",icon:"bolt",verse:verses[3]},
];
return (

<div className="screen">
<div className="orb" style={{width:260,height:260,top:-50,right:-60,background:"rgba(176,146,106,0.09)"}}/>
<div style={{textAlign:"center",marginBottom:26}}>
<h2 className="hl" style={{fontSize:30,fontWeight:700,letterSpacing:"-0.5px",marginBottom:5}}>
How are you <em style={{fontWeight:400}}>feeling?</em>
</h2>
<p style={{fontSize:13,color:"#7c7769",fontWeight:300}}>Seek solace through the Divine Word</p>
</div>
<div className="grid2">
{sits.map(({label,icon,verse})=>(
<div key={label} className="sit-card" onClick={()=>{setVerse(verse);go("pause");}}>
<div className="sit-icon">
<span className="ms" style={{fontSize:26}}>{icon}</span>
</div>
<span className="hl" style={{fontSize:14,fontWeight:700,color:"#231a08"}}>{label}</span>
</div>
))}
</div>
<div style={{textAlign:"center",marginTop:26}}>
<p className="sec-lbl" style={{marginBottom:8}}>or explore by</p>
<button className="hl" style={{fontStyle:"italic",fontSize:14,color:"#574a1e",background:"none",border:"none",cursor:"pointer",borderBottom:"1px solid rgba(87,74,30,0.2)",paddingBottom:2}}>
Recent Reflections
</button>
</div>
</div>
);
}

/_ ─── PAUSE OVERLAY ────────────────────────────────────────── _/
function Pause({verse, go}) {
const [sec, setSec] = useState(60);
const v = verse || verses[0];
useEffect(()=>{
if(sec<=0) return;
const t = setTimeout(()=>setSec(s=>s-1),1000);
return ()=>clearTimeout(t);
},[sec]);
return (

<div className="pause-over">
<div className="orb" style={{width:350,height:350,top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"rgba(176,146,106,0.07)",filter:"blur(80px)"}}/>
<button onClick={()=>go("situations")} style={{position:"absolute",top:52,right:22,background:"rgba(255,255,255,0.09)",border:"0.5px solid rgba(176,146,106,0.28)",borderRadius:"50%",width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#D8C58D"}}>
<span className="ms" style={{fontSize:17}}>close</span>
</button>
<p style={{fontSize:10,textTransform:"uppercase",letterSpacing:".3em",color:"rgba(216,197,141,0.45)",marginBottom:44}}>
{sec>0?`Restoring Stillness · ${sec}s`:"Alhamdulillah"}
</p>
<div style={{position:"relative",width:180,height:180,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:44}}>
<div className="pring" style={{width:180,height:180,animationDelay:"0s"}}/>
<div className="pring" style={{width:140,height:140,animationDelay:"1s"}}/>
<div className="pring" style={{width:100,height:100,animationDelay:"2s"}}/>
<span className="ms" style={{fontSize:28,color:"rgba(176,146,106,0.45)",position:"relative",zIndex:2}}>auto_awesome</span>
</div>
<p style={{fontFamily:"'Noto Serif',serif",fontSize:29,lineHeight:2,color:"#D8C58D",textAlign:"right",direction:"rtl",marginBottom:14,textShadow:"0 0 40px rgba(176,146,106,0.25)"}}>{v.arabic}</p>
<p style={{fontFamily:"'Noto Serif',serif",fontStyle:"italic",fontSize:15,color:"rgba(216,197,141,0.65)",textAlign:"center",lineHeight:1.8,marginBottom:8}}>"{v.translation}"</p>
<p style={{fontSize:10,textTransform:"uppercase",letterSpacing:".18em",color:"rgba(216,197,141,0.3)",marginBottom:44}}>{v.ref}</p>
<p style={{fontSize:10,textTransform:"uppercase",letterSpacing:".22em",color:"rgba(216,197,141,0.3)"}}>↓ Swipe down to close</p>
</div>
);
}

/_ ─── COLLECTIONS ──────────────────────────────────────────── _/
function Collections() {
return (

<div className="screen">
<div style={{marginBottom:22}}>
<h2 className="hl" style={{fontSize:28,fontWeight:700,letterSpacing:"-0.5px"}}>My Reflections</h2>
<p style={{fontSize:13,color:"#7c7769",marginTop:4}}>Curated wisdom from your spiritual journey</p>
</div>
{/_ Big card _/}
<div className="card" style={{padding:22,marginBottom:12,cursor:"pointer"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
<div style={{width:48,height:48,borderRadius:14,background:"rgba(176,146,106,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>⏳</div>
<span className="badge">24 Ayahs</span>
</div>
<h3 className="hl" style={{fontSize:26,fontWeight:700,color:"#574a1e",marginBottom:7}}>Sabr</h3>
<p style={{fontFamily:"'Noto Serif',serif",fontStyle:"italic",fontSize:14,color:"#4b463b",lineHeight:1.75,marginBottom:18}}>"Indeed, Allah is with the patient."</p>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"0.5px solid rgba(176,146,106,0.15)",paddingTop:14}}>
<span style={{fontSize:13,color:"#574a1e",fontWeight:500}}>View Collection</span>
<span className="ms" style={{fontSize:17,color:"#574a1e"}}>arrow_forward</span>
</div>
</div>
{/_ 2 col _/}
<div className="grid2" style={{marginBottom:12}}>
{collections.slice(1).map(c=>(
<div key={c.name} className="card" style={{padding:16,cursor:"pointer"}}>
<div style={{width:40,height:40,borderRadius:"50%",background:`${c.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:10}}>{c.icon}</div>
<h4 className="hl" style={{fontSize:16,fontWeight:700,marginBottom:3}}>{c.name}</h4>
<p style={{fontSize:11,color:"#7c7769",lineHeight:1.6,marginBottom:10,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{c.quote}</p>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:9,textTransform:"uppercase",letterSpacing:".1em",color:"#9a8f83",fontWeight:700}}>{c.count} Ayahs</span>
<span className="ms" style={{fontSize:15,color:"#9a8f83"}}>more_horiz</span>
</div>
</div>
))}
</div>
{/_ Add _/}
<div style={{border:"1.5px dashed rgba(176,146,106,0.28)",borderRadius:18,padding:22,display:"flex",flexDirection:"column",alignItems:"center",gap:9,cursor:"pointer"}}>
<div style={{width:40,height:40,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
<span className="ms" style={{color:"#574a1e",fontSize:20}}>add</span>
</div>
<p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em",color:"#574a1e"}}>Create New Collection</p>
</div>
</div>
);
}

/_ ─── STATS ────────────────────────────────────────────────── _/
function Stats() {
const circ = 2*Math.PI*42;
const off = circ\*(1-5/7);
return (

<div className="screen">
<div style={{marginBottom:22}}>
<p className="sec-lbl" style={{marginBottom:3}}>My Journey</p>
<h2 className="hl" style={{fontSize:28,fontWeight:700}}>Journey Progress</h2>
<p style={{fontSize:13,color:"#7c7769",marginTop:4}}>A quiet reflection on your path.</p>
</div>
{/* Streak ring */}
<div className="card" style={{padding:26,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:12}}>
<div style={{position:"relative",width:150,height:150}}>
<svg width="150" height="150" style={{position:"absolute",inset:0}}>
<circle cx="75" cy="75" r="63" fill="none" stroke="rgba(176,146,106,0.14)" strokeWidth="8"/>
<circle cx="75" cy="75" r="63" fill="none" stroke="#B0926A" strokeWidth="8"
strokeLinecap="round"
strokeDasharray={2*Math.PI*63}
strokeDashoffset={2*Math.PI*63*(1-312/365)}
transform="rotate(-90 75 75)"
style={{transition:"stroke-dashoffset 1.2s ease"}}
/>
</svg>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<span className="hl" style={{fontSize:30,fontWeight:700,color:"#574a1e"}}>312</span>
<span style={{fontSize:8,textTransform:"uppercase",letterSpacing:".2em",color:"#9a8f83"}}>Day Streak</span>
</div>
</div>
<h3 className="hl" style={{fontSize:19,fontWeight:700,marginTop:14,marginBottom:5}}>Spiritual Discipline</h3>
<p style={{fontSize:13,color:"#7c7769",textAlign:"center",lineHeight:1.7}}>Your consistent journey is building a sanctuary within.</p>
<div style={{display:"flex",gap:9,marginTop:18}}>
<button className="pill p" style={{fontSize:13}}>Continue Journey</button>
<button className="pill g" style={{fontSize:13}}>View Journal</button>
</div>
</div>
{/_ Bento _/}
<div className="grid2" style={{marginBottom:12}}>
{/_ Bar chart _/}
<div className="card" style={{padding:16}}>
<h4 className="hl" style={{fontSize:15,fontWeight:700,marginBottom:3}}>Daily Ayahs</h4>
<p style={{fontSize:11,color:"#9a8f83",marginBottom:14}}>Target: 12</p>
<div style={{display:"flex",alignItems:"flex-end",gap:5,height:90}}>
{barHeights.map((h,i)=>(
<div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",height:`${h||2}%`,minHeight:2,
                background:i===5?"#B0926A":i<5?`rgba(176,146,106,${0.2+i*0.1})`:"rgba(176,146,106,0.08)"}}/>
))}
</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
{weekDays.map((d,i)=>(
<span key={i} style={{fontSize:8,color:i===5?"#574a1e":"#9a8f83",fontWeight:i===5?700:400,flex:1,textAlign:"center"}}>{d}</span>
))}
</div>
</div>
{/_ Weekly ring _/}
<div className="card" style={{padding:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<div style={{position:"relative",width:90,height:90,marginBottom:10}}>
<svg width="90" height="90" style={{position:"absolute"}}>
<circle cx="45" cy="45" r="38" fill="none" stroke="rgba(176,146,106,0.12)" strokeWidth="7"/>
<circle cx="45" cy="45" r="38" fill="none" stroke="#B0926A" strokeWidth="7"
strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
transform="rotate(-90 45 45)" style={{transition:"stroke-dashoffset 1s ease"}}/>
</svg>
<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<span className="hl" style={{fontSize:18,fontWeight:700}}>5/7</span>
<span style={{fontSize:7,textTransform:"uppercase",letterSpacing:".12em",color:"#9a8f83"}}>Days</span>
</div>
</div>
<h4 className="hl" style={{fontSize:13,fontWeight:700,textAlign:"center"}}>Weekly</h4>
<p style={{fontSize:11,color:"#9a8f83",textAlign:"center",marginTop:3}}>5 days this week</p>
</div>
</div>
{/_ Quote _/}
<div style={{padding:"24px 0",textAlign:"center"}}>
<div style={{width:28,height:1,background:"rgba(176,146,106,0.3)",margin:"0 auto 18px"}}/>
<p className="hl" style={{fontStyle:"italic",fontSize:16,lineHeight:1.85,color:"#231a08",maxWidth:300,margin:"0 auto 8px"}}>
"Indeed, in the remembrance of Allah do hearts find rest."
</p>
<p className="sec-lbl">Surah Ar-Ra'd 13:28</p>
</div>
</div>
);
}

/_ ─── SETTINGS ─────────────────────────────────────────────── _/
function Settings() {
const [notif, setNotif] = useState(true);
const [theme, setTheme] = useState("light");
const [cats, setCats] = useState(["Stress"]);
const [ivl, setIvl] = useState("1h");

const allCats = ["Stress","Fear","Gratitude","Patience","Hope","Rizq"];
const ivls = ["1h","3h","6h","Daily"];
const themes = [{id:"light",icon:"light_mode"},{id:"dark",icon:"dark_mode"},{id:"auto",icon:"settings_brightness"}];

const toggle = c => setCats(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);

return (

<div className="screen">
<div style={{marginBottom:26}}>
<h2 className="hl" style={{fontSize:28,fontWeight:700,letterSpacing:"-0.5px"}}>Personalize</h2>
<p style={{fontSize:14,color:"#7c7769",marginTop:4}}>Create a space that resonates with your soul.</p>
</div>

      {/* Widget */}
      <div className="card" style={{padding:20,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:18}}>
          <span className="ms" style={{color:"#574a1e",fontSize:20}}>widgets</span>
          <span className="hl" style={{fontSize:16,fontWeight:700}}>Widget Settings</span>
        </div>
        <p className="sec-lbl" style={{marginBottom:8}}>Refresh Interval</p>
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
          {ivls.map(i=>(
            <button key={i} className={`chip ${ivl===i?"s":"u"}`} onClick={()=>setIvl(i)}>{i}</button>
          ))}
        </div>
        <p className="sec-lbl" style={{marginBottom:8}}>Focus Categories</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {allCats.map(c=>(
            <button key={c} className={`chip ${cats.includes(c)?"s":"u"}`} onClick={()=>toggle(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="card" style={{padding:20,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:16}}>
          <span className="ms" style={{color:"#574a1e",fontSize:20}}>palette</span>
          <span className="hl" style={{fontSize:16,fontWeight:700}}>Appearance</span>
        </div>
        <p className="sec-lbl" style={{marginBottom:8}}>Interface Theme</p>
        <div className="theme-tabs">
          {themes.map(({id,icon})=>(
            <button key={id} className={`theme-tab ${theme===id?"active":"inactive"}`} onClick={()=>setTheme(id)}>
              <span className="ms" style={{fontSize:14}}>{icon}</span>
              {id.charAt(0).toUpperCase()+id.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card" style={{padding:20,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <span className="ms" style={{color:"#574a1e",fontSize:20}}>notifications_active</span>
            <div>
              <p className="hl" style={{fontSize:15,fontWeight:700}}>Notifications</p>
              <p style={{fontSize:12,color:"#9a8f83",marginTop:2}}>Daily reminder for reflections</p>
            </div>
          </div>
          <div className={`tog-track ${notif?"tog-on":"tog-off"}`} onClick={()=>setNotif(n=>!n)}>
            <div className="tog-thumb"/>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div style={{padding:"22px 0",textAlign:"center"}}>
        <button style={{background:"none",border:"none",cursor:"pointer",color:"#931a19",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:5,margin:"0 auto"}}>
          <span className="ms" style={{fontSize:15,color:"#931a19"}}>logout</span>
          Sign out of Sanctuary
        </button>
        <p style={{marginTop:14,fontSize:10,textTransform:"uppercase",letterSpacing:".2em",color:"#cdc6b6"}}>
          Version 2.4.0 · Digital Sanctuary
        </p>
      </div>
    </div>

);
}

/_ ─── ROOT ─────────────────────────────────────────────────── _/
export default function App() {
const [screen, setScreen] = useState("home");
const [pauseVerse, setPauseVerse] = useState(null);

const go = s => setScreen(s);
const setVerse = v => setPauseVerse(v);

if (screen === "pause") {
return (
<>

<style>{css}</style>
<Pause verse={pauseVerse} go={go}/>
</>
);
}

const map = {
home: <Home go={go} setVerse={setVerse}/>,
situations: <Situations go={go} setVerse={setVerse}/>,
collections: <Collections/>,
stats: <Stats/>,
settings: <Settings/>,
};

return (
<>

<style>{css}</style>
<div className="app">
<TopBar/>
{map[screen] || map.home}
<BottomNav active={screen} go={go}/>
</div>
</>
);
}
