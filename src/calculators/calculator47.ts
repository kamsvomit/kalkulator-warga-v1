import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator47: Calculator = {
  name: 'Kalkulator Kredit Motor',
  id: 'motor-loan',
  description: 'Hitung cicilan bulanan untuk kredit motor.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Motor', 'price', 'number', 'Contoh: 25.000.000');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (DP)', 'dp', 'number', 'Contoh: 5.000.000');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number', '15');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Bulan)', 'term', 'number', '35');
    
    const calcBtn = createButton('Hitung Cicilan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const dp = parseValue(dInput.value) || 0;
      const p = price - dp;
      const r = (parseValue(rInput.value) / 100) / 12;
      const n = parseValue(tInput.value);
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `${formatCurrency(monthly)} / bulan`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; rInput.value = '15'; tInput.value = '35';
      resWrap.classList.add('hidden');
    };
  }
};
