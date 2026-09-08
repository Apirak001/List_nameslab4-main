// ===================================================================
// 801201 Week 4 — Bubble Sort
// ต่อยอดจาก Week 3: Student List + เพิ่มการเรียงลำดับ
// เติมเฉพาะส่วนที่มี TODO เท่านั้น
// ===================================================================

// ข้อมูลตั้งต้น — จงใจเรียงสลับ เพื่อให้เห็น Bubble Sort ทำงานหลายรอบ
const students = [
  { name: "Somchai", gpa: 3.2 },
  { name: "Nattaya", gpa: 1.5 },
  { name: "Anucha", gpa: 3.8 },
  { name: "Pimchanok", gpa: 2.1 },
  { name: "Weerapong", gpa: 2.75 },
  { name: "Kanyarat", gpa: 3.45 },
];

// ป้ายบอกสถานะการเรียง (ใช้ใน TODO 4)
const SORT_LABELS = {
  "gpa-desc": "GPA สูง → ต่ำ",
  "gpa-asc": "GPA ต่ำ → สูง",
  "name-asc": "ชื่อ A → Z",
  "name-desc": "ชื่อ Z → A",
};

let currentSort = "ยังไม่ได้เรียง";

// ===================================================================
// Bubble Sort
// ===================================================================

function bubbleSort(key, ascending = false) {
  const n = students.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // --- สามบรรทัดนี้ให้ไว้แล้ว วางไว้ในสุดของ loop รอบใน ---
      const a = students[j][key];
      const b = students[j + 1][key];
      const shouldSwap = ascending ? a > b : a < b;

      // TODO 1c: ถ้า shouldSwap → สลับ students[j] กับ students[j+1] ด้วย temp
      //          อย่าลืมว่าถ้าไม่มี temp ค่าเดิมจะถูกทับ
      if (shouldSwap) {
        const temp = students[j];
        students[j] = students[j + 1];
        students[j + 1] = temp;
      } //shouldSwap
    } // end j
  } //end for นอก
} // end bubblesort

function sortBy(key, ascending = false) {
  // TODO 2: ทำ 3 อย่างตามลำดับ
  //         1) เรียก bubbleSort(key, ascending)
  //         2) currentSort = SORT_LABELS[key + '-' + (ascending ? 'asc' : 'desc')]
  bubbleSort(key, ascending);
  currentSort = SORT_LABELS[key + "-" + (ascending ? "asc" : "desc")];
  renderList();
}

// ===================================================================
// เพิ่ม / ลบ นักศึกษา (ต่อจาก Week 3)
// ===================================================================

function addStudent() {
  const nameInput = document.getElementById("nameInput");
  const gpaInput = document.getElementById("gpaInput");

  const name = nameInput.value.trim();

  // TODO 3: เดิม Week 3 เก็บ GPA เป็นข้อความ ทำให้ sort ผิด
  //         ให้แปลงเป็นตัวเลขด้วย parseFloat แล้วตรวจว่าอยู่ในช่วง 0.00 - 4.00
  //         ถ้าไม่ผ่าน ให้ alert แล้ว return
  const gpaText = gpaInput.value.trim();
  const namePattern = /^[\p{L}\p{M}]+(?:[\s'-][\p{L}\p{M}]+)*$/u;
  const gpaPattern = /^(?:0|[1-3]|4)(?:\.\d{1,2})?$/;

  if (!name) {
    alert("กรุณาใส่ชื่อ");
    return;
  }

  if (!namePattern.test(name)) {
    alert("ชื่อควรมีเฉพาะตัวอักษรไทยหรืออังกฤษ และเว้นวรรคระหว่างชื่อได้");
    nameInput.focus();
    return;
  }

  if (!gpaPattern.test(gpaText)) {
    alert("กรุณากรอก GPA เป็นตัวเลขตั้งแต่ 0.00 ถึง 4.00 และมีทศนิยมไม่เกิน 2 ตำแหน่ง");
    gpaInput.focus();
    return;
  }

  const gpa = Number(gpaText);

  if (gpa < 0 || gpa > 4) {
    alert("GPA ต้องอยู่ระหว่าง 0.00 ถึง 4.00");
    gpaInput.focus();
    return;
  }

  students.push({ name, gpa: gpa.toFixed(2) });

  // เพิ่มคนใหม่ต่อท้าย → รายชื่อไม่เรียงแล้ว
  currentSort = "ยังไม่ได้เรียง";

  nameInput.value = "";
  gpaInput.value = "";

  renderList();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderList();
}

// ===================================================================
// วาดหน้าจอใหม่
// ===================================================================

function renderList() {
  const listContainer = document.getElementById("studentList");
  const countDisplay = document.getElementById("countDisplay");
  const sortIndicator = document.getElementById("sortIndicator");

  countDisplay.textContent = students.length;

  // TODO 4: แสดงค่า currentSort ลงใน sortIndicator

  sortIndicator.textContent = currentSort;

  if (students.length === 0) {
    listContainer.innerHTML =
      '<p class="empty-message">ยังไม่มีรายชื่อนักศึกษา</p>';
    return;
  }

  listContainer.innerHTML = students
    .map(
      (s, i) => `
    <div class="student-item">
      <span class="student-rank">${i + 1}</span>
      <div class="student-info">
        <span class="student-name">${escapeHtml(s.name)}</span>
        <span class="student-gpa">GPA: ${Number(s.gpa).toFixed(2)}</span>
      </div>
      <button class="delete-btn" onclick="deleteStudent(${i})">ลบ</button>
    </div>
  `,
    )
    .join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

// วาดครั้งแรกตอนเปิดหน้า
renderList();
