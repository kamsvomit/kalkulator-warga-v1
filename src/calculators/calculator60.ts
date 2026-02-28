import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator60: Calculator = {
  name: 'Ounce to Gram Calculator',
  id: 'oz-to-g',
  description: 'Convert ounces to grams.',
  category: 'Conversion',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Ounces', 'ounces', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const oz = parseFloat(oInput.value);
      if (!isNaN(oz)) {
        const g = oz / 0.035274;
        resDisplay.textContent = `${g.toFixed(2)} Grams`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
