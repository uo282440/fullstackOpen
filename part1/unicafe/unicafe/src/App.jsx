import { useState } from 'react'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodButtonHandler = () => {
    let newGood = good + 1
    setGood(newGood)
    setTotal(newGood + bad + neutral)
  }

  const neutralButtonHandler = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + bad + newNeutral)
  }

  const badButtonHandler = () => {
    let newBad = bad + 1
    setBad(newBad)
    setTotal(good + newBad + neutral)
  }

  return (
    <div>

      <h1>Give Feedback</h1>
      <CustomButton handler={goodButtonHandler} text="good"></CustomButton>
      <CustomButton handler={neutralButtonHandler} text="neutral"></CustomButton>
      <CustomButton handler={badButtonHandler} text="bad"></CustomButton>

      <h2>Statistics</h2>

      <Statistics total={total} good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}

const Statistics = ({total, good, neutral, bad}) => {
  if (total == 0) {
    return (<p>No feedback given yet</p>)

  } else {

    return (
      <>
        <table>
          
          <tbody>
            <CustomStatistic text="good" quantity={good}></CustomStatistic>
            <CustomStatistic text="neutral" quantity={neutral}></CustomStatistic>
            <CustomStatistic text="bad" quantity={bad}></CustomStatistic>

            <CustomStatistic text="total" quantity={total}></CustomStatistic>
            <CustomStatistic text="average" quantity={ ( (1*good) + (-1*bad) ) / total }></CustomStatistic>
            <CustomStatistic text="positive" quantity={ (1*good) / total * 100 }></CustomStatistic>
          </tbody>
          
        </table>
      </>
    )
  }

}

const CustomButton = ({handler, text}) => {

  return (
    <>
      <button onClick={handler}>{text}</button>
    </>
  )
}

const CustomStatistic = ({text, quantity}) => {
    return (
      <tr>
        <td>{text} </td>
        <td>{quantity} </td>
      </tr>
    )
}

export default App