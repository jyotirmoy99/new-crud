import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

//MODAL CUSTOM STYLE
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 500,
  },
};

function UserTable() {
  const [localData, setLocalData] = useState([]);

  let [newFormData, setnewFormData] = useState({}); //new form for updating the object
  const [array, setArray] = useState([]); //it is used to map the new array where the new form data is stored
  let [indexID, setindexID] = useState(null); //get single id
  //modal
  const [isopen, setIsopen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [foodChoice, setFoodChoice] = useState("Italian");
  const [getRating, setRating] = useState();

  useEffect(() => {
    getData();
  }, [localData]);

  const getData = () => {
    let localDB = JSON.parse(localStorage.getItem("food"));
    setLocalData(localDB);
  };

  //handleCheck
  const handleCheck = (e) => {
    if (checked.includes(e.target.value)) {
      let idx = checked.indexOf(e.target.value);
      checked.splice(idx, 1);

      return;
    } else {
      setChecked([...checked, e.target.value]);
    }
  };

  //DELETE
  const deleteData = (id) => {
    setLocalData(localData.splice(id, 1));
    localStorage.setItem("food", JSON.stringify(localData));
  };

  //UPDATE
  const handleUpdate = (id) => {
    let data = JSON.parse(localStorage.getItem("food"));
    data.splice(indexID, 1, newFormData);
    localStorage.setItem("food", JSON.stringify(data));
    setIsopen(false);
    alert("Data successfully Updated");
  };

  //EDIT
  const handleEdit = (value, index) => {
    setnewFormData({ ...value });
    setIsopen(true);
    setindexID(index);
    array.splice(0, 1, value);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Food Choice</th>
            <th>Ratings</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map start */}
          {localData.map((value, index) => {
            return (
              <tr>
                <td>{value.food}</td>
                <td>{value.rating}</td>
                <td>{value.city}</td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(value, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(index)}
                >
                  Delete
                </button>
              </tr>
            );
          })}
          {/* map end */}
        </tbody>
      </table>
      {/* MODAL START */}
      <Modal isOpen={isopen} style={customStyles}>
        <h2 style={{ textAlign: "center" }}>Update</h2>
        {array.map((value, index) => {
          return (
            <div className="form-group">
              <form>
                <label>
                  <b>Food: </b>
                </label>
                <br />
                <input
                  type="radio"
                  label="Italian"
                  checked={foodChoice === "Italian"}
                  value={foodChoice}
                  onClick={() => setFoodChoice("Italian")}
                />
                Italian
                <br />
                <input
                  type="radio"
                  label="Chinese"
                  checked={foodChoice === "Chinese"}
                  value={foodChoice}
                  onClick={() => setFoodChoice("Chinese")}
                />
                Chinese
                <br />
                <br />
                <label>
                  <b>Ratings: </b>
                </label>
                <br />
                <select onChange={(e) => setRating(e.target.value)}>
                  <option>5 stars</option>
                  <option>4 stars</option>
                  <option>3 stars</option>
                </select>
                <br />
                <br />
                <div>
                  <b>City: </b>
                  <br />
                  <label>Chandigarh</label>
                  <input
                    type="checkbox"
                    name="city"
                    value="chandigarh"
                    onChange={handleCheck}
                  />
                </div>
                <div>
                  <label>Panchkula</label>
                  <input
                    type="checkbox"
                    name="city"
                    value="panchkula"
                    onChange={handleCheck}
                  />
                </div>
                <div>
                  <label>Mohali</label>
                  <input
                    type="checkbox"
                    name="city"
                    value="mohali"
                    onChange={handleCheck}
                  />
                </div>
                <br />
                <br />
                <button className="btn btn-info" onClick={() => handleUpdate()}>
                  Update
                </button>
              </form>
              <br />
            </div>
          );
        })}
      </Modal>
      {/* MODAL END */}
    </div>
  );
}

export default UserTable;
