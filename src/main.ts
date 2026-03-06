import { Calculator } from './types';
import { playSound } from './utils';
import './index.css';
// We will import all 100 calculators here. 
// Since we are creating them dynamically, we'll use a registry.

const calculators: Calculator[] = [];

// This function will be called by each calculator module to register itself
export function registerCalculator(calc: Calculator) {
  if (!calculators.some(c => c.id === calc.id)) {
    calculators.push(calc);
  }
}

async function init() {
  const app = document.getElementById('app');
  if (!app) return;

  // Clear existing to avoid duplicates
  calculators.length = 0;

  // Modern Vite way to load all calculators in the directory
  const modules = import.meta.glob('./calculators/*.ts');
  const loadPromises = Object.keys(modules).map(path => 
    (modules[path] as () => Promise<any>)().then(mod => ({ path, mod })).catch(() => null)
  );
  
  const results = await Promise.all(loadPromises);
  
  results.forEach(result => {
    if (!result) return;
    const { mod } = result;
    // Register any object that looks like a Calculator
    for (const key in mod) {
      const item = mod[key];
      if (item && typeof item === 'object' && item.id && item.render) {
        registerCalculator(item);
      }
    }
  });

  renderHome();
  
  // Clock Update
  setInterval(() => {
    const headerTime = document.getElementById('header-time');
    if (headerTime) {
      const now = new Date();
      headerTime.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  }, 1000);
  
  // Setup global sound listener for results
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target as HTMLElement;
        if (!target.classList.contains('hidden') && target.querySelector('h3')) {
          // If a result wrapper (which has an h3) becomes visible
          playSound('success');
        }
      }
    });
  });
  
  const toolDisplay = document.getElementById('tool-display')!;
  if (toolDisplay) {
    observer.observe(toolDisplay, { 
      attributes: true, 
      subtree: true, 
      attributeFilter: ['class'] 
    });
  }
  
  // Hide splash screen after 1 second
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('opacity-0');
      splash.style.pointerEvents = 'none';
      setTimeout(() => splash.remove(), 400);
    }
  }, 1000);
}

function getToolIcon(toolId: string, category: string): { svg: string, color: string } {
  const icons: Record<string, string> = {
    // Keuangan
    'gaji-bersih': '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    'cicilan-bulanan': '<rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line>',
    'bunga-tabungan': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
    'pajak-ppn': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
    'persen': '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
    
    // Bisnis
    'hpp': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path>',
    'profit-jualan': '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    'diskon-persen': '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
    'target-hp': '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
    
    // Kesehatan
    'bmi': '<path d="M20.42 4.58a5 5 0 0 1 0 7.07l-7.07 7.07a1 1 0 0 1-1.42 0L4.86 11.65a5 5 0 0 1 7.07-7.07l.07.08.07-.08a5 5 0 0 1 7.07 0z"></path>',
    'kalori-harian': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 5.5 3 8.5a7 7 0 1 1-14 0c0-3 2.5-6 3.5-7 .5 1 1 2 1 3.5z"></path>',
    
    // Rumah
    'listrik-bulanan': '<path d="M13 2L3 14h9v8l10-12h-9l10-10z"></path>',
    'air-pdam': '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
    
    // Utilitas
    'konsumsi-bensin': '<path d="M3 22L17 22L17 7L3 7L3 22Z"></path><path d="M17 7L19 7L21 9L21 15L19 17L17 17"></path><path d="M7 7L7 4L13 4L13 7"></path>',
    'calculator10': '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    'calculator20': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
    'calculator30': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
    'calculator40': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
    'calculator50': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    'calculator60': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
    'calculator70': '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
    'calculator80': '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>',
    'calculator90': '<path d="M12 19l7-7 3 3-10 10L2 15l3-3 7 7zM12 5l7 7-3 3-4-4-4 4-3-3 7-7z"></path>',
    'calculator100': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    'double-discount': '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>',
    'markup-calc': '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    'emergency-fund': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    'retirement-calc': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    'education-fund': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
    'hajj-calc': '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>',
    'pbb-calc': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    'renovation-calc': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
  };

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
    'bg-teal-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-violet-500',
    'bg-rose-500', 'bg-amber-500', 'bg-lime-500', 'bg-fuchsia-500'
  ];

  // Use a simple hash of the toolId to pick a color if not predefined
  const colorIdx = toolId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const color = colors[colorIdx];

  // Fallback icon based on ID to ensure variety even if not in the list
  const fallbackIcons = [
    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>',
    '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>',
    '<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>',
    '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
  ];
  const fallbackIdx = toolId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackIcons.length;

  const svgPath = icons[toolId] || fallbackIcons[fallbackIdx];
  
  return {
    svg: `<svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${svgPath}</svg>`,
    color
  };
}

