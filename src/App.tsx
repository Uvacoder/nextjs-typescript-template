import "./App.css";

function App() {
  const fetchBook = () => {
    fetch("https://www.anapioficeandfire.com/api/books/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <button onClick={fetchBook}>fetch book</button>
    </div>
  );
}

export default App;
