import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Title from '../title/Title';
import dataTasks from '../../data/tasks.json';
import Button from '../Button';

function Container() {
	const [data, setData] = useState([]);
	const [task, setTask] = useState('');
	const [ID, setID] = useState(0);

	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem('tasks'));
		if (tasks.length > 0) {
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
					<Button
						type="add"
						onClick={() => {
							if (!/^\s*$/.test(task)) addTask();
						}}
						text="Add"
					/>
				</div>
			</div>
			<div>
				{data === null
					? null
					: data.map((tasks) => (
							<div key={tasks.id} className={`container-task ` + tasks.status}>
								<Button type="remove" onClick={() => removeTask(tasks.id)} text="x" />
								<div>{tasks.task}</div>
								<div className="button-aligment">
									<Button onClick={() => updateTask(tasks.id, 'notstarted')} taskStatus={tasks.status} text="Not started" />
									<Button onClick={() => updateTask(tasks.id, 'inprogress')} taskStatus={tasks.status} text="In progress" />
									<Button onClick={() => updateTask(tasks.id, 'done')} taskStatus={tasks.status} text="Done" />
								</div>
							</div>
					  ))}
			</div>
		</div>
	);
}

export default Container;
