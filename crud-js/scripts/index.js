/*Variáveis*/
const object = {
    name: "JP",
    email: "danielsoares5577@gmail.com",
    phoneNumber: '11912341234',
    city: 'Goiania'
}

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
}

const readClient = () => getDataBase()

const updateClient = (client, index) => {
    const dbClient = getDataBase()
    dbClient[index] = client
    setDataBase(dbClient)
}

const deleteClient = (index) => {
    const dbClient = getDataBase()
    dbClient.splice(index, 1)
    setDataBase(dbClient)
}

//Html interaction

const validFormModal = () => {
    const form = document.getElementById('form')
    return form.reportValidity()
}

const createRow = (client) => {
    const tBody = document.getElementById('tbody')
    const tRow = document.createElement('tr')
    tRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phoneNumber}</td>
        <td>${client.city}</td>
        <td class="actions">
            <button class="edit">Editar</button>
            <button class="delete">Deletar</button>
        </td>
    `
    tBody.appendChild(tRow)
}

const clearModal = (client) => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const phoneNumber = document.getElementById('phoneNumber')
    const city = document.getElementById('city')

    const inputs = [name, email, phoneNumber, city]
    inputs.forEach((input) => {
        input.value = ""
    })
}

const updateTable = () => {
    const tBody = document.getElementById('tbody')
    tBody.innerHTML = ""

    const dbClient = getDataBase()
    dbClient.forEach((client) => {
        createRow(client)
    })
}

const saveClient = () => {
    if(validFormModal()){
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            city: document.getElementById('city').value
        }
        closeModal(client)
        createRow(client)
        createClient(client)
    }
}



/*Eventos*/
document.getElementById('signButton').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('saveButton').addEventListener('click', saveClient)
document.getElementById('cancelButton').addEventListener('click', closeModal)
updateTable()



