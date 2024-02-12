import { useState, useRef, useEffect } from 'react'

function Input({ onAdd }) {
  const inputRef = useRef(null);

  function handleClick() {
    if (inputRef.current.value.trim() !== "") {
      onAdd(inputRef.current.value);
      inputRef.current.value = "";
    }
  }

  return (
    <>
      <input ref={inputRef} className='input' type="text" placeholder="Qoshish uchun so'z yoki gap kiriting" />
      <button className='add' onClick={handleClick}>Todo add</button>
    </>
  )
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
    setData(prevData => [...prevData, newItem]);
  }

  return (
    <>
      <div className="container">
        <div className="container-image">
          <div className="hero">
            <Input onAdd={handleAdd} />
            <ul>
              {
                data.map((el, index) => {
                  return (
                    <li key={index}>{el}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
