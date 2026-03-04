import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator99: Calculator = {
  name: 'Biner ke Desimal',
  id: 'bin-to-dec',
  description: 'Konversi angka biner ke desimal.',
  category: 'Matematika',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Angka Biner', 'bin', 'text');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bin = bInput.value.trim();
      if (/^[01]+$/.test(bin)) {
        const dec = parseInt(bin, 2);
        showResult(dec.toString());
      } else {
        showError('Harap masukkan angka biner yang valid (hanya 0 dan 1).');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
