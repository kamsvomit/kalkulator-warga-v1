import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator37: Calculator = {
  name: 'Kalkulator Weton',
  id: 'weton-calc',
  description: 'Hitung weton kelahiran Anda (Hari + Pasaran).',
  category: 'Lain-lain',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Tanggal Lahir', 'dob', 'date');
    
    const calcBtn = createButton('Cek Weton', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('1900-01-01');

    calcBtn.onclick = () => {
      const target = new Date(dInput.value);
      if (!isNaN(target.getTime())) {
        const day = days[target.getDay()];
        const diff = Math.floor((target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
        const pIndex = ((diff % 5) + 5) % 5;
        resDisplay.textContent = `${day} ${pasaran[pIndex]}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
