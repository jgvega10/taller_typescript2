import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
//---------------------------------------------------------------------------------------------------------------
var studentsTbody = document.getElementById('datos');
//------------------------------------------------------------------------------------------------------------------
var coursesTbody = document.getElementById('courses');
//-----------------------------------------------------------------------------------------------------------------
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
//-----------------------------------------------------------------------------------------------------------------
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxLi = document.getElementById("search-li");
var inputSearchBoxLs = document.getElementById("search-ls");
//------------------------------------------------------------------------------------------------------------------
var totalCreditElm = document.getElementById("total-credits");
//-----------------------------------------------------------------------------------------------------------------
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
ponerInfoTabla(dataStudents);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function ponerInfoTabla(students) {
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.dato + "</td>\n                               <td>" + student.info + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var textLi = Number(inputSearchBoxLi.value);
    var textLs = Number(inputSearchBoxLs.value);
    textLi = (isNaN(textLi)) ? 0 : textLi;
    textLs = (isNaN(textLs)) ? 3 : textLs;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRange(textLi, textLs, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByRange(pli, pls, courses) {
    console.log(pli);
    return pli <= 0 || pls <= 0 ? dataCourses : courses.filter(function (c) {
        return (c.credits <= pls && c.credits >= pli);
    });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
