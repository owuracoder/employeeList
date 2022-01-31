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
