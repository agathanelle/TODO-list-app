function Task({ id, task, status }) {
	return (
		<div key={id} className={`container-task ` + status}>
			{task}
		</div>
	);
}

export default Task;
