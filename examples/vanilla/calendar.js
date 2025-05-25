import { Kenat } from '../../src/Kenat.js';

/**
 * Renders the calendar to the #calendar div.
 * @param {Object} calendar - { headers: string[], days: Array }
 */
function renderCalendar({ headers, days }) {
    console.log(days);
    let html = '<table><thead><tr>';
    html += headers.map(day => `<th>${day}</th>`).join('');
    html += '</tr></thead><tbody><tr>';

    days.forEach((item, idx) => {
        if (idx > 0 && idx % 7 === 0) html += '</tr><tr>';

        if (!item) {
            html += '<td></td>';
        } else {
            const todayClass = item.isToday ? 'today' : '';
            html += `<td class="${todayClass}">
        <strong>${item.ethiopian.day}</strong><br/>
        <small>${item.gregorian.month}/${item.gregorian.day}</small>
      </td>`;
        }
    });

    html += '</tr></tbody></table>';
    document.getElementById('calendar').innerHTML = html;
}

// ✅ Get current month's calendar in Amharic with Geez numerals
const calendar = Kenat.getMonthGrid({
    useGeez: true,
    weekdayLang: 'amharic',
    weekStart: 0
});

console.log(calendar);
renderCalendar(calendar);
