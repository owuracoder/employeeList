/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const addEmployeeIcon = document.getElementById('addEmployee')
const employeeForm = document.getElementById('new-employee')
const closeButton = document.getElementById('remove-icon')
const firstNameField = document.getElementById('firstName')
const lastNameField = document.getElementById('lastName')
const dateOfBirthField = document.getElementById('dob')
const workPositionField = document.getElementById('workposition')
const addEmployeeButton = document.getElementById('addBtn')
const container = document.querySelector('.container')
const searchBoxField = document.getElementById('search-box')
const searchButton = document.getElementById('btnSearch')
const showAllEmployees = document.getElementById('btnAll')


addEmployeeIcon.addEventListener('click', pullEmployeeForm) 
closeButton.addEventListener('click', closeEmployeeForm)
addEmployeeButton.addEventListener('click', addNewEmployee)
container.addEventListener('click', deleteEmployee)
container.addEventListener('click', editEmployeeInformation)
searchButton.addEventListener('click', searchEmployee)
showAllEmployees.addEventListener('click', showEveryEmployee)
window.addEventListener('DOMContentLoaded',initiateApp)


let editMode = {}
class Employee {
    constructor(firstName, lastName, dateOfBirth, workPosition){
        this.firstName = firstName
        this.lastName = lastName
        this.dateOfBirth = dateOfBirth
        this.workPosition = workPosition
    }
}

function initiateApp(){
    clearEmployeeContainer()
    displayEmployees()
}

function showEveryEmployee(){
    clearEmployeeContainer()
    displayEmployees()
}

function searchEmployee(){
    let searchedEmployeeName = searchBoxField.value
    const employeeData = localStorageCheck()
    const searchedEmployeeNameInLowerCase = searchedEmployeeName.toLowerCase()

    employeeData.forEach(function(employee, idx){
        const employeeFirstName = employee.firstName
        const currentEmployee = [employeeData[idx]]
        const employeeFirstNameInLowerCase = employeeFirstName.toLowerCase()
        if(employeeFirstNameInLowerCase == searchedEmployeeNameInLowerCase ){
            clearEmployeeContainer()
            const subContainer = createEmployeeDisplayContainer()
            const employeesContainer = populateEmployeesContainer(currentEmployee)
            subContainer.appendChild(employeesContainer)
            const container = document.querySelector('.container')
            const htmlNewEmployeeForm= document.getElementById('new-employee')
            container.insertBefore(subContainer,htmlNewEmployeeForm)
            searchBoxField.value = ''
        }
    }) 
}

function editEmployeeInformation(e){
    const foundEditIcon = e.target.classList.contains('fa-edit')
    if(foundEditIcon){
        const idOfEditIcon = e.target.parentElement.dataset.id
        const idToInteger = parseInt(idOfEditIcon)
        const employeeData = JSON.parse(localStorage.getItem('employee'))
        
        employeeData.forEach((employee,idx)=>{
            if(idx === idToInteger){
                hideDisplayEmployeeContainer()
                employeeForm.classList.add('register')
                firstNameField.value = employee.firstName
                lastNameField.value = employee.lastName
                dateOfBirthField.value = employee.dateOfBirth
                workPositionField.value = employee.workPosition
                editMode.status = true
                editMode.id = idx
            }
        })
    } 
}

function deleteEmployee(e){
    const foundDeleteIcon = e.target.classList.contains('fa-trash-alt')
    if(foundDeleteIcon){
        const idOfDeleteIconParent = e.target.parentElement.dataset.id
        const idToInteger = parseInt(idOfDeleteIconParent)
        const employeeData = JSON.parse(localStorage.getItem('employee'))
        
        employeeData.forEach((employee,idx)=>{
            if(idx === idToInteger){
                employeeData.splice(idx, 1)
                pushNewEmployeeToStorage(employeeData)
                clearEmployeeContainer()
                displayEmployees()
            }
        })
    }
}

