import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator24: Calculator = {
  id: 'hajj-calc',
  name: 'Dana Haji/Umroh',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk ibadah Haji atau Umroh.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Biaya Saat Ini (Rp)', 'cost', 'number', 'Contoh: 50.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Target Berangkat (Tahun)', 'years', 'number', '5');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Kenaikan Biaya (%)', 'inflation', 'number', '5');
    
    const calcBtn = createButton('Hitung Target');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(yWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cost = parseValue(cInput.value);
      const years = parseValue(yInput.value) || 5;
      const inflation = (parseValue(iInput.value) || 5) / 100;
      
      if (!cInput.value) {
        showError('Harap masukkan biaya saat ini.');
        return;
      }

      if (cost > 0) {
        const futureCost = cost * Math.pow(1 + inflation, years);
        const monthlySave = futureCost / (years * 12);
        
        showResult(formatCurrency(futureCost));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Estimasi biaya di masa depan.<br>
          Tabungan per bulan: ${formatCurrency(monthlySave)}.
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Biaya harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; yInput.value = '5'; iInput.value = '5';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator24;
