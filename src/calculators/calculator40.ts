import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator40: Calculator = {
  name: 'Kalkulator Kecepatan',
  id: 'speed-calc-id',
  description: 'Hitung kecepatan rata-rata berdasarkan jarak dan waktu.',
  category: 'Matematika',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Waktu (jam)', 'time', 'number');
    
    const calcBtn = createButton('Hitung Kecepatan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const d = parseValue(dInput.value);
      const t = parseValue(tInput.value);
      if (d > 0 && t > 0) {
        const speed = d / t;
        resDisplay.textContent = `${speed.toFixed(2)} km/jam`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
