import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator30: Calculator = {
  name: 'Luas Segitiga',
  id: 'triangle-area',
  description: 'Hitung luas segitiga berdasarkan alas dan tinggi.',
  category: 'Matematika',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Alas', 'base', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tinggi', 'height', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const a = parseValue(aInput.value);
      const t = parseValue(tInput.value);
      if (a > 0 && t > 0) {
        const area = 0.5 * a * t;
        resDisplay.textContent = `${area.toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
