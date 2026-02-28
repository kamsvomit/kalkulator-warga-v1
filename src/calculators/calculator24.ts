import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator24: Calculator = {
  name: 'Persentase',
  id: 'percent-calc',
  description: 'Hitung persentase dari sebuah nilai.',
  category: 'Matematika',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Persen (%)', 'percent', 'number');
    const { wrapper: vWrap, input: vInput } = createInput('Dari Nilai', 'val', 'number');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(vWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const v = parseValue(vInput.value);
      if (!isNaN(p) && !isNaN(v)) {
        const res = (p / 100) * v;
        resDisplay.textContent = res.toString();
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
