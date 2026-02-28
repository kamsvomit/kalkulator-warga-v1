import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator58: Calculator = {
  name: 'Lbs to KG Calculator',
  id: 'lbs-to-kg',
  description: 'Convert pounds to kilograms.',
  category: 'Conversion',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Pounds', 'lbs', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const lbs = parseFloat(lInput.value);
      if (!isNaN(lbs)) {
        const kg = lbs / 2.20462;
        resDisplay.textContent = `${kg.toFixed(2)} KG`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
