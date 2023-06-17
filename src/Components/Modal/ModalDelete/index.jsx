import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../Services/UserServices";
import { toast } from "react-toastify";

function ModalDelete({ handleClose, show, user, handleUpdateUser }) {
    const deleteUserById = async (id) => {
        let res = await deleteUser(id);
        if (res && res.StatusCode === 204) {
            handleUpdateUser(id);
            toast.success("Xoá Thành Công");
        } else {
            toast.error("Xoá Thất Bại");
        }
    };
    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hành Động Này Sẽ Không Thể Hoàn Tác.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteUserById(user);
                            handleClose();
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalDelete;
