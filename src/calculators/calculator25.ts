import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator25: Calculator = {
  name: 'Kalkulator Pomodoro',
  id: 'pomodoro-calc',
  description: 'Hitung jadwal sesi fokus dan istirahat Anda.',
  category: 'Produktivitas',
  render(container) {
    const { wrapper: tWrap, input: tInput } = createInput('Total Waktu Kerja (Menit)', 'total', 'number', '120');
    
    const calcBtn = createButton('Buat Jadwal', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const total = parseInt(tInput.value);
      if (total > 0) {
        const sessions = Math.floor(total / 25);
        resDisplay.innerHTML = `
          <div>${sessions} Sesi Fokus (25m)</div>
          <div class="text-sm text-gray-500 mt-1">${sessions - 1} Istirahat Pendek (5m)</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
