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
      headerTime.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });
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

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'Keuangan': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    case 'Bisnis': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
    case 'Kesehatan': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>';
    case 'Kehidupan Sehari-hari': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>';
    case 'Belanja': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>';
    case 'Produktivitas': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
    case 'Matematika': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>';
    case 'Konversi': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>';
    case 'Kebugaran': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>';
    case 'Rumah': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>';
    case 'Utilitas': return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';
    default: return '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }
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
    'profit-jualan', 'target-hp', 'calculator10', 'calculator20'
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
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-slate-50 selection:bg-red-500/30">
      <!-- Apple Style Sticky Header -->
      <header class="sticky top-0 z-[100] h-12 header-apple flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-black/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7,19L13.6,9.9c0.6-1.3,0.4-2.8-0.5-3.7c-1.1-1.1-2.9-1.1-4,0L11,8l-3,3l-1.8-1.8c-1.1,1.1-1.1,2.9,0,4 c0.9,0.9,2.4,1.1,3.7,0.5L19,22.7c0.4,0.4,1,0.4,1.4,0l2.3-2.3C23.1,20,23.1,19.4,22.7,19z"/>
            </svg>
            <h1 class="text-sm font-bold tracking-tight text-black/60">Kalkulator Warga</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-6">
          <div class="hidden sm:flex items-center gap-4 border-r border-black/10 pr-6">
            <span id="header-time" class="text-[11px] font-medium tracking-widest text-black/60">00:00:00</span>
            <span class="text-[10px] font-medium text-black/40 tracking-tight uppercase">${dateStr}</span>
          </div>
          <div id="header-search-container" class="relative flex items-center">
            <input type="text" id="header-search-input" placeholder="Cari alat..." 
                   class="w-0 opacity-0 h-7 bg-black/5 border border-black/10 rounded-md px-0 text-[11px] font-medium text-black placeholder:text-black/40 focus:outline-none transition-all duration-300">
            <button id="header-search-toggle" class="p-1.5 hover:bg-black/5 rounded-md transition-colors">
              <svg class="w-4 h-4 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-2xl mx-auto w-full px-4 py-8 space-y-10">
        <!-- Hero Section (Sticky when tool open) -->
        <div id="hero-section" class="transition-all duration-300">
          <div id="hero-content" class="hero-card animate-fade-in">
            <div id="copywriting-view" class="flex items-center gap-6">
              <div class="flex-1">
                <h2 class="text-2xl font-black text-black/80 mb-2 leading-tight">Hitung Cepat, <span class="text-red-600">Hidup Lebih Mudah!</span></h2>
                <p class="text-sm text-black/40 font-medium leading-relaxed">Dari pajak hingga kesehatan, semua alat hitung yang Anda butuhkan ada di sini. Gratis & Akurat.</p>
              </div>
              <div class="hidden sm:block shrink-0">
                <img src="https://ouch-cdn2.icons8.com/mS9W_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTYv/YjY1YjY1YjYtYjY1/Yy00YjY1LWJiNjUt/YjY1YjY1YjY1YjY1/LnN2Zw.png" 
                     alt="Hero" class="w-24 h-24 object-contain opacity-80" referrerPolicy="no-referrer" loading="lazy">
              </div>
            </div>
            
            <!-- Active Tool Section -->
            <div id="active-tool-view" class="hidden active-card animate-fade-in">
              <div class="flex items-center justify-between mb-5">
                <button id="close-tool" class="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm border border-red-100">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Tutup Alat
                </button>
                <span id="active-tool-cat" class="text-[9px] font-black bg-slate-100 text-black/40 px-3.5 py-2 rounded-full uppercase tracking-widest border border-slate-200"></span>
              </div>
              <h2 id="active-tool-name" class="text-xl font-black text-black/80 mb-1.5"></h2>
              <p id="active-tool-desc" class="text-xs text-black/40 mb-8 font-medium leading-relaxed"></p>
              <div id="active-tool-content" class="max-h-[60vh] overflow-y-auto no-scrollbar pt-6 border-t border-slate-100"></div>
              
              <!-- Last Tool Info (Moved here) -->
              <div id="last-tool-info" class="mt-8 pt-6 border-t border-slate-100 hidden">
                <p class="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-3">Terakhir Digunakan</p>
                <button id="last-tool-link" class="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 group">
                  <span class="group-hover:-translate-x-1 transition-transform">←</span>
                  <span id="last-tool-link-text"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Tools Section (Carousel) -->
        <div class="section-container animate-fade-in overflow-hidden">
          <div class="flex items-center justify-between mb-5 px-2">
            <h3 class="text-[10px] font-black text-black/30 uppercase tracking-widest flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Paling Dicari
            </h3>
            <div class="flex gap-1.5">
              <div id="dot-0" class="carousel-dot w-3 h-1 rounded-full bg-red-500 transition-all duration-500"></div>
              <div id="dot-1" class="carousel-dot w-1 h-1 rounded-full bg-slate-200 transition-all duration-500"></div>
              <div id="dot-2" class="carousel-dot w-1 h-1 rounded-full bg-slate-200 transition-all duration-500"></div>
            </div>
          </div>
          
          <div id="popular-carousel-container" class="relative overflow-hidden">
            <div id="popular-carousel" class="flex transition-transform duration-700 ease-in-out">
              ${[0, 1, 2, 0].map((slideIdx, i) => `
                <div class="w-full flex-shrink-0 grid grid-cols-2 gap-3 px-1" ${i === 3 ? 'data-clone="true"' : ''}>
                  ${popularCalculators.slice(slideIdx * 4, (slideIdx + 1) * 4).map((c, idx) => `
                    <button class="tool-card flex-col items-start p-4 popular-trigger group w-full reveal" 
                            style="transition-delay: ${idx * 50}ms"
                            data-id="${c.id}">
                      <div class="tool-icon-wrapper mb-3 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        ${getCategoryIcon(c.category)}
                      </div>
                      <h4 class="font-bold text-black/50 text-[11px] leading-tight group-hover:text-red-600 transition-colors">${c.name}</h4>
                    </button>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Grouped List Section -->
        <div id="tools-list-container" class="space-y-10">
          ${groupedCalculators.map(group => `
            <div class="category-section" data-category="${group.name.toLowerCase()}">
              <h3 class="text-[10px] font-black text-black/30 uppercase tracking-widest mb-5 flex items-center gap-2 px-2">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                ${group.name}
              </h3>
              <div class="space-y-4">
                ${group.tools.map((c, idx) => `
                  <button class="tool-card w-full text-left tool-item-trigger group reveal" 
                          style="transition-delay: ${idx * 50}ms"
                          data-id="${c.id}" data-name="${c.name.toLowerCase()}">
                    <div class="tool-icon-wrapper group-hover:bg-red-500 group-hover:text-white transition-colors">
                      ${getCategoryIcon(c.category)}
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-black/50 text-sm group-hover:text-red-600 transition-colors">${c.name}</h4>
                      <p class="text-[10px] text-black/30 font-bold uppercase tracking-tight">${c.category}</p>
                    </div>
                    <svg class="w-4 h-4 text-slate-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <footer class="py-12 text-center border-t border-slate-200/60">
          <p class="text-[10px] text-black/30 font-black uppercase tracking-[0.3em]">
            Digital Assistant v2.1 • 2026
          </p>
        </footer>
      </main>
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

  const heroSection = document.getElementById('hero-section')!;

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
      const tools = section.querySelectorAll('.tool-item-trigger');
      let hasVisibleTool = false;

      tools.forEach(item => {
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
        dot.classList.toggle('bg-slate-200', i !== dotIndex);
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
}



function renderCalculator(calc: Calculator) {
  // This function is now handled by showCalculator inside renderHome
}

// Start the app
init();
