import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator98: Calculator = {
  name: 'Kalkulator Nilai Akhir',
  id: 'grade-calc',
  description: 'Hitung nilai akhir berbobot.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Nilai (%) (pisahkan dengan koma)', 'grades', 'text', '80, 90, 70');
    const { wrapper: wWrap, input: wInput } = createInput('Bobot (%) (pisahkan dengan koma)', 'weights', 'text', '30, 40, 30');
    
    const calcBtn = createButton('Hitung Nilai');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(wWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const grades = gInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      const weights = wInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (grades.length > 0 && grades.length === weights.length) {
        let total = 0;
        let totalWeight = 0;
        for (let i = 0; i < grades.length; i++) {
          total += (grades[i] * (weights[i] / 100));
          totalWeight += weights[i];
        }
        showResult(`${total.toFixed(2)}%`);
      } else {
        showError('Harap masukkan jumlah nilai dan bobot yang sama.');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; wInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
