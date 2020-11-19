// Sidebar //
import React from 'react'

import '../stylesheets/sidebar.css'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNewItemModalOpen: false,
            isUpdateStocksModalOpen: false,
            isUpdatePriceModalOpen: false
        }
        this.handleStocksModal = this.handleStocksModal.bind(this)
        this.handlePriceModal = this.handlePriceModal.bind(this)
        this.handleNewItemModal = this.handleNewItemModal.bind(this)
    }
    handleNewItemModal = () => {
        this.setState({
            isNewItemModalOpen: !this.state.isNewItemModalOpen
        })
    }
    handleStocksModal = () => {
        this.setState({
            isUpdateStocksModalOpen: !this.state.isUpdateStocksModalOpen
        })
    }
    handlePriceModal = () => {
        this.setState({
            isUpdatePriceModalOpen: !this.state.isUpdatePriceModalOpen
        })
    }

    render() {
        return (
            <div className="sidebar">
                <div className="links">
                    <div className="link" onClick={this.handleNewItemModal}>Add new item</div>
                    <div className="link" onClick={this.handleStocksModal}>Update Stocks</div>
                    <div className="link" onClick={this.handlePriceModal}>Update Price</div>
                </div>
            </div>
        )
    }
}

export default Sidebar