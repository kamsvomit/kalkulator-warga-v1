import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator54: Calculator = {
  name: 'Miles to KM Calculator',
  id: 'mi-to-km',
  description: 'Convert miles to kilometers.',
  category: 'Conversion',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Miles', 'miles', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const mi = parseFloat(mInput.value);
      if (!isNaN(mi)) {
        const km = mi / 0.621371;
        resDisplay.textContent = `${km.toFixed(2)} Kilometers`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
