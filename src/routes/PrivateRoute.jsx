import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../Context/createContext";
import { Alert } from "react-bootstrap";

function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="my-5">
                    <Alert.Heading>Bạn Chưa Đăng Nhập !</Alert.Heading>
                    <p>Bạn Không Có Quyền Truy Cập Vào Trang Web Này</p>
                </Alert>
            </>
        );
    }

    return children;
}

export default PrivateRoute;
