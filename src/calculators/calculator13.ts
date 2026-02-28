import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator13: Calculator = {
  name: 'Kalkulator Cicilan Mobil',
  id: 'car-loan-id',
  description: 'Hitung cicilan bulanan untuk kredit mobil.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Mobil', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (DP)', 'dp', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Tahun)', 'term', 'number');
    
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
      const n = parseValue(tInput.value) * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `${formatCurrency(monthly)} / bulan`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
