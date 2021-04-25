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
  const [selectedData, setSelectedData] = useState([]);
  const [formData, setFormData] = useState({
    food: "",
    ratings: "",
    city: [],
  });

  //modal
  const [isopen, setIsopen] = useState(false);

  useEffect(() => {
    getData();
  }, [localData, formData]);

  const getData = () => {
    let localDB = JSON.parse(localStorage.getItem("food"));
    setLocalData(localDB);
  };

  //handleCity
  // const handleCity = (e) => {
  //   if (formData.city.includes(e.target.value)) {
  //     let index = formData.city.indexOf(e.target.value);
  //     formData.city.splice(index, 1);
  //   } else {
  //     formData.city.push(e.target.value);
  //   }
  // };

  //handleRating
  const handleRating = (e) => {
    setFormData({ ...formData, ratings: e.target.value });
  };

  //handleFood
  const handleFood = (e) => {
    setFormData({ ...formData, food: e.target.value });
  };

  //DELETE
  const deleteData = (id) => {
    setLocalData(localData.splice(id, 1));
    localStorage.setItem("food", JSON.stringify(localData));
  };

  //UPDATE
  const handleUpdate = (idx) => {
    let data = JSON.parse(localStorage.getItem("food"));
    data.splice(idx, 1, formData);
    localStorage.setItem("food", JSON.stringify(data));
    setIsopen(false);
    alert("Data successfully Updated");
  };

  //EDIT
  const handleEdit = (index) => {
    setIsopen(true);
    let filteredData = localData.filter((data) => data)[index];
    selectedData.push(filteredData);
    console.log(selectedData);
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
                <td>{value.ratings}</td>
                <td>
                  {value.city.map((c) => {
                    return <p>{c}</p>;
                  })}
                </td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(index)}
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
        {selectedData.map((value, index) => {
          return (
            <div className="form-group" key={index}>
              <form>
                <b>Food: </b>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.food === "Italian"}
                  defaultValue={value.food}
                  onChange={handleFood}
                  id="Italian"
                  name="food"
                />
                <label htmlFor="Italian">Italian</label>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.food === "Chinese"}
                  defaultValue={value.food}
                  onChange={handleFood}
                  id="Chinese"
                  name="food"
                />
                <label htmlFor="Italian">Chinese</label>
                <br />
                <br />
                <label>
                  <b>Ratings: </b>
                </label>
                <br />
                <select onChange={handleRating} defaultValue={value.ratings}>
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                </select>
                <br />
                <br />
                <b>City: </b>
                {value.city.map((c) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="chd"
                        // defaultValue={c}
                        defaultChecked={c === "Chandigarh"}
                        // onChange={handleCity}
                      />
                      <label htmlFor="chd">Chandigarh</label>
                      <input
                        type="checkbox"
                        id="mohali"
                        // defaultValue={c}
                        defaultChecked={c === "Mohali"}
                        // onChange={handleCity}
                      />
                      <label htmlFor="mohali">Mohali</label>
                      <input
                        type="checkbox"
                        id="pchk"
                        // defaultValue={c}
                        defaultChecked={c === "Panchkula"}
                        // onChange={handleCity}
                      />
                      <label htmlFor="pchk">Panchkula</label>
                    </div>
                  );
                })}

                <br />
                <br />
                <button
                  className="btn btn-info"
                  onClick={() => handleUpdate(index, value)}
                >
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
