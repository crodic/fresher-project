import Table from "react-bootstrap/Table";
import Paginate from "../Pagination";
import ModalNewUser from "../Modal";
import ModalEdit from "../Modal/ModalEdit";
import ModalDelete from "../Modal/ModalDelete";
import Papa from "papaparse";
import { CSVLink, CSVDownload } from "react-csv";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../../Services/UserServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import _, { debounce } from "lodash";
import { toast } from "react-toastify";
import "./table.scss";
import Avatar from "../../Images/kafka.jpg";

function TableUser() {
    const [listUsers, setListUsers] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [user, setUser] = useState({});
    const [idUser, setIdUser] = useState(0);
    const [sort, setSort] = useState("asc");
    const [fieldSort, setFieldSort] = useState("id");
    const [keyword, setKeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);

    // Call API
    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setListUsers(res.data);
            setTotalUser(res.total);
            setTotalPage(res.total_pages);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCloseEdit = () => {
        setShowModalEdit(false);
    };

    const handleCloseDelete = () => {
        setShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    const handleChangeTable = (id, name, job) => {
        let newList = listUsers.forEach((element) => {
            if (element.id == id) {
                element.first_name = name;
                element.last_name = job;
            }
        });
        return newList;
    };

    const handleDeleteTable = (id) => {
        let newList = listUsers.filter((user) => {
            return user.id != id;
        });
        setListUsers(newList);
    };

    const handleSort = (sortBy, sortField) => {
        setSort(sortBy);
        setFieldSort(sortField);

        let cloneListUser = [...listUsers];
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUsers(cloneListUser);
    };

    const handleSearch = debounce((e) => {
        const keyword = e.target.value;
        let cloneUser = [...listUsers];
        if (keyword) {
            cloneUser = cloneUser.filter((item) => {
                return item.email.includes(keyword);
            });
            setListUsers(cloneUser);
        } else {
            getUsers();
        }
    }, 500);

    const getUserExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First Name", "Last Name"]);
            listUsers.map((user) => {
                let arr = [];
                arr[0] = user.id;
                arr[1] = user.email;
                arr[2] = user.first_name;
                arr[3] = user.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImport = (event) => {
        let file = event.target.files[0];
        if (file && file.type !== "text/csv") {
            toast.error("Định Dạng File Không Hợp Lệ");
            return;
        }

        //Parse csv to String
        Papa.parse(file, {
            // header: true, //Change Header Array to Header Object
            complete: (result) => {
                let dataCSV = result.data;
                if (dataCSV.length > 0) {
                    if (dataCSV[0] && dataCSV[0].length === 3) {
                        if (
                            dataCSV[0][0] !== "email" ||
                            dataCSV[0][1] !== "first_name" ||
                            dataCSV[0][2] !== "last_name"
                        ) {
                            toast.error(
                                "File có header định dang không hợp lệ"
                            );
                        } else {
                            let result = [];
                            dataCSV.map((item, index) => {
                                if (index > 0 && item.length === 3) {
                                    let obj = {};
                                    obj.id = Math.floor(Math.random() * 11);
                                    obj.avatar = Avatar;
                                    obj.email = item[0];
                                    obj.first_name = item[1];
                                    obj.last_name = item[2];
                                    result.push(obj);
                                }
                            });
                            setListUsers(result);
                        }
                    } else {
                        toast.error("File có data định dang không hợp lệ");
                    }
                } else {
                    toast.error("File CSV không có data");
                }
            },
        });
    };

    return (
        <div className="table-user">
            <div className="d-block d-sm-flex justify-content-between align-item-center my-3">
                <h1 className="text-center sm-col-12">List User</h1>
                <div className="group-button sm-col-12">
                    <label
                        htmlFor="import-file"
                        className="btn btn-warning m-2"
                    >
                        Import
                    </label>
                    <input
                        type="file"
                        id="import-file"
                        hidden
                        onChange={(e) => handleImport(e)}
                    />
                    <CSVLink
                        filename={"user.csv"}
                        target="_blank"
                        data={dataExport}
                        className="btn btn-primary m-2"
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        Export
                    </CSVLink>
                    <button
                        className="btn btn-success m-2"
                        onClick={() => setShowModal(true)}
                    >
                        ADD NEW USER
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-4 my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search User By Email."
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        handleSearch(e);
                    }}
                />
            </div>
            <div className="custom-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="text-center sort-header">
                                    <span>ID</span>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            className="icon-sort"
                                            onClick={() =>
                                                handleSort("asc", "id")
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faArrowDown}
                                            className="icon-sort"
                                            onClick={() =>
                                                handleSort("desc", "id")
                                            }
                                        />
                                    </span>
                                </div>
                            </th>
                            <th className="text-center">Avatar</th>
                            <th>
                                <div className="text-center sort-header">
                                    <span>First Name</span>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            className="icon-sort"
                                            onClick={() =>
                                                handleSort("asc", "first_name")
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faArrowDown}
                                            className="icon-sort"
                                            onClick={() =>
                                                handleSort("desc", "first_name")
                                            }
                                        />
                                    </span>
                                </div>
                            </th>
                            <th className="text-center">Last Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.map((user, index) => {
                                return (
                                    <tr key={`users - ${index}`}>
                                        <td align="center" valign="middle">
                                            {user.id}
                                        </td>
                                        <td align="center" valign="middle">
                                            <img
                                                src={user.avatar}
                                                className="avatar-user"
                                            />
                                        </td>
                                        <td align="center" valign="middle">
                                            {user.first_name}
                                        </td>
                                        <td align="center" valign="middle">
                                            {user.last_name}
                                        </td>
                                        <td align="center" valign="middle">
                                            {user.email}
                                        </td>
                                        <td align="center" valign="middle">
                                            <button
                                                className="btn btn-outline-secondary mx-1"
                                                onClick={() => {
                                                    setShowModalEdit(true);
                                                    let object = {
                                                        id: user.id,
                                                        name: user.first_name,
                                                        job: user.last_name,
                                                    };
                                                    setUser(object);
                                                }}
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                className="btn btn-danger m-1"
                                                onClick={() => {
                                                    setShowModalDelete(true);
                                                    setIdUser(user.id);
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-item-center">
                <Paginate
                    totalPage={totalPage}
                    totalUser={totalUser}
                    pageChange={getUsers}
                />
            </div>

            {/* Modal Popup */}
            <ModalNewUser
                show={showModal}
                handleClose={handleClose}
                handleUpdateUser={handleUpdateTable}
            />
            <ModalEdit
                show={showModalEdit}
                handleClose={handleCloseEdit}
                user={user}
                handleUpdateUser={handleChangeTable}
            />
            <ModalDelete
                show={showModalDelete}
                handleClose={handleCloseDelete}
                user={idUser}
                handleUpdateUser={handleDeleteTable}
            />
        </div>
    );
}

export default TableUser;
