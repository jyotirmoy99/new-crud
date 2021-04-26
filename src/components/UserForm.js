import React, { useState } from "react";

function UserForm(props) {
  const [foodData, setFoodData] = useState({
    food: "",
    ratings: "",
    city: [],
  });

  //handleCity
  const handleCity = (e) => {
    if (foodData.city.includes(e.target.value)) {
      let index = foodData.city.indexOf(e.target.value);
      foodData.city.splice(index, 1);
    } else {
      foodData.city.push(e.target.value);
    }
  };

  //handleRating
  const handleRating = (e) => {
    setFoodData({ ...foodData, ratings: e.target.value });
  };

  //handleFood
  const handleFood = (e) => {
    setFoodData({ ...foodData, food: e.target.value });
  };

  //submit button
  const handleSubmit = () => {
    let foodArray = [];
    let localData = JSON.parse(localStorage.getItem("food"));
    if (localData === null) {
      foodArray.push(foodData);
      localStorage.setItem("food", JSON.stringify(foodArray));
    } else {
      localData.push(foodData);
      localStorage.setItem("food", JSON.stringify(localData));
    }
    alert("Item added successfully", props.history.push("/view"));
  };
  return (
    <div>
      <h1>Choice of Food</h1>
      <form>
        <label>
          <b>Food: </b>
        </label>
        <br />
        <input
          type="radio"
          id="italian"
          name="food"
          checked={foodData.food === "Italian"}
          value="Italian"
          onChange={handleFood}
        />
        <label htmlFor="italian">Italian</label>
        <br />
        <input
          type="radio"
          id="chinese"
          name="food"
          checked={foodData.food === "Chinese"}
          value="Chinese"
          onChange={handleFood}
        />
        <label htmlFor="chinese">Chinese</label>
        <br />
        <br />
        <label>
          <b>Ratings: </b>
        </label>
        <br />
        <select onChange={handleRating}>
          <option className="font-weight-bold">STARS</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
        </select>
        <br />
        <br />
        <div>
          <b>City: </b>
          <br />
          <input
            type="checkbox"
            name="city"
            value="Chandigarh"
            id="chd"
            onChange={handleCity}
          />
          <label htmlFor="chd">Chandigarh</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="city"
            value="Panchkula"
            id="pchk"
            onChange={handleCity}
          />
          <label htmlFor="pchk">Panchkula</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="city"
            value="Mohali"
            id="mohali"
            onChange={handleCity}
          />
          <label htmlFor="mohali">Mohali</label>
        </div>
        <br />
        <br />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
