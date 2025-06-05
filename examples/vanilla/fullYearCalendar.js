import { Kenat } from '../../src/Kenat.js';
import { toArabic } from '../../src/geezConverter.js';

let useGeez = false;
let weekdayLang = 'amharic';
let weekStart = 1;

function parseYear(value) {
  if (typeof value === 'string') {
    const arabic = toArabic(value);
    return isNaN(parseInt(arabic)) ? 1 : parseInt(arabic);
  }
  return value;
}

function renderFullYearCalendar(year) {
  const yearCalendar = Kenat.getYearCalendar(year, { useGeez, weekdayLang, weekStart });

  let html = `<div style="text-align: center;">
    <h1>📅 Ethiopian Calendar ${useGeez ? toArabic(year) : year}</h1>
    <div style="margin: 1rem 0;">
      <button id="toggleGeez">Toggle Geez (${useGeez ? 'ON' : 'OFF'})</button>
      <button id="toggleLang">Toggle Lang (${weekdayLang})</button>
      <button id="toggleWeekStart">Week Start (${weekStart === 1 ? 'Mon' : 'Sun'})</button>
    </div>
  </div>`;

  html += `<div class="year-grid">`;

  yearCalendar.forEach(month => {
    html += `
      <div class="month-card">
        <h3>${month.monthName} ${month.year}</h3>
        <table>
          <thead>
            <tr>${month.headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
    `;

    for (let i = 0; i < month.days.length; i += 7) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        const item = month.days[i + j];
        if (!item) {
          html += '<td></td>';
        } else {
          const isToday = item.isToday ? 'today' : '';
          const isHoliday = item.holidays.length > 0 ? 'holiday' : '';
          const holidays = item.holidays.map(h => h.name.amharic).join(', ');

          html += `<td class="${isToday} ${isHoliday}">
            <strong>${item.ethiopian.day}</strong><br/>
            <small>${item.gregorian.month}/${item.gregorian.day}</small>
            ${holidays ? `<div class="holiday-labels">${holidays}</div>` : ''}
          </td>`;
        }
      }
      html += '</tr>';
    }

    html += `</tbody></table></div>`;
  });

  html += `</div>`;

  document.getElementById('calendar').innerHTML = html;

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
  const currentYear = new Date().getFullYear() - 8; // rough ethiopian year
  renderFullYearCalendar(currentYear);
}

rerender();