function renderHome() {
  const app = document.getElementById('app')!;
  
  const normalizeCategory = (cat: string) => {
    const map: Record<string, string> = {
      'Finance': 'Keuangan', 'Math': 'Matematika', 'Fitness': 'Kebugaran',
      'Home': 'Rumah', 'Conversion': 'Konversi', 'Misc': 'Utilitas',
      'Daily Life': 'Kehidupan Sehari-hari', 'Shopping': 'Belanja',
      'Bisnis & Jualan': 'Bisnis', 'Matematika & Umum': 'Matematika',
      'Belanja & Diskon': 'Belanja', 'Lain-lain': 'Utilitas',
      'Kendaraan & Bensin': 'Utilitas', 'Tagihan Rumah': 'Rumah',
      'Gaji & Pendapatan': 'Keuangan', 'Target Keuangan': 'Keuangan',
      'Hutang & Tabungan': 'Keuangan', 'Gaji & Pajak': 'Keuangan',
      'Kendaraan': 'Utilitas', 'Rumah Tangga': 'Rumah', 'Tabungan': 'Keuangan'
    };
    return map[cat] || cat;
  };

  const normalizedCalculators = calculators.map(c => ({
    ...c,
    category: normalizeCategory(c.category)
  }));

  const lastToolId = localStorage.getItem('last_tool_id');
  const lastTool = normalizedCalculators.find(c => c.id === lastToolId);
  
  const popularIds = [
    'bmi', 'gaji-bersih', 'diskon-persen', 'persen',
    'cicilan-bulanan', 'hpp', 'konsumsi-bensin', 'listrik-bulanan',
    'profit-jualan', 'target-hp', 'double-discount', 'markup-calc'
  ];
  const popularCalculators = normalizedCalculators.filter(c => popularIds.includes(c.id));
  
  // Ensure we have exactly 12 for the 4-4-4 carousel (padding if needed)
  while (popularCalculators.length < 12 && normalizedCalculators.length > 0) {
    const extra = normalizedCalculators.find(c => !popularIds.includes(c.id) && !popularCalculators.includes(c));
    if (extra) popularCalculators.push(extra);
    else break;
  }

  // Group by category
  const categories = [...new Set(normalizedCalculators.map(c => c.category))].sort();
  const groupedCalculators = categories.map(cat => ({
    name: cat,
    tools: normalizedCalculators.filter(c => c.category === cat).sort((a, b) => a.name.localeCompare(b.name))
  }));

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-arsenic/[0.02] selection:bg-red-500/30">
      <!-- Apple Style Sticky Header -->
      <header class="sticky top-0 z-[100] h-12 header-apple flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="url(#iconGrad)" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ef4444">
                    <animate attributeName="stop-color" values="#ef4444;#f97316;#ef4444" dur="4s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stop-color="#f97316">
                    <animate attributeName="stop-color" values="#f97316;#dc2626;#f97316" dur="4s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>
              </defs>
              <path d="M22.7,19L13.6,9.9c0.6-1.3,0.4-2.8-0.5-3.7c-1.1-1.1-2.9-1.1-4,0L11,8l-3,3l-1.8-1.8c-1.1,1.1-1.1,2.9,0,4 c0.9,0.9,2.4,1.1,3.7,0.5L19,22.7c0.4,0.4,1,0.4,1.4,0l2.3-2.3C23.1,20,23.1,19.4,22.7,19z"/>
            </svg>
            <h1 class="text-sm font-bold tracking-tight text-red-600">Kalkulator Warga</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <button id="theme-toggle" class="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors" title="Ganti Tema">
              <svg id="sun-icon" class="w-4 h-4 text-red-600 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path>
              </svg>
              <svg id="moon-icon" class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <div id="header-search-container" class="relative flex items-center">
              <input type="text" id="header-search-input" placeholder="Cari alat..." 
                     class="w-0 opacity-0 h-7 bg-transparent border border-arsenic/15 rounded-md px-0 text-[11px] font-medium text-arsenic placeholder:text-arsenic focus:outline-none transition-all duration-300">
              <button id="header-search-toggle" class="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-container" class="max-w-2xl mx-auto w-full pb-8 space-y-10">
        <!-- Hero Section (Sticky when tool open) -->
        <div id="hero-section">
          <div id="hero-content" class="hero-card animate-fade-in">
            <div id="copywriting-view" class="space-y-8">
              <div class="max-w-xl">
                <!-- Live badge -->
                <div class="hero-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 hero-pulse-dot"></span>
                  <span>${calculators.length} Alat Aktif</span>
                </div>

                <h2 class="text-3xl font-black text-arsenic mb-1 leading-tight tracking-tight">
                  Hitung Cepat,
                </h2>
                <h2 class="text-3xl font-black leading-tight tracking-tight mb-3">
                  <span id="hero-typewriter" class="hero-gradient-text"></span><span class="hero-cursor">|</span>
                </h2>
                <p class="text-base text-arsenic/70 font-medium leading-relaxed">
                  Finansial, kesehatan, hingga tradisi—semua dalam satu genggaman.
                </p>
              </div>
            </div>
            
            <!-- Active Tool Section -->
            <div id="active-tool-view" class="hidden active-card animate-fade-in">
              <div class="flex items-center justify-between mb-4">
                <button id="close-tool" class="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-all text-[11px] font-black uppercase tracking-widest border border-red-100/50">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Tutup
                </button>
                <span id="active-tool-cat" class="text-[8px] font-black text-arsenic px-2 py-1 rounded-md uppercase tracking-widest border border-arsenic/10 bg-arsenic/5"></span>
              </div>
              <h2 id="active-tool-name" class="text-xl font-black text-arsenic mb-1"></h2>
              <p id="active-tool-desc" class="text-xs text-arsenic mb-6 font-medium leading-relaxed"></p>
              <div id="active-tool-content" class="max-h-[60vh] overflow-y-auto no-scrollbar pt-6 border-t border-arsenic/10"></div>
              
              <!-- Last Tool Info (Moved here) -->
              <div id="last-tool-info" class="mt-8 pt-6 border-t border-arsenic/10 hidden">
                <p class="text-[10px] font-black text-arsenic uppercase tracking-[0.2em] mb-3">Terakhir Digunakan</p>
                <button id="last-tool-link" class="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 group">
                  <span class="group-hover:-translate-x-1 transition-transform">←</span>
                  <span id="last-tool-link-text"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Tools Section (Carousel) -->
        <div class="section-container animate-fade-in overflow-hidden px-4">
          <div class="flex items-center justify-between mb-5 px-2">
            <h3 class="text-[10px] font-black text-arsenic uppercase tracking-widest flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Paling Dicari
            </h3>
            <div class="flex gap-1.5">
              <div id="dot-0" class="carousel-dot w-3 h-1 rounded-full bg-red-500 transition-all duration-500"></div>
              <div id="dot-1" class="carousel-dot w-1 h-1 rounded-full bg-arsenic/10 transition-all duration-500"></div>
              <div id="dot-2" class="carousel-dot w-1 h-1 rounded-full bg-arsenic/10 transition-all duration-500"></div>
            </div>
          </div>
          
          <div id="popular-carousel-container" class="relative overflow-hidden">
            <div id="popular-carousel" class="flex transition-transform duration-700 ease-in-out">
              ${[0, 1, 2, 0].map((slideIdx, i) => `
                <div class="w-full flex-shrink-0 grid grid-cols-4 gap-4 px-1" ${i === 3 ? 'data-clone="true"' : ''}>
                  ${popularCalculators.slice(slideIdx * 4, (slideIdx + 1) * 4).map((c, idx) => {
                    const icon = getToolIcon(c.id, c.category);
                    return `
                    <button class="flex flex-col items-center gap-2 popular-trigger group reveal" 
                            style="transition-delay: ${idx * 50}ms"
                            data-id="${c.id}">
                      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${icon.color} flex items-center justify-center border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                        ${icon.svg}
                      </div>
                      <span class="text-[9px] sm:text-[10px] font-bold text-arsenic text-center leading-tight line-clamp-2">${c.name}</span>
                    </button>
                  `}).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Grouped List Section -->
        <div id="tools-list-container" class="space-y-6 px-4">
          ${groupedCalculators.map((group, gIdx) => `
            <div class="rounded-3xl p-5 sm:p-6 shadow-sm space-y-6 category-section" data-category="${group.name.toLowerCase()}">
              <div class="flex items-center justify-between">
                <h3 class="text-sm sm:text-base font-black text-arsenic">${group.name}</h3>
                <button class="see-all-btn flex items-center gap-1 px-3 py-1.5 rounded-full border border-green-500/20 text-green-600 text-[10px] font-bold hover:bg-green-50 transition-colors"
                        data-group-idx="${gIdx}">
                  <span>Lihat semua</span>
                  <svg class="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              <div id="group-grid-${gIdx}" class="grid grid-cols-4 gap-4 transition-all duration-500 overflow-hidden">
                ${group.tools.map((c, idx) => {
                  const icon = getToolIcon(c.id, c.category);
                  const isHidden = idx >= 4;
                  return `
                  <button class="flex flex-col items-center gap-2 tool-item-trigger group reveal ${isHidden ? 'hidden' : ''}" 
                          style="transition-delay: ${idx * 50}ms"
                          data-id="${c.id}" data-name="${c.name.toLowerCase()}">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${icon.color} flex items-center justify-center border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                      ${icon.svg}
                    </div>
                    <span class="text-[9px] sm:text-[10px] font-bold text-arsenic text-center leading-tight line-clamp-2">${c.name}</span>
                  </button>
                `}).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <footer class="py-12 text-center border-t border-arsenic/10">
          <p class="text-[10px] text-arsenic font-black uppercase tracking-[0.3em]">
            Digital Assistant v2.1 • 2026
          </p>
        </footer>
      </main>

      <!-- Floating Scroll to Top -->
      <button id="scroll-top" class="scroll-top-btn p-2 text-red-600 hover:text-red-700 transition-all">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8.5L5 15.5L6.41 16.91L12 11.33L17.59 16.91L19 15.5L12 8.5Z"/>
        </svg>
      </button>
    </div>
  `;

  const copywritingView = document.getElementById('copywriting-view')!;
  const activeToolView = document.getElementById('active-tool-view')!;
  const activeToolContent = document.getElementById('active-tool-content')!;
  const activeToolName = document.getElementById('active-tool-name')!;
  const activeToolDesc = document.getElementById('active-tool-desc')!;
  const activeToolCat = document.getElementById('active-tool-cat')!;
  const closeToolBtn = document.getElementById('close-tool')!;
  const lastToolInfo = document.getElementById('last-tool-info')!;
  const lastToolLink = document.getElementById('last-tool-link')!;
  const lastToolLinkText = document.getElementById('last-tool-link-text')!;
  const headerSearchToggle = document.getElementById('header-search-toggle')!;
  const headerSearchInput = document.getElementById('header-search-input') as HTMLInputElement;
  const scrollTopBtn = document.getElementById('scroll-top')!;
  const themeToggleBtn = document.getElementById('theme-toggle')!;
  const sunIcon = document.getElementById('sun-icon')!;
  const moonIcon = document.getElementById('moon-icon')!;

  // Theme Logic
  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  };

  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);

  themeToggleBtn.onclick = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Typewriter animation for hero
  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    const phrases = ['Hidup Lebih Mudah!', 'Tanpa Ribet!', 'Kapan Saja!', 'Gratis Selamanya!'];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDelay = 2000;

    const runTypewriter = () => {
      const current = phrases[phraseIdx];
      if (!isDeleting) {
        typewriterEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(runTypewriter, pauseDelay);
          return;
        }
      } else {
        typewriterEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(runTypewriter, isDeleting ? deleteSpeed : typeSpeed);
    };
    setTimeout(runTypewriter, 600);
  }

  // Animate stats count-up - unused, removed

  const heroSection = document.getElementById('hero-section')!;
  const mainContainer = document.getElementById('main-container')!;

  const showCalculator = (calc: any) => {
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // Removed as per request
    
    // Clear search if active
    if (headerSearchInput.value !== '') {
      headerSearchInput.value = '';
      headerSearchInput.dispatchEvent(new Event('input'));
      headerSearchInput.classList.remove('w-40', 'opacity-100', 'px-3', 'mr-2');
      headerSearchInput.classList.add('w-0', 'opacity-0', 'px-0');
      headerSearchInput.blur();
    }

    mainContainer.classList.add('tool-active');
    heroSection.classList.add('sticky', 'top-12', 'z-[90]');
    copywritingView.classList.add('hidden');
    activeToolView.classList.remove('hidden');
    
    activeToolName.textContent = calc.name;
    activeToolDesc.textContent = calc.description;
    activeToolCat.textContent = calc.category;
    activeToolContent.innerHTML = '';
    calc.render(activeToolContent);
    
    // Update Last Tool Info
    const lastId = localStorage.getItem('last_tool_id');
    if (lastId && lastId !== calc.id) {
      const last = normalizedCalculators.find(c => c.id === lastId);
      if (last) {
        lastToolInfo.classList.remove('hidden');
        lastToolLinkText.textContent = `Kembali ke ${last.name}`;
        lastToolLink.onclick = () => showCalculator(last);
      } else {
        lastToolInfo.classList.add('hidden');
      }
    } else {
      lastToolInfo.classList.add('hidden');
    }
    
    localStorage.setItem('last_tool_id', calc.id);
  };

  const hideCalculator = () => {
    mainContainer.classList.remove('tool-active');
    heroSection.classList.remove('sticky', 'top-12', 'z-[90]');
    activeToolView.classList.add('hidden');
    copywritingView.classList.remove('hidden');
    // Refresh to update last tool
    renderHome();
  };

  closeToolBtn.onclick = hideCalculator;

  // Header Search Toggle
  headerSearchToggle.addEventListener('click', () => {
    if (headerSearchInput.classList.contains('w-40')) {
      headerSearchInput.classList.remove('w-40', 'opacity-100', 'px-3', 'mr-2');
      headerSearchInput.classList.add('w-0', 'opacity-0', 'px-0');
      headerSearchInput.value = '';
      headerSearchInput.dispatchEvent(new Event('input'));
      headerSearchInput.blur();
    } else {
      headerSearchInput.classList.remove('w-0', 'opacity-0', 'px-0');
      headerSearchInput.classList.add('w-40', 'opacity-100', 'px-3', 'mr-2');
      headerSearchInput.focus();
    }
  });

  headerSearchInput.addEventListener('blur', () => {
    if (headerSearchInput.value === '') {
      headerSearchInput.classList.remove('w-40', 'opacity-100', 'px-3', 'mr-2');
      headerSearchInput.classList.add('w-0', 'opacity-0', 'px-0');
    }
  });

  // Search logic
  headerSearchInput.addEventListener('input', () => {
    const query = headerSearchInput.value.toLowerCase();
    const toolItems = document.querySelectorAll('.tool-item-trigger');
    const categorySections = document.querySelectorAll('.category-section');
    const otherSections = document.querySelectorAll('.section-container');
    const heroSection = document.getElementById('hero-section')!;
    
    if (query.length > 0) {
      // Hide other sections when searching
      otherSections.forEach(sec => sec.classList.add('hidden'));
      if (heroSection) heroSection.classList.add('hidden');
    } else {
      // Show all sections when search is empty
      otherSections.forEach(sec => sec.classList.remove('hidden'));
      if (heroSection) heroSection.classList.remove('hidden');
    }

    categorySections.forEach(section => {
      const tools = Array.from(section.querySelectorAll('.tool-item-trigger'));
      let hasVisibleTool = false;

      tools.forEach((item, idx) => {
        const el = item as HTMLElement;
        const name = el.getAttribute('data-name') || '';
        if (name.includes(query)) {
          el.classList.remove('hidden');
          hasVisibleTool = true;
        } else {
          el.classList.add('hidden');
        }
      });

      if (hasVisibleTool) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  });

  // Triggers
  document.querySelectorAll('.tool-item-trigger, .popular-trigger, .last-tool-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const calc = normalizedCalculators.find(c => c.id === id);
      if (calc) showCalculator(calc);
    });
  });

  // See All Toggle
  document.querySelectorAll('.see-all-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const gIdx = btn.getAttribute('data-group-idx');
      const grid = document.getElementById(`group-grid-${gIdx}`);
      const tools = grid?.querySelectorAll('.tool-item-trigger');
      const icon = btn.querySelector('svg');
      const text = btn.querySelector('span');

      if (grid?.classList.contains('showing-all')) {
        grid.classList.remove('showing-all');
        tools?.forEach((tool, idx) => {
          if (idx >= 4) {
            tool.classList.add('hidden');
          }
        });
        if (icon) icon.style.transform = 'rotate(0deg)';
        if (text) text.textContent = 'Lihat semua';
      } else {
        grid?.classList.add('showing-all');
        tools?.forEach(tool => {
          tool.classList.remove('hidden');
        });
        if (icon) icon.style.transform = 'rotate(90deg)';
        if (text) text.textContent = 'Sembunyikan';
      }
    });
  });

  // Carousel Logic (Infinite Loop + Touch Support)
  let currentSlide = 0;
  let isTransitioning = false;
  const carousel = document.getElementById('popular-carousel');
  const dots = [
    document.getElementById('dot-0'),
    document.getElementById('dot-1'),
    document.getElementById('dot-2')
  ];

  const updateDots = (index: number) => {
    const dotIndex = index % 3;
    dots.forEach((dot, i) => {
      if (dot) {
        dot.classList.toggle('bg-red-500', i === dotIndex);
        dot.classList.toggle('bg-arsenic/10', i !== dotIndex);
        dot.classList.toggle('w-3', i === dotIndex);
        dot.classList.toggle('w-1', i !== dotIndex);
      }
    });
  };

  const goToSlide = (index: number, animate = true) => {
    if (!carousel) return;
    if (animate) {
      carousel.style.transition = 'transform 0.7s ease-in-out';
    } else {
      carousel.style.transition = 'none';
    }
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
    updateDots(currentSlide);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    goToSlide(currentSlide + 1);
  };

  if (carousel) {
    carousel.addEventListener('transitionend', () => {
      isTransitioning = false;
      if (currentSlide === 3) {
        goToSlide(0, false);
      }
    });

    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, 4000);

    // Touch Support
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe Left -> Next
          nextSlide();
        } else {
          // Swipe Right -> Prev
          if (currentSlide === 0) {
            goToSlide(3, false);
            setTimeout(() => goToSlide(2), 10);
          } else {
            goToSlide(currentSlide - 1);
          }
        }
      }
      
      isDragging = false;
      autoSlideInterval = setInterval(nextSlide, 4000);
    });
  }

  // Scroll Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Scroll to Top Logic
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}



function renderCalculator(calc: Calculator) {
  // This function is now handled by showCalculator inside renderHome
}

// Start the app
init();