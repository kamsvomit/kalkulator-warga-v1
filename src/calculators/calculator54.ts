import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator54: Calculator = {
  name: 'Kalkulator Mil ke KM',
  id: 'mi-to-km',
  description: 'Konversi mil ke kilometer.',
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Mil', 'miles', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const mi = parseFloat(mInput.value);
      if (!isNaN(mi)) {
        const km = mi / 0.621371;
        resDisplay.textContent = `${km.toFixed(2)} Kilometer`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
