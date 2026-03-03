import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator53: Calculator = {
  name: 'Kalkulator KM ke Mil',
  id: 'km-to-mi',
  description: 'Konversi kilometer ke mil.',
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Kilometer', 'km', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const km = parseFloat(kInput.value);
      if (!isNaN(km)) {
        const mi = km * 0.621371;
        resDisplay.textContent = `${mi.toFixed(2)} Mil`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
