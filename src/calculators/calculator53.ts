import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator53: Calculator = {
  name: 'KM to Miles Calculator',
  id: 'km-to-mi',
  description: 'Convert kilometers to miles.',
  category: 'Conversion',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Kilometers', 'km', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const km = parseFloat(kInput.value);
      if (!isNaN(km)) {
        const mi = km * 0.621371;
        resDisplay.textContent = `${mi.toFixed(2)} Miles`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
