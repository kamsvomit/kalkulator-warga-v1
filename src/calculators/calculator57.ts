import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator57: Calculator = {
  name: 'KG to Lbs Calculator',
  id: 'kg-to-lbs',
  description: 'Convert kilograms to pounds.',
  category: 'Conversion',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Kilograms', 'kg', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kg = parseFloat(kInput.value);
      if (!isNaN(kg)) {
        const lbs = kg * 2.20462;
        resDisplay.textContent = `${lbs.toFixed(2)} Lbs`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
