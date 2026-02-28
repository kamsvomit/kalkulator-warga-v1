import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator88: Calculator = {
  name: 'Random Number Generator',
  id: 'random-gen',
  description: 'Generate a random number between two values.',
  category: 'Misc',
  render(container) {
    const { wrapper: minWrap, input: minInput } = createInput('Min', 'min', 'number', '1');
    const { wrapper: maxWrap, input: maxInput } = createInput('Max', 'max', 'number', '100');
    
    const calcBtn = createButton('Generate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(minWrap);
    container.appendChild(maxWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const min = parseInt(minInput.value) || 1;
      const max = parseInt(maxInput.value) || 100;
      if (max > min) {
        const res = Math.floor(Math.random() * (max - min + 1)) + min;
        resDisplay.textContent = `Result: ${res}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      minInput.value = '1'; maxInput.value = '100';
      resWrap.classList.add('hidden');
    };
  }
};
