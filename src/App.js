import React, {useState} from "react";
import './App.css';

function Button({year, url, setDisplayData}) {
  async function handleClick(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setDisplayData(json);

    } catch (e) {
      console.log("There was an error: " + e);
    }
  }
  
  return (
    <button
      onClick={() => handleClick(url)}
    >
      {year}
    </button>
  )
}


function App() {
  const [displayData, setDisplayData] = useState('');
  const [hide, setHide] = useState(false);
  const [searchDate, setSearchDate] = useState('');
  const [searchDisplayData, setSearchDisplayData] = useState('');

  function handleCollapsible() {
    setHide(!hide);
  }

  async function loadSearchDisplayData() {
    try {
      let search_url = "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6"
      const response = await fetch(search_url);
      const json = await response.json();
      setSearchDisplayData(json);
      console.log("Search Display Data: " + json);

    } catch (e) {
      console.log("Error: " + e);
    }
  }

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  }

  return (
    <div className="App">
      <h1>Look! BOOKS</h1>

      <form>
        <input className='search' type="text" placeholder="Search by date (YYYY-MM-DD)" onChange={handleSearchDate} />
        <button className='submit' onClick={loadSearchDisplayData}>
          Go!
        </button>
      </form>

      <p>Need a starting point? </p>
      <p>Look through these most recent New York Time's Best Sellers by week:</p>
      <div>
        <Button year='Latest' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData}/>
        <Button year='Feb 18' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-27&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData}/>
        <Button year='Feb 11' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-26&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData}/>
        <Button year='Feb 4' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-19&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData}/>
      </div>
      
      {searchDisplayData ? (searchDisplayData.results.lists.map((list) => {
        return (
          <div>
            <button className='list-name' onClick={handleCollapsible} key={list.index}>{list.list_name}</button>
            {hide && list.books.map((book) => (
              <p className='book-name' key={book.index}>{book.title}, {book.author}</p>
            ))}
          </div>
        );
      })) : ''}
      
      
      {displayData ? (displayData.results.lists.map((list) => {
        return (
          <div>
            <button className='list-name' onClick={handleCollapsible} key={list.index}>{list.list_name}</button>
            {hide && list.books.map((book) => (
              <p className='book-name' key={book.index}>{book.title}, {book.author}</p>
            ))}
          </div>
        );
      })) 
        : ''}

    </div>
  );
}

export default App;
