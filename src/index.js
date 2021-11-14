import { http } from "./http";
import {userInterface} from "./ui"
import { format} from 'date-fns'


window.addEventListener('DOMContentLoaded',employeeInfo)

document.getElementById('btnAll').addEventListener('click',employeeInfo)

const addEmployee = document.getElementById('addEmployee') 
addEmployee.addEventListener('click',pullregisterform)

const removeIcon = document.getElementById('remove-icon')
removeIcon.addEventListener('click',removeRegisterForm)

const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click',registerNewEmployee)

document.querySelector('.container').addEventListener('click',removeEmployee)

document.querySelector('.container').addEventListener('click',editState)

document.getElementById('btnSearch').addEventListener('click',searchEmployee)

function searchEmployee(){
    let searchName = document.getElementById('search-box').value
    const arrTrans = []
    let found = false
    http.get(`http://localhost:3000/employees`)
        .then(data => {
            data.forEach((dataEl) =>{
                const tempElf = dataEl.firstName.toLowerCase()
                const tempEls = dataEl.surName.toLowerCase()
                const tempNameSearch = searchName.trim().toLowerCase()
                if(tempElf === tempNameSearch || tempEls === tempNameSearch){
                    found = true
                    document.getElementById('sub-container').remove()
                    arrTrans.push(dataEl)
                    userInterface.displayEmployees(arrTrans)
                }
            })

            if(found === false){
                if(document.getElementById('sub-container')){
                    document.getElementById('sub-container').remove()
                    userInterface.showAlert('No Eployee found','success')
                }else {
                    userInterface.showAlert('No Eployee found','success')
                }
            }
            
        })
}

function employeeInfo(){
    if(document.getElementById('sub-container')){
        document.getElementById('sub-container').remove()
    }
   http.get('http://localhost:3000/employees')
    .then(data => userInterface.displayEmployees(data))
    .catch(err => console.log(err))
}

function pullregisterform(){
    document.getElementById('sub-container').remove()
    document.getElementById('new-employee').classList.add('register')  
}

function removeRegisterForm(){
    document.getElementById('new-employee').classList.remove('register')
    employeeInfo()
}

function registerNewEmployee(e){
    e.preventDefault()
    const firstName = document.getElementById('firstName').value
    const surName = document.getElementById('lastName').value
    const dob = document.getElementById('dob').value
    const workOptions = document.getElementById('workposition')
    const workPosition = workOptions.options[workOptions.selectedIndex].value;
    const hiddenIdInput = document.getElementById('id').value

    const data = {
        firstName,
        surName,
        dob,
        workPosition
    }


    if(firstName !== '' && surName !== '' && dob !== ''){

        if(hiddenIdInput === ''){
            http.post('http://localhost:3000/employees', data)
            .then(resp => {
                userInterface.clearFields()
                userInterface.displayEmployees(resp)
            }).catch(err => console.log(err))
        }else {
            http.put(`http://localhost:3000/employees/${hiddenIdInput}`, data)
            .then(resp => {
                userInterface.clearFields()
                userInterface.displayEmployees(resp)
            }).catch(err => console.log(err))
        }

    }else {
        userInterface.showAlert('Fiels cannot be empty','success')
    }
    

}


function removeEmployee(e){
    if(e.target.parentElement.classList.contains('del-handler')){
        let id = e.target.parentElement.dataset.id
        if(confirm('are you sure you want to delete')){
            http.delete(`http://localhost:3000/employees/${id}`)
                .catch(err => {
                    console.log(err)
                })
            employeeInfo()
        }
    }
}

function editState(e){
    if(e.target.parentElement.classList.contains('edit-handler')){
        pullregisterform()
        const id = e.target.parentElement.dataset.id

        let jobPosition = e.target.parentElement.parentElement.previousElementSibling.children[0].textContent
        let workPosition = jobPosition.slice(9)
        let dateOfBirth = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent

        let rawdob = dateOfBirth.slice(13)
        const splittedDate = rawdob.split('-')
        const year = splittedDate[0]
        const month = splittedDate[1] - 1
        const day = splittedDate[2]
        const dob = format(new Date(year, month, day), 'yyy-MM-dd')

        let fullName = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[1].textContent

        const splittedName = fullName.split(' ')
        let firstName,surName
        [firstName,surName] = splittedName

        const data = {
            id,
            firstName,
            surName,
            dob,
            workPosition

        }

        userInterface.populateForm(data)
        
    } 


}