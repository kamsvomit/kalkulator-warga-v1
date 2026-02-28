import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator19: Calculator = {
  name: 'Konversi Suhu',
  id: 'temp-conv',
  description: 'Konversi antara Celsius, Fahrenheit, dan Kelvin.',
  category: 'Konversi',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      let val = parseValue(vInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
      
      if (!isNaN(val)) {
        // Convert to Celsius first
        let c = val;
        if (from === 'Fahrenheit') c = (val - 32) * 5/9;
        if (from === 'Kelvin') c = val - 273.15;
        
        // Convert from Celsius to target
        let res = c;
        if (to === 'Fahrenheit') res = (c * 9/5) + 32;
        if (to === 'Kelvin') res = c + 273.15;
        
        resDisplay.textContent = `${res.toFixed(2)} ${to}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
