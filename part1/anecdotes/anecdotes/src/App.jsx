import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const [selected, setSelected] = useState(0)

  const nextAnecdoteHandler = () => {
    let newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newIndex)
  }

  const voteHandler = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }


  return (
    <>

      <h1>Anecdote Of the Day</h1>

      <div>
        {anecdotes[selected]}
      </div>

      <div>
        <p>This anecdote has {votes[selected]} votes</p>
      </div>

      <button onClick={nextAnecdoteHandler}>New Anecdote</button>

      <button onClick={voteHandler}>vote</button>

      <h2>Anecdote With the most votes</h2>

      <MostPopularAnecdote votes={votes} anecdotes={anecdotes}></MostPopularAnecdote>
    </>
  )
}

const MostPopularAnecdote = ({votes, anecdotes}) => {
  let max = 0;
  let anecdoteIndex;

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > max){
      max = votes[i]
      anecdoteIndex = i
    }
  }

  return (
    <>
    <div>
      {anecdotes[anecdoteIndex]}
    </div>
    </>
  )

}

export default App