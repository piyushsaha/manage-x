import axios from 'axios'

const API = {
    getStore: function () {
        return axios.get('/api/items')
    },
    createItem: function(item) {
        return axios.post('/api/items', item)
    },

    getStock: function(id) {
        return axios.get('/api/items/' + id)
    },
    updateItem: function(id, updatedItem) {
        return axios.put('/api/items/' + id, updatedItem)
    },
    deleteStock: function(id) {
        return axios.delete('/api/items/' + id)
    }
}

export default API