import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator76: Calculator = {
  name: 'BMR Calculator',
  id: 'bmr-calc',
  description: 'Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor.',
  category: 'Fitness',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Weight (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Height (cm)', 'height', 'number');
    const { wrapper: aWrap, input: aInput } = createInput('Age', 'age', 'number');
    
    const calcBtn = createButton('Calculate BMR');
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
        resDisplay.textContent = `${Math.round(bmr)} kcal / day`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
