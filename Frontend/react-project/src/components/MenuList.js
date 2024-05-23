import React from "react";

function MenuList({ image, name, price }) {
  return (
    <div className="menuList">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> ${price} </p>
    </div>
  );
}

export default MenuList;