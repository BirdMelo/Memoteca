import api from "./api.js"

const ui = {
    async renderizeThought(){
        const thoughtList = document.querySelector('#lista-pensamentos')

        try {
            const thoughts = await api.searchThought()
            thoughts.forEach(ui.addThoughtOnList);
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
        
        li.append(iconAspas, content_div, autoria_div)
        thoughtList.append(li)


    },
    formClear(){
        document.querySelector('#pensamento-form').reset()
    }
}

export default ui