import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator62: Calculator = {
  name: 'Fahrenheit ke Celsius',
  id: 'f-to-c',
  description: 'Konversi suhu Fahrenheit ke Celsius.',
  category: 'Konversi',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Fahrenheit (°F)', 'fahrenheit', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const f = parseFloat(fInput.value);
      if (!isNaN(f)) {
        const c = (f - 32) * 5/9;
        resDisplay.textContent = `${c.toFixed(1)} °C`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
