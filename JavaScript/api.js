const DATA_BASE = 'http://localhost:3000'

const api = {
    async searchThoughts() {
        try {
            const response = await fetch(`${DATA_BASE}/pensamentos`)
            return await response.json()
        }catch {
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    async salveThought(thought) {
        try {
            const response = await fetch(`${DATA_BASE}/pensamentos`, {
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
            const response = await fetch(`${DATA_BASE}/pensamentos/${id}`)
            return await response.json()
        }catch {
            alert('Erro ao buscar pensamento')
            throw error
        }
    },
    async editeThought(thought) {
        try {
            const response = await fetch(`${DATA_BASE}/pensamentos/${thought.id}`, {
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
    },
    async deleteThought(id) {
        try {
            const response = await fetch(`${DATA_BASE}/pensamentos/${id}`, { method: "DELETE" })
        } catch {
            alert('Erro ao excluir o pensamento')
            throw error
        }
    }
}
export default api