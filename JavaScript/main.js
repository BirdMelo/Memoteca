import api from "./api.js"
import ui from "./ui.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizeThought()
    const thoughtForm = document.querySelector('#pensamento-form')
    thoughtForm.addEventListener('submit', manipulateSubmit)
})

async function manipulateSubmit(event) {
    event.preventDefault();
    debugger
    const id = document.querySelector('#pensamento-id').value
    const content = document.querySelector('#pensamento-conteudo').value
    const autoria = document.querySelector('#pensamento-autoria').value

    try {
        await api.salveThought({ content, autoria })
        ui.renderizeThought()
    } catch {
        alert('Ocorreu um erro ao salvar os pensamentos')
    }
}