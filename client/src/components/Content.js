// Main content part //

import React from 'react'

import { Modal, ModalBody, ModalHeader, ModalFooter, Spinner } from 'reactstrap'

import API from '../util/API'

import '../stylesheets/content.css'


class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            priceUpdateModal: false,
            newPrice: "",
            currentPriceUpdateID: null,
            quantityUpdateModal: false,
            newQuantity: "",
            currentQuantityUpdateID: null,
            deleteItemModal: false,
            currentDeleteID: null
        }
        this.updatePrice = this.updatePrice.bind(this)
        this.handleUpdatePriceModal = this.handleUpdatePriceModal.bind(this)
        this.updateQuantity = this.updateQuantity.bind(this)
        this.handleUpdateQuantityModal = this.handleUpdateQuantityModal.bind(this)
        this.handleInputField = this.handleInputField.bind(this)
    }

    updatePrice = async () => {
        const updatedItem = { price: this.state.newPrice }
        API.updateItem(this.state.currentPriceUpdateID, updatedItem)
            .then(response => console.log(response))
        await this.setState({ currentPriceUpdateID: null, newPrice: null })
        await this.props.loadData()
        await this.handleUpdatePriceModal()
        this.props.loadData()
    }
    handleUpdatePriceModal = (id) => {
        this.setState({
            priceUpdateModal: !this.state.priceUpdateModal,
            currentPriceUpdateID: id
        })
    }

    updateQuantity = async () => {
        const updatedItem = { quantity: this.state.newQuantity }
        API.updateItem(this.state.currentQuantityUpdateID, updatedItem)
            .then(response => console.log(response))
        await this.setState({ currentQuantityUpdateID: null, newQuantity: null })
        await this.props.loadData()
        await this.handleUpdateQuantityModal()
        this.props.loadData()
    }
    handleUpdateQuantityModal = (id) => {
        this.setState({
            quantityUpdateModal: !this.state.quantityUpdateModal,
            currentQuantityUpdateID: id
        })
    }

    handleDeleteItemModal = (id) => {
        this.setState({
            deleteItemModal: !this.state.deleteItemModal,
            currentDeleteID: id
        })
    }
    deleteItem = async () => {
        API.deleteStock(this.state.currentDeleteID)
            .then(response => console.log(response))
        await this.setState({ currentDeleteID: null })
        await this.props.loadData()
        await this.handleDeleteItemModal()
        this.props.loadData()
    }

    handleInputField = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        // Counting total stock of all items 
        var totalStock = 0;
        if (this.props.items) {
            for (let i = 0; i < this.props.items.length; i++) {
                totalStock += this.props.items[i].quantity
            }
        }
        var items
        // If the items are fetched from database 
        if (this.props.items) {

            // If items exist
            if (this.props.items.length) {
                items = this.props.items.map(item => {
                    return (
                        <tr key={item._id}>
                            <td>{item.item_name}</td>
                            <td>{item.quantity}</td>
                            <td><button onClick={() => this.handleUpdateQuantityModal(item._id)}> <i className="fa fa-edit fa-lg"></i> Quantity </button></td>
                            <td>{item.price}</td>
                            <td><button onClick={() => this.handleUpdatePriceModal(item._id)}> <i className="fa fa-edit fa-lg"></i> Price </button></td>
                            <td><button onClick={() => this.handleDeleteItemModal(item._id)}> <i className="fa fa-trash fa-lg"></i></button></td>
                        </tr>
                    )
                })
            }
            // If there are no items 
            else {
                items = <h5 className="mt-5">No Item Present</h5>
            }
        }
        else {
            items = <Spinner className="mt-5" />
        }

        var error = this.props.error ? <span className="error">{this.props.error}</span> : null

        return (
            <div className="content">
                <h1>Manage<span>X</span></h1>
                <br />
                <h5>Total Items : {this.props.items ? this.props.items.length : <Spinner size="sm" />}</h5>
                <h5>Total Stock : <span>{totalStock}</span> </h5>
                {error}
                <table className="data-table">
                    <tr>
                        <th className="name-col">Item Name</th>
                        <th className="quantity-col">Quantity</th>
                        <th className="update-col">Update Quantity</th>
                        <th className="price-col">Price</th>
                        <th className="lastupdated-col">Update Price</th>
                        <th className="delete-col">Delete Item</th>
                    </tr>
                    {items}
                </table>

                {/* Modals */}

                {/* Update Price Modal */}
                <Modal isOpen={this.state.priceUpdateModal} toggle={this.handleUpdatePriceModal}>
                    <ModalHeader toggle={this.handleUpdatePriceModal}>Update Price</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.updatePrice}>
                            <label htmlFor="newPrice">New Price : &nbsp;</label>
                            <input
                                type="text"
                                id="newPrice"
                                value={this.state.newPrice}
                                onChange={this.handleInputField}
                            />
                            <br />

                        <button className="do-btn" onClick={this.updatePrice}>Update Item's Price</button>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Update Quantity Modal */}
                <Modal isOpen={this.state.quantityUpdateModal} toggle={this.handleUpdateQuantityModal}>
                    <ModalHeader toggle={this.handleUpdateQuantityModal}>Update Quantity</ModalHeader>
                    <ModalBody>
                        <form method="post">
                            <label htmlFor="newQuantity">New Quantity :&nbsp;</label>
                            <input
                                type="text"
                                id="newQuantity"
                                value={this.state.newQuantity}
                                onChange={this.handleInputField}
                            />
                            <br />
                            <button className="do-btn" onClick={this.updateQuantity}>Update Item's Quantity</button>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Comfirm Delete Modal */}
                <Modal isOpen={this.state.deleteItemModal} toggle={this.handleDeleteItemModal}>
                    <ModalHeader toggle={this.handleDeleteItemModal}>Update Quantity</ModalHeader>
                    <ModalBody>
                        <h6>Are you sure want to delete this item?</h6>
                    </ModalBody>
                    <ModalFooter>
                        <button className="do-btn" onClick={this.deleteItem}>Delete Item</button>
                        &nbsp; &nbsp;
                        <div className="secondary btn" onClick={this.handleDeleteItemModal}>Cancel</div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default Content