import { Kenat } from '../../src/Kenat.js';

let currentYear, currentMonth;

/**
 * Renders the calendar to the #calendar div.
 * @param {Object} calendar - { headers, days, year, month, monthName }
 */
function renderCalendar({ headers, days, year, month, monthName }) {
    currentYear = typeof year === 'string' ? parseInt(Kenat.fromGeez(year)) : year;
    currentMonth = month;

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button id="prevMonth">⬅️</button>
        <h2>📅 Ethiopian Calendar — ${monthName} ${year}</h2>
        <button id="nextMonth">➡️</button>
      </div>
      <table><thead><tr>`;
    
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

    // Attach event listeners to buttons
    document.getElementById('prevMonth').onclick = () => navigateMonth(-1);
    document.getElementById('nextMonth').onclick = () => navigateMonth(1);
}

function navigateMonth(direction) {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 1) {
        newMonth = 13;
        newYear -= 1;
    } else if (newMonth > 13) {
        newMonth = 1;
        newYear += 1;
    }

    const calendar = Kenat.getMonthGrid({
        year: newYear,
        month: newMonth,
        useGeez: false,
        weekdayLang: 'amharic',
        weekStart: 1
    });

    renderCalendar(calendar);
}

// Initial render
const calendar = Kenat.getMonthGrid({
    useGeez: false,
    weekdayLang: 'amharic',
    weekStart: 1
});
renderCalendar(calendar);
