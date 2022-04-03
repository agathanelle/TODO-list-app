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
		if (tasks.length < 0) {
			setData(tasks);
		} else setData(dataTasks);
		if (tasks.length > 0) {
			var maxId = tasks.reduce(function (max, obj) {
				return obj.id > max.id ? obj : max;
			});
			setID(maxId.id + 1);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(data));
	}, [data]);

	function addTask() {
		var newTask = { id: ID, task: task, status: 'notstarted' };
		setData((prevData) => [newTask, ...prevData]);
		setID(ID + 1);
		setTask('');
	}
	function removeTask(id) {
		setData(data.filter((task) => task.id !== id));
	}

	function updateTask(id, status) {
		setData(data.map((task) => (task.id === id ? { ...task, status: status } : task)));
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
							<div key={tasks.id} className={`container-task ` + tasks.status}>
								<div>{tasks.task}</div>
								<div className="button-aligment">
									<button className="btn btn-light" onClick={() => updateTask(tasks.id, 'notstarted')}>
										Not started
									</button>
									<button className="btn btn-light" onClick={() => updateTask(tasks.id, 'inprogress')}>
										In progress
									</button>
									<button className="btn btn-light" onClick={() => updateTask(tasks.id, 'done')}>
										Done
									</button>
									<button className="btn btn-dark" onClick={() => removeTask(tasks.id)}>
										Remove
									</button>
								</div>
							</div>
					  ))}
			</div>
		</div>
	);
}

export default Container;
