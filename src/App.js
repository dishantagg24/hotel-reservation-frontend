import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Admin from "./pages/admin/Admin";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AdminList from "./pages/adminList/AdminList";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && !user.isAdmin) {
      console.log(user);
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminList columns={userColumns} />
                </ProtectedRoute>
              }
            />
            {/* <Route
            path=":userId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          /> */}
            {/* <Route
            path="new"
            element={
              <ProtectedRoute>
                <New inputs={userInputs} title="Add New User" />
              </ProtectedRoute>
            }
          /> */}
          </Route>
          <Route path="hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminList columns={hotelColumns} />
                </ProtectedRoute>
              }
            />
            {/* <Route
            path=":productId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          /> */}
            {/* <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          /> */}
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminList columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            {/* <Route
            path=":productId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          /> */}
            {/* <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
