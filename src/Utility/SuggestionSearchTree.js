

// Decision tree would work better

class Node {

	constructor(value, pop, country, isFull) {
		this.isFilled = isFull;
		this.value = value;
		this.population = pop;
		this.countryCode = country;
		this.children = {};

	}

};

compareNodes = (city1, city2) => {
	let city1Pop = parseInt(city1.population, 10);
	let city2Pop = parseInt(city2.population, 10);

	//console.log(city1Pop);

	if (city1Pop < city2Pop) {
		return -1;
	}else if (city1Pop > city2Pop) {
		return 1;
	}else {
		return 0;
	}
};



class SearchTree {
	constructor() {
		this.root = new Node('','','', false);
	}

	insert(node) {
		
		let currentNode = this.root;
		let newString = node.value;
		//console.log(node.value);
		for (let i = 0; i < newString.length; i++) {
				// loop used for directing to correct position in decision tree!
			if (currentNode.children.hasOwnProperty(newString.charAt(i))) {
				currentNode = currentNode.children[newString.charAt(i)];
			} else {
				// Make new child node 
				currentNode.children[newString.charAt(i)] = new Node('', '', '', false);
				currentNode = currentNode.children[newString.charAt(i)];
			}

			// check to see if this should be the node that you insert into
			if (i === (newString.length - 1)){
				currentNode.value = newString;
				currentNode.population = node.population;
				currentNode.countryCode = node.countryCode;
				currentNode.isFilled = true;
			}

		}
		

	};

	contains(cityName) {

		let currentNode = this.root;

		for (let i = 0; i < cityName.length; i++){
			if (!(currentNode.children.hasOwnProperty(cityName.charAt(i)))){
				return false;
			}else {
				currentNode = currentNode.children[cityName.charAt(i)];
			}

			if (currentNode.value === cityName){
				return true;
			}
		}
		return false;
	};

	find(cityName) {
		let currentNode = this.root;

		for (let i = 0; i < cityName.length; i++) {
			if (!(currentNode.children.hasOwnProperty(cityName.charAt(i)))){
				return false;
			}else {
				currentNode = currentNode.children[cityName.charAt(i)];
			}
		}
		return currentNode;
	}

	getSuggestions(text, numSuggestions) {
		text = text.toLowerCase();

		let suggestions = [];
		let nodeStack = [];

		nodeStack.push(this.find(text));

		while (nodeStack.length > 0){
			let currentNode = nodeStack.pop();

			// Check if current node is potentially a suggestion
			if (currentNode.isFilled){
				if (suggestions.length < numSuggestions) {
					suggestions.push(currentNode);

					if (suggestions.length === numSuggestions){
						suggestions.sort(function (a, b) {
							return parseInt(b.population)-parseInt(a.population);
						});
					}
				}else {
					// Check to see if population is greater
					//console.log(suggestions.size());

					for (let i = suggestions.length-1; i >=0; i--){
						//console.log('Made it to here');
						if (compareNodes(currentNode, suggestions[i]) >= 0){
							suggestions = this.shiftLeft(suggestions, i);
							suggestions[i] = currentNode;
							break;
						}
					}
				}
			}

			if (currentNode == undefined || currentNode.children == undefined){
				return {};
			}
			let values = Object.values(currentNode.children);

			for (let i = 0; i < values.length; i++){
				nodeStack.push(values[i]);
			}


		}

		suggestions.sort(function (a, b) {
			return parseInt(b.population)-parseInt(a.population);
		});
		return suggestions;

	};

	shiftLeft(arr, index) {
		let newArr = arr;

		for (let i = 1; i <= index; i++){
			newArr[i-1] = arr[i];
		}

		return newArr;

	};



	
};

/*
let st = new SearchTree();
st.insert(new Node('Milwaukee, WI, USA', '500000', '2'));
st.insert(new Node('Houston, TX, USA', '1000000', '2' ));
st.insert(new Node('Mequon, WI, USA', '32000', '2'));
st.insert(new Node('Green Bay, WI, USA', '100000', '2' ));

console.log(st.contains('Green Bay, WI, USA'));

console.log(st.getSuggestions('M', 5));
*/

//readInCities('current.city.list.json', 'supported_cities.json');
loadCities('supported_cities.json');


function readInCities(filename, outFilename){
	// need to use JSON.parse;
	let fs = require('fs');
	let cities = JSON.parse(fs.readFileSync(filename, 'utf8'))

	//console.log(cities[0]);
	console.log(cities.length);

	let st = new SearchTree();

	// insert a bunch into a new search tree object.
	for (let i = 0; i < cities.length; i++){
		let cityName = cities[i]["name"];
		let countryName = cities[i]["country"];
		let cityID = cities[i]["id"];
		let population = cities[i]["stat"]["population"];

		cityName = cityName + ', ' + countryName;
		cityName = cityName.toLowerCase();

		st.insert(new Node(cityName, population, cityID, true));

	}

	let myDate = new Date();
	let startTime = myDate.getTime();


	console.log(st.getSuggestions('sh', 5));
	myDate = new Date();
	let endTime = myDate.getTime();

	console.log('Start time: ' + startTime);
	console.log('End Time: ' + endTime);
	console.log('Time elapsed: ' + (endTime - startTime));

	fs.writeFile(outFilename, JSON.stringify(st), (err) => {
		if (err){
			console.error(err);
		}
		console.log('File has been created');
	});

};

function loadCities(filename) {

	let fs = require('fs');
	let st = new SearchTree();

	let data = JSON.parse(fs.readFileSync(filename, 'utf8'))
	st.root = data.root;

	let myDate = new Date();
	let startTime = myDate.getTime();


	console.log(st.getSuggestions('M', 5));
	myDate = new Date();
	let endTime = myDate.getTime();

	console.log('Start time: ' + startTime);
	console.log('End Time: ' + endTime);
	console.log('Time elapsed: ' + (endTime - startTime));
}


