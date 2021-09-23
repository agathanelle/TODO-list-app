import React, { useState } from 'react';
import data from './data/tasks.json';
function App() {
	const [tasks, setTask] = useState(data);
	const [text, setText] = useState('');

	return (
		<div classname="main-container">
			<div classname="main-text">TODO</div>
			<input type="text" onChange={handleChange}></input>
			<button onClick={addItem}>add</button>
			<ul>
				{tasks.length > 0 &&
					tasks.map((task) => (
						<li key={task.id}>
							{task.task}
							<button className="remove" onClick={removeItem(task.id)}>
								x
							</button>
						</li>
					))}
			</ul>
		</div>
	);

	function handleChange(e) {
		setText(e.target.value);
	}
	function addItem() {
		var object = {
			id: tasks.length + 1,
			task: text,
			status: false,
		};
		setTask(...object);
		//updateJSONFile();
	}
	//write to json file
	/*function updateJSONFile() {
		const fs = require('browserify-fs');
		fs.writeFile('./data/tasks.json', JSON.stringify(tasks), (error) => {
			if (error) console.log('Error occured during writing to JSON: ', error);
		});
	}*/

	//removes item from a list
	function removeItem(id) {
		//const temp = [...tasks];
		//temp.splice(id, 1);
		//setTask(temp);
		//updateJSONFile();
	}
}

export default App;
