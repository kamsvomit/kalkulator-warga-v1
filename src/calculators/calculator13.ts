import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator13: Calculator = {
  id: 'retirement-calc',
  name: 'Dana Pensiun',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk masa pensiun yang nyaman.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: eWrap, input: eInput } = createInput('Pengeluaran Bulanan Saat Pensiun', 'expense', 'number', 'Contoh: 10.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu Pensiun (Tahun)', 'years', 'number', '20');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Inflasi Tahunan (%)', 'inflation', 'number', '5');
    
    const calcBtn = createButton('Hitung Dana Pensiun');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(eWrap);
    container.appendChild(yWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const expense = parseValue(eInput.value);
      const years = parseValue(yInput.value) || 20;
      const inflation = (parseValue(iInput.value) || 5) / 100;
      
      if (!eInput.value) {
        showError('Harap masukkan pengeluaran bulanan yang diinginkan.');
        return;
      }

      if (expense > 0) {
        // Simple calculation: total expense for 'years' adjusted by inflation
        // This is a simplified model for quick estimation
        const totalMonths = years * 12;
        const total = expense * totalMonths * (1 + inflation * (years / 2));
        
        showResult(formatCurrency(total));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Estimasi total dana untuk ${years} tahun masa pensiun.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Pengeluaran harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      eInput.value = ''; yInput.value = '20'; iInput.value = '5';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator13;
