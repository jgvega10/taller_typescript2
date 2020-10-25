
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

//---------------------------------------------------------------------------------------------------------------
let studentsTbody: HTMLElement = document.getElementById('datos')!;

//------------------------------------------------------------------------------------------------------------------
let coursesTbody: HTMLElement = document.getElementById('courses')!;

//-----------------------------------------------------------------------------------------------------------------
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;

//-----------------------------------------------------------------------------------------------------------------

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxLi: HTMLInputElement = <HTMLInputElement> document.getElementById("search-li")!;
const inputSearchBoxLs: HTMLInputElement = <HTMLInputElement> document.getElementById("search-ls")!;

//------------------------------------------------------------------------------------------------------------------
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

//-----------------------------------------------------------------------------------------------------------------

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();


ponerInfoTabla(dataStudents);

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function ponerInfoTabla(students: Student[]): void{
    students.forEach((student) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${student.dato}</td>
                               <td>${student.info}</td>`;
        studentsTbody.appendChild(trElement);
      });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 


function applyFilterByCredits() { 
    let textLi = Number(inputSearchBoxLi.value);
    let textLs = Number(inputSearchBoxLs.value);

    textLi = (isNaN(textLi)) ? 0 : textLi;
    textLs = (isNaN(textLs)) ? 3 : textLs;

    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByRange(textLi, textLs, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();

  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByRange(pli: number, pls: number, courses: Course[]) {
    console.log(pli)
    return pli <= 0 || pls <= 0 ? dataCourses : courses.filter( c => 
      (c.credits<= pls && c.credits >= pli));
  }

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}