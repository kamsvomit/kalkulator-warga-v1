import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator66: Calculator = {
  name: 'ML to Cup Calculator',
  id: 'ml-to-cup',
  description: 'Convert milliliters to US cups.',
  category: 'Conversion',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Milliliters (ml)', 'ml', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ml = parseFloat(mInput.value);
      if (!isNaN(ml)) {
        const cup = ml / 236.588;
        resDisplay.textContent = `${cup.toFixed(2)} Cups`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
