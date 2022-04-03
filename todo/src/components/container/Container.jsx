import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Title from '../title/Title';
import dataTasks from '../../data/tasks.json';

function Container() {
	const [data, setData] = useState([]);
	const [task, setTask] = useState('');
	const [ID, setID] = useState(0);

	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem('tasks'));
		if (tasks) setData(tasks);
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(data));
	}, [data]);

	function addTask() {
		var newTask = { id: ID, task: task };
		setData((prevData) => [newTask, ...prevData]);
		setID(ID + 1);
		setTask('');
	}
	function removeTask(id) {
		setData(data.filter((task) => task.id !== id));
	}
	return (
		<div className="center">
			<div className="container">
				<Title title="TO DO" type="main-title" />
				<div className="input-group input-group-lg">
					<input
						type="text"
						value={task}
						className="form-control"
						placeholder="type your task here"
						aria-label="Task"
						aria-describedby="button-addon2"
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								if (!/^\s*$/.test(task)) addTask();
							}
						}}
						onChange={(e) => {
							setTask(e.target.value);
						}}></input>
					<button
						onClick={() => {
							if (!/^\s*$/.test(task)) addTask();
						}}
						className="btn btn-secondary"
						type="button"
						id="button-addon2">
						Add
					</button>
				</div>
			</div>
			<div>
				{data === null
					? null
					: data.map((tasks) => (
							<div key={tasks.id} className="container-task" onClick={() => removeTask(tasks.id)}>
								{tasks.task}
							</div>
					  ))}
			</div>
		</div>
	);
}

export default Container;
