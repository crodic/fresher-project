import { Route, Routes } from "react-router-dom";
import Home from "../Layout/Home";
import Manager from "../Layout/Manager";
import Login from "../Components/Login";
import PrivateRoute from "./PrivateRoute";
import Notfound from "../Components/NotFound";

function AppRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/login" element={<Login />} exact />
                <Route
                    path="/manager"
                    element={
                        <PrivateRoute>
                            <Manager />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </>
    );
}

export default AppRoute;
