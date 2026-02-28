import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator23: Calculator = {
  name: 'Kalkulator Tidur',
  id: 'sleep-calc',
  description: 'Cari tahu kapan harus tidur atau bangun untuk merasa segar.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: tWrap, input: tInput } = createInput('Waktu Bangun', 'wake', 'time', '07:00');
    
    const calcBtn = createButton('Hitung Waktu Tidur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const wake = tInput.value.split(':');
      if (wake.length === 2) {
        const date = new Date();
        date.setHours(parseInt(wake[0]), parseInt(wake[1]), 0);
        const sleep = new Date(date.getTime() - 9 * 60 * 60 * 1000); // 9 hours before
        resDisplay.textContent = `Tidur jam: ${sleep.getHours().toString().padStart(2, '0')}:${sleep.getMinutes().toString().padStart(2, '0')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
