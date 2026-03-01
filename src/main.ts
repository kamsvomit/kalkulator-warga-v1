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
  
  // Normalize categories for consistent grouping
  const normalizeCategory = (cat: string) => {
    const map: Record<string, string> = {
      'Finance': 'Keuangan',
      'Math': 'Matematika',
      'Fitness': 'Kebugaran',
      'Home': 'Rumah',
      'Conversion': 'Konversi',
      'Misc': 'Utilitas',
      'Daily Life': 'Kehidupan Sehari-hari',
      'Shopping': 'Belanja',
      'Bisnis & Jualan': 'Bisnis',
      'Matematika & Umum': 'Matematika',
      'Belanja & Diskon': 'Belanja',
      'Lain-lain': 'Utilitas',
      'Kendaraan & Bensin': 'Utilitas',
      'Tagihan Rumah': 'Rumah',
      'Gaji & Pendapatan': 'Keuangan',
      'Target Keuangan': 'Keuangan',
      'Hutang & Tabungan': 'Keuangan',
      'Gaji & Pajak': 'Keuangan',
      'Kendaraan': 'Utilitas',
      'Rumah Tangga': 'Rumah',
      'Tabungan': 'Keuangan'
    };
    return map[cat] || cat;
  };

  const normalizedCalculators = calculators.map(c => ({
    ...c,
    category: normalizeCategory(c.category)
  }));

  // Group calculators by category
  const categories = Array.from(new Set(normalizedCalculators.map(c => c.category))).sort();
  const groupedCalculators = categories.map(cat => ({
    name: cat,
    items: normalizedCalculators.filter(c => c.category === cat).sort((a, b) => a.name.localeCompare(b.name))
  }));

  app.innerHTML = `
    <div class="h-screen h-[100dvh] flex flex-col bg-transparent selection:bg-indigo-500/30 overflow-hidden">
      <!-- Floating Background Elements -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-float"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-float" style="animation-delay: -2s"></div>
      </div>

      <header class="h-16 flex items-center px-4 sm:px-8 shrink-0 sticky top-0 z-50 backdrop-blur-md border-b border-white/5">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 btn-3d">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7,19L13.6,9.9c0.6-1.3,0.4-2.8-0.5-3.7c-1.1-1.1-2.9-1.1-4,0L11,8l-3,3l-1.8-1.8c-1.1,1.1-1.1,2.9,0,4 c0.9,0.9,2.4,1.1,3.7,0.5L19,22.7c0.4,0.4,1,0.4,1.4,0l2.3-2.3C23.1,20,23.1,19.4,22.7,19z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-black tracking-tighter text-white uppercase italic">Kalkulator Warga</h1>
            <p class="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Digital Assistant v2.0</p>
          </div>
        </div>
      </header>

      <main class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col overflow-y-auto no-scrollbar relative z-10">
        <div class="mb-10 shrink-0">
          <label class="block text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-4 px-1 text-center sm:text-left">Pilih Layanan Digital</label>
          <div class="w-full">
            <div class="relative w-full">
              <!-- Custom Searchable Dropdown -->
              <div class="relative w-full">
                <button id="dropdown-trigger" class="dropdown-3d w-full h-14 px-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer text-xs font-bold text-white flex items-center justify-between">
                  <span id="selected-label">— Cari layanan di sini —</span>
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <div id="dropdown-panel" class="dropdown-panel absolute top-full left-0 w-full mt-2 rounded-2xl overflow-hidden hidden animate-fade-in max-h-[400px] flex flex-col bg-[#1a1a2e] border border-white/10 shadow-2xl z-50">
                  <div class="search-input-container p-3">
                    <div class="relative">
                      <input type="text" id="search-input" placeholder="Cari kalkulator..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50">
                      <svg class="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div id="dropdown-list" class="overflow-y-auto flex-1 py-2">
                    ${groupedCalculators.map(group => `
                      <div class="category-group" data-category="${group.name}">
                        <div class="category-header flex items-center space-x-2 px-4 py-2 bg-white/5 border-y border-white/5 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                          <span class="opacity-50">${getCategoryIcon(group.name)}</span>
                          <span>${group.name}</span>
                        </div>
                        ${group.items.map(c => `
                          <button class="dropdown-item w-full px-4 py-3 text-left text-xs font-bold text-slate-300 flex items-center space-x-3 hover:bg-white/5 transition-colors" data-id="${c.id}" data-name="${c.name.toLowerCase()}">
                            <span class="text-indigo-400 opacity-70">${getCategoryIcon(c.category)}</span>
                            <span>${c.name}</span>
                          </button>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="tool-display" class="glass-card flex-none flex flex-col p-6 sm:p-10 rounded-[2.5rem] min-h-[400px] mb-10">
          <div id="last-tool-hint" class="hidden mb-4 animate-fade-in">
            <button id="last-tool-btn" class="text-[10px] font-bold text-indigo-400/60 hover:text-indigo-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Terakhir digunakan: <span id="last-tool-name"></span></span>
            </button>
          </div>
          <div id="placeholder" class="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-10">
            <div class="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-inner">
              <svg class="w-10 h-10 text-indigo-400 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 class="text-white font-black text-xl mb-2 uppercase italic tracking-tight">Siap Melayani</h2>
            <p class="text-slate-400 text-sm font-medium max-w-[200px] mx-auto leading-relaxed">Pilih salah satu layanan di atas untuk memulai perhitungan</p>
          </div>
          <div id="calculator-container" class="w-full hidden"></div>
        </div>

        <footer class="mt-8 marquee-container">
          <p class="animate-marquee text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            Dibuat dengan ❤️ untuk Warga Indonesia • Digital Assistant v2.0 • Layanan Cepat & Akurat • 2026
          </p>
        </footer>
      </main>
    </div>
  `;

  const trigger = document.getElementById('dropdown-trigger')!;
  const panel = document.getElementById('dropdown-panel')!;
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const selectedLabel = document.getElementById('selected-label')!;
  const display = document.getElementById('tool-display')!;
  const placeholder = document.getElementById('placeholder')!;
  const container = document.getElementById('calculator-container')!;
  const lastToolHint = document.getElementById('last-tool-hint')!;
  const lastToolBtn = document.getElementById('last-tool-btn')!;
  const lastToolName = document.getElementById('last-tool-name')!;

  const showCalculator = (calc: any) => {
    selectedLabel.textContent = calc.name;
    panel.classList.add('hidden');
    
    // Update active state
    dropdownItems.forEach(i => i.classList.remove('active'));
    const activeItem = document.querySelector(`.dropdown-item[data-id="${calc.id}"]`);
    if (activeItem) activeItem.classList.add('active');

    placeholder.classList.add('hidden');
    container.classList.remove('hidden');
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="mb-5 pb-4 border-b border-[#222235]">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-bold text-white leading-tight">${calc.name}</h2>
            <span class="shrink-0 text-[9px] font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-widest">${calc.category}</span>
          </div>
          <p class="text-[12px] text-[#8e8e9e] mt-2 leading-relaxed">${calc.description}</p>
        </div>
        <div id="calc-inner"></div>
      </div>
    `;
    const inner = document.getElementById('calc-inner')!;
    calc.render(inner);

    // Save to last tool (only if different from current)
    const currentLastId = localStorage.getItem('last_tool_id');
    if (currentLastId && currentLastId !== calc.id) {
      localStorage.setItem('prev_tool_id', currentLastId);
      localStorage.setItem('prev_tool_name', localStorage.getItem('last_tool_name') || '');
    }
    
    localStorage.setItem('last_tool_id', calc.id);
    localStorage.setItem('last_tool_name', calc.name);
    updateLastToolHint(true);
  };

  const updateLastToolHint = (isCalcActive: boolean = false) => {
    const prevId = localStorage.getItem('prev_tool_id');
    const prevName = localStorage.getItem('prev_tool_name');
    
    // Only show if a calculator is active and we have a previous tool
    if (isCalcActive && prevId && prevName) {
      lastToolName.textContent = prevName;
      lastToolHint.classList.remove('hidden');
    } else {
      lastToolHint.classList.add('hidden');
    }
  };

  updateLastToolHint(false);

  lastToolBtn.addEventListener('click', () => {
    const prevId = localStorage.getItem('prev_tool_id');
    const calc = normalizedCalculators.find(c => c.id === prevId);
    if (calc) showCalculator(calc);
  });

  // Toggle dropdown
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  // Search logic
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    
    document.querySelectorAll('.category-group').forEach(group => {
      const g = group as HTMLElement;
      let groupHasMatch = false;
      
      g.querySelectorAll('.dropdown-item').forEach(item => {
        const i = item as HTMLElement;
        const name = i.getAttribute('data-name') || '';
        if (name.includes(query)) {
          i.classList.remove('hidden');
          groupHasMatch = true;
        } else {
          i.classList.add('hidden');
        }
      });

      if (groupHasMatch) {
        g.classList.remove('hidden');
      } else {
        g.classList.add('hidden');
      }
    });
  });

  // Item selection
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
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
