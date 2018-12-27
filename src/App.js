import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopComponent from './TopComponent/TopComponent.js';

class App extends Component {

	state = {
		searchTermConfirmed: false,
		searchTerm: '',
		searchSuggestions: []
	};

	searchTermChangedHandler = (event) => {
		let stateCopy = {...this.state}
		stateCopy.searchTerm = event.target.value;
		stateCopy.searchTermConfirmed = false;
		this.setState(stateCopy);
	};

	getSearchTermSuggestions = (text) => {
		
	};

	searchTermConfirmedHandler = (term) => {
		let stateCopy = {...this.state};
		stateCopy.searchTermConfirmed = true;
		stateCopy.searchTerm=term;
		this.setState(stateCopy);
	};

    render() {
    	return (
      	<div className="App">
      		<h1>Welcome to the weather app!</h1>
      		<TopComponent searchTerm={this.state.searchTerm} onSearchTermChanged={this.searchTermChangedHandler}/>
      	</div>
    	);
  	}
}

export default App;
