class UI{
    constructor(){
        this.addEmployee = document.getElementById('addEmployee'),
        this.searchEmployee = document.getElementById('search-box'),
        this.searchBtn = document.getElementById('search-icon')
        this.firstName = document.getElementById('firstName')
        this.surName = document.getElementById('lastName')
        this.dob = document.getElementById('dob')
        this.addBtn = document.getElementById('addBtn')
        this.hiddenIdInput = document.getElementById('id')
        this.stateSwitch = 'add'
    }

    displayEmployees(employeeInfo){
        let employees = ''
        const subContainer = document.createElement('div')
        subContainer.id = "sub-container"
        subContainer.classList.add('sub-container')
        subContainer.innerHTML = `<h2 class="sub-text">Employees List</h2>`

        Array.prototype.forEach.call(employeeInfo, employee => {
            employees += `
             <div class="employee-info">
                 <div class="main-sec">
                     <div class="avatar"><i class="far fa-user-circle fa-2x"></i></div>
                      <div class="employee-name"><span id="first-name">${employee.firstName}</span> <span id="last-name">${employee.surName}</span></div>             
                 </div>
                 <div class="sub-sec">
                     <p class="employee-job"> <span class="colorCode">Position</span>${employee.workPosition}</p>
                     <p class="employee-dob"><span class="colorCode">Date of Birth</span>${employee.dob}</p>
                 </div>
                 <div class="action-handlers">
                     <div class="edit-handler" data-id="${employee.id}">
                         <i class="fas fa-edit"></i>
                     </div>
                     <div class="del-handler" data-id="${employee.id}">
                         <i class="fas fa-trash-alt"></i>
                     </div>
                 </div>
             </div>`
         })

        subContainer.innerHTML += employees

        const container = document.querySelector('.container')
        const domEmployee= document.getElementById('new-employee')
        container.insertBefore(subContainer,domEmployee)  
    }

    clearFields(){
        this.firstName.value = ''
        this.surName.value = ''
        this.dob.value = ''
    }

    populateForm(data){
        this.firstName.value = data.firstName,
        this.surName.value = data.surName,
        this.dob.value = data.dob
        this.hiddenIdInput.value = data.id
        this.changeState('edit')
    }

    changeState(type){
        if(type === 'edit'){
            this.addBtn.textContent = 'Edit Employee Details'
        }
    }

    showAlert(message,className){ 
        const div = document.createElement('div')
        div.textContent = message
        div.className = className
        div.id = 'error-field'
        
        const container = document.querySelector('.container')

        const employeeRegistration = document.getElementById('new-employee') 

        container.insertBefore(div,employeeRegistration)

        this.clearAlert()
    }

    clearAlert(){
        if(document.getElementById('error-field')){
            setTimeout(() => {
                document.getElementById('error-field').remove()
            }, 1000);
        }
    }


}

export const userInterface = new UI()