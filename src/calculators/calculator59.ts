import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator59: Calculator = {
  name: 'Gram to Ounce Calculator',
  id: 'g-to-oz',
  description: 'Convert grams to ounces.',
  category: 'Conversion',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Grams', 'grams', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const g = parseFloat(gInput.value);
      if (!isNaN(g)) {
        const oz = g * 0.035274;
        resDisplay.textContent = `${oz.toFixed(2)} Ounces`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
