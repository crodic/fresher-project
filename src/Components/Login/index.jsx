import { useContext, useRef, useState } from "react";
import "./login.scss";
import { useEffect } from "react";
import {
    faBackward,
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginApi } from "../../Services/UserServices";
import { UserContext } from "../../Context/createContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useContext(UserContext); // Truyền Vào Biến Context khởi tạo

    const input = useRef();

    useEffect(() => {
        input.current.focus();

        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        let trimEmail = email.trim();
        let trimPassword = password.trim();
        if (!trimEmail || !trimPassword) {
            toast.error("Email hoặc Password đang rỗng");
            return;
        } else {
            setLoading(true);
            let res = await LoginApi(trimEmail, trimPassword);
            if (res && res.token) {
                setLoading(false);
                login(trimEmail, res.token);
                navigate("/");
            } else {
                if (res && res.status === 400) {
                    setLoading(false);
                    toast.error(res.data.error);
                }
            }
        }
    };

    const handleClickEnter = (e) => {
        if (e && e.keyCode === 13) {
            handleLogin();
        }
    };

    return (
        <>
            <div className="login-container col-9 col-lg-4">
                <h3 className="title">
                    <b>Login</b>
                </h3>
                <div className="text">
                    Email Or Username (eve.holt@reqres.in)
                </div>
                <input
                    type="text"
                    className="login-input form-control"
                    placeholder="Email or username..."
                    ref={input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-password">
                    <input
                        type={show ? "text" : "password"}
                        className="login-input form-control"
                        placeholder="Password..."
                        value={password}
                        onKeyDown={(e) => handleClickEnter(e)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {show ? (
                        <FontAwesomeIcon
                            icon={faEye}
                            className="icon-password-show"
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="icon-password-hide"
                            onClick={() => setShow(!show)}
                        />
                    )}
                </div>
                <button
                    className={`button-login btn ${
                        email && password ? "btn-primary" : "btn-disabled"
                    }`}
                    disabled={!email || !password}
                    onClick={handleLogin}
                >
                    {loading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="rotate-animation"
                        />
                    ) : (
                        <span>Login</span>
                    )}
                </button>
                <div className="text-center m-2 back-home">
                    <span className="click-go_back d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faBackward} className="icon" />
                        <NavLink to="/" className="nav-link">
                            Back Home
                        </NavLink>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Login;
