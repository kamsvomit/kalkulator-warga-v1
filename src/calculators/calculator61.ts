import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator61: Calculator = {
  name: 'Celsius to Fahrenheit',
  id: 'c-to-f',
  description: 'Convert Celsius to Fahrenheit.',
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
        const f = (c * 9/5) + 32;
        resDisplay.textContent = `${f.toFixed(1)} °F`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
