import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator99: Calculator = {
  name: 'Binary to Decimal',
  id: 'bin-to-dec',
  description: 'Convert binary numbers to decimal.',
  category: 'Math',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Binary Number', 'bin', 'text');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bin = bInput.value;
      if (/^[01]+$/.test(bin)) {
        const dec = parseInt(bin, 2);
        resDisplay.textContent = `Decimal: ${dec}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
