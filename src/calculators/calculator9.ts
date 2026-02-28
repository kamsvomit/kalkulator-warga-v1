import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator9: Calculator = {
  name: 'Kalkulator Berat Badan Ideal',
  id: 'ideal-weight',
  description: 'Hitung rentang berat badan ideal Anda berdasarkan tinggi badan.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    
    const calcBtn = createButton('Hitung Berat Ideal', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const h = parseValue(hInput.value) / 100;
      if (h > 0) {
        const min = 18.5 * (h * h);
        const max = 24.9 * (h * h);
        resDisplay.textContent = `${min.toFixed(1)}kg - ${max.toFixed(1)}kg`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
