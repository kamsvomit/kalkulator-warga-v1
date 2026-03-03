import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator83: Calculator = {
  name: 'Kalkulator Beton',
  id: 'concrete-calc',
  description: 'Hitung volume beton yang dibutuhkan untuk sebuah lantai/slab.',
  category: 'Rumah',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Panjang (m)', 'length', 'number');
    const { wrapper: wWrap, input: wInput } = createInput('Lebar (m)', 'width', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Ketebalan (cm)', 'thick', 'number', '10');
    
    const calcBtn = createButton('Hitung Volume');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(wWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      const w = parseFloat(wInput.value);
      const d = parseFloat(dInput.value) / 100;
      
      if (l > 0 && w > 0 && d > 0) {
        const volume = l * w * d;
        resDisplay.textContent = `${volume.toFixed(2)} Meter Kubik (m³)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; wInput.value = ''; dInput.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
