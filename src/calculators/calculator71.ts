import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator71: Calculator = {
  name: 'Hectare to Acre Calculator',
  id: 'ha-to-acre',
  description: 'Convert hectares to acres.',
  category: 'Conversion',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Hectares', 'ha', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ha = parseFloat(hInput.value);
      if (!isNaN(ha)) {
        const acre = ha / 0.404686;
        resDisplay.textContent = `${acre.toFixed(2)} Acres`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
