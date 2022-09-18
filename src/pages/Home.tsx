import { getBookById } from "../services/book.service";

export default function Home() {
  const fetchBook = () => {
    getBookById(1).then((data) => console.log(data));
  };

  return (
    <>
      <button onClick={fetchBook}>fetch book</button>
    </>
  );
}
