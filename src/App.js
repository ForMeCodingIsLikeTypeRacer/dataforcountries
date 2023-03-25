import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (country) {
      axios
        .get('https://restcountries.com/v3.1/independent?status=true')
        .then(response => {
          const listofCountries = response.data;
          const commonNames = listofCountries.map(oneCountry => oneCountry.name.common);
          setCountries(commonNames);
        })
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const onSearch = (event) => {
    event.preventDefault();
    // console.log(filteredCountries.length);
    setCountry(value);
  }

  const filteredCountries = countries.filter(singlecountry =>
    singlecountry.toLowerCase().includes(value.toLowerCase())
  );

  function IsNotTenOrLess() {
    return <div>Too many matches, specify another filter</div>
  }

  function IsTenOrLess() {
    return <ul style={{listStyle: 'none', padding: 0, margin: 0} }>
            {
              filteredCountries.map(singlecountry => 
                <li key={singlecountry}>{singlecountry}</li>
              )
            }
          </ul>
  }

  function IsExactlyOne() {
    return (
      <div>
        <h1>{filteredCountries}</h1>
        <div>{filteredCountries.}</div>
      </div>
    )
  }

  function TenOrLess() {
    if(filteredCountries.length > 10 || value === '') {
      return <IsNotTenOrLess />
    } else if(filteredCountries.length <=10 && filteredCountries.length > 1) {
      return <IsTenOrLess />
    } else if(filteredCountries.length === 1){
      return <IsExactlyOne />
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <form onChange={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <div>
        <TenOrLess />
      </div>
      
    </div>
  );
}

export default App;
