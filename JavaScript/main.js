import api from "./api.js"
import ui from "./ui.js"

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
    const conteudo = document.querySelector('#pensamento-conteudo').value
    const autoria = document.querySelector('#pensamento-autoria').value
    const data = document.querySelector('#pensamento-data').value

    if(!verificateDate(data)) {
        alert('Não é permitido datas futuras')
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