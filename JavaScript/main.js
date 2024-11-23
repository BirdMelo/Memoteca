import api from "./api.js"
import ui from "./ui.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizeThought()
    const thoughtForm = document.querySelector('#pensamento-form')
    thoughtForm.addEventListener('submit', manipulateSubmit)
    const cancelForm = document.querySelector('#botao-cancelar')
    cancelForm.addEventListener('click', manipulateCancel)
})

async function manipulateSubmit(event) {
    event.preventDefault();
    const id = document.querySelector('#pensamento-id').value
    const conteudo = document.querySelector('#pensamento-conteudo').value
    const autoria = document.querySelector('#pensamento-autoria').value

    try {
        await api.salveThought({ conteudo, autoria })
        ui.renderizeThought()
    } catch {
        alert('Ocorreu um erro ao salvar os pensamentos')
    }
}
function manipulateCancel(){
    ui.formClear()
}