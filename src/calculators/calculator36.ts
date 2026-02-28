import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator36: Calculator = {
  name: 'Kalkulator Kalender Jawa',
  id: 'javanese-cal',
  description: 'Cek hari pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon).',
  category: 'Lain-lain',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Pilih Tanggal', 'date', 'date');
    
    const calcBtn = createButton('Cek Pasaran', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('1900-01-01'); // Known Legi

    calcBtn.onclick = () => {
      const target = new Date(dInput.value);
      if (!isNaN(target.getTime())) {
        const diff = Math.floor((target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
        const pIndex = ((diff % 5) + 5) % 5;
        resDisplay.textContent = pasaran[pIndex];
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
