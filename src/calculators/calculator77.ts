import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator77: Calculator = {
  name: 'Kalkulator TDEE',
  id: 'tdee-calc',
  description: 'Hitung Total Daily Energy Expenditure (Total Pengeluaran Energi Harian).',
  category: 'Kebugaran',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('BMR (kkal)', 'bmr', 'number');
    
    const activityLabel = document.createElement('label');
    activityLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
    activityLabel.textContent = 'Tingkat Aktivitas';
    const activitySelect = document.createElement('select');
    activitySelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4';
    const levels = [
      { name: 'Sedenter (Jarang Olahraga)', val: 1.2 },
      { name: 'Aktivitas Ringan', val: 1.375 },
      { name: 'Aktivitas Sedang', val: 1.55 },
      { name: 'Sangat Aktif', val: 1.725 },
      { name: 'Ekstra Aktif', val: 1.9 }
    ];
    levels.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.val.toString();
      opt.textContent = l.name;
      activitySelect.appendChild(opt);
    });

    const calcBtn = createButton('Hitung TDEE');
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
        resDisplay.textContent = `${Math.round(tdee)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
