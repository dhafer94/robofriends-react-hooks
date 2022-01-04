import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

// class App extends Component {
// constructor() {
// 	super();
// 	this.state = {
// 		robots: [],
// 		searchfield: '',
// 	};
// 	// console.log('constructor');
// }

// componentDidMount() {
// 	fetch('https://jsonplaceholder.typicode.com/users')
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((users) => {
// 			this.setState({ robots: users });
// 		});
// 	// this.setState({ robots: robots });
// 	// console.log('componentDidMount');
// }

function App() {
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState('');

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				setRobots(users);
			});
	}, []);

	const onSearchChange = (evt) => {
		setSearchfield(evt.target.value);

		// console.log(filteredRobot);
	};
	// const { robots, searchfield } = this.state;
	const filteredRobot = robots.filter((robots) => {
		return robots.name.toLowerCase().includes(searchfield.toLowerCase());
	});
	// console.log('render');
	console.log(robots, searchfield);
	return !robots.length ? (
		<h1>Loading</h1>
	) : (
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobot} />
				</ErrorBoundary>
			</Scroll>
		</div>
	);
}

export default App;
