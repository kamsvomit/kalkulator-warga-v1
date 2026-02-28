import { Calculator } from './types';
import './index.css';
// We will import all 100 calculators here. 
// Since we are creating them dynamically, we'll use a registry.

const calculators: Calculator[] = [];

// This function will be called by each calculator module to register itself
export function registerCalculator(calc: Calculator) {
  calculators.push(calc);
}

async function init() {
  const app = document.getElementById('app');
  if (!app) return;

  // Load 50 calculators
  for (let i = 1; i <= 50; i++) {
    try {
      const module = await import(`./calculators/calculator${i}.ts`);
      if (module[`calculator${i}`]) {
        registerCalculator(module[`calculator${i}`]);
      }
    } catch (e) {
      // Skip missing files
    }
  }

  renderHome();
}

function renderHome() {
  const app = document.getElementById('app')!;
  
  // Sort calculators by name for easier finding in dropdown
  const sortedCalculators = [...calculators].sort((a, b) => a.name.localeCompare(b.name));

  app.innerHTML = `
    <div class="h-screen h-[100dvh] flex flex-col bg-transparent selection:bg-indigo-500/30 overflow-hidden">
      <!-- Floating Background Elements -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-float"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-float" style="animation-delay: -2s"></div>
      </div>

      <header class="h-16 flex items-center px-8 shrink-0 sticky top-0 z-50 backdrop-blur-md border-b border-white/5">
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

      <main class="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col overflow-y-auto no-scrollbar relative z-10">
        <div class="mb-8 shrink-0">
          <label class="block text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-3 px-1">Pilih Layanan Digital</label>
          <div class="flex items-stretch space-x-3">
            <div class="relative flex-1">
              <select id="tool-select" class="dropdown-3d w-full h-14 px-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer text-xs font-bold text-white">
                <option value="" disabled selected>— Cari layanan di sini —</option>
                ${sortedCalculators.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>
            <button id="copy-btn" class="btn-3d-secondary h-14 px-6 rounded-2xl flex items-center justify-center space-x-2 font-black text-xs shrink-0 text-slate-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span class="hidden sm:inline">SALIN</span>
            </button>
          </div>
        </div>

        <div id="tool-display" class="glass-card flex-1 flex flex-col p-8 rounded-[2.5rem] min-h-[450px]">
          <div id="placeholder" class="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
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

        <footer class="mt-8 text-center">
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Dibuat dengan ❤️ untuk Warga Indonesia</p>
        </footer>
      </main>
    </div>
  `;

  const select = document.getElementById('tool-select') as HTMLSelectElement;
  const display = document.getElementById('tool-display')!;
  const placeholder = document.getElementById('placeholder')!;
  const container = document.getElementById('calculator-container')!;
  const copyBtn = document.getElementById('copy-btn')!;

  select.addEventListener('change', () => {
    const id = select.value;
    const calc = calculators.find(c => c.id === id);
    if (calc) {
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
    }
  });

  copyBtn.addEventListener('click', () => {
    const result = document.querySelector('#calculator-container h3 + div');
    if (result) {
      const text = result.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span>';
        setTimeout(() => copyBtn.innerHTML = originalText, 2000);
      });
    }
  });
}

function renderCalculator(calc: Calculator) {
  // This function is now handled by showCalculator inside renderHome
}

// Start the app
init();
