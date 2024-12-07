const DATA_BASE = 'http://localhost:3000'

const api = {
    async searchThoughts() {
        //SEM AXIOS
        // try {
        //     const response = await fetch(`${DATA_BASE}/pensamentos`)
        //     return await response.json()
        // }catch {
        //     alert('Erro ao buscar pensamentos')
        //     throw error
        // }

        //USANDO AXIOS
        try {
            const response = await axios.get(`${DATA_BASE}/pensamentos`)
            return await response.data
        }catch {
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    async salveThought(thought) {
        //SEM AXIOS
        // try {
        //     const response = await fetch(`${DATA_BASE}/pensamentos`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(thought)
        //     })
        //     return await response.json()
        // } catch {
        //     alert('Erro ao salvar o pensamento')
        //     throw error
        // }

        //USANDO AXIOS
        try {
            const response = await axios.post(`${DATA_BASE}/pensamentos`, thought)
            return await response.data
        } catch {
            alert('Erro ao salvar o pensamento')
            throw error
        }
    },
    async searchThoughtByID(id) {
        //SEM AXIOS
        // try {
        //     const response = await fetch(`${DATA_BASE}/pensamentos/${id}`)
        //     return await response.json()
        // }catch {
        //     alert('Erro ao buscar pensamento')
        //     throw error
        // }

        //USANDO AXIOS
        try {
            const response = await axios.get(`${DATA_BASE}/pensamentos/${id}`)
            return await response.data
        }catch {
            alert('Erro ao buscar pensamento')
            throw error
        }
    },
    async editeThought(thought) {
        //SEM AXIOS
        // try {
        //     const response = await fetch(`${DATA_BASE}/pensamentos/${thought.id}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(thought)
        //     })
        //     return await response.json()
        // } catch {
        //     alert('Erro ao editar o pensamento')
        //     throw error
        // }

        //USANDO AXIOS
        try {
            const response = await axios.put(`${DATA_BASE}/pensamentos/${thought.id}`, thought)
            return await response.data
        } catch {
            alert('Erro ao editar o pensamento')
            throw error
        }
    },
    async deleteThought(id) {
        //SEM AXIOS
        // try {
        //     const response = await fetch(`${DATA_BASE}/pensamentos/${id}`, { method: "DELETE" })
        // } catch {
        //     alert('Erro ao excluir o pensamento')
        //     throw error
        // }

        //USANDO AXIOS
        try {
            const response = await axios.delete(`${DATA_BASE}/pensamentos/${id}`)
        } catch {
            alert('Erro ao excluir o pensamento')
            throw error
        }
    }
}
export default api