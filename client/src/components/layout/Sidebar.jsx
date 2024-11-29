import { useState, useEffect } from "react";
import Imperial from "../../assets/images/Imperial-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isButtonVisible, setButtonVisible] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setSidebarOpen(false);
				setButtonVisible(false);
			} else {
				setSidebarOpen(true);
				setButtonVisible(true);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav
			className={`bg-imperialPurple text-white flex flex-col transition-width duration-300 ${
				isSidebarOpen ? "w-64" : "w-16"
			} h-screen sticky top-0`}>
			<div>
				<div className="flex items-center justify-between px-4 py-3">
					<a className="flex items-center cursor-pointer">
						<img src={Imperial} alt="Imperial Logo" className="rounded-lg w-8 h-8 flex-shrink-0" />
						<h1
							className={`ml-2 font-bold whitespace-nowrap transition-all duration-300 ${
								isSidebarOpen ? "opacity-100" : "opacity-0"
							}`}>
							IMPERIAL
						</h1>
					</a>
					{isButtonVisible && (
						<button
							onClick={() => setSidebarOpen(!isSidebarOpen)} // Переключаем состояние боковой панели
							className={`p-1 bg-imperialPurple text-[#ffffff59] rounded-full border border-solid transition duration-300 ${
								isSidebarOpen ? "ml-auto" : "fixed left-[3.5rem]"
							}`}>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className={`transition-transform duration-300 ${isSidebarOpen ? "" : "rotate-180"}`}
							/>
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
			</div>

			<div
				className={`mt-auto mb-4 px-4 py-2 flex items-center ${
					isSidebarOpen ? "justify-start" : "justify-center"
				}`}>
				<img
					src="https://via.placeholder.com/32"
					alt="User Avatar"
					className={`w-8 h-8 rounded-full flex-shrink-0 ${!isSidebarOpen ? "ml-[4.5rem]" : ""}`}
				/>
				<p
					className={`ml-2 text-sm transition-opacity duration-300 ${
						isSidebarOpen ? "opacity-100" : "opacity-0"
					}`}>
					Дмитрий Тарасенко
				</p>
			</div>
		</nav>
	);
};

export default Sidebar;
