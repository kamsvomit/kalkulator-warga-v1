import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const cicilanBulanan: Calculator = {
  id: 'cicilan-bulanan',
  name: 'Cicilan Bulanan',
  description: 'Hitung estimasi cicilan bulanan untuk pinjaman Anda.',
  category: 'Hutang & Tabungan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Pinjaman', 'principal', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga per Tahun (%)', 'rate', 'number', 'Contoh: 12');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Bulan)', 'months', 'number', 'Contoh: 12');
    
    const calcBtn = createButton('Hitung Cicilan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const r = parseValue(rInput.value) / 100 / 12;
      const n = parseValue(tInput.value);
      
      if (p > 0 && n > 0) {
        let monthly = 0;
        if (r === 0) {
          monthly = p / n;
        } else {
          monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        
        const total = monthly * n;
        const interest = total - p;
        
        resDisplay.innerHTML = `
          <div>${formatCurrency(monthly)} <span class="text-sm font-normal text-slate-500">/ bulan</span></div>
          <div class="text-xs font-medium text-slate-500 mt-2">
            Total Bayar: ${formatCurrency(total)}<br>
            Total Bunga: ${formatCurrency(interest)}
          </div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default cicilanBulanan;