function clearFields(){
    if(firstNameField.value && lastNameField.value){
        firstNameField.value = ''
        lastNameField.value = ''
    }
}

function addNewEmployeeToEmployeeList(newEmployee){
    const employeeData = localStorageCheck()
    if(editMode.status){
        employeeData[editMode.id] = newEmployee
        editMode.status = false
    }else {
        employeeData.push(newEmployee)
    }
    return employeeData
}


function captureNewEmpoyeeInfo(){

    let firstName = firstNameField.value
    let lastName = lastNameField.value
    let dateOfBirth = dateOfBirthField.value
    let workPosition = workPositionField.value
    let newEpmloyee = new Employee(firstName,lastName, dateOfBirth, workPosition)

    if(editMode.status){
        let employeeData = JSON.parse(localStorage.getItem('employee'))
        employeeData.forEach(function(employee,idx){
            if(idx === editMode.id){
                firstName = employee.firstName
                lastName = employee.lastName
                dateOfBirth = employee.dateOfBirth
                workPosition = employee.workPosition
            }
        })
    }

    return newEpmloyee
}

function createEmployeeDisplayContainer(){
    const subContainer = document.createElement('div')
    subContainer.id = 'sub-container'
    subContainer.classList.add('sub-container')
    const header = document.createElement('h2')
    header.classList.add('sub-text')
    header.textContent = 'Employees List'
    subContainer.appendChild(header)
    return subContainer
}

function populateEmployeesContainer(allEmployees){
    const employeesContainer = document.createElement('div')
    allEmployees.forEach((employeeInfo,employeeId)=>{
        employeesContainer.innerHTML += `
        <div class="employee-info">
        <div class="main-sec">
            <div class="avatar"><i class="far fa-user-circle fa-2x"></i></div>
             <div class="employee-name"><span id="first-name">${employeeInfo.firstName}</span> <span id="last-name">${employeeInfo.lastName}</span></div>             
        </div>
        <div class="sub-sec">
            <p class="employee-job"> <span class="colorCode">Position</span>${employeeInfo.workPosition}</p>
            <p class="employee-dob"><span class="colorCode">Date of Birth</span>${employeeInfo.dateOfBirth}</p>
        </div>
        <div class="action-handlers">
            <div class="edit-handler" data-id="${employeeId}" id="edit-handler">
                <i class="fas fa-edit"></i>
            </div>
            <div class="del-handler" data-id="${employeeId}" id="del-handler">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div> `
    })
    return employeesContainer
}

function localStorageCheck(){
    let listOfAllEmployees = JSON.parse(localStorage.getItem('employee'))
    if(listOfAllEmployees == null || listOfAllEmployees.length == 0){
        listOfAllEmployees = []
    }else {
        listOfAllEmployees = JSON.parse(localStorage.getItem('employee'))
    }
    return listOfAllEmployees
}

function displayEmployees(){
    const listOfAllEmployees = localStorageCheck()
    const subContainer = createEmployeeDisplayContainer()
    const employeesContainer = populateEmployeesContainer(listOfAllEmployees)
    subContainer.appendChild(employeesContainer)

    const container = document.querySelector('.container')
    const htmlNewEmployeeForm= document.getElementById('new-employee')
    container.insertBefore(subContainer,htmlNewEmployeeForm) 
}

function pushNewEmployeeToStorage(allEmployeesContainer){
    localStorage.setItem('employee',JSON.stringify(allEmployeesContainer))
}

function clearEmployeeContainer(){
    const subContainer = document.getElementById('sub-container')
    subContainer ? subContainer.remove() : subContainer
}

function proceedToAddEmployee(newEmployeeObject){
    const allEmployees = addNewEmployeeToEmployeeList(newEmployeeObject)
    pushNewEmployeeToStorage(allEmployees)
    clearFields()
    closeEmployeeForm()
    clearEmployeeContainer()
    displayEmployees()
}


