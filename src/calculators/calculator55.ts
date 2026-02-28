import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator55: Calculator = {
  name: 'Inch to CM Calculator',
  id: 'in-to-cm',
  description: 'Convert inches to centimeters.',
  category: 'Conversion',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Inches', 'inches', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const inch = parseFloat(iInput.value);
      if (!isNaN(inch)) {
        const cm = inch * 2.54;
        resDisplay.textContent = `${cm.toFixed(2)} CM`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
