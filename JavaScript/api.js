const api = {
    async searchThought() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos')
            return await response.json()
        }catch {
            alert('Erro ao buscar pensamento')
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
    }
}
export default api