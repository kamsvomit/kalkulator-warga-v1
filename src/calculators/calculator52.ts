import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator52: Calculator = {
  name: 'Feet to Meter Calculator',
  id: 'ft-to-m',
  description: 'Convert feet to meters.',
  category: 'Conversion',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Feet', 'feet', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ft = parseFloat(fInput.value);
      if (!isNaN(ft)) {
        const m = ft / 3.28084;
        resDisplay.textContent = `${m.toFixed(2)} Meters`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
