import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator82: Calculator = {
  name: 'Kalkulator Wallpaper',
  id: 'wallpaper-calc',
  description: 'Estimasi berapa banyak gulungan wallpaper yang Anda butuhkan.',
  category: 'Rumah',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Dinding (m)', 'width', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Dinding (m)', 'height', 'number');
    const { wrapper: rwWrap, input: rwInput } = createInput('Lebar Gulungan (m)', 'rwidth', 'number', '0.53');
    const { wrapper: rlWrap, input: rlInput } = createInput('Panjang Gulungan (m)', 'rlength', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(rwWrap);
    container.appendChild(rlWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const rw = parseFloat(rwInput.value) || 0.53;
      const rl = parseFloat(rlInput.value) || 10;
      
      if (w > 0 && h > 0) {
        const wallArea = w * h;
        const rollArea = rw * rl;
        const rolls = wallArea / rollArea;
        resDisplay.textContent = `${Math.ceil(rolls * 1.1)} Gulungan (termasuk 10% sisa)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
