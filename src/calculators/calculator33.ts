import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator33: Calculator = {
  name: 'Volume Tabung',
  id: 'cyl-vol',
  description: 'Hitung volume tabung berdasarkan jari-jari dan tinggi.',
  category: 'Matematika',
  render(container) {
    const { wrapper: rWrap, input: rInput } = createInput('Jari-jari', 'radius', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tinggi', 'height', 'number');
    
    const calcBtn = createButton('Hitung Volume', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const r = parseValue(rInput.value);
      const t = parseValue(tInput.value);
      if (r > 0 && t > 0) {
        const vol = Math.PI * r * r * t;
        resDisplay.textContent = `${vol.toFixed(2)} unit³`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
