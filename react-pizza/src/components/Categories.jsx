import React from "react";

export const  Categories = ({value, onClickCategory, categories}) => {
  
  return (
    <div className="categories">
      <ul>
        {categories.map((nameCategories, index)=>
          <li key={index} className={value === index ? "active" : ""} onClick={()=> onClickCategory(index)} >{nameCategories}</li>
        )}
      </ul>
    </div>
  );
}