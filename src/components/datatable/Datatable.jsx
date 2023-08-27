import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const nav = useNavigate();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const { data, error } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`);

  useEffect(() => {
    let admin = localStorage.getItem("user");
    if (admin) {
      admin = JSON.parse(admin);
      setList(data.filter((item) => item._id !== admin._id));
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { console.log(error); }
  };

  const handleView = async (id) => {
    nav(`/admin/${path}/${id}`, { state: { ...list.filter((item) => item._id === id)[0] } })
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path !== 'users' && path !== 'rooms' &&
              <div className="viewButton" onClick={() => handleView(params.row._id)}>View</div>
            }
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          <h2 className="title">{path}</h2>
          <Link to={`/admin/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        {list &&
          <DataGrid
            className="datagrid"
            rows={list}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        }
      </div>
    </>

  );
};

export default Datatable;
