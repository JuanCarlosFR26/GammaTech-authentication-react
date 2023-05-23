import React, { useContext, useEffect } from "react";
import { UserProvider } from "../context/UserListProvider";
import "../styles/header.css";
import "../styles/index.css";
import logoGamma from "../img/Logo_Yellow 1.svg";
import { useNavigate } from "react-router-dom";

const UserList = () => {

  const navigate = useNavigate();

  const { userList, isLogged, setIsLogged } = useContext(UserProvider);


  useEffect(() => {
    if(!isLogged) {
      navigate('/')
    }
  }, [userList])

  const logout = () => {
    setIsLogged(false);
    navigate('/')
  }

  return (
    <>
    {
      isLogged && <div className="usersContent">
      <div className="headerUsers">
        <img src={logoGamma}></img>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
      <div className="tableContainer">
        <table>
            <tr className="headerTable">
              <th>STUDENT</th>
              <th>EMAIL</th>
              <th>CITY</th>
              <th>AVERAGE GRADE</th>
              <th>ENROLLED</th>
            </tr>
            {userList &&
              userList.data.map((user) => (
                <tr className="contentRow">
                  <td>
                    {<img src={user.student_img} alt={user.first_name}></img>}
                    {`${user.first_name} ${user.last_name}`}
                  </td>
                  <td>{`${user.email}`}</td>
                  <td>{`${user.city}`}</td>
                  <td>{`${user.average_grade}`}</td>
                  <td>{`${user.enrolled_at}`}</td>
                </tr>
              ))}
        </table>
      </div>
    </div>
    }
    </>
  );
};

export default UserList;
