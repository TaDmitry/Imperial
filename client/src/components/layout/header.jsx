import PropTypes from "prop-types";

const Header = ({ onToggleMainClass }) => {
	return (
		<header className="bg-imperialPurple text-white py-2 px-4 flex items-center justify-between shadow-md w-full">
			<div className="flex items-center w-full">
				<button
					className="p-2 bg-transparent border-none focus:outline-none cursor-pointer"
					onClick={onToggleMainClass}>
					<div className="w-6 h-0.5 bg-white mb-1.5 pointer-events-none"></div>
					<div className="w-6 h-0.5 bg-white mb-1.5 pointer-events-none"></div>
					<div className="w-6 h-0.5 bg-white pointer-events-none"></div>
				</button>
				<div className="font-semibold text-center w-full">
					<p>Добро пожаловать</p>
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	onToggleMainClass: PropTypes.func.isRequired,
};

export default Header;
