import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator74: Calculator = {
  name: 'Knot to KMH Calculator',
  id: 'knot-to-kmh',
  description: 'Convert knots to kilometers per hour.',
  category: 'Conversion',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Knots', 'knots', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const knot = parseFloat(kInput.value);
      if (!isNaN(knot)) {
        const kmh = knot * 1.852;
        resDisplay.textContent = `${kmh.toFixed(1)} KM/H`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
