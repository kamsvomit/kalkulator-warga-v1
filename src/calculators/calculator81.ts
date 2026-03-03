import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator81: Calculator = {
  name: 'Kalkulator Lantai',
  id: 'flooring-calc',
  description: 'Hitung jumlah material lantai yang dibutuhkan untuk sebuah ruangan.',
  category: 'Rumah',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Panjang Ruangan (m)', 'length', 'number');
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Ruangan (m)', 'width', 'number');
    const { wrapper: w2Wrap, input: w2Input } = createInput('Estimasi Sisa/Buang (%)', 'waste', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(wWrap);
    container.appendChild(w2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      const w = parseFloat(wInput.value);
      const waste = parseFloat(w2Input.value) || 10;
      
      if (l > 0 && w > 0) {
        const area = l * w;
        const total = area * (1 + waste / 100);
        resDisplay.textContent = `${total.toFixed(2)} m²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; wInput.value = ''; w2Input.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
