import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator80: Calculator = {
  name: 'Kalkulator Cat',
  id: 'paint-calc',
  description: 'Hitung berapa banyak cat yang Anda butuhkan untuk sebuah ruangan.',
  category: 'Rumah',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Dinding (m)', 'width', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Dinding (m)', 'height', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Jumlah Dinding', 'walls', 'number', '4');
    const { wrapper: cWrap, input: cInput } = createInput('Daya Sebar (m² per liter)', 'cov', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(nWrap);
    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const n = parseFloat(nInput.value) || 4;
      const cov = parseFloat(cInput.value) || 10;
      
      if (w > 0 && h > 0) {
        const totalArea = w * h * n;
        const liters = totalArea / cov;
        resDisplay.textContent = `${liters.toFixed(1)} Liter`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; nInput.value = '4'; cInput.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
