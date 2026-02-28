import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const bmi: Calculator = {
  id: 'bmi',
  name: 'BMI (Body Mass Index)',
  description: 'Hitung indeks massa tubuh untuk memantau kesehatan Anda.',
  category: 'Kesehatan & Waktu',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    
    const calcBtn = createButton('Hitung BMI');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      const heightCm = parseValue(hInput.value);
      
      if (weight > 0 && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmiVal = weight / (heightM * heightM);
        
        let status = '';
        let color = '';
        
        if (bmiVal < 18.5) { status = 'Kurus'; color = 'text-blue-500'; }
        else if (bmiVal < 25) { status = 'Normal'; color = 'text-green-500'; }
        else if (bmiVal < 30) { status = 'Gemuk'; color = 'text-yellow-500'; }
        else { status = 'Obesitas'; color = 'text-red-500'; }
        
        resDisplay.innerHTML = `
          <div>${bmiVal.toFixed(1)}</div>
          <div class="text-sm font-medium ${color} mt-1">Status: ${status}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default bmi;
