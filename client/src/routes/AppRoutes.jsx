import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Ленивые загрузки компонентов
const LoginForm = lazy(() => import("../pages/LoginForm"));
const PersonalAccount = lazy(() => import("../pages/auth/PersonalAccount"));

const AppRoutes = () => {
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/account" element={isLoggedIn ? <PersonalAccount /> : <Navigate to="/" replace />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
