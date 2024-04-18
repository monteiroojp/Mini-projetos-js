/*Variáveis*/
const saveButton = document.getElementById('saveButton')
const editButton = document.getElementById('editButton')

/*Funções*/
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearModal()
}

const setDataBase = (newData) => {
    localStorage.setItem('dbClient', JSON.stringify(newData))
}

const getDataBase = () => JSON.parse(localStorage.getItem('dbClient')) ?? [];

//Crud Operations

const createClient = (client) => {
    const dbClient = getDataBase()
    dbClient.push(client)
    setDataBase(dbClient)

    return dbClient.length - 1
}

const readClient = () => getDataBase()

const updateClient = (client, index) => {
    const dbClient = getDataBase()
    dbClient[index] = client
    setDataBase(dbClient)
}

const deleteClient = (index) => {
    console.log('deletando...') 
    const dbClient = getDataBase()
    dbClient.splice(index)
    setDataBase(dbClient)
}

//Html interaction

const validFormModal = () => {
    const form = document.getElementById('form')
    return form.reportValidity()
}

const createRow = (client, index) => {
    const tBody = document.getElementById('tbody')
    const tRow = document.createElement('tr')
    tRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phoneNumber}</td>
        <td>${client.city}</td>
        <td class="actions">
            <button class="edit" id="${index}">Editar</button>
            <button class="delete" id="${index}">Deletar</button>
        </td>
    `
    tBody.appendChild(tRow)
}

const getInputs = () => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const phoneNumber = document.getElementById('phoneNumber')
    const city = document.getElementById('city')

    const inputs = [name, email, phoneNumber, city]

    return inputs
}

const clearModal = (client) => {
    const inputs = getInputs()

    inputs.forEach((input) => {
        input.value = ""
    })
}

const getTableRows = () => {
    if(c >= 1){
        let tableRows = document.querySelectorAll('td.actions')
        tableRows.forEach((tableRow) =>{
            tableRow.addEventListener('click', (e) => {
                if(typeof(e.target) == 'object'){
                    let action = e.target.classList[0]
                    let index = e.target.id
                    actionsClients(action, index)
                }
            })
        })
    }
}

const updateTable = () => {
    const tBody = document.getElementById('tbody')
    tBody.innerHTML = ""

    const dbClient = getDataBase()
    dbClient.forEach((client, index) => {
        createRow(client, index)
    })

    getTableRows()
}

const fillInputs = (index) =>{
    const dbClient = getDataBase()
    const currentClient = dbClient[index]
    const inputs = getInputs()

    inputs.forEach((input) => {
        input.value = currentClient[input.id]
    })

}

const actionsClients = (action, index) => {
    if(action == 'edit'){
        saveButton.style.display = 'none'
        editButton.style.display = 'inline'
        openModal()
        fillInputs(index)
        
        editButton.addEventListener('click', function editButtonListener() {
            editClient(index);
            this.removeEventListener('click', editButtonListener);
        });
        
    }
    else{
        const rowToDelete = document.getElementById(index);
         rowToDelete.classList.remove('fade-out');
         requestAnimationFrame(() => {
             rowToDelete.classList.add('fade-out');
         });
         rowToDelete.addEventListener('animationend', () => {
             rowToDelete.remove();
             deleteClient(index);
             updateTable();
         }, { once: true });
         }
}

const editClient = (index) => {
    if(validFormModal()){
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            city: document.getElementById('city').value,
        }
        console.log(index)
        
        updateClient(client, index)
        updateTable()
        closeModal()
    }
}

const saveClient = () => {
    if(validFormModal()){
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            city: document.getElementById('city').value,
        }
       
     
            const newIndex = createClient(client)
            createRow(client, newIndex)
            getTableRows()
            closeModal(client)
    }
}



/*Eventos*/
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('cancelButton').addEventListener('click', closeModal)
document.getElementById('saveButton').addEventListener('click', saveClient)
saveButton.addEventListener('click', saveClient)
document.getElementById('signButton').addEventListener('click', () =>{
    saveButton.style.display = 'inline'
    editButton.style.display = 'none'
    openModal()
})




updateTable()