function employeeFormValidation(newEmployeeInformationObject){
    if(newEmployeeInformationObject.firstName == ''){
        alert('Name cannot be empty')
    }else if(newEmployeeInformationObject.lastName == ''){
        alert('Last Name cannot be empty')
    }else if(newEmployeeInformationObject.dateOfBirth == ''){
        alert('Date of Birth cannot be empty')
    } else {
        proceedToAddEmployee(newEmployeeInformationObject)
    }
}

function addNewEmployee(){
    const newEmployeeInfo = captureNewEmpoyeeInfo()
    employeeFormValidation(newEmployeeInfo)
}

function iconTransformAfterClick(){
    addEmployeeIcon.classList.add('afterClick')
    setTimeout(() => {
       addEmployeeIcon.classList.remove('afterClick') 
    }, 300);
}

function showDisplayEmployeeContainer(){
    const subContainer = document.getElementById('sub-container')
    if(subContainer !== null){
        if(subContainer.style.display == 'none'){
            subContainer.style.display = 'block'
        }
    }
  
}

function closeEmployeeForm(){
    employeeForm.classList.remove('register')
    showDisplayEmployeeContainer()
}

function hideDisplayEmployeeContainer(){
    const subContainer = document.getElementById('sub-container')
    if(subContainer){
        subContainer.style.display = 'none'
    }
}

