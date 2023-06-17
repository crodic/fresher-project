import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/createContext";
import AppRoute from "./routes/AppRoute";

function App() {
    const { login } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            login(localStorage.getItem("email"), localStorage.getItem("token"));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoute />
                </Container>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
