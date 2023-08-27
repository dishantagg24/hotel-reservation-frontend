import "./adminlist.css"
import Datatable from "../../components/datatable/Datatable"

const AdminList = ({ columns }) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns} />
      </div>
    </div>
  )
}

export default AdminList