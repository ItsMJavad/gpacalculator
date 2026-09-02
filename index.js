// adding popup
const addPopupBtn = document.querySelector('#add-lesson-btn');
const addPopup = document.querySelector('.backdrop');
const addCancelBtn = document.querySelector('#add-cancel');
const addBtn = document.querySelector('#add-btn');
const addPopupInputs = document.querySelectorAll('.add-lesson-section input');
const gpaSection = document.querySelector('.gpa');
const lessons = document.querySelector('.lessons');
const addLessonName = document.querySelector('#add-lesson-name');
const addLessonCredit = document.querySelector('#add-lesson-credit');

addPopupBtn.addEventListener('click', () => {
    addPopup.style.display = "initial";
});

addCancelBtn.addEventListener('click', () => {
    addPopupInputs.forEach(input => {
        input.value = '';
    });
    addPopup.style.display = 'none';
});

addBtn.addEventListener('click', () => {
    addLesson();
    addPopupInputs.forEach(input => {
        input.value = '';
    });
    addPopup.style.display = 'none';
});

function addLesson() {
    const lessonName = addLessonName.value.trim();
    const lessonCredit = Number(addLessonCredit.value);

    if (lessonName === '') {
        alert('نام درس را وارد کنید');
        return;
    }
    if (lessonCredit <= 0 || isNaN(lessonCredit)) {
        alert('تعداد واحد معتبر نیست');
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
    <td class="c4 delete-btn">
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </td>
    <td class="c1 lesson-name">${lessonName}</td>
    <td class="c2 lesson-credit">${lessonCredit}</td>
    <td class="c3 lesson-grade">
        <input type="number" min="0" max="20" step="0.1" data-credit="${lessonCredit}">
    </td>
    `;
    lessons.appendChild(row);
    gradeInput();
    delBtn();
    gpaCalculator();
}

function gradeInput() {
    const gradesInputs = document.querySelectorAll('.lesson-grade input');
    gradesInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value > 20) {
                gpaSection.textContent = "نمرات را به درستی وارد کنید";
                return;
            }
            gpaCalculator();
        });
    });
}

function delBtn() {
    const deleteBtn = document.querySelectorAll('.delete-btn svg');
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.remove();
            gpaCalculator();
        })
    });
}

function gpaCalculator() {
    const credits = document.querySelectorAll('.lesson-credit');
    const grades = document.querySelectorAll('.lesson-grade input');
    let creditSum = 0;
    credits.forEach(credit => {
        creditSum += Number(credit.textContent);
        creditSum = Math.round(creditSum * 100) / 100;
    });
    let gradeSum = 0;
    grades.forEach(input => {
        const grade = Number(input.value);
        const credit = Number(input.dataset.credit);
        gradeSum += grade * credit;
    });
    const gpa = gradeSum / creditSum;
    if (isNaN(gpa)) {
        gpaSection.textContent = '--';
        return;
    }
    gpaSection.textContent = gpa.toFixed(2);
    return;
};

delBtn();
gradeInput();