let enrollments = [];
let sortKey = '';
let sortAsc = true;

async function loadData() {
  const res = await fetch("/api/enrollments");
  enrollments = await res.json();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("enrollment-table");
  tbody.innerHTML = "";

  const studentFilter = document.getElementById("student-filter").value.toLowerCase();
  const courseFilter = document.getElementById("course-filter").value.toLowerCase();

  let filtered = enrollments.filter(e =>
    e.student_name.toLowerCase().includes(studentFilter) &&
    e.course_name.toLowerCase().includes(courseFilter)
  );

  if (sortKey) {
    filtered.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  for (let e of filtered) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.student_id}</td>
      <td>${e.student_name}</td>
      <td>${e.course_id}</td>
      <td>${e.course_name}</td>
    `;
    tbody.appendChild(row);
  }
}

function sortTable(key) {
  if (sortKey === key) {
    sortAsc = !sortAsc;
  } else {
    sortKey = key;
    sortAsc = true;
  }
  renderTable();
}

function showAll() {
  document.getElementById("student-filter").value = '';
  document.getElementById("course-filter").value = '';
  sortKey = '';
  sortAsc = true;
  renderTable();
}

document.getElementById("student-filter").addEventListener("input", renderTable);
document.getElementById("course-filter").addEventListener("input", renderTable);
document.getElementById("show-all-btn").addEventListener("click", showAll);

loadData();
