import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator72: Calculator = {
  name: 'KMH to MPH Calculator',
  id: 'kmh-to-mph',
  description: 'Convert kilometers per hour to miles per hour.',
  category: 'Conversion',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('KM/H', 'kmh', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kmh = parseFloat(kInput.value);
      if (!isNaN(kmh)) {
        const mph = kmh * 0.621371;
        resDisplay.textContent = `${mph.toFixed(1)} MPH`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
