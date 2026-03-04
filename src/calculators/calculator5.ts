import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator5: Calculator = {
  id: 'emergency-fund',
  name: 'Dana Darurat',
  description: 'Hitung berapa banyak dana darurat yang harus Anda miliki berdasarkan pengeluaran bulanan.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: eWrap, input: eInput } = createInput('Pengeluaran Bulanan', 'expense', 'number', 'Contoh: 5.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Jangka Waktu (Bulan)', 'months', 'number', '6');
    
    const calcBtn = createButton('Hitung Target');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(eWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const expense = parseValue(eInput.value);
      const months = parseValue(mInput.value) || 6;
      
      if (!eInput.value) {
        showError('Harap masukkan pengeluaran bulanan Anda.');
        return;
      }

      if (expense > 0) {
        const target = expense * months;
        showResult(formatCurrency(target));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Target dana darurat untuk ${months} bulan.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Pengeluaran harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      eInput.value = ''; mInput.value = '6';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator5;
