import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator88: Calculator = {
  name: 'Pembuat Angka Acak',
  id: 'random-gen',
  description: 'Buat angka acak di antara dua nilai.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: minWrap, input: minInput } = createInput('Minimal', 'min', 'number', '1');
    const { wrapper: maxWrap, input: maxInput } = createInput('Maksimal', 'max', 'number', '100');
    
    const calcBtn = createButton('Buat Angka');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(minWrap);
    container.appendChild(maxWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const min = parseInt(minInput.value) || 1;
      const max = parseInt(maxInput.value) || 100;
      if (max > min) {
        const res = Math.floor(Math.random() * (max - min + 1)) + min;
        resDisplay.textContent = `Hasil: ${res}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      minInput.value = '1'; maxInput.value = '100';
      resWrap.classList.add('hidden');
    };
  }
};
