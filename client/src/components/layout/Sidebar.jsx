import { useState, useEffect } from "react";
import Imperial from "../../assets/images/Imperial-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Sidebar = ({ onSidebarToggle }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
	const [isButtonVisible, setButtonVisible] = useState(true);
	const [isAbsolute, setIsAbsolute] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width <= 640);

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
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Обработчик клика на кнопку
	const handleToggleSidebar = () => {
		if (window.innerWidth <= 640) {
			onSidebarToggle(false);
		} else {
			setSidebarOpen(!isSidebarOpen);
		}
	};

	return (
		<nav
			className={`z-10 ${isMobile ? "bg-white" : "bg-imperialPurple text-white"} ${
				isSidebarOpen ? "w-64" : "w-16"
			} min-h-full ${
				isAbsolute ? "absolute left-[-16rem]" : "sticky top-0"
			} transition-[width] duration-300`}>
			<div className="h-screen flex flex-col sticky top-0">
				<div className="flex items-center justify-between px-4 py-3">
					<a className="flex items-center cursor-pointer">
						<img src={Imperial} alt="Imperial Logo" className="rounded-lg w-8 h-8 flex-shrink-0" />
						<h1
							className={`ml-2 font-bold whitespace-nowrap transition-opacity duration-300 ${
								isSidebarOpen ? "opacity-100" : "opacity-0"
							}`}>
							IMPERIAL
						</h1>
					</a>

					{isButtonVisible && (
						<button
							onClick={handleToggleSidebar}
							className={`p-1 relative rounded-full  border-solid transition-transform duration-300 ${
								isSidebarOpen || isMobileSidebarOpen ? "ml-auto" : "left-[-2.5rem]"
							} ${
								isMobile ? "border-0 bg-white text-[#000000]" : "border bg-imperialPurple text-[#ffffff59]"
							}`}>
							{isMobileSidebarOpen ? (
								<FontAwesomeIcon icon={faXmark} className="transition-transform duration-300 text-2xl" />
							) : (
								<FontAwesomeIcon
									icon={faChevronLeft}
									className={`transition-transform duration-500 ${isSidebarOpen ? "" : "rotate-180"}`}
								/>
							)}
						</button>
					)}
				</div>

				<ul className="space-y-2 my-2 mx-4">
					<li>
						<a
							href="#"
							className={`flex items-center px-2 py-1 hover:bg-white10 rounded-lg transition-colors ${
								isSidebarOpen ? "justify-start" : "justify-center"
							}`}>
							<FontAwesomeIcon
								icon={faHouse}
								className={`flex-shrink-0 ${!isSidebarOpen ? "ml-[4.5rem]" : ""}`}
							/>
							<span
								className={`transition-opacity duration-300 ${
									isSidebarOpen ? "opacity-100" : "opacity-0"
								} ml-3`}>
								Главная
							</span>
						</a>
					</li>
				</ul>

				<div
					className={`mt-auto mb-4 px-4 py-2 flex items-center ${
						isSidebarOpen ? "justify-start" : "justify-center"
					}`}>
					<img
						src="https://via.placeholder.com/32"
						alt="User Avatar"
						className={`w-8 h-8 rounded-full flex-shrink-0 ${!isSidebarOpen ? "ml-[6rem]" : ""}`}
					/>
					<p
						className={`ml-2 text-sm transition-opacity duration-300 ${
							isSidebarOpen ? "opacity-100" : "opacity-0"
						}`}>
						Пользователь
					</p>
				</div>
			</div>
		</nav>
	);
};

Sidebar.propTypes = {
	onSidebarToggle: PropTypes.func.isRequired,
};

export default Sidebar;
