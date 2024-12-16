const DATA_BASE = 'http://localhost:3000'

const stringToDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return new Date(Date.UTC(year, month -1, day))
}
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
            const thoughts = await response.data
            return thoughts.map(thought => {
                return {
                    ...thought,
                    data: new Date(thought.data)
                }
            })
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
            const date = stringToDate(thought.data)
            const response = await axios.post(`${DATA_BASE}/pensamentos`, {
                ...thought,
                date: date.toISOString()
            })
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
            const thought = await response.data
            return {
                ...thought,
                data: new Date(thought.data)
            }
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
    },
    async searchThoughtsByTerm(term) {
        try {
            const thoughts = await this.searchThoughts()

            const filteredThoughts = thoughts.filter(thought => {
                return (
                    thought.conteudo.toLowerCase().includes(term.toLowerCase()) 
                    ||
                    thought.autoria.toLowerCase().includes(term.toLowerCase())
                )
            })
            return filteredThoughts

        } catch (error) {
            alert('erro ao filtrar pensamentos')
            throw error
        }
        
    },
    async updateFavorite(id, favorito) {
        try {
            const response = await axios.patch(`${DATA_BASE}/pensamentos/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert('Erro ao atualizar favorito')
        }
    }
}
export default api