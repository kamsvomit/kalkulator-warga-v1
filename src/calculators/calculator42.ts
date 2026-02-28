import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator42: Calculator = {
  name: 'Estimasi JHT BPJS TK',
  id: 'bpjs-tk-jht',
  description: 'Hitung estimasi saldo Jaminan Hari Tua (JHT) Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: tWrap, input: tInput } = createInput('Lama Bekerja (Tahun)', 'years', 'number', 'Contoh: 5');
    
    const calcBtn = createButton('Hitung Estimasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      const years = parseValue(tInput.value);
      if (salary > 0 && years > 0) {
        // JHT: 5.7% (3.7% perusahaan, 2% pekerja)
        const monthlyContribution = salary * 0.057;
        const total = monthlyContribution * 12 * years;
        // Asumsi bunga 5% per tahun sederhana
        const withInterest = total * 1.1; 
        resDisplay.textContent = formatCurrency(withInterest);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
