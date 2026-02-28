import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator67: Calculator = {
  name: 'Cup to ML Calculator',
  id: 'cup-to-ml',
  description: 'Convert US cups to milliliters.',
  category: 'Conversion',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Cups', 'cups', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cup = parseFloat(cInput.value);
      if (!isNaN(cup)) {
        const ml = cup * 236.588;
        resDisplay.textContent = `${ml.toFixed(0)} ml`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
