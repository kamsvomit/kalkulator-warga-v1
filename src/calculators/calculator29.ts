import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator29: Calculator = {
  name: 'Luas Lingkaran',
  id: 'circle-area',
  description: 'Hitung luas lingkaran berdasarkan jari-jari.',
  category: 'Matematika',
  render(container) {
    const { wrapper: rWrap, input: rInput } = createInput('Jari-jari (r)', 'radius', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const r = parseValue(rInput.value);
      if (r > 0) {
        const area = Math.PI * r * r;
        resDisplay.textContent = `${area.toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      rInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
