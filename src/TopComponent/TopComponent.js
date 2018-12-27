import React from 'react';
import SearchComponent from './SearchComponent/SearchComponent.js';

const TopComponent = (props) => {
	return (
		<div>
			<SearchComponent searchTerm={props.searchTerm} onSearchTermChanged={props.onSearchTermChanged}/>
		</div>
		);
};

export default SearchComponent;

