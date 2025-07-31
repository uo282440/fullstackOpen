import Note from './components/Note'
import Course from './components/Course'
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(    'a new note...'  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    noteService      
      .getAll()      
      .then(initialNotes => { 
        setNotes(initialNotes) 
      })
  }

  useEffect(hook, [])
  

  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  const handleNoteChange = (event) => {       
    setNewNote(event.target.value)  
  }

  const toggleImportanceOf = id => {

    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService      
      .update(id, changedNote)      
      .then(returnedNote => { 
        setNotes(notes.map(note => note.id !== id ? note : returnedNote)) 
      })
      .catch(error => {      
        //alert(`the note '${note.content}' was already deleted from server`) 
        setErrorMessage(`Note '${note.content}' was already removed from server`)        
        setTimeout(() => {setErrorMessage(null)}, 5000)   
          
        setNotes(notes.filter(n => n.id !== id))    
      })

  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
      //id: notes.length + 1, los genera automaticamente el server
    }
  
    noteService      
      .create(noteObject)      
      .then(returnedNote => { 
        setNotes(notes.concat(returnedNote))        
        setNewNote('')      
      })
    
  }

  const handleShowAllButton = () => {
    setShowAll(!showAll)
  }

  return (
    <div>

      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <div>
        <button onClick={handleShowAllButton}>
          show {showAll ? 'important' : 'all'} notes
        </button>
      </div>

      <h2>showing {showAll ? 'all' : 'important'} notes</h2>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>

      <form onSubmit={addNote}>
        
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>


      <Footer />
    </div>
  )

  /*
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  
  return (
    <>
      <h1>Cursos</h1>
      <ul>
        {
          courses.map(course => <Course key={course.id} course={course}/>)
        }
      </ul>
     
      
    </>
  )
  */

}

export default App