import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator74: Calculator = {
  name: 'Kalkulator Knot ke KM/jam',
  id: 'knot-to-kmh',
  description: 'Konversi knot ke kilometer per jam.',
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Knot', 'knots', 'number');
    
    const calcBtn = createButton('Konversi');
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
        resDisplay.textContent = `${kmh.toFixed(1)} KM/jam`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
