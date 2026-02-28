import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator68: Calculator = {
  name: 'SqM to SqFt Calculator',
  id: 'sqm-to-sqft',
  description: 'Convert square meters to square feet.',
  category: 'Conversion',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Square Meters', 'sqm', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sqm = parseFloat(mInput.value);
      if (!isNaN(sqm)) {
        const sqft = sqm * 10.7639;
        resDisplay.textContent = `${sqft.toFixed(2)} Sq Ft`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
