import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator31: Calculator = {
  name: 'Luas Persegi Panjang',
  id: 'rect-area',
  description: 'Hitung luas persegi panjang berdasarkan panjang dan lebar.',
  category: 'Matematika',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Panjang', 'length', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Lebar', 'width', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const l = parseValue(lInput.value);
      if (p > 0 && l > 0) {
        resDisplay.textContent = `${(p * l).toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
