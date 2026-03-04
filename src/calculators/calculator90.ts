import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator90: Calculator = {
  name: 'Kalkulator KPR',
  id: 'mortgage-calc',
  description: 'Hitung cicilan bulanan KPR termasuk pajak dan asuransi.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Rumah (Rp)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (Rp)', 'down', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '6');
    const { wrapper: tWrap, input: tInput } = createInput('Jangka Waktu (Tahun)', 'term', 'number', '30');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const p = price - down;
      const r = (parseFloat(rInput.value) || 6) / 100 / 12;
      const n = (parseFloat(tInput.value) || 30) * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        showResult(formatCurrency(monthly));
      } else {
        showError('Harap masukkan data yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
