import React, { useState } from "react";

function UserForm(props) {
  const [foodChoice, setFoodChoice] = useState("Italian");
  const [getRating, setRating] = useState();
  const [checked, setChecked] = useState([]);

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

  console.log(checked);

  //submit button
  const handleSubmit = () => {
    let food = [];
    let foodData = JSON.parse(localStorage.getItem("food"));
    if (foodData === null) {
      let obj = {};
      obj["food"] = foodChoice;
      obj["rating"] = getRating;
      obj["city"] = checked;
      food.push(obj);
      localStorage.setItem("food", JSON.stringify(food));
    } else {
      let obj = {};
      obj["food"] = foodChoice;
      obj["rating"] = getRating;
      obj["city"] = checked;
      foodData.push(obj);
      localStorage.setItem("food", JSON.stringify(foodData));
    }
    props.history.push("/view");
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
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
