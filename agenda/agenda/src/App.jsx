import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CustomForm from './components/CustomForm'
import People from './components/People'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then( response =>
      setPersons(response.data)
    )
  }

  useEffect(hook,[])
  

  const peopleToShow = nameToFilter === '' ? persons : persons.filter(
    person => person.name.toLowerCase().startsWith(nameToFilter.toLowerCase())
  )
  

  //controllers

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterByName = (event) => {
    setNameToFilter(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const nameAlreadyExists = persons.some(person => person.name === newName)

    if (!nameAlreadyExists) {

      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
  
      }
  
      setPersons(persons.concat(newPerson))

    } else {
      alert(`${newName} IS ALREADY IN THE PHONE BOOK`)
    }

    
  }



  //whats shown on the web page

  return (

    <div>

      <h2>Phonebook</h2>

      <CustomForm formHandler={handleFormSubmit} nameHnadler={handleNameInputChange} numberHandler={handleNumberInputChange}/>

      <h2>Numbers</h2>

      <Filter handler={handleFilterByName}></Filter>
      
      <People peopleToShow={peopleToShow}/>

    </div>
  )
}

export default App