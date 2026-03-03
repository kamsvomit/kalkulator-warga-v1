import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator79: Calculator = {
  name: 'Kalkulator Pace Lari',
  id: 'pace-calc',
  description: 'Hitung pace lari Anda berdasarkan jarak dan waktu.',
  category: 'Kebugaran',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Waktu (JJ:MM:DD)', 'time', 'text', '00:30:00');
    
    const calcBtn = createButton('Hitung Pace');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseFloat(dInput.value);
      const timeParts = tInput.value.split(':').map(Number);
      if (dist > 0 && timeParts.length === 3) {
        const totalSec = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        const secPerKm = totalSec / dist;
        const min = Math.floor(secPerKm / 60);
        const sec = Math.round(secPerKm % 60);
        resDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')} menit/km`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
