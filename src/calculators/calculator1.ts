import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator1: Calculator = {
  name: 'Kalkulator Pinjaman',
  id: 'loan-calc',
  description: 'Hitung cicilan bulanan untuk pinjaman atau kredit.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Jumlah Pinjaman', 'amount', 'number', 'Contoh: 10.000.000');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number', 'Contoh: 5');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Bulan)', 'term', 'number', 'Contoh: 12');
    
    const calcBtn = createButton('Hitung Cicilan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(aInput.value);
      const r = (parseValue(rInput.value) / 100) / 12;
      const n = parseValue(tInput.value);
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `${formatCurrency(monthly)} / bulan`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
