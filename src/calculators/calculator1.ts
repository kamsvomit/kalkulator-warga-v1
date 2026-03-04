import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator1: Calculator = {
  id: 'double-discount',
  name: 'Diskon Ganda (A% + B%)',
  description: 'Hitung total potongan harga untuk promo diskon bertingkat.',
  category: 'Belanja',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Awal', 'price', 'number');
    const { wrapper: d1Wrap, input: d1Input } = createInput('Diskon Pertama (%)', 'disc1', 'number', '50');
    const { wrapper: d2Wrap, input: d2Input } = createInput('Diskon Kedua (%)', 'disc2', 'number', '20');
    
    const calcBtn = createButton('Hitung Harga Akhir');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(d1Wrap);
    container.appendChild(d2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const d1 = parseValue(d1Input.value) || 0;
      const d2 = parseValue(d2Input.value) || 0;
      
      if (!hInput.value) {
        showError('Harap masukkan harga awal.');
        return;
      }

      if (price > 0) {
        const afterD1 = price * (1 - d1 / 100);
        const final = afterD1 * (1 - d2 / 100);
        const totalSaved = price - final;
        const effectiveDiscount = (totalSaved / price) * 100;
        
        showResult(formatCurrency(final));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Hemat: ${formatCurrency(totalSaved)}<br>
          Diskon Efektif: ${effectiveDiscount.toFixed(1)}%
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Harga harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; d1Input.value = '50'; d2Input.value = '20';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator1;
