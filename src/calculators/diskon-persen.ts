import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const diskonPersen: Calculator = {
  id: 'diskon-persen',
  name: 'Diskon Persen',
  description: 'Hitung potongan harga dalam bentuk persentase.',
  category: 'Belanja & Diskon',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Awal', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Diskon (%)', 'discount', 'number');
    
    const calcBtn = createButton('Hitung Diskon');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const discount = parseValue(dInput.value);
      
      if (!hInput.value || !dInput.value) {
        showError('Harap masukkan harga awal dan persentase diskon.');
        return;
      }

      if (price > 0 && discount >= 0) {
        const amount = (discount / 100) * price;
        const final = price - amount;
        
        showResult(formatCurrency(final));
        const hematEl = document.createElement('div');
        hematEl.className = 'text-sm font-medium text-slate-500 mt-1';
        hematEl.textContent = `Hemat: ${formatCurrency(amount)}`;
        resWrap.querySelector('div:last-child')?.appendChild(hematEl);
      } else {
        showError('Harga harus lebih dari 0 dan diskon tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default diskonPersen;
