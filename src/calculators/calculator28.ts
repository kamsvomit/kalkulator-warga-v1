import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator28: Calculator = {
  name: 'Akar Kuadrat',
  id: 'sqrt-calc',
  description: 'Hitung akar kuadrat dari sebuah angka.',
  category: 'Matematika',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Angka', 'val', 'number');
    
    const calcBtn = createButton('Hitung Akar', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const val = parseValue(vInput.value);
      if (val >= 0) {
        resDisplay.textContent = Math.sqrt(val).toFixed(4);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
