import api from "./api.js"
import ui from "./ui.js"

const regexContent = /^.{10,259}$/
const regexAutoria = /^[A-Za-z\s]{3,15}$/
const thoughtsSet = new Set()

async function addThoughtsKey() {
    try {
        const thoughts = await api.searchThoughts()
        thoughts.forEach(thought => {
            const key = `${thought.conteudo.trim().toLowerCase()}-${thought.autoria.trim().toLowerCase()}`
            thoughtsSet.add(key)
        })
    } catch (error) {
        alert('Erro ao adicinar chave')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizeThought()
    addThoughtsKey()
    const thoughtForm = document.querySelector('#pensamento-form')
    thoughtForm.addEventListener('submit', manipulateSubmit)
    const cancelForm = document.querySelector('#botao-cancelar')
    cancelForm.addEventListener('click', manipulateCancel)
    const inputSearch = document.querySelector('#campo-busca')
    inputSearch.addEventListener('input', manipulateSearch)

    const textarea = document.querySelector('#pensamento-conteudo')
    const countCaracterTextarea = document.querySelector('#caracterCountTextArea')
    textarea.addEventListener('input',() => { updateCount(textarea, countCaracterTextarea, 150)})

    const autoria = document.querySelector('#pensamento-autoria')
    const countCaracterAutoria = document.querySelector('#caracterCountAutoria')
    autoria.addEventListener('input', () => {updateCount(autoria, countCaracterAutoria, 15)})
})

async function manipulateSubmit(event) {
    event.preventDefault();
    const id = document.querySelector('#pensamento-id').value
    const conteudo = document.querySelector('#pensamento-conteudo').value.trim()
    const autoria = document.querySelector('#pensamento-autoria').value.trim()
    const data = document.querySelector('#pensamento-data').value

    const textarea = document.querySelector('#pensamento-conteudo')
    const errorTextarea = document.querySelector('#textareaLabel p:nth-child(2)')
    const inputAutoria = document.querySelector('#pensamento-autoria')
    const errorAutoria = document.querySelector('#autoriaLabel p:nth-child(2)')

    if(!validateText(regexContent, conteudo)){
        textarea.style.border = 'solid 1px red'
        errorTextarea.style.diplay = 'block'
        errorTextarea.textContent = "*Pensamento deve conter entre 10 e 150 caracteres. Espaços em volta do texto e texto com apenas espaços serão desconsiderados."
    }
    if(!validateText(regexAutoria, autoria)) {
        inputAutoria.style.border = 'solid 1px red'
        errorAutoria.style.display = 'block'
        errorAutoria.textContent = "*Autoria deve conter: entre 3 a 15 caracteres, sem números e/ou caracteres especiais. Espaços em volta do texto e texto com apenas espaços serão desconsiderados."
    }

    if(!verificateDate(data)) {
        alert('Não é permitido datas futuras')
    }
    if(!validateText(regexContent, conteudo) || !validateText(regexAutoria, autoria) || !verificateDate(data)) {
        return
    }

    const newThoughtKey = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`
    if(thoughtsSet.has(newThoughtKey)) {
        alert('Pensamento já cadastrado')
        return
    }

    try {
        textarea.style.border = 'none'
        errorTextarea.style.diplay = 'none'
        inputAutoria.style.border = 'none'
        errorAutoria.style.diplay = 'none'
        
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
function updateCount(inputElement, counter, limit) {
    const count = inputElement.value.length;
    counter.textContent = `${count}/${limit}`

    counter.style.color = count > limit ? 'red' : '#8F8F8F';
}