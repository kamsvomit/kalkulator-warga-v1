import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator46: Calculator = {
  id: 'renovation-calc',
  name: 'Biaya Renovasi',
  description: 'Estimasi biaya renovasi rumah berdasarkan luas area dan kualitas material.',
  category: 'Rumah',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Luas Area (m2)', 'area', 'number', 'Contoh: 50');
    const { wrapper: qWrap, input: qInput } = createInput('Biaya per m2 (Rp)', 'rate', 'number', 'Contoh: 3.500.000');
    
    const calcBtn = createButton('Hitung Estimasi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const area = parseValue(aInput.value);
      const rate = parseValue(qInput.value);
      
      if (!aInput.value || !qInput.value) {
        showError('Harap masukkan luas area dan biaya per m2.');
        return;
      }

      if (area > 0 && rate > 0) {
        const total = area * rate;
        showResult(formatCurrency(total));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Estimasi total biaya renovasi.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Data harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator46;
