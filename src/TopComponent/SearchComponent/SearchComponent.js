import React from 'react';


const getSuggestions = (text) => {

	if (text.length === 0) {
		return null;
	}
	let suggestions = (<p>No suggestions found for {text}</p>);

	return suggestions;

};

const SearchComponent = (props) => {

	let suggestions = getSuggestions(props.searchTerm);
	return (

		<div className="app-topcomponent-searchcomponent">
			<input type="text" placeholder="City name..." onChange={props.onSearchTermChanged}/>
			<button>Go!</button>
			{suggestions}
		</div>
	);
};

// Convert to class for the purpose of state


export default SearchComponent;