import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const nav = useNavigate();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

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
    } catch (err) { }
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
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
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
  );
};

export default Datatable;
