import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator21: Calculator = {
  name: 'Selisih Tanggal',
  id: 'date-diff',
  description: 'Hitung jumlah hari antara dua tanggal.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Tanggal Mulai', 'start', 'date');
    const { wrapper: eWrap, input: eInput } = createInput('Tanggal Selesai', 'end', 'date');
    
    const calcBtn = createButton('Hitung Selisih', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(eWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const start = new Date(sInput.value);
      const end = new Date(eInput.value);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        resDisplay.textContent = `${days} Hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = ''; eInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
