import React, { useState, useEffect } from "react";

let nextId = 0;
function App() {
  const [inputText, setInputText] = useState("");
  const [itemList, setItemList] = useState([]);
  const [line, setLine] = useState(false);
  const [effect, setEffect] = useState(false);
  useEffect(()=> {
      const items = JSON.parse(localStorage.getItem('itemList'));
      
      if(items ){
        console.log(items);
        setItemList(items);
        
      }
  }, [])
  useEffect(() => {
    if(itemList.length === 0){
      null
    }else{
      localStorage.setItem('itemList', JSON.stringify(itemList));
    }
    console.log(localStorage);
  }, [effect])
  
  function handleClick(event) {
    setItemList((prevValue) => {
      return [...prevValue,   inputText ];
    });
    setInputText("");
    setEffect((val) => {
      return !val
    });
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleLine(event){
    if(event.target.style.textDecoration){
      event.target.style.removeProperty('text-decoration');
    }else{
      event.target.style.setProperty('text-decoration','line-through');
    }
    
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onKeyDown={(e)=>{
          if(e.key==="Enter"){
            if(inputText.length>0){
              handleClick()
            }
          }
        }} value={inputText} onChange={handleChange} type="text" />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemList.map((item,index) => (
            <li  key={index} onClick={handleLine}>
              {item}
              {/* <button 
                style={{ float: "right" }}
                onClick={() => {
                  setItemList(itemList.filter((a) => a.index !== index));
                  // localStorage.removeItem('itemList');
                }}
              >
                🗑
              </button> */}
            </li>
          ))}
        </ul>
        <button 
                style={{ float: "right" }}
                onClick={() => {
                  // setItemList(itemList.filter((a) => a.index !== index));
                  setItemList([]);
                  localStorage.removeItem('itemList');
                }}
              >
                🗑
              </button>
      </div>
    </div>
  );
}

export default App;
