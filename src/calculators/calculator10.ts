import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator10: Calculator = {
  name: 'Kalkulator Kalori',
  id: 'calorie-calc',
  description: 'Hitung kebutuhan kalori harian Anda untuk menjaga berat badan.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    const { wrapper: aWrap, input: aInput } = createInput('Umur', 'age', 'number');
    
    const calcBtn = createButton('Hitung Kalori', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseValue(wInput.value);
      const h = parseValue(hInput.value);
      const a = parseValue(aInput.value);
      if (w > 0 && h > 0 && a > 0) {
        const bmr = 10 * w + 6.25 * h - 5 * a + 5;
        resDisplay.textContent = `${Math.round(bmr * 1.2)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
