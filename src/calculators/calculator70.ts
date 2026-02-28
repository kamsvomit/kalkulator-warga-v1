import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator70: Calculator = {
  name: 'Acre to Hectare Calculator',
  id: 'acre-to-ha',
  description: 'Convert acres to hectares.',
  category: 'Conversion',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Acres', 'acres', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const acre = parseFloat(aInput.value);
      if (!isNaN(acre)) {
        const ha = acre * 0.404686;
        resDisplay.textContent = `${ha.toFixed(2)} Hectares`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
