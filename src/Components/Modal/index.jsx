import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../../Services/UserServices";
import { toast } from "react-toastify";
import Avatar from "../../Images/kafka.jpg";

function ModalNewUser({ handleClose, show, handleUpdateUser }) {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        const trimName = name.trim();
        const trimJob = job.trim();
        if (trimName.length != 0 && trimJob.length != 0) {
            let res = await postCreateUser(trimName, trimJob);
            if (res && res.id) {
                handleClose();
                setName("");
                setJob("");
                toast.success("Thêm Thành Công");
                handleUpdateUser({
                    first_name: res.name,
                    last_name: res.job,
                    avatar: `${Avatar}`,
                    id: res.id,
                    email: `${handleText(res.name)}.${handleText(
                        res.job
                    )}@reqres.in`,
                });
                handleText(res.name);
            }
        } else {
            toast.error("Thêm Thất Bại");
        }
    };

    const handleText = (text) => {
        return text.toLowerCase();
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={job}
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

export default ModalNewUser;
