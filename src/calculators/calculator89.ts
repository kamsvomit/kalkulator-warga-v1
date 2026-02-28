import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator89: Calculator = {
  name: 'Password Strength Checker',
  id: 'password-strength',
  description: 'Check the strength of a password.',
  category: 'Misc',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Password', 'pass', 'text');
    
    const calcBtn = createButton('Check Strength');
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
      
      const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
      resDisplay.textContent = levels[score - 1] || 'Very Weak';
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
