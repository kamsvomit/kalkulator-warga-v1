import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator64: Calculator = {
  name: 'Liter to Gallon Calculator',
  id: 'l-to-gal',
  description: 'Convert liters to US gallons.',
  category: 'Conversion',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Liters', 'liters', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      if (!isNaN(l)) {
        const gal = l * 0.264172;
        resDisplay.textContent = `${gal.toFixed(2)} Gallons`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
