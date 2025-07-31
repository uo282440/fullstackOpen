import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CustomForm from './components/CustomForm'
import People from './components/People'
import peopleService from './services/people'
import CustomNotification from './components/CustomNotification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    peopleService
    .getAll()
    .then( people => {
      setPersons(people)
    })
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

  const handleDeleteButton = (id) => {

    const confirmation = window.confirm(`Are you sure you want to delete this user?`)

    if (confirmation) {
        peopleService
          .deletePerson(id)
          .then( () => {
            setPersons(persons.filter(p => p.id !== id))
          })
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const nameAlreadyExists = persons.some(person => person.name === newName)

    if (!nameAlreadyExists) {

      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      peopleService
        .create(newPerson)
        .then(insertedPerson => {
          setPersons(persons.concat(insertedPerson))
        })

      setNotification(`${newPerson.name} has been added to the phonebook.`)
      setTimeout(() => {setNotification(null)}, 5000)

    } else {
      //alert(`${newName} is already in the phonebook. Would you like to replace the number?`)
      const confirmed = window.confirm(`${newName} is already in the phonebook. Would you like to replace the number?`)

      if (confirmed) {
        
        let targetPerson = persons.find(p => p.name === newName)

        const newPerson = {
          name: newName,
          number: newNumber
        }

        peopleService
          .update(targetPerson.id, newPerson)
          .then(
            setPersons(persons.map( person => person.id !== targetPerson.id ? person : newPerson))
          )

      } else {
        // El usuario hizo click en "Cancelar"
      }

    }
  }



  //whats shown on the web page

  return (

    <div>

      <h2>Phonebook</h2>

      <CustomNotification message={notification}/>

      <CustomForm formHandler={handleFormSubmit} nameHnadler={handleNameInputChange} numberHandler={handleNumberInputChange}/>

      <h2>Numbers</h2>

      <Filter handler={handleFilterByName}></Filter>
      
      <People peopleToShow={peopleToShow} buttonHandler={handleDeleteButton}/>

    </div>
  )
}

export default App