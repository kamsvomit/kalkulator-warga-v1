import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const targetHp: Calculator = {
  id: 'target-hp',
  name: 'Target Beli HP',
  description: 'Hitung berapa lama Anda harus menabung untuk membeli HP impian.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga HP', 'price', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tabungan per Bulan', 'save', 'number');
    
    const calcBtn = createButton('Hitung Waktu');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const save = parseValue(tInput.value);
      
      if (price > 0 && save > 0) {
        const months = Math.ceil(price / save);
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        let timeStr = `${months} Bulan`;
        if (years > 0) {
          timeStr = `${years} Tahun ${remainingMonths} Bulan`;
        }
        
        resDisplay.innerHTML = `
          <div>${timeStr}</div>
          <div class="text-sm font-medium text-slate-500 mt-1">Total: ${formatCurrency(price)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default targetHp;
