import { useState, useRef, useEffect } from 'react';

function Input({ onAdd }) {
  const inputRef = useRef(null);

  function handleClick() {
    if (inputRef.current.value.trim() !== "") {
      onAdd(inputRef.current.value);
      inputRef.current.value = "";
    } else {
      alert("Bo'sh qatorni qo'shish mumkin emas!");
    }
  }

  return (
    <>
      <input ref={inputRef} className='input' type="text" placeholder="Qoshish uchun so'z yoki gap kiriting" />
      <button className='add' onClick={handleClick}>Todo add</button>
    </>
  );
}

function App() {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  function handleAdd(newItem) {
    if (data.length < 11) {
      setData(prevData => [...prevData, newItem]);
    } else {
      alert("Siz maksimum 11 ta ma'lumot qo'shishingiz mumkin.");
    }
  }

  function handleDelete(index) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  return (
    <>
      <div className="container">
        <div className="container-image">
          <div className="hero">
            <Input onAdd={handleAdd} />
            <ul>
              {
                data.map((el, index) => (
                  <li key={index}>
                    {el}
                    <img className='delete' src="./delete.svg" alt="delete" onClick={() => handleDelete(index)} />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
