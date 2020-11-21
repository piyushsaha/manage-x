// Sidebar //

import React from 'react'

import '../stylesheets/sidebar.css'

class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                <div className="links">
                    <div className="link" onClick={this.props.handleNewItemModal}>Add new item</div>
                </div>
            </div>
        )
    }
}

export default Sidebar