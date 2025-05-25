import { Kenat } from '../../src/Kenat.js';

/**
 * Renders the calendar table into the #calendar div.
 * @param {Object} calendar - Object returned by Kenat.getMonthGrid()
 */
function renderCalendar({ headers, days }) {
  let html = '<table><thead><tr>';
  html += headers.map(day => `<th>${day}</th>`).join('');
  html += '</tr></thead><tbody><tr>';

  days.forEach((item, idx) => {
    if (idx > 0 && idx % 7 === 0) html += '</tr><tr>';
    if (!item) {
      html += '<td></td>';
    } else {
      html += `<td>
        <strong>${item.ethiopian.day}</strong><br/>
        <small>${item.gregorian.month}/${item.gregorian.day}</small>
      </td>`;
    }
  });

  html += '</tr></tbody></table>';
  document.getElementById('calendar').innerHTML = html;
}

// ✅ Fetch current Ethiopian month grid
const calendar = Kenat.getMonthGrid({
  useGeez: true,        // display Ethiopian date in Geez numerals
  weekdayLang: 'amharic', // show weekday headers in Amharic
  weekStart: 0          // week starts on Sunday
});

renderCalendar(calendar);
