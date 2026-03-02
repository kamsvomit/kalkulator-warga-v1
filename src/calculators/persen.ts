import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue, setupEnterKeyNavigation } from '../utils';

export const persen: Calculator = {
  id: 'persen',
  name: 'Persen',
  description: 'Hitung nilai persentase dari suatu angka.',
  category: 'Matematika & Umum',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Persen (%)', 'percent', 'number');
    const { wrapper: vWrap, input: vInput } = createInput('Dari Nilai', 'val', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(vWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const v = parseValue(vInput.value);
      
      if (!pInput.value || !vInput.value) {
        showError('Harap masukkan persentase dan nilai angka.');
        return;
      }

      if (!isNaN(p) && !isNaN(v)) {
        const res = (p / 100) * v;
        showResult(res.toLocaleString('id-ID'));
      } else {
        showError('Masukkan angka yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; vInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default persen;
