import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator100: Calculator = {
  name: 'Desimal ke Biner',
  id: 'dec-to-bin',
  description: 'Konversi angka desimal ke biner.',
  category: 'Matematika',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Angka Desimal', 'dec', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dec = parseInt(dInput.value.replace(/\D/g, ''));
      if (!isNaN(dec)) {
        showResult(dec.toString(2));
      } else {
        showError('Harap masukkan angka desimal yang valid.');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
