import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator66: Calculator = {
  name: 'Kalkulator ML ke Cup',
  id: 'ml-to-cup',
  description: 'Konversi mililiter ke cup (US).',
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Mililiter (ml)', 'ml', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ml = parseFloat(mInput.value);
      if (!isNaN(ml)) {
        const cup = ml / 236.588;
        resDisplay.textContent = `${cup.toFixed(2)} Cup`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
