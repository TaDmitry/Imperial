// import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

const PersonalAccount = () => {
	return (
		<section className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
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
			</main>
		</section>
	);
};

export default PersonalAccount;
