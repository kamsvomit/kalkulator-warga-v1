import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator43: Calculator = {
  name: 'Kalkulator THR',
  id: 'thr-calc',
  description: 'Hitung Tunjangan Hari Raya (THR) proporsional Anda.',
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Masa Kerja (Bulan)', 'months', 'number', 'Contoh: 12');
    
    const calcBtn = createButton('Hitung THR', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      const months = parseValue(mInput.value);
      if (salary > 0 && months > 0) {
        let thr = salary;
        if (months < 12) {
          thr = (months / 12) * salary;
        }
        resDisplay.textContent = formatCurrency(thr);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
