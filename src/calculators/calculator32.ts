import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator32: Calculator = {
  name: 'Volume Kubus',
  id: 'cube-vol',
  description: 'Hitung volume kubus berdasarkan panjang sisi.',
  category: 'Matematika',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Panjang Sisi', 'side', 'number');
    
    const calcBtn = createButton('Hitung Volume', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const s = parseValue(sInput.value);
      if (s > 0) {
        resDisplay.textContent = `${Math.pow(s, 3).toFixed(2)} unit³`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
