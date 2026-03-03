import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator55: Calculator = {
  name: 'Kalkulator Inci ke CM',
  id: 'in-to-cm',
  description: 'Konversi inci ke sentimeter.',
  category: 'Konversi',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Inci', 'inches', 'number');
    
    const calcBtn = createButton('Konversi');
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
