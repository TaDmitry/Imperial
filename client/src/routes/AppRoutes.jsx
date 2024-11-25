import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import PersonalAccount from "../pages/auth/PersonalAccount";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginForm />} />
			<Route path="/account" element={<PersonalAccount />} />
		</Routes>
	);
};

export default AppRoutes;
