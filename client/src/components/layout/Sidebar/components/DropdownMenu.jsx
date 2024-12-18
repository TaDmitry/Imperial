import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DropdownMenu = ({ isSidebarOpen, isMobile, userName, userEmail }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const navigate = useNavigate(); // Хук для навигации

	// Открытие/закрытие меню
	const toggleDropdown = (event) => {
		event.stopPropagation();
		setShowDropdown((prevState) => !prevState);
	};

	// Закрытие меню при клике вне его или кнопки
	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target)
		) {
			setShowDropdown(false);
		}
	};

	// Закрытие меню при изменении размера экрана
	const handleResize = () => {
		setShowDropdown(false);
	};

	// Добавляем обработчики кликов и изменения размера экрана
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("resize", handleResize);

		return () => {
			document.removeEventListener("click", handleClickOutside);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Обработчик выхода
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/");
	};

	return (
		<>
			{!isMobile && (
				<div
					ref={buttonRef}
					onClick={toggleDropdown}
					className={`mt-auto mb-4 mx-4 my-2 relative ${isSidebarOpen ? "" : "flex justify-center"}`}>
					<div className="cursor-pointer hover:bg-white10 rounded-lg px-2 py-1 transition-colors flex items-center">
						<img
							src="https://via.placeholder.com/32"
							alt="User Avatar"
							className="w-6 h-6 rounded-full flex-shrink-0 max-w-max"
						/>
						{isSidebarOpen && <p className="ml-2 font-semibold transition-opacity duration-300">{userName}</p>}
					</div>

					{showDropdown && (
						<div
							ref={dropdownRef}
							className="bg-white text-black w-max rounded-lg shadow-lg absolute top-[-70px] right-[-150px] border border-[#dfdfdf] transition-all duration-200 ease-in-out">
							<ul>
								<li className="p-2 hover:bg-gray-100 cursor-pointer rounded-t-lg">
									<span>Просмотреть профиль</span>
								</li>
								<li className="p-2 hover:bg-gray-100 cursor-pointer rounded-b-lg" onClick={handleLogout}>
									<span>Выход</span>
								</li>
							</ul>
						</div>
					)}
				</div>
			)}
			{isMobile && (
				<div className="w-max mt-auto px-4 py-2 relative">
					<div className="flex">
						<div className="cursor-pointer rounded-lg px-2 py-1 transition-all duration-200 ease-in-out flex items-center hover:bg-gray-200">
							<img
								src="https://via.placeholder.com/32"
								alt="User Avatar"
								className="w-6 h-6 rounded-full flex-shrink-0 max-w-max"
							/>
							<div className="ml-2">
								<p className="font-semibold">{userName}</p>
								<p className="text-sm text-gray-400">{userEmail}</p>
							</div>
						</div>

						<button
							ref={buttonRef}
							onClick={toggleDropdown}
							className="ml-1 p-2 transition-all duration-200 ease-in-out">
							<span>&#x22EE;</span>
						</button>
					</div>

					{showDropdown && (
						<div
							ref={dropdownRef}
							className="bg-white text-black rounded-lg shadow-lg absolute top-[-70px] right-[-150px] border border-[#dfdfdf] transition-all duration-200 ease-in-out">
							<ul>
								<li className="p-2 hover:bg-gray-100 cursor-pointer rounded-t-lg">
									<span>Просмотреть профиль</span>
								</li>
								<li className="p-2 hover:bg-gray-100 cursor-pointer rounded-b-lg" onClick={handleLogout}>
									<span>Выход</span>
								</li>
							</ul>
						</div>
					)}
				</div>
			)}
		</>
	);
};

DropdownMenu.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	userName: PropTypes.string.isRequired,
	userEmail: PropTypes.string.isRequired,
};

export default DropdownMenu;
