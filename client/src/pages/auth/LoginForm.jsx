import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Imperial from "../../assets/images/Imperial-logo.jpg";
import Google from "../../assets/images/google-logo.png";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Проверка валидности email
	const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	// Обработчик формы
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEmailValid(email)) {
			const fakeToken = "1234567890"; // Тестовый токен
			sessionStorage.setItem("token", fakeToken); // Сохраняем токен
			console.log("Token сохранен:", sessionStorage.getItem("token")); // Проверьте, что токен действительно сохранен
			navigate("/account");
		} else {
			setError("Неверный email!");
		}
	};
	return (
		<main className="min-h-screen flex items-center justify-center bg-imperialPurple py-10">
			<section className="w-full max-w-sm sm:bg-white px-10 py-10 rounded-3xl">
				<div className="flex justify-center mb-6">
					<img src={Imperial} className="w-12 h-12 rounded-lg" alt="Imperial Logo" />
				</div>

				<h1 className="text-2xl font-semibold text-center text-white sm:text-gray-800">Войти в IMPERIAL</h1>
				<p className="text-center mt-2 text-gray-400 sm:text-[#333333b3] text-[0.85rem]">
					Пожалуйста, введите адрес электронной почты
				</p>

				<form onSubmit={handleSubmit} className="mt-6">
					<div className="mb-4">
						<label htmlFor="email" className="sr-only">
							Электронная почта
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Введите свой адрес эл. почты"
							className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-[#33333314] focus:outline-none focus:ring-2 focus:ring-purple-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
					</div>

					<button
						type="submit"
						className={`w-full py-2 rounded-lg transition ${
							isEmailValid(email)
								? "bg-purple-500 text-white hover:bg-purple-600"
								: "bg-gray-400 text-gray-200 cursor-not-allowed"
						}`}
						disabled={!isEmailValid(email)}>
						Продолжить
					</button>

					<div className="my-4 h-px bg-gray-100"></div>

					<button
						type="button"
						className="w-full flex items-center font-semibold justify-center bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition">
						<img src={Google} className="w-5 h-5 mr-2" alt="Google Logo" />
						Продолжить с Google
					</button>
				</form>
			</section>
		</main>
	);
};

export default LoginForm;
