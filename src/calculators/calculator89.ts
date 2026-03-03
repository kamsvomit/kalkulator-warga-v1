import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator89: Calculator = {
  name: 'Cek Kekuatan Kata Sandi',
  id: 'password-strength',
  description: 'Periksa seberapa kuat kata sandi Anda.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Kata Sandi', 'pass', 'text');
    
    const calcBtn = createButton('Cek Kekuatan');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const pass = pInput.value;
      let score = 0;
      if (pass.length >= 8) score++;
      if (/[A-Z]/.test(pass)) score++;
      if (/[a-z]/.test(pass)) score++;
      if (/[0-9]/.test(pass)) score++;
      if (/[^A-Za-z0-9]/.test(pass)) score++;
      
      const levels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
      resDisplay.textContent = levels[score - 1] || 'Sangat Lemah';
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
