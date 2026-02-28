import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator56: Calculator = {
  name: 'CM to Inch Calculator',
  id: 'cm-to-in',
  description: 'Convert centimeters to inches.',
  category: 'Conversion',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Centimeters', 'cm', 'number');
    
    const calcBtn = createButton('Convert');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cm = parseFloat(cInput.value);
      if (!isNaN(cm)) {
        const inch = cm / 2.54;
        resDisplay.textContent = `${inch.toFixed(2)} Inches`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
