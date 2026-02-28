import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator44: Calculator = {
  name: 'Estimasi Pesangon',
  id: 'pesangon-calc',
  description: 'Hitung estimasi uang pesangon sesuai UU Cipta Kerja.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Pokok + Tunjangan Tetap', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: tWrap, input: tInput } = createInput('Masa Kerja (Tahun)', 'years', 'number', 'Contoh: 3');
    
    const calcBtn = createButton('Hitung Pesangon', 'btn-3d w-full mb-4');
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
        let multiplier = 1;
        if (years >= 8) multiplier = 9;
        else multiplier = Math.floor(years) + 1;
        
        const total = salary * multiplier;
        resDisplay.textContent = formatCurrency(total);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
