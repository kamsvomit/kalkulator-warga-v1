import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator97: Calculator = {
  name: 'Recipe Scaler',
  id: 'recipe-scaler',
  description: 'Scale recipe ingredients based on desired servings.',
  category: 'Daily Life',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Original Servings', 'orig', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Desired Servings', 'new', 'number');
    const { wrapper: iWrap, input: iInput } = createInput('Ingredient Amount', 'amt', 'number');
    
    const calcBtn = createButton('Scale');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(nWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const orig = parseFloat(oInput.value);
      const desired = parseFloat(nInput.value);
      const amt = parseFloat(iInput.value);
      
      if (orig > 0 && desired > 0 && amt > 0) {
        const res = (amt / orig) * desired;
        resDisplay.textContent = `New Amount: ${res.toFixed(2)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = ''; nInput.value = ''; iInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
