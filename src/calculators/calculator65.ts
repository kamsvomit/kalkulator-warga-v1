import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator65: Calculator = {
  name: 'Gallon to Liter Calculator',
  id: 'gal-to-l',
  description: 'Convert US gallons to liters.',
  category: 'Conversion',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gallons', 'gallons', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const gal = parseFloat(gInput.value);
      if (!isNaN(gal)) {
        const l = gal / 0.264172;
        resDisplay.textContent = `${l.toFixed(2)} Liters`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
