import { MonthGrid } from '../../src/MonthGrid.js';
import { toArabic } from '../../src/geezConverter.js';

let monthGridInstance;

// Settings
let useGeez = true;
let weekdayLang = 'amharic';
let weekStart = 1;

function parseYearMonth(value) {
  if (typeof value === 'string') {
    const arabic = toArabic(value);
    return isNaN(parseInt(arabic)) ? 1 : parseInt(arabic);
  }
  return value;
}

function renderCalendar(gridData) {
  let { headers, days, year, monthName } = gridData;

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 600px; margin: 0 auto;">
      <button id="prevMonth">⬅️</button>
      <h2>📅 ${monthName} ${year}</h2>
      <button id="nextMonth">➡️</button>
    </div>
    <div style="display: flex; gap: 10px; justify-content: center; margin: 1rem 0;">
      <button id="toggleGeez">Toggle Geez (${useGeez ? 'ON' : 'OFF'})</button>
      <button id="toggleLang">Toggle Lang (${weekdayLang})</button>
      <button id="toggleWeekStart">Week Start (${weekStart === 1 ? 'Mon' : 'Sun'})</button>
    </div>
    <table><thead><tr>`;

  html += headers.map(day => `<th>${day}</th>`).join('');
  html += '</tr></thead><tbody>';

  for (let i = 0; i < days.length; i += 7) {
    html += '<tr>';
    for (let j = 0; j < 7; j++) {
      const item = days[i + j];
      if (!item) {
        html += '<td></td>';
      } else {
        const todayClass = item.isToday ? 'today' : '';
        const isHoliday = item.holidays && item.holidays.length > 0;
        const holidays = item.holidays.map(h => h.name.amharic).join(', ');

        html += `<td class="${todayClass} ${isHoliday ? 'holiday' : ''}">
            <strong>${item.ethiopian.day}</strong><br/>
            <small>${item.gregorian.month}/${item.gregorian.day}</small>
            ${holidays ? `<div class="holiday-labels">${holidays}</div>` : ''}
        </td>`;
      }
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  document.getElementById('calendar').innerHTML = html;

  // Attach event listeners
  document.getElementById('prevMonth').onclick = () => {
    const grid = monthGridInstance.down().generate();
    renderCalendar(grid);
  };

  document.getElementById('nextMonth').onclick = () => {
    const grid = monthGridInstance.up().generate();
    renderCalendar(grid);
  };

  document.getElementById('toggleGeez').onclick = () => {
    useGeez = !useGeez;
    rerender();
  };

  document.getElementById('toggleLang').onclick = () => {
    weekdayLang = weekdayLang === 'amharic' ? 'english' : 'amharic';
    rerender();
  };

  document.getElementById('toggleWeekStart').onclick = () => {
    weekStart = weekStart === 1 ? 0 : 1;
    rerender();
  };
}

function rerender() {
  // Preserve current year/month if available
  const config = monthGridInstance
    ? { year: monthGridInstance.year, month: monthGridInstance.month }
    : {};

  monthGridInstance = new MonthGrid({
    ...config,
    useGeez,
    weekdayLang,
    weekStart,
  });

  const grid = monthGridInstance.generate();
  renderCalendar(grid);
}

// Initial render
rerender();
