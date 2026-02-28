import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator16: Calculator = {
  name: 'Kalkulator Kehamilan',
  id: 'pregnancy-calc',
  description: 'Estimasi tanggal kelahiran bayi Anda.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Hari Pertama Haid Terakhir', 'last', 'date');
    
    const calcBtn = createButton('Hitung Tanggal Lahir', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const last = new Date(dInput.value);
      if (!isNaN(last.getTime())) {
        const due = new Date(last.getTime() + 280 * 24 * 60 * 60 * 1000);
        resDisplay.textContent = due.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
