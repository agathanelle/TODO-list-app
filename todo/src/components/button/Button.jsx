import { ReactComponent as SVG } from '../../assets/xButton.svg';

const typeClassMap = {
	default: 'btn btn-light',
	remove: 'remove-button',
	add: 'btn btn-dark',
	disabled: ''
};

function Button({ type, onClick, text, taskStatus }) {
	if (type === 'remove') {
		return (
			<button className={typeClassMap.remove} onClick={onClick}>
				<SVG />
			</button>
		);
	} else if (taskStatus === text.toLowerCase().replace(/ /g, '')) {
		return (
			<button className={typeClassMap.default} disabled>
				{text}
			</button>
		);
	} else {
		return (
			<button className={typeClassMap.default} onClick={onClick}>
				{text}
			</button>
		);
	}
}

export default Button;
