import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator22: Calculator = {
  name: 'Durasi Waktu',
  id: 'time-duration',
  description: 'Hitung durasi antara dua waktu.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Waktu Mulai', 'start', 'time');
    const { wrapper: eWrap, input: eInput } = createInput('Waktu Selesai', 'end', 'time');
    
    const calcBtn = createButton('Hitung Durasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(eWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const start = sInput.value.split(':');
      const end = eInput.value.split(':');
      if (start.length === 2 && end.length === 2) {
        let h = parseInt(end[0]) - parseInt(start[0]);
        let m = parseInt(end[1]) - parseInt(start[1]);
        if (m < 0) { m += 60; h--; }
        if (h < 0) h += 24;
        resDisplay.textContent = `${h} Jam ${m} Menit`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = ''; eInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
