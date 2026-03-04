import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator91: Calculator = {
  name: 'Kalkulator Kredit Mobil',
  id: 'car-loan',
  description: 'Hitung cicilan bulanan untuk kredit mobil.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Mobil (Rp)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (Rp)', 'down', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Nilai Tukar Tambah (Rp)', 'trade', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '5');
    const { wrapper: mWrap, input: mInput } = createInput('Jangka Waktu (Bulan)', 'term', 'number', '60');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const trade = parseFloat(tInput.value) || 0;
      const p = price - down - trade;
      const r = (parseFloat(rInput.value) || 5) / 100 / 12;
      const n = parseFloat(mInput.value) || 60;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        showResult(formatCurrency(monthly));
      } else {
        showError('Harap masukkan data yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
