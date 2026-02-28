import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator15: Calculator = {
  name: 'Kalkulator Masa Subur',
  id: 'ovulation-calc',
  description: 'Estimasi masa subur Anda berdasarkan siklus menstruasi.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Hari Pertama Haid Terakhir', 'last', 'date');
    const { wrapper: sWrap, input: sInput } = createInput('Panjang Siklus (Hari)', 'cycle', 'number', 'Contoh: 28');
    
    const calcBtn = createButton('Hitung Masa Subur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(sWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const last = new Date(dInput.value);
      const cycle = parseInt(sInput.value) || 28;
      if (!isNaN(last.getTime())) {
        const ovulation = new Date(last.getTime() + (cycle - 14) * 24 * 60 * 60 * 1000);
        resDisplay.textContent = ovulation.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; sInput.value = '28';
      resWrap.classList.add('hidden');
    };
  }
};
