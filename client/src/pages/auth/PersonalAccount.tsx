import React from "react";
import { useNavigate } from "react-router-dom";

const PersonalAccount: React.FC = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("isLoggedIn");
		navigate("/");
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
				<p>Добро пожаловать в вашу учетную запись!</p>
				<button
					onClick={handleLogout}
					className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
					Выйти
				</button>
			</div>
		</main>
	);
};

export default PersonalAccount;
