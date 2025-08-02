import { useState,  useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

import './App.css'

function App() {

  const [country, setCountry] = useState(null)
  const [responseCountry, setResponseCountry] = useState(null)

  

  const handleInput = (event) => {
    setCountry(event.target.value)
  }

  const handleForm = (event) => {
    event.preventDefault()

    if (country) {
      console.log('fetching countries...')
      axios
        //.get(`https://open.er-api.com/v6/latest/${country}`) https://studies.cs.helsinki.fi/restcountries/api/name/finland
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setResponseCountry(response.data)
          //console.log(response.data)
        })
    }
  }

  return (
    <>
    <form onSubmit={handleForm}>
      Country: <input onChange={handleInput}></input>
      <button type="submit">search</button>
    </form>

    <Country data={responseCountry}></Country>
      
    </>
  )
}

export default App
