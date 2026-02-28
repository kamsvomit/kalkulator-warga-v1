import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator98: Calculator = {
  name: 'Grade Calculator',
  id: 'grade-calc',
  description: 'Calculate weighted final grade.',
  category: 'Misc',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Grades (%) (comma separated)', 'grades', 'text', '80, 90, 70');
    const { wrapper: wWrap, input: wInput } = createInput('Weights (%) (comma separated)', 'weights', 'text', '30, 40, 30');
    
    const calcBtn = createButton('Calculate Grade');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(wWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const grades = gInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      const weights = wInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (grades.length > 0 && grades.length === weights.length) {
        let total = 0;
        let totalWeight = 0;
        for (let i = 0; i < grades.length; i++) {
          total += (grades[i] * weights[i]) / 100;
          totalWeight += weights[i];
        }
        resDisplay.textContent = `Final Grade: ${total.toFixed(2)}%`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; wInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
