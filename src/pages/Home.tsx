export default function Home() {
  const fetchBook = () => {
    fetch("https://www.anapioficeandfire.com/api/books/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <button onClick={fetchBook}>fetch book</button>
    </>
  );
}
