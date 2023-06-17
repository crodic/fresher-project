import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putEditUser } from "../../../Services/UserServices";

function ModalEdit({ handleClose, show, handleUpdateUser, user }) {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    // useEffect to set state when component is render
    useEffect(() => {
        setName(user.name);
        setJob(user.job);
    }, [user]);

    // useEffect to set state when input onChange
    useEffect(() => {
        setName(name);
        setJob(job);
    }, [name, job]);

    const handleSaveUser = async () => {
        let res = await putEditUser(user.id, name, job);
        if (res) {
            handleClose();
            handleUpdateUser(user.id, name, job);
            toast.success("Cập Nhật Thành Công");
        } else {
            handleClose();
            toast.error("Cập Nhật Thất Bại");
        }
    };

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add_new">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={job || ""}
                                    onChange={(e) => setJob(e.target.value)}
                                ></input>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSaveUser();
                        }}
                    >
                        Save User
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEdit;
