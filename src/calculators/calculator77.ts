import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator77: Calculator = {
  name: 'TDEE Calculator',
  id: 'tdee-calc',
  description: 'Calculate Total Daily Energy Expenditure.',
  category: 'Fitness',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('BMR (kcal)', 'bmr', 'number');
    
    const activityLabel = document.createElement('label');
    activityLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
    activityLabel.textContent = 'Activity Level';
    const activitySelect = document.createElement('select');
    activitySelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4';
    const levels = [
      { name: 'Sedentary', val: 1.2 },
      { name: 'Lightly Active', val: 1.375 },
      { name: 'Moderately Active', val: 1.55 },
      { name: 'Very Active', val: 1.725 },
      { name: 'Extra Active', val: 1.9 }
    ];
    levels.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.val.toString();
      opt.textContent = l.name;
      activitySelect.appendChild(opt);
    });

    const calcBtn = createButton('Calculate TDEE');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(activityLabel);
    container.appendChild(activitySelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bmr = parseFloat(bInput.value);
      const activity = parseFloat(activitySelect.value);
      if (bmr > 0) {
        const tdee = bmr * activity;
        resDisplay.textContent = `${Math.round(tdee)} kcal / day`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
