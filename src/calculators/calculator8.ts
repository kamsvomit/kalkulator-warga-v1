import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator8: Calculator = {
  name: 'Kalkulator Kebutuhan Air',
  id: 'water-intake',
  description: 'Hitung berapa banyak air yang harus Anda minum setiap hari berdasarkan berat badan.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    
    const calcBtn = createButton('Hitung Kebutuhan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      if (weight > 0) {
        const liters = weight * 0.033;
        resDisplay.textContent = `${liters.toFixed(1)} Liter / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
