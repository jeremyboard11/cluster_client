import React, {useState, useEffect} from 'react'
import TopBar from './nav/TopBar'
import BottomBar from './nav/BottomBar'
import ActivityLog from './pages/ActivityLog'
import NewEntry from './pages/NewEntry'
import Budget from './pages/Budget'
import Analysis from './pages/Analysis'

const App = (props) => {
	// Navigation state
	const [navPage, setNavPage] = useState('navPage')

	useEffect(() => {
		// Set default navigation page on load
		setNavPage('newEntry')
	}, [])

	return (
		<React.Fragment>
			{/* Content based on current page in navigation */}
			{navPage === 'newEntry' && (
				<React.Fragment>
					<TopBar label="New Entry"/>
					<NewEntry />
				</React.Fragment>
			)}
			{navPage === 'analysis' && (
				<React.Fragment>
					<TopBar label="Analysis"/>
					<Analysis />
				</React.Fragment>
			)}
			{navPage === 'money' && (
				<React.Fragment>
					<TopBar label="Budget"/>
					<Budget />
				</React.Fragment>
			)}
			{navPage === 'log' && (
				<React.Fragment>
					<TopBar label="Log"/>
					<ActivityLog />
				</React.Fragment>
			)}

			{/* Bottom Bar */}
			<BottomBar tabClick={setNavPage}/>

			{/* Content maybe:remove */}
			<div id='content'></div>

		</React.Fragment>
	)

}

export default App