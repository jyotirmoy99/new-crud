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
  const [idx, setIdx] = useState(null);
  const [localData, setLocalData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [formData, setFormData] = useState({
    food: "",
    ratings: "5",
    city: [],
  });

  //modal
  const [isopen, setIsopen] = useState(false);

  useEffect(() => {
    getData();
  }, [localData]);

  const getData = () => {
    let localDB = JSON.parse(localStorage.getItem("food"));
    setLocalData(localDB);
  };

  const cities = ["Mohali", "Chandigarh", "Panchkula"];

  //handleCity
  const handleCity = (e) => {
    if (formData.city.includes(e.target.value)) {
      let idx = formData.city.indexOf(e.target.value);
      formData.city.splice(idx, 1);
      return;
    } else {
      formData.city.push(e.target.value);
    }
  };

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

  //EDIT
  const handleEdit = (value, index) => {
    setFormData({ ...value });
    setIsopen(true);
    setIdx(index);
    selectedData.splice(0, 1, value);
  };

  //UPDATE
  const handleUpdate = (id) => {
    let data = JSON.parse(localStorage.getItem("food"));
    data.splice(idx, 1, formData);
    localStorage.setItem("food", JSON.stringify(data));
    setIsopen(false);
    alert("Data successfully Updated");
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
        {selectedData.map((value, index) => {
          return (
            <div className="form-group" key={index}>
              <form>
                <b>Food: </b>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.food === "Italian"}
                  value="Italian"
                  onChange={handleFood}
                  id="italian"
                  name="food"
                />
                <label htmlFor="italian">Italian</label>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.food === "Chinese"}
                  value="Chinese"
                  onChange={handleFood}
                  id="chinese"
                  name="food"
                />
                <label htmlFor="chinese">Chinese</label>
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
                {/* <input
                  type="checkbox"
                  id="chd"
                  value="Chandigarh"
                  defaultChecked={value.city === "Chandigarh"}
                  onChange={handleCity}
                />
                <label htmlFor="chd">Chandigarh</label>
                <input
                  type="checkbox"
                  id="mohali"
                  value="Mohali"
                  defaultChecked={value.city === "Mohali"}
                  onChange={handleCity}
                />
                <label htmlFor="mohali">Mohali</label>
                <input
                  type="checkbox"
                  id="pchk"
                  value="Panchkula"
                  defaultChecked={value.city === "Panchkula"}
                  onChange={handleCity}
                />
                <label htmlFor="pchk">Panchkula</label> */}
                {/* {value.city.map((c, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id="chd"
                        value="Chandigarh"
                        defaultChecked={c === "Chandigarh"}
                        onChange={handleCity}
                      ></input>
                      <label htmlFor="chd">Chandigarh</label>
                      <input
                        type="checkbox"
                        id="mohali"
                        value="Mohali"
                        defaultChecked={c === "Mohali"}
                        onChange={handleCity}
                      ></input>
                      <label htmlFor="mohali">Mohali</label>
                      <input
                        type="checkbox"
                        id="pchk"
                        value="Panchkula"
                        defaultChecked={c === "Panchkula"}
                        onChange={handleCity}
                      ></input>
                      <label htmlFor="pchk">Panchkula</label>
                    </div>
                  );
                })} */}
                {cities.map((city, key) => (
                  <div>
                    <span>
                      <label key={key}>{city}:</label>
                      <input
                        type="checkbox"
                        value={city}
                        defaultChecked={value.city.includes(city)}
                        onChange={handleCity}
                      />
                    </span>
                  </div>
                ))}

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
