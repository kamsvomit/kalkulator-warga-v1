import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

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
        resDisplay.textContent = res.toLocaleString('id-ID');
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default persen;
