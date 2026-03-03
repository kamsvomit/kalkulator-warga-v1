import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator76: Calculator = {
  name: 'Kalkulator BMR',
  id: 'bmr-calc',
  description: 'Hitung Basal Metabolic Rate (BMR) menggunakan rumus Mifflin-St Jeor.',
  category: 'Kebugaran',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    const { wrapper: aWrap, input: aInput } = createInput('Usia', 'age', 'number');
    
    const calcBtn = createButton('Hitung BMR');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const a = parseFloat(aInput.value);
      
      if (w > 0 && h > 0 && a > 0) {
        const bmr = 10 * w + 6.25 * h - 5 * a + 5;
        resDisplay.textContent = `${Math.round(bmr)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
