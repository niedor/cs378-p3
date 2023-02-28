import React, {useState, useEffect} from "react";
import './App.css';

function Button({date, url, setDisplayData, setHeader, setSearchDisplayData}) {
  async function handleClick(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setSearchDisplayData('');
      setDisplayData(json);
      setHeader(date);
      console.log(json);

    } catch (e) {
      console.log("There was an error: " + e);
    }
  }
  
  return (
    <button
      onClick={() => handleClick(url)}
    >
      {date}
    </button>
  )
}


function App() {
  const [displayData, setDisplayData] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchDisplayData, setSearchDisplayData] = useState('');
  const [hide, setHide] = useState(new Array(18).fill(false));
  const [header, setHeader] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadDefaultPage();
  }, []);

  async function loadDefaultPage() {
    try {
      const url = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6';
      const response = await fetch(url);
      const json = await response.json();
      setHeader('Latest');
      setDisplayData(json);

    } catch (e) {
      console.log("Error: " + e);
    }
  }

  function handleCollapsible(index) {
    setHide((pHide) => pHide.map((o, i) => {
      if (i === index) return !o;
      return o;
    }));
  }

  async function loadSearchDisplayData(e) {
    e.preventDefault();

    try {
      setError('');
      setDisplayData('');
      let search_url = `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${searchDate}&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6`
      const response = await fetch(search_url);
      const json = await response.json();

      if (json.status == "OK") {
        setSearchDisplayData(json);
        setHeader(searchDate);
        console.log(json);
      } else {
        setHeader('');
        setError("Please submit a valid date!")
      }

    } catch (e) {
      console.log("Error: " + e);
      setHeader('');
      setError("Please submit a valid date!")
    }
  }

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  }

  return (
    <div className="App">
      <h1>Look! BOOKS</h1>

      <form onSubmit={loadSearchDisplayData}>
        <p className='error'>{error}</p>
        <input className='search' type="text" placeholder="Search by date (YYYY-MM-DD)" value={searchDate} onChange={handleSearchDate} />
        <button className='submit' type='submit'>
          Go!
        </button>
      </form>

      <p>Need a starting point? </p>
      <p>Look through these most recent New York Time's Best Sellers by week:</p>
      <div>
        <Button date='Latest' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData} setHeader={setHeader} setSearchDisplayData={setSearchDisplayData}/>
        <Button date='Feb 11' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-26&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData} setHeader={setHeader} setSearchDisplayData={setSearchDisplayData}/>
        <Button date='Feb 4' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-19&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData} setHeader={setHeader} setSearchDisplayData={setSearchDisplayData}/>
        <Button date='Jan 28' url='https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2023-02-12&api-key=z3irrlRzdl2CBdcwjRSK7dA96whVEOS6' setDisplayData={setDisplayData} setHeader={setHeader} setSearchDisplayData={setSearchDisplayData}/>
      </div>

      <h1 className='header'>{header}</h1>
      
      {searchDisplayData && !error ? (searchDisplayData.results.lists.map((list, listIndex) => {
        return (
          <div>
            <button className='list-name' onClick={() => handleCollapsible(listIndex)} key={listIndex}>{list.list_name}</button>
            {hide[listIndex] && list.books.map((book, index) => (
              <p className='book-name' key={"book " + index}>{book.title}, {book.author}</p>
            ))}
          </div>
        );
      })) : ''}
      
      
      {displayData ? (displayData.results.lists.map((list, listIndex) => {
        return (
          <div>
            <button className='list-name' onClick={() => handleCollapsible(listIndex)} key={listIndex}>{list.list_name}</button>
            {hide[listIndex] && list.books.map((book, index) => (
              <p className='book-name' key={index}>{book.title}, {book.author}</p>
            ))}
          </div>
        );
      })) 
        : ''}

    </div>
  );
}

export default App;
