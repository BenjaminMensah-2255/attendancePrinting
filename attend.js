const params = new URLSearchParams(window.location.search);
const week = params.get('week');
document.getElementById('weekTitle').textContent += week;

const attendanceData = {
    'week 1': [
        { name: 'John Doe', contact: '123-456-7890' },
        { name: 'Jane Smith', contact: '987-654-3210' },
        { name: 'Sam Wilson', contact: '555-123-4567' },
        { name: 'Lisa Wong', contact: '555-765-4321' },
        { name: 'Paul Jones', contact: '555-987-6543' },
        { name: 'Nina Brown', contact: '555-678-1234' }
        // More data can be added here
    ],
    'week 2': [
        { name: 'Alice Johnson', contact: '555-123-4567' },
        { name: 'Bob Brown', contact: '555-765-4321' },
        { name: 'Charlie Davis', contact: '555-234-5678' },
        { name: 'Diana Evans', contact: '555-876-5432' },
        { name: 'Edward Foster', contact: '555-345-6789' },
        { name: 'Fiona Green', contact: '555-543-2109' }
        // More data can be added here
    ],
    // Add data for other weeks
};

const rowsPerPage = 4;
let currentPage = 1;

function displayTable(page) {
    const tableBody = document.querySelector('#attendanceTable tbody');
    tableBody.innerHTML = '';
    const data = attendanceData[week] || [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.contact}</td>
        `;
        tableBody.appendChild(row);
    });
}

function displayAllData() {
    const tableBody = document.querySelector('#attendanceTable tbody');
    tableBody.innerHTML = '';
    const data = attendanceData[week] || [];

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.contact}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupPagination() {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    const data = attendanceData[week] || [];
    const pageCount = Math.ceil(data.length / rowsPerPage);

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

function printAllData() {
    // Store current page number
    const originalPage = currentPage;

    // Display all data
    displayAllData();

    // Trigger print
    window.print();

    // Restore pagination
    displayTable(originalPage);
    setupPagination();
}

document.addEventListener('DOMContentLoaded', () => {
    displayTable(currentPage);
    setupPagination();
});