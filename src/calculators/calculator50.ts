import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator50: Calculator = {
  name: 'Kalkulator Masa Pensiun',
  id: 'retirement-calc',
  description: 'Hitung berapa tahun lagi Anda akan pensiun.',
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Umur Sekarang', 'age', 'number', 'Contoh: 30');
    const { wrapper: rWrap, input: rInput } = createInput('Target Umur Pensiun', 'target', 'number', '58');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const age = parseValue(aInput.value);
      const target = parseValue(rInput.value) || 58;
      if (age > 0 && target > age) {
        resDisplay.textContent = `${target - age} Tahun Lagi`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; rInput.value = '58';
      resWrap.classList.add('hidden');
    };
  }
};
