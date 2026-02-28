import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator3: Calculator = {
  name: 'Kalkulator BMI',
  id: 'bmi-calc',
  description: 'Hitung Indeks Massa Tubuh (BMI) Anda untuk mengetahui apakah berat badan Anda ideal.',
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number', 'Contoh: 70');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number', 'Contoh: 170');
    
    const calcBtn = createButton('Hitung BMI', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      const height = parseValue(hInput.value) / 100;
      if (weight > 0 && height > 0) {
        const bmi = weight / (height * height);
        let status = '';
        if (bmi < 18.5) status = 'Kekurangan Berat Badan';
        else if (bmi < 25) status = 'Normal (Ideal)';
        else if (bmi < 30) status = 'Kelebihan Berat Badan';
        else status = 'Obesitas';
        
        resDisplay.innerHTML = `
          <div>${bmi.toFixed(1)}</div>
          <div class="text-sm text-gray-500 mt-1">Status: ${status}</div>
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
