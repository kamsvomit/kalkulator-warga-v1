import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator3: Calculator = {
  id: 'markup-calc',
  name: 'Harga Jual (Markup)',
  description: 'Tentukan harga jual berdasarkan modal dan margin keuntungan yang diinginkan.',
  category: 'Bisnis',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Modal (HPP)', 'cost', 'number');
    const { wrapper: mWrap, input: mInput } = createInput('Margin Keuntungan (%)', 'margin', 'number', '20');
    
    const calcBtn = createButton('Hitung Harga Jual');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cost = parseValue(cInput.value);
      const margin = parseValue(mInput.value) || 0;
      
      if (!cInput.value) {
        showError('Harap masukkan modal produk.');
        return;
      }

      if (cost > 0) {
        const sellPrice = cost / (1 - margin / 100);
        const profit = sellPrice - cost;
        
        showResult(formatCurrency(sellPrice));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Profit per unit: ${formatCurrency(profit)}`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Modal harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; mInput.value = '20';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator3;
