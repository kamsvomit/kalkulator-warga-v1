import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator69: Calculator = {
  name: 'SqFt to SqM Calculator',
  id: 'sqft-to-sqm',
  description: 'Convert square feet to square meters.',
  category: 'Conversion',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Square Feet', 'sqft', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sqft = parseFloat(fInput.value);
      if (!isNaN(sqft)) {
        const sqm = sqft / 10.7639;
        resDisplay.textContent = `${sqm.toFixed(2)} Sq M`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
