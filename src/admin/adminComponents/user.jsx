import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserView() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function GetUsers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/getUser`
        );

        setUsers(response.data.data || []);
      } catch (error) {
        console.log(error.message);
      }
    }

    GetUsers();
  }, []);

  return (
    <div className="container mt-4">

      <h4 className="text-warning mb-3">User Info</h4>

      {users.length === 0 ? (
        <div className="alert alert-warning">
          No users found
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-striped table-hover table-bordered align-middle">

            <thead className="table-warning">
              <tr>
                <th>#Id</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Orders</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item, index) => (
                <tr key={item._id || index}>

                  {/* ID - truncated for mobile */}
                  <td
                    style={{
                      maxWidth: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={item._id}
                  >
                    {item._id}
                  </td>

                  <td>{item.username}</td>

                  <td
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {item.email}
                  </td>

                  <td className="text-center">

                    <span className="badge bg-warning text-dark me-2">
                      {item.totalOrders}
                    </span>

                    <Link
                      className="btn btn-warning btn-sm"
                      to={`/viewuserorder/${item._id}`}
                    >
                      View
                    </Link>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default UserView;