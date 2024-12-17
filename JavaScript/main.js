import api from "./api.js"
import ui from "./ui.js"

const regexContent = /^[A-Za-z\s]{10,259}$/
const regexAutoria = /^[A-Za-z_]{3,15}$/

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizeThought()
    const thoughtForm = document.querySelector('#pensamento-form')
    thoughtForm.addEventListener('submit', manipulateSubmit)
    const cancelForm = document.querySelector('#botao-cancelar')
    cancelForm.addEventListener('click', manipulateCancel)
    const inputSearch = document.querySelector('#campo-busca')
    inputSearch.addEventListener('input', manipulateSearch)
})

async function manipulateSubmit(event) {
    event.preventDefault();
    const id = document.querySelector('#pensamento-id').value
    const conteudo = document.querySelector('#pensamento-conteudo').value.trim()
    const autoria = document.querySelector('#pensamento-autoria').value.trim()
    const data = document.querySelector('#pensamento-data').value

    if(!validateText(regexContent, conteudo)){
        alert("Pensamento deve ter letras maiúsculas e/ou minúsculas, espaço, não será salvo um pensamento com apenas espaços, no mínimo 10 caracteres e no máximo 259.")
        return
    }
    if(!validateText(regexAutoria, autoria)) {
        alert("Deve ter a penas letras em um espaço de no minimo 3 caracteres e no máximo 15 caractes. Caso o nome do autor for grande priorise primeiro e ultimo nome com um espaçamento com '_'(Underline)")
        return
    }

    if(!verificateDate(data)) {
        alert('Não é permitido datas futuras')
        return
    }

    try {
        if(id){
            await api.editeThought({ id, conteudo, autoria, data })
        }else {
            await api.salveThought({ conteudo, autoria, data })
        }
        ui.renderizeThought()
    } catch {
        alert('Ocorreu um erro ao salvar os pensamentos')
    }
}
function manipulateCancel(){
    ui.formClear()
}

async function manipulateSearch(){
    const termToSearch = document.getElementById('campo-busca').value
    try {
        const filteredThoughts = await api.searchThoughtsByTerm(termToSearch)
        ui.renderizeThought(filteredThoughts)
    } catch (error) {
        alert('Erro ao realizar busca')
    }
}

function verificateDate(data) {
    const currentDate = new Date()
    const gotDate = new Date(data)
    return gotDate <= currentDate
}
function validateText(regex,text) {
    return regex.test(text)
}