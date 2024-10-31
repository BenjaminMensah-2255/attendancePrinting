const weeks = [
    'week 1', 'week 2', 'week 3', 'week 4',
    'week 5', 'week 6', 'week 7', 'week 8',
    'week 9', 'week 10 ', 'week 11', 'week 12'
    // More data can be added here
];
const rowsPerPage = 4;
let currentPage = 1;

function displayTable(page) {
const tableBody = document.querySelector('#weekTable tbody');
tableBody.innerHTML = '';
const start = (page - 1) * rowsPerPage;
const end = start + rowsPerPage;
const paginatedWeeks = weeks.slice(start, end);

paginatedWeeks.forEach(week => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${week}</td>
        <td><button class="select-button" onclick="location.href='attend.html?week=${week}'">Select</button></td>
    `;
    tableBody.appendChild(row);
});
}

function setupPagination() {
const paginationDiv = document.getElementById('pagination');
paginationDiv.innerHTML = '';
const pageCount = Math.ceil(weeks.length / rowsPerPage);

for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPage) {
        button.style.backgroundColor = '#0056b3';
    }
    button.addEventListener('click', () => {
        currentPage = i;
        displayTable(currentPage);
        setupPagination();
    });
    paginationDiv.appendChild(button);
}
}

document.addEventListener('DOMContentLoaded', () => {
displayTable(currentPage);
setupPagination();
});