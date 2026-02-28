import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator27: Calculator = {
  name: 'Rata-rata',
  id: 'average-calc',
  description: 'Hitung nilai rata-rata dari sekumpulan angka.',
  category: 'Matematika',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Angka (pisahkan dengan koma)', 'nums', 'text', '10, 20, 30');
    
    const calcBtn = createButton('Hitung Rata-rata', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const nums = iInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      if (nums.length > 0) {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        resDisplay.textContent = avg.toFixed(2);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
