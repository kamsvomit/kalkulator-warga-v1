import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator63: Calculator = {
  name: 'Celsius to Kelvin',
  id: 'c-to-k',
  description: 'Convert Celsius to Kelvin.',
  category: 'Conversion',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Celsius (°C)', 'celsius', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const c = parseFloat(cInput.value);
      if (!isNaN(c)) {
        const k = c + 273.15;
        resDisplay.textContent = `${k.toFixed(2)} K`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
