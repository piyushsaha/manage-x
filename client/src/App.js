import React from 'react'

import './stylesheets/main.css'

import Sidebar from './components/Sidebar'
import Content from './components/Content'

class App extends React.Component {
	render() {
		return (
			<>
				<Sidebar />
				<Content />
			</>
		)
	}
}

export default App
