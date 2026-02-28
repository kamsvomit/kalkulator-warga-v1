import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator82: Calculator = {
  name: 'Wallpaper Calculator',
  id: 'wallpaper-calc',
  description: 'Estimate how many rolls of wallpaper you need.',
  category: 'Home',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Wall Width (m)', 'width', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Wall Height (m)', 'height', 'number');
    const { wrapper: rwWrap, input: rwInput } = createInput('Roll Width (m)', 'rwidth', 'number', '0.53');
    const { wrapper: rlWrap, input: rlInput } = createInput('Roll Length (m)', 'rlength', 'number', '10');
    
    const calcBtn = createButton('Calculate');
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
        resDisplay.textContent = `${Math.ceil(rolls * 1.1)} Rolls (incl. 10% waste)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
