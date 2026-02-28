import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator48: Calculator = {
  name: 'Kalkulator Pajak Motor (STNK)',
  id: 'motor-tax',
  description: 'Estimasi pajak motor tahunan.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: nWrap, input: nInput } = createInput('Nilai Jual (NJKB)', 'njkb', 'number', 'Contoh: 15.000.000');
    
    const calcBtn = createButton('Hitung Estimasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const njkb = parseValue(nInput.value);
      if (njkb > 0) {
        const pkb = njkb * 0.02; 
        const swdkllj = 35000; // Motor
        resDisplay.innerHTML = `
          <div>${formatCurrency(pkb + swdkllj)}</div>
          <div class="text-xs text-gray-500 mt-1">Estimasi PKB + SWDKLLJ</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
