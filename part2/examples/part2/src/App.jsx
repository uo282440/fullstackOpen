import Note from './components/Note'
import Course from './components/Course'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(    'a new note...'  )
  const [showAll, setShowAll] = useState(true)

  /*
  useEffect( () => { 

    console.log('effect')    
    axios
      .get('http://localhost:3001/notes')

      .then(response => { 
        console.log('promise fulfilled')        
        setNotes(response.data)      
      })
      
  }, [])  
        
  console.log('render', notes.length, 'notes')*/

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
  

  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  const handleNoteChange = (event) => {       
    setNewNote(event.target.value)  
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleShowAllButton = () => {
    setShowAll(!showAll)
  }

  return (
    <div>

      <h1>Notes</h1>

      <div>
        <button onClick={handleShowAllButton}>
          show {showAll ? 'important' : 'all'} notes
        </button>
      </div>

      <h2>showing {showAll ? 'all' : 'important'} notes</h2>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>

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