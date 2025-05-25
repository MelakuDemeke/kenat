function printToHTML(grid, weekStart = 0) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const headers = daysOfWeek.slice(weekStart).concat(daysOfWeek.slice(0, weekStart));

    let html = '<table><thead><tr>';
    html += headers.map(d => `<th>${d}</th>`).join('');
    html += '</tr></thead><tbody><tr>';

    grid.forEach((day, i) => {
        if (i % 7 === 0 && i !== 0) html += '</tr><tr>';
        if (!day) html += '<td></td>';
        else html += `<td>${day.ethiopian.display}</td>`;
    });

    html += '</tr></tbody></table>';
    return html;
}
