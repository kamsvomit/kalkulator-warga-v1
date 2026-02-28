import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator84: Calculator = {
  name: 'Tile Calculator',
  id: 'tile-calc',
  description: 'Calculate how many tiles you need for a floor or wall.',
  category: 'Home',
  render(container) {
    const { wrapper: awWrap, input: awInput } = createInput('Area Width (m)', 'awidth', 'number');
    const { wrapper: ahWrap, input: ahInput } = createInput('Area Height (m)', 'aheight', 'number');
    const { wrapper: twWrap, input: twInput } = createInput('Tile Width (cm)', 'twidth', 'number', '30');
    const { wrapper: thWrap, input: thInput } = createInput('Tile Height (cm)', 'theight', 'number', '30');
    
    const calcBtn = createButton('Calculate');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(awWrap);
    container.appendChild(ahWrap);
    container.appendChild(twWrap);
    container.appendChild(thWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const aw = parseFloat(awInput.value);
      const ah = parseFloat(ahInput.value);
      const tw = parseFloat(twInput.value) / 100;
      const th = parseFloat(thInput.value) / 100;
      
      if (aw > 0 && ah > 0 && tw > 0 && th > 0) {
        const area = aw * ah;
        const tileArea = tw * th;
        const tiles = area / tileArea;
        resDisplay.textContent = `${Math.ceil(tiles * 1.1)} Tiles (incl. 10% waste)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      awInput.value = ''; ahInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
