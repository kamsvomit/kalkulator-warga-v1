import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator18: Calculator = {
  id: 'education-fund',
  name: 'Dana Pendidikan',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk pendidikan anak di masa depan.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Biaya Pendidikan Saat Ini', 'cost', 'number', 'Contoh: 100.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu (Tahun)', 'years', 'number', '10');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Inflasi Pendidikan (%)', 'inflation', 'number', '10');
    
    const calcBtn = createButton('Hitung Target Dana');
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
      const years = parseValue(yInput.value) || 10;
      const inflation = (parseValue(iInput.value) || 10) / 100;
      
      if (!cInput.value) {
        showError('Harap masukkan biaya pendidikan saat ini.');
        return;
      }

      if (cost > 0) {
        const futureCost = cost * Math.pow(1 + inflation, years);
        const monthlySave = futureCost / (years * 12);
        
        showResult(formatCurrency(futureCost));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Biaya di masa depan (setelah ${years} tahun).<br>
          Estimasi tabungan: ${formatCurrency(monthlySave)} / bulan.
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Biaya harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; yInput.value = '10'; iInput.value = '10';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator18;
