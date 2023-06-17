import { Alert } from "react-bootstrap";

function Notfound() {
    return (
        <>
            <Alert variant="danger" className="my-5">
                <Alert.Heading>Ôi Không URL không hợp lệ!</Alert.Heading>
                <p>
                    Trang Web Này Có Thể Đã Bị Hỏng Hoặc Bạn Bị Chặn Truy Cập.
                </p>
            </Alert>
        </>
    );
}

export default Notfound;
