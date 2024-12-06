import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

const PersonalAccount = () => {
	const [isHeaderVisible, setIsHeaderVisible] = useState(false); // Видимость Header
	const [isRelative, setIsRelative] = useState(false); // Состояние для position: relative
	const [isMainShifted, setIsMainShifted] = useState(false); // Состояние для управления смещением

	const toggleMainClass = () => {
		setIsMainShifted((prev) => !prev);
	};

	// Обработчик клика на основной контент
	const handleMainClick = (e) => {
		if (e.target.tagName !== "BUTTON") {
			setIsMainShifted(false);
		}
	};

	// Функция для сброса смещения
	const handleSidebarToggle = (shift) => {
		setIsMainShifted(shift);
	};

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			setIsMainShifted(false);

			if (width <= 640) {
				setIsHeaderVisible(true);
				setIsRelative(true);
			} else {
				setIsHeaderVisible(false);
				setIsRelative(false);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<section
			className={`flex min-h-screen transform transition-transform duration-300 ease-in-out ${
				isMainShifted ? "translate-x-64" : "translate-x-0"
			}`}
			style={{ position: isRelative ? "relative" : "static" }}>
			<Sidebar onSidebarToggle={handleSidebarToggle} />
			<main className="flex-1 bg-gray-100 overflow-y-auto" onClick={handleMainClick}>
				{isHeaderVisible && <Header onToggleMainClass={toggleMainClass} />}

				<section className="p-4">
					<h1 className="text-2xl font-semibold mb-6">Личный кабинет</h1>
					<section className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-lg font-semibold mb-4">Виртуальная карта</h2>
						<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
							<div>
								<p className="text-gray-700">Уровень аккаунта: Базовый</p>
								<p className="text-gray-500 text-sm">Доступно баллов: 0</p>
							</div>
							<button className="bg-imperialPurple text-white px-4 py-2 rounded-lg">Показать QR</button>
						</div>
					</section>

					<section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white p-4 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/300" alt="Benefit" className="rounded-md mb-2" />
							<p className="text-gray-700">Начисление баллов</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/300" alt="Benefit" className="rounded-md mb-2" />
							<p className="text-gray-700">Скидочная система</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<img src="https://via.placeholder.com/300" alt="Benefit" className="rounded-md mb-2" />
							<p className="text-gray-700">Кэшбек правила</p>
						</div>
					</section>
				</section>
			</main>
		</section>
	);
};

export default PersonalAccount;
