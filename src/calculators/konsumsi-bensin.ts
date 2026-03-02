import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue, setupEnterKeyNavigation } from '../utils';

export const konsumsiBensin: Calculator = {
  id: 'konsumsi-bensin',
  name: 'Konsumsi Bensin',
  description: 'Hitung rata-rata konsumsi bensin kendaraan Anda (km/liter).',
  category: 'Utilitas',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak Tempuh (km)', 'dist', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Bensin Terpakai (liter)', 'liters', 'number');
    
    const calcBtn = createButton('Hitung Konsumsi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseValue(dInput.value);
      const liters = parseValue(lInput.value);
      
      if (!dInput.value || !lInput.value) {
        showError('Harap masukkan jarak tempuh dan jumlah bensin.');
        return;
      }

      if (dist > 0 && liters > 0) {
        const consumption = dist / liters;
        showResult(`${consumption.toFixed(2)} km/liter`);
      } else {
        showError('Data harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default konsumsiBensin;
