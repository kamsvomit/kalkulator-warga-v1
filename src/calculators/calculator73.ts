import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator73: Calculator = {
  name: 'MPH to KMH Calculator',
  id: 'mph-to-kmh',
  description: 'Convert miles per hour to kilometers per hour.',
  category: 'Conversion',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('MPH', 'mph', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const mph = parseFloat(mInput.value);
      if (!isNaN(mph)) {
        const kmh = mph / 0.621371;
        resDisplay.textContent = `${kmh.toFixed(1)} KM/H`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
