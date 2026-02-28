import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator4: Calculator = {
  name: 'Kalkulator Umur',
  id: 'age-calc',
  description: 'Hitung umur Anda secara detail dalam tahun, bulan, dan hari.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Tanggal Lahir', 'dob', 'date');
    
    const calcBtn = createButton('Hitung Umur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dob = new Date(dInput.value);
      const today = new Date();
      if (!isNaN(dob.getTime())) {
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        resDisplay.textContent = `${age} Tahun`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
