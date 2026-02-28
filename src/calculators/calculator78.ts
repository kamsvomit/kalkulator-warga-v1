import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator78: Calculator = {
  name: 'Max Heart Rate Calculator',
  id: 'max-hr',
  description: 'Estimate your maximum heart rate based on age.',
  category: 'Fitness',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Age', 'age', 'number');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const age = parseFloat(aInput.value);
      if (age > 0) {
        const maxHr = 220 - age;
        resDisplay.textContent = `${maxHr} BPM`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