function pullEmployeeForm(){
    iconTransformAfterClick()
    hideDisplayEmployeeContainer()
    employeeForm.classList.add('register')
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLHVCQUF1QiwrQkFBK0Isc0JBQXNCO0FBQzVJO0FBQ0E7QUFDQSw4RUFBOEUsMEJBQTBCO0FBQ3hHLGtGQUFrRix5QkFBeUI7QUFDM0c7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEO0FBQ0E7QUFDQSxnREFBZ0QsV0FBVztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1wbG95ZWVsaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFkZEVtcGxveWVlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRFbXBsb3llZScpXG5jb25zdCBlbXBsb3llZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWVtcGxveWVlJylcbmNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZS1pY29uJylcbmNvbnN0IGZpcnN0TmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0TmFtZScpXG5jb25zdCBsYXN0TmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhc3ROYW1lJylcbmNvbnN0IGRhdGVPZkJpcnRoRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9iJylcbmNvbnN0IHdvcmtQb3NpdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmtwb3NpdGlvbicpXG5jb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRCdG4nKVxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpXG5jb25zdCBzZWFyY2hCb3hGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYm94JylcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TZWFyY2gnKVxuY29uc3Qgc2hvd0FsbEVtcGxveWVlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BbGwnKVxuXG5cbmFkZEVtcGxveWVlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHB1bGxFbXBsb3llZUZvcm0pIFxuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUVtcGxveWVlRm9ybSlcbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTmV3RW1wbG95ZWUpXG5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVFbXBsb3llZSlcbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRFbXBsb3llZUluZm9ybWF0aW9uKVxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VhcmNoRW1wbG95ZWUpXG5zaG93QWxsRW1wbG95ZWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0V2ZXJ5RW1wbG95ZWUpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsaW5pdGlhdGVBcHApXG5cblxubGV0IGVkaXRNb2RlID0ge31cbmNsYXNzIEVtcGxveWVlIHtcbiAgICBjb25zdHJ1Y3RvcihmaXJzdE5hbWUsIGxhc3ROYW1lLCBkYXRlT2ZCaXJ0aCwgd29ya1Bvc2l0aW9uKXtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWVcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lXG4gICAgICAgIHRoaXMuZGF0ZU9mQmlydGggPSBkYXRlT2ZCaXJ0aFxuICAgICAgICB0aGlzLndvcmtQb3NpdGlvbiA9IHdvcmtQb3NpdGlvblxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhdGVBcHAoKXtcbiAgICBjbGVhckVtcGxveWVlQ29udGFpbmVyKClcbiAgICBkaXNwbGF5RW1wbG95ZWVzKClcbn1cblxuZnVuY3Rpb24gc2hvd0V2ZXJ5RW1wbG95ZWUoKXtcbiAgICBjbGVhckVtcGxveWVlQ29udGFpbmVyKClcbiAgICBkaXNwbGF5RW1wbG95ZWVzKClcbn1cblxuZnVuY3Rpb24gc2VhcmNoRW1wbG95ZWUoKXtcbiAgICBsZXQgc2VhcmNoZWRFbXBsb3llZU5hbWUgPSBzZWFyY2hCb3hGaWVsZC52YWx1ZVxuICAgIGNvbnN0IGVtcGxveWVlRGF0YSA9IGxvY2FsU3RvcmFnZUNoZWNrKClcbiAgICBjb25zdCBzZWFyY2hlZEVtcGxveWVlTmFtZUluTG93ZXJDYXNlID0gc2VhcmNoZWRFbXBsb3llZU5hbWUudG9Mb3dlckNhc2UoKVxuXG4gICAgZW1wbG95ZWVEYXRhLmZvckVhY2goZnVuY3Rpb24oZW1wbG95ZWUsIGlkeCl7XG4gICAgICAgIGNvbnN0IGVtcGxveWVlRmlyc3ROYW1lID0gZW1wbG95ZWUuZmlyc3ROYW1lXG4gICAgICAgIGNvbnN0IGN1cnJlbnRFbXBsb3llZSA9IFtlbXBsb3llZURhdGFbaWR4XV1cbiAgICAgICAgY29uc3QgZW1wbG95ZWVGaXJzdE5hbWVJbkxvd2VyQ2FzZSA9IGVtcGxveWVlRmlyc3ROYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgaWYoZW1wbG95ZWVGaXJzdE5hbWVJbkxvd2VyQ2FzZSA9PSBzZWFyY2hlZEVtcGxveWVlTmFtZUluTG93ZXJDYXNlICl7XG4gICAgICAgICAgICBjbGVhckVtcGxveWVlQ29udGFpbmVyKClcbiAgICAgICAgICAgIGNvbnN0IHN1YkNvbnRhaW5lciA9IGNyZWF0ZUVtcGxveWVlRGlzcGxheUNvbnRhaW5lcigpXG4gICAgICAgICAgICBjb25zdCBlbXBsb3llZXNDb250YWluZXIgPSBwb3B1bGF0ZUVtcGxveWVlc0NvbnRhaW5lcihjdXJyZW50RW1wbG95ZWUpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wbG95ZWVzQ29udGFpbmVyKVxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpXG4gICAgICAgICAgICBjb25zdCBodG1sTmV3RW1wbG95ZWVGb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWVtcGxveWVlJylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoc3ViQ29udGFpbmVyLGh0bWxOZXdFbXBsb3llZUZvcm0pXG4gICAgICAgICAgICBzZWFyY2hCb3hGaWVsZC52YWx1ZSA9ICcnXG4gICAgICAgIH1cbiAgICB9KSBcbn1cblxuZnVuY3Rpb24gZWRpdEVtcGxveWVlSW5mb3JtYXRpb24oZSl7XG4gICAgY29uc3QgZm91bmRFZGl0SWNvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmEtZWRpdCcpXG4gICAgaWYoZm91bmRFZGl0SWNvbil7XG4gICAgICAgIGNvbnN0IGlkT2ZFZGl0SWNvbiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZFxuICAgICAgICBjb25zdCBpZFRvSW50ZWdlciA9IHBhcnNlSW50KGlkT2ZFZGl0SWNvbilcbiAgICAgICAgY29uc3QgZW1wbG95ZWVEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW1wbG95ZWUnKSlcbiAgICAgICAgXG4gICAgICAgIGVtcGxveWVlRGF0YS5mb3JFYWNoKChlbXBsb3llZSxpZHgpPT57XG4gICAgICAgICAgICBpZihpZHggPT09IGlkVG9JbnRlZ2VyKXtcbiAgICAgICAgICAgICAgICBoaWRlRGlzcGxheUVtcGxveWVlQ29udGFpbmVyKClcbiAgICAgICAgICAgICAgICBlbXBsb3llZUZvcm0uY2xhc3NMaXN0LmFkZCgncmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZUZpZWxkLnZhbHVlID0gZW1wbG95ZWUuZmlyc3ROYW1lXG4gICAgICAgICAgICAgICAgbGFzdE5hbWVGaWVsZC52YWx1ZSA9IGVtcGxveWVlLmxhc3ROYW1lXG4gICAgICAgICAgICAgICAgZGF0ZU9mQmlydGhGaWVsZC52YWx1ZSA9IGVtcGxveWVlLmRhdGVPZkJpcnRoXG4gICAgICAgICAgICAgICAgd29ya1Bvc2l0aW9uRmllbGQudmFsdWUgPSBlbXBsb3llZS53b3JrUG9zaXRpb25cbiAgICAgICAgICAgICAgICBlZGl0TW9kZS5zdGF0dXMgPSB0cnVlXG4gICAgICAgICAgICAgICAgZWRpdE1vZGUuaWQgPSBpZHhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9IFxufVxuXG5mdW5jdGlvbiBkZWxldGVFbXBsb3llZShlKXtcbiAgICBjb25zdCBmb3VuZERlbGV0ZUljb24gPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLXRyYXNoLWFsdCcpXG4gICAgaWYoZm91bmREZWxldGVJY29uKXtcbiAgICAgICAgY29uc3QgaWRPZkRlbGV0ZUljb25QYXJlbnQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWRcbiAgICAgICAgY29uc3QgaWRUb0ludGVnZXIgPSBwYXJzZUludChpZE9mRGVsZXRlSWNvblBhcmVudClcbiAgICAgICAgY29uc3QgZW1wbG95ZWVEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW1wbG95ZWUnKSlcbiAgICAgICAgXG4gICAgICAgIGVtcGxveWVlRGF0YS5mb3JFYWNoKChlbXBsb3llZSxpZHgpPT57XG4gICAgICAgICAgICBpZihpZHggPT09IGlkVG9JbnRlZ2VyKXtcbiAgICAgICAgICAgICAgICBlbXBsb3llZURhdGEuc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICAgICAgICBwdXNoTmV3RW1wbG95ZWVUb1N0b3JhZ2UoZW1wbG95ZWVEYXRhKVxuICAgICAgICAgICAgICAgIGNsZWFyRW1wbG95ZWVDb250YWluZXIoKVxuICAgICAgICAgICAgICAgIGRpc3BsYXlFbXBsb3llZXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJGaWVsZHMoKXtcbiAgICBpZihmaXJzdE5hbWVGaWVsZC52YWx1ZSAmJiBsYXN0TmFtZUZpZWxkLnZhbHVlKXtcbiAgICAgICAgZmlyc3ROYW1lRmllbGQudmFsdWUgPSAnJ1xuICAgICAgICBsYXN0TmFtZUZpZWxkLnZhbHVlID0gJydcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZE5ld0VtcGxveWVlVG9FbXBsb3llZUxpc3QobmV3RW1wbG95ZWUpe1xuICAgIGNvbnN0IGVtcGxveWVlRGF0YSA9IGxvY2FsU3RvcmFnZUNoZWNrKClcbiAgICBpZihlZGl0TW9kZS5zdGF0dXMpe1xuICAgICAgICBlbXBsb3llZURhdGFbZWRpdE1vZGUuaWRdID0gbmV3RW1wbG95ZWVcbiAgICAgICAgZWRpdE1vZGUuc3RhdHVzID0gZmFsc2VcbiAgICB9ZWxzZSB7XG4gICAgICAgIGVtcGxveWVlRGF0YS5wdXNoKG5ld0VtcGxveWVlKVxuICAgIH1cbiAgICByZXR1cm4gZW1wbG95ZWVEYXRhXG59XG5cblxuZnVuY3Rpb24gY2FwdHVyZU5ld0VtcG95ZWVJbmZvKCl7XG5cbiAgICBsZXQgZmlyc3ROYW1lID0gZmlyc3ROYW1lRmllbGQudmFsdWVcbiAgICBsZXQgbGFzdE5hbWUgPSBsYXN0TmFtZUZpZWxkLnZhbHVlXG4gICAgbGV0IGRhdGVPZkJpcnRoID0gZGF0ZU9mQmlydGhGaWVsZC52YWx1ZVxuICAgIGxldCB3b3JrUG9zaXRpb24gPSB3b3JrUG9zaXRpb25GaWVsZC52YWx1ZVxuICAgIGxldCBuZXdFcG1sb3llZSA9IG5ldyBFbXBsb3llZShmaXJzdE5hbWUsbGFzdE5hbWUsIGRhdGVPZkJpcnRoLCB3b3JrUG9zaXRpb24pXG5cbiAgICBpZihlZGl0TW9kZS5zdGF0dXMpe1xuICAgICAgICBsZXQgZW1wbG95ZWVEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW1wbG95ZWUnKSlcbiAgICAgICAgZW1wbG95ZWVEYXRhLmZvckVhY2goZnVuY3Rpb24oZW1wbG95ZWUsaWR4KXtcbiAgICAgICAgICAgIGlmKGlkeCA9PT0gZWRpdE1vZGUuaWQpe1xuICAgICAgICAgICAgICAgIGZpcnN0TmFtZSA9IGVtcGxveWVlLmZpcnN0TmFtZVxuICAgICAgICAgICAgICAgIGxhc3ROYW1lID0gZW1wbG95ZWUubGFzdE5hbWVcbiAgICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aCA9IGVtcGxveWVlLmRhdGVPZkJpcnRoXG4gICAgICAgICAgICAgICAgd29ya1Bvc2l0aW9uID0gZW1wbG95ZWUud29ya1Bvc2l0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0VwbWxveWVlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVtcGxveWVlRGlzcGxheUNvbnRhaW5lcigpe1xuICAgIGNvbnN0IHN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc3ViQ29udGFpbmVyLmlkID0gJ3N1Yi1jb250YWluZXInXG4gICAgc3ViQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Yi1jb250YWluZXInKVxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc3ViLXRleHQnKVxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdFbXBsb3llZXMgTGlzdCdcbiAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgIHJldHVybiBzdWJDb250YWluZXJcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVFbXBsb3llZXNDb250YWluZXIoYWxsRW1wbG95ZWVzKXtcbiAgICBjb25zdCBlbXBsb3llZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGFsbEVtcGxveWVlcy5mb3JFYWNoKChlbXBsb3llZUluZm8sZW1wbG95ZWVJZCk9PntcbiAgICAgICAgZW1wbG95ZWVzQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXBsb3llZS1pbmZvXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluLXNlY1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF2YXRhclwiPjxpIGNsYXNzPVwiZmFyIGZhLXVzZXItY2lyY2xlIGZhLTJ4XCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbXBsb3llZS1uYW1lXCI+PHNwYW4gaWQ9XCJmaXJzdC1uYW1lXCI+JHtlbXBsb3llZUluZm8uZmlyc3ROYW1lfTwvc3Bhbj4gPHNwYW4gaWQ9XCJsYXN0LW5hbWVcIj4ke2VtcGxveWVlSW5mby5sYXN0TmFtZX08L3NwYW4+PC9kaXY+ICAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1zZWNcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZW1wbG95ZWUtam9iXCI+IDxzcGFuIGNsYXNzPVwiY29sb3JDb2RlXCI+UG9zaXRpb248L3NwYW4+JHtlbXBsb3llZUluZm8ud29ya1Bvc2l0aW9ufTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZW1wbG95ZWUtZG9iXCI+PHNwYW4gY2xhc3M9XCJjb2xvckNvZGVcIj5EYXRlIG9mIEJpcnRoPC9zcGFuPiR7ZW1wbG95ZWVJbmZvLmRhdGVPZkJpcnRofTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24taGFuZGxlcnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LWhhbmRsZXJcIiBkYXRhLWlkPVwiJHtlbXBsb3llZUlkfVwiIGlkPVwiZWRpdC1oYW5kbGVyXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbC1oYW5kbGVyXCIgZGF0YS1pZD1cIiR7ZW1wbG95ZWVJZH1cIiBpZD1cImRlbC1oYW5kbGVyXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdHJhc2gtYWx0XCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PiBgXG4gICAgfSlcbiAgICByZXR1cm4gZW1wbG95ZWVzQ29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGxvY2FsU3RvcmFnZUNoZWNrKCl7XG4gICAgbGV0IGxpc3RPZkFsbEVtcGxveWVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtcGxveWVlJykpXG4gICAgaWYobGlzdE9mQWxsRW1wbG95ZWVzID09IG51bGwgfHwgbGlzdE9mQWxsRW1wbG95ZWVzLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgbGlzdE9mQWxsRW1wbG95ZWVzID0gW11cbiAgICB9ZWxzZSB7XG4gICAgICAgIGxpc3RPZkFsbEVtcGxveWVlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtcGxveWVlJykpXG4gICAgfVxuICAgIHJldHVybiBsaXN0T2ZBbGxFbXBsb3llZXNcbn1cblxuZnVuY3Rpb24gZGlzcGxheUVtcGxveWVlcygpe1xuICAgIGNvbnN0IGxpc3RPZkFsbEVtcGxveWVlcyA9IGxvY2FsU3RvcmFnZUNoZWNrKClcbiAgICBjb25zdCBzdWJDb250YWluZXIgPSBjcmVhdGVFbXBsb3llZURpc3BsYXlDb250YWluZXIoKVxuICAgIGNvbnN0IGVtcGxveWVlc0NvbnRhaW5lciA9IHBvcHVsYXRlRW1wbG95ZWVzQ29udGFpbmVyKGxpc3RPZkFsbEVtcGxveWVlcylcbiAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wbG95ZWVzQ29udGFpbmVyKVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpXG4gICAgY29uc3QgaHRtbE5ld0VtcGxveWVlRm9ybT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1lbXBsb3llZScpXG4gICAgY29udGFpbmVyLmluc2VydEJlZm9yZShzdWJDb250YWluZXIsaHRtbE5ld0VtcGxveWVlRm9ybSkgXG59XG5cbmZ1bmN0aW9uIHB1c2hOZXdFbXBsb3llZVRvU3RvcmFnZShhbGxFbXBsb3llZXNDb250YWluZXIpe1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbXBsb3llZScsSlNPTi5zdHJpbmdpZnkoYWxsRW1wbG95ZWVzQ29udGFpbmVyKSlcbn1cblxuZnVuY3Rpb24gY2xlYXJFbXBsb3llZUNvbnRhaW5lcigpe1xuICAgIGNvbnN0IHN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItY29udGFpbmVyJylcbiAgICBzdWJDb250YWluZXIgPyBzdWJDb250YWluZXIucmVtb3ZlKCkgOiBzdWJDb250YWluZXJcbn1cblxuZnVuY3Rpb24gcHJvY2VlZFRvQWRkRW1wbG95ZWUobmV3RW1wbG95ZWVPYmplY3Qpe1xuICAgIGNvbnN0IGFsbEVtcGxveWVlcyA9IGFkZE5ld0VtcGxveWVlVG9FbXBsb3llZUxpc3QobmV3RW1wbG95ZWVPYmplY3QpXG4gICAgcHVzaE5ld0VtcGxveWVlVG9TdG9yYWdlKGFsbEVtcGxveWVlcylcbiAgICBjbGVhckZpZWxkcygpXG4gICAgY2xvc2VFbXBsb3llZUZvcm0oKVxuICAgIGNsZWFyRW1wbG95ZWVDb250YWluZXIoKVxuICAgIGRpc3BsYXlFbXBsb3llZXMoKVxufVxuXG5cbmZ1bmN0aW9uIGVtcGxveWVlRm9ybVZhbGlkYXRpb24obmV3RW1wbG95ZWVJbmZvcm1hdGlvbk9iamVjdCl7XG4gICAgaWYobmV3RW1wbG95ZWVJbmZvcm1hdGlvbk9iamVjdC5maXJzdE5hbWUgPT0gJycpe1xuICAgICAgICBhbGVydCgnTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxuICAgIH1lbHNlIGlmKG5ld0VtcGxveWVlSW5mb3JtYXRpb25PYmplY3QubGFzdE5hbWUgPT0gJycpe1xuICAgICAgICBhbGVydCgnTGFzdCBOYW1lIGNhbm5vdCBiZSBlbXB0eScpXG4gICAgfWVsc2UgaWYobmV3RW1wbG95ZWVJbmZvcm1hdGlvbk9iamVjdC5kYXRlT2ZCaXJ0aCA9PSAnJyl7XG4gICAgICAgIGFsZXJ0KCdEYXRlIG9mIEJpcnRoIGNhbm5vdCBiZSBlbXB0eScpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2VlZFRvQWRkRW1wbG95ZWUobmV3RW1wbG95ZWVJbmZvcm1hdGlvbk9iamVjdClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZE5ld0VtcGxveWVlKCl7XG4gICAgY29uc3QgbmV3RW1wbG95ZWVJbmZvID0gY2FwdHVyZU5ld0VtcG95ZWVJbmZvKClcbiAgICBlbXBsb3llZUZvcm1WYWxpZGF0aW9uKG5ld0VtcGxveWVlSW5mbylcbn1cblxuZnVuY3Rpb24gaWNvblRyYW5zZm9ybUFmdGVyQ2xpY2soKXtcbiAgICBhZGRFbXBsb3llZUljb24uY2xhc3NMaXN0LmFkZCgnYWZ0ZXJDbGljaycpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgYWRkRW1wbG95ZWVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FmdGVyQ2xpY2snKSBcbiAgICB9LCAzMDApO1xufVxuXG5mdW5jdGlvbiBzaG93RGlzcGxheUVtcGxveWVlQ29udGFpbmVyKCl7XG4gICAgY29uc3Qgc3ViQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yi1jb250YWluZXInKVxuICAgIGlmKHN1YkNvbnRhaW5lciAhPT0gbnVsbCl7XG4gICAgICAgIGlmKHN1YkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09ICdub25lJyl7XG4gICAgICAgICAgICBzdWJDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgfVxuICAgIH1cbiAgXG59XG5cbmZ1bmN0aW9uIGNsb3NlRW1wbG95ZWVGb3JtKCl7XG4gICAgZW1wbG95ZWVGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3JlZ2lzdGVyJylcbiAgICBzaG93RGlzcGxheUVtcGxveWVlQ29udGFpbmVyKClcbn1cblxuZnVuY3Rpb24gaGlkZURpc3BsYXlFbXBsb3llZUNvbnRhaW5lcigpe1xuICAgIGNvbnN0IHN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItY29udGFpbmVyJylcbiAgICBpZihzdWJDb250YWluZXIpe1xuICAgICAgICBzdWJDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcHVsbEVtcGxveWVlRm9ybSgpe1xuICAgIGljb25UcmFuc2Zvcm1BZnRlckNsaWNrKClcbiAgICBoaWRlRGlzcGxheUVtcGxveWVlQ29udGFpbmVyKClcbiAgICBlbXBsb3llZUZvcm0uY2xhc3NMaXN0LmFkZCgncmVnaXN0ZXInKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9