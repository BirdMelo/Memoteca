import api from "./api.js"

const ui = {

    async filloutForm(thoughtID){
        const thought = await api.searchThoughtByID(thoughtID)
        document.getElementById('pensamento-id').value = thought.id
        document.getElementById('pensamento-conteudo').value = thought.conteudo.trim()
        document.getElementById('pensamento-autoria').value = thought.autoria
    },

    async renderizeThought(){
        const thoughtList = document.querySelector('#lista-pensamentos')
        thoughtList.innerHTML = ''
        try {
            const thoughts = await api.searchThoughts()
            if(thoughts.length > 0){
                ui.emptyList(false)
                thoughts.forEach(ui.addThoughtOnList);
            } else {
                ui.emptyList(true)
            }
        } catch {
            alert('Erro ao rederizar pensamentos')
        }
    },
    addThoughtOnList(thought){
        const thoughtList = document.querySelector('#lista-pensamentos')
        const li = document.createElement('li')
        li.setAttribute('data-id', thought.id)
        li.classList.add('li-pensamento')

        const iconAspas = document.createElement('img')
        iconAspas.src = '../assets/imagens/aspas-azuis.png'
        iconAspas.alt = 'Aspas azuis'
        iconAspas.classList.add('icone-aspas')


        const content_div = document.createElement('div')
        content_div.classList.add('pensamento-conteudo')
        content_div.textContent = thought.conteudo
        

        const autoria_div = document.createElement('div')
        autoria_div.classList.add('pensamento-autoria')
        autoria_div.textContent = thought.autoria

        const editeButton = document.createElement('button')
        editeButton.classList.add('botao-editar')
        editeButton.onclick = () => ui.filloutForm(thought.id)
        const editeIcon = document.createElement('img')
        editeIcon.src = '../assets/imagens/icone-editar.png'
        editeIcon.alt = 'editar'
        editeButton.append(editeIcon)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('botao-excluir')
        deleteButton.onclick = async () => {
            try {
                await api.deleteThought(thought.id)
                ui.renderizeThought()
            } catch {
                alert('Erro ao excluir pensamento')
            }
        }
        const deleteIcon = document.createElement('img')
        deleteIcon.src = '../assets/imagens/icone-excluir.png'
        deleteIcon.alt = 'deletar'
        deleteButton.append(deleteIcon)

        const iconsButtons = document.createElement('div')
        iconsButtons.classList.add('icones')
        iconsButtons.append(editeButton, deleteButton)
        
        li.append(iconAspas, content_div, autoria_div,iconsButtons)
        thoughtList.append(li)

    },
    formClear(){
        document.querySelector('#pensamento-form').reset()
    },
    emptyList(toggle){
        const emptyDiv = document.getElementById('emptyList')
        if(toggle === true) {
            emptyDiv.style.display = 'grid'
        }else if (toggle === false){
            emptyDiv.style.display = 'none'
        }
    }
}

export default ui