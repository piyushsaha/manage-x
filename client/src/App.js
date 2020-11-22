import React from 'react'

import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import API from './util/API'

import './stylesheets/main.css'

import Sidebar from './components/Sidebar'
import Content from './components/Content'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            isNewItemModalOpen: false,
            isUpdateStocksModalOpen: false,
            isUpdatePriceModalOpen: false,
            item_name: "",
            price: "",
            quantity: "",
            error: null
        }
        this.handleNewItemModal = this.handleNewItemModal.bind(this)
        this.handleInputField = this.handleInputField.bind(this)
        this.submitNewItem = this.submitNewItem.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        API.getStore()
            .then(res => {
                this.setState({ items: res.data })
            })
            .catch(err => console.log(err))
    }

    handleNewItemModal = () => {
        this.setState({
            isNewItemModalOpen: !this.state.isNewItemModalOpen
        })
    }

    handleInputField = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    submitNewItem = async () => {
        const newItem = { item_name: this.state.item_name, price: this.state.price, quantity: this.state.quantity}
        API.createItem(newItem)
            .then(res => {
                if(res.data.code === 11000) {
                    this.setState({ error: 'The item already exists!' }) 
                }
            })
            .catch(err => console.log(err))
        await this.setState({item_name: "", price: "", quantity: "", error: null})
        await this.loadData()        
        await this.handleNewItemModal()
        this.loadData()
    }

    render() {
        return (
            <>
                <Sidebar
                    handleNewItemModal={this.handleNewItemModal}
                />
                <Content
                    items={this.state.items}
                    error={this.state.error}
                    loadData={this.loadData}
                />

                {/* New Item Modal */}
                <Modal isOpen={this.state.isNewItemModalOpen} toggle={this.handleNewItemModal}>
                    <ModalHeader toggle={this.handleNewItemModal}>Add New Item</ModalHeader>
                    <ModalBody>
                        <form className="new-item-form">
                            <label htmlFor="item_name">Item Name : &nbsp;</label>
                            <input
                                type="text"
                                id="item_name"
                                value={this.state.item_name}
                                onChange={this.handleInputField}
                            />
                            <br />

                            <label htmlFor="price">Price : &nbsp;</label>
                            <input
                                type="text"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleInputField}
                            />
                            <br />

                            <label htmlFor="quantity">Quantity : &nbsp;</label>
                            <input
                                type="text"
                                id="quantity"
                                value={this.state.quantity}
                                onChange={this.handleInputField}
                            />
                            <br />

                            <button className="do-btn" onClick={this.submitNewItem}>Add Item</button>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default App
