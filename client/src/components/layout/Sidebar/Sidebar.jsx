import { useState, useEffect, useCallback } from "react";
import Imperial from "../../../assets/images/Imperial-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./components/DropdownMenu";
import PropTypes from "prop-types";

const Sidebar = ({ onSidebarToggle }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [isButtonVisible, setButtonVisible] = useState(true);
	const [isAbsolute, setIsAbsolute] = useState(false);
	const [isButtonHovered, setIsButtonHovered] = useState(false);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Хранение ширины экрана
	const isMobile = windowWidth <= 640; // Определяем, мобильный ли экран (менее 640px)

	// **Функция для проверки текущей ширины экрана**
	const checkScreenSize = useCallback(() => {
		const width = window.innerWidth;
		setWindowWidth(width);

		if (width <= 640) {
			setSidebarOpen(true);
			setMobileSidebarOpen(true);
			setButtonVisible(true);
			setIsAbsolute(true);
		} else if (width <= 768) {
			setSidebarOpen(false);
			setMobileSidebarOpen(false);
			setButtonVisible(false);
			setIsAbsolute(false);
		} else {
			setSidebarOpen(true);
			setMobileSidebarOpen(false);
			setButtonVisible(true);
			setIsAbsolute(false);
		}
	}, []);

	// **Обновление при изменении размера экрана**
	useEffect(() => {
		checkScreenSize(); // Первичная проверка
		window.addEventListener("resize", checkScreenSize); // Слушатель изменений размера экрана

		return () => {
			window.removeEventListener("resize", checkScreenSize); // Удаление слушателя
		};
	}, [checkScreenSize]);

	// **Обработчик клика на кнопку боковой панели**
	const handleToggleSidebar = () => {
		if (isMobile) {
			onSidebarToggle(false); // На мобильных устройствах закрываем боковую панель
		} else {
			setSidebarOpen((prevState) => !prevState); // На больших экранах переключаем открытие/закрытие
		}
	};

	// **Обработчики для hover на боковой панели**
	const handleMouseEnter = () => {
		if (!isMobile) {
			setIsButtonHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (!isMobile) {
			setIsButtonHovered(false);
		}
	};

	return (
		<nav
			className={`z-10 ${isMobile ? "bg-white" : "bg-imperialPurple text-white"} ${
				isSidebarOpen ? "w-64" : "w-16"
			} min-h-full ${isAbsolute ? "absolute left-[-16rem]" : "sticky top-0"} transition-[width] duration-300`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className="h-screen flex flex-col sticky top-0">
				<div className="flex items-center justify-between px-4 py-3">
					<a className="flex items-center cursor-pointer">
						<img src={Imperial} alt="Imperial Logo" className="rounded-lg w-8 h-8 flex-shrink-0 max-w-fit" />
						{isSidebarOpen && (
							<h1 className="ml-2 font-bold whitespace-nowrap transition-opacity duration-300">IMPERIAL</h1>
						)}
					</a>

					{isButtonVisible && (
						<button
							onClick={handleToggleSidebar}
							className={`p-1 relative rounded-full border-solid transition-all duration-300 ${
								isSidebarOpen || isMobileSidebarOpen ? "ml-auto" : "left-[0.4rem]"
							} ${
								isMobile
									? "border-0 bg-white text-[#000000] opacity-100 pointer-events-auto"
									: `border bg-imperialPurple text-[#ffffff59] ${
											isButtonHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
									  }`
							}`}>
							{isMobileSidebarOpen ? (
								<FontAwesomeIcon icon={faXmark} className="transition-transform duration-300 text-lg" />
							) : (
								<FontAwesomeIcon
									icon={faChevronLeft}
									className={`transition-transform py-1.5 flex text-sm duration-500 ${
										isSidebarOpen ? "" : "rotate-180"
									}`}
								/>
							)}
						</button>
					)}
				</div>
				<ul className="space-y-2 my-2 mx-4">
					<li>
						<a
							className={`flex cursor-pointer items-center p-2 rounded-lg transition-colors ${
								isSidebarOpen ? "justify-start" : "justify-center"
							} ${isMobile ? "hover:bg-gray-200" : "hover:bg-white10"}`}>
							<FontAwesomeIcon icon={faHouse} className={"flex-shrink-0 w-5 h-5"} />
							{isSidebarOpen && <span className="ml-3 transition-opacity duration-300">Главная</span>}
						</a>
					</li>
				</ul>
				<DropdownMenu
					isSidebarOpen={isSidebarOpen}
					isMobile={isMobile}
					userName="Дмитрий Тарасенко"
					userEmail="Test.com"
				/>
			</div>
		</nav>
	);
};

Sidebar.propTypes = {
	onSidebarToggle: PropTypes.func.isRequired,
};

export default Sidebar;
