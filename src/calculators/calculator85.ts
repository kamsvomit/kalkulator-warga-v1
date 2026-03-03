import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator85: Calculator = {
  name: 'Kalkulator IPK',
  id: 'gpa-calc',
  description: 'Hitung IPK Anda berdasarkan nilai dan SKS.',
  category: 'Lainnya',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Nilai (pisahkan dengan koma, 0-4)', 'grades', 'text', '4, 3.5, 3');
    const { wrapper: cWrap, input: cInput } = createInput('SKS (pisahkan dengan koma)', 'credits', 'text', '3, 3, 4');
    
    const calcBtn = createButton('Hitung IPK');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const grades = gInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      const credits = cInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (grades.length > 0 && grades.length === credits.length) {
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < grades.length; i++) {
          totalPoints += grades[i] * credits[i];
          totalCredits += credits[i];
        }
        const gpa = totalPoints / totalCredits;
        resDisplay.textContent = `IPK: ${gpa.toFixed(2)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
