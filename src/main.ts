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
  
  // Hide splash screen after 2 seconds
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('opacity-0');
      splash.style.pointerEvents = 'none';
      setTimeout(() => splash.remove(), 400);
    }
  }, 2000);
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
  
  const popularIds = ['bmi', 'gaji-bersih', 'diskon-persen', 'persen'];
  const popularCalculators = normalizedCalculators.filter(c => popularIds.includes(c.id));

  // Group by category
  const categories = [...new Set(normalizedCalculators.map(c => c.category))].sort();
  const groupedCalculators = categories.map(cat => ({
    name: cat,
    tools: normalizedCalculators.filter(c => c.category === cat).sort((a, b) => a.name.localeCompare(b.name))
  }));

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-slate-50 selection:bg-red-500/30 pb-10">
      <!-- Sticky Header -->
      <header class="sticky top-0 z-[100] h-14 header-red flex items-center justify-between px-6 shadow-2xl">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7,19L13.6,9.9c0.6-1.3,0.4-2.8-0.5-3.7c-1.1-1.1-2.9-1.1-4,0L11,8l-3,3l-1.8-1.8c-1.1,1.1-1.1,2.9,0,4 c0.9,0.9,2.4,1.1,3.7,0.5L19,22.7c0.4,0.4,1,0.4,1.4,0l2.3-2.3C23.1,20,23.1,19.4,22.7,19z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-sm font-black tracking-tighter uppercase italic leading-none">Kalkulator Warga</h1>
            <p class="text-[8px] font-bold opacity-60 uppercase tracking-widest mt-0.5">Asisten Digital Pintar</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex flex-col items-end leading-none border-r border-white/20 pr-4">
            <span id="header-time" class="text-[10px] font-black tracking-widest">00:00:00</span>
            <span class="text-[8px] font-bold opacity-60 uppercase tracking-tighter mt-0.5">${dateStr}</span>
          </div>
          <div id="header-search-container" class="relative flex items-center">
            <input type="text" id="header-search-input" placeholder="Cari alat..." 
                   class="w-0 opacity-0 h-8 bg-white/20 border border-white/30 rounded-lg px-0 text-xs font-medium text-white placeholder:text-white/60 focus:outline-none transition-all duration-300">
            <button id="header-search-toggle" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h2 class="text-2xl font-black text-black/50 mb-2 leading-tight">Hitung Cepat, <span class="text-red-600">Hidup Lebih Mudah!</span></h2>
                <p class="text-sm text-black/40 font-medium leading-relaxed">Dari pajak hingga kesehatan, semua alat hitung yang Anda butuhkan ada di sini. Gratis & Akurat.</p>
              </div>
              <div class="hidden sm:block shrink-0">
                <img src="https://ouch-cdn2.icons8.com/mS9W_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz_vU_Tz/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTYv/YjY1YjY1YjYtYjY1/Yy00YjY1LWJiNjUt/YjY1YjY1YjY1YjY1/LnN2Zw.png" 
                     alt="Hero" class="w-24 h-24 object-contain" referrerPolicy="no-referrer">
              </div>
            </div>
            
            <!-- Active Tool Section -->
            <div id="active-tool-view" class="hidden">
              <div class="flex items-center justify-between mb-5">
                <button id="close-tool" class="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Tutup Alat
                </button>
                <span id="active-tool-cat" class="text-[9px] font-black bg-slate-100 text-black/40 px-3.5 py-2 rounded-full uppercase tracking-widest"></span>
              </div>
              <h2 id="active-tool-name" class="text-xl font-black text-black/50 mb-1.5"></h2>
              <p id="active-tool-desc" class="text-xs text-black/40 mb-8 font-medium leading-relaxed"></p>
              <div id="active-tool-content" class="max-h-[60vh] overflow-y-auto no-scrollbar pt-4 border-t border-slate-100"></div>
            </div>
          </div>
        </div>

        <!-- Last Tool Section -->
        ${lastTool ? `
          <div class="section-container animate-fade-in">
            <h3 class="text-[10px] font-black text-black/30 uppercase tracking-widest mb-5 flex items-center gap-2 px-2">
              <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Terakhir Digunakan
            </h3>
            <button class="tool-card w-full text-left last-tool-trigger group" data-id="${lastTool.id}">
              <div class="tool-icon-wrapper group-hover:bg-red-500 group-hover:text-white transition-colors">
                ${getCategoryIcon(lastTool.category)}
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-black/50 text-sm group-hover:text-red-600 transition-colors">${lastTool.name}</h4>
                <p class="text-[10px] text-black/30 font-bold uppercase tracking-tight">${lastTool.category}</p>
              </div>
              <svg class="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        ` : ''}

        <!-- Popular Tools Section -->
        <div class="section-container animate-fade-in">
          <h3 class="text-[10px] font-black text-black/30 uppercase tracking-widest mb-5 flex items-center gap-2 px-2">
            <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            Paling Dicari
          </h3>
          <div class="grid grid-cols-2 gap-4">
            ${popularCalculators.map(c => `
              <button class="tool-card flex-col items-start p-5 popular-trigger group" data-id="${c.id}">
                <div class="tool-icon-wrapper mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  ${getCategoryIcon(c.category)}
                </div>
                <h4 class="font-bold text-black/50 text-xs leading-tight group-hover:text-red-600 transition-colors">${c.name}</h4>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Grouped List Section -->
        <div id="tools-list-container" class="space-y-10">
          ${groupedCalculators.map(group => `
            <div class="category-section animate-fade-in" data-category="${group.name.toLowerCase()}">
              <h3 class="text-[10px] font-black text-black/30 uppercase tracking-widest mb-5 flex items-center gap-2 px-2">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                ${group.name}
              </h3>
              <div class="space-y-4">
                ${group.tools.map(c => `
                  <button class="tool-card w-full text-left tool-item-trigger group" data-id="${c.id}" data-name="${c.name.toLowerCase()}">
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
      </main>

      <footer class="py-8 text-center border-t border-slate-100 bg-white">
        <p class="text-[10px] text-black/30 font-black uppercase tracking-[0.3em]">
          Digital Assistant v2.1 • 2026
        </p>
      </footer>
    </div>
  `;

  const copywritingView = document.getElementById('copywriting-view')!;
  const activeToolView = document.getElementById('active-tool-view')!;
  const activeToolContent = document.getElementById('active-tool-content')!;
  const activeToolName = document.getElementById('active-tool-name')!;
  const activeToolDesc = document.getElementById('active-tool-desc')!;
  const activeToolCat = document.getElementById('active-tool-cat')!;
  const closeToolBtn = document.getElementById('close-tool')!;
  const headerSearchToggle = document.getElementById('header-search-toggle')!;
  const headerSearchInput = document.getElementById('header-search-input') as HTMLInputElement;

  const heroSection = document.getElementById('hero-section')!;

  const showCalculator = (calc: any) => {
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // Removed as per request
    heroSection.classList.add('sticky', 'top-14', 'z-[90]');
    copywritingView.classList.add('hidden');
    activeToolView.classList.remove('hidden');
    
    activeToolName.textContent = calc.name;
    activeToolDesc.textContent = calc.description;
    activeToolCat.textContent = calc.category;
    activeToolContent.innerHTML = '';
    calc.render(activeToolContent);
    
    localStorage.setItem('last_tool_id', calc.id);
  };

  const hideCalculator = () => {
    heroSection.classList.remove('sticky', 'top-14', 'z-50');
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
}



function renderCalculator(calc: Calculator) {
  // This function is now handled by showCalculator inside renderHome
}

// Start the app
init();
