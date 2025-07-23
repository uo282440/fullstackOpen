import { useState } from 'react'
import Filter from './components/Filter'
import CustomForm from './components/CustomForm'
import People from './components/People'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: '985 76 84 56',
      id: 1
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')

  

  const peopleToShow = nameToFilter === '' ? persons : persons.filter(
    person => person.name.toLowerCase().startsWith(nameToFilter.toLowerCase())
  )
  
  //LO DEJAMOS EN 2C OBTENIENDO DATOS DEL SERVIDOR

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