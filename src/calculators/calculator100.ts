import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator100: Calculator = {
  name: 'Decimal to Binary',
  id: 'dec-to-bin',
  description: 'Convert decimal numbers to binary.',
  category: 'Math',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Decimal Number', 'dec', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dec = parseInt(dInput.value);
      if (!isNaN(dec)) {
        const bin = dec.toString(2);
        resDisplay.textContent = `Binary: ${bin}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
