import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator51: Calculator = {
  name: 'Meter to Feet Calculator',
  id: 'm-to-ft',
  description: 'Convert meters to feet.',
  category: 'Conversion',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Meters', 'meters', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const m = parseFloat(mInput.value);
      if (!isNaN(m)) {
        const ft = m * 3.28084;
        resDisplay.textContent = `${ft.toFixed(2)} Feet`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
