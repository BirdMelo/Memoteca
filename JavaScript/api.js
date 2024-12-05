const api = {
    async searchThoughts() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos')
            return await response.json()
        }catch {
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    async salveThought(thought) {
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(thought)
            })
            return await response.json()
        } catch {
            alert('Erro ao salvar o pensamento')
            throw error
        }
    },
    async searchThoughtByID(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`)
            return await response.json()
        }catch {
            alert('Erro ao buscar pensamento')
            throw error
        }
    },
    async editeThought(thought) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${thought.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(thought)
            })
            return await response.json()
        } catch {
            alert('Erro ao editar o pensamento')
            throw error
        }
    }
}
export default api