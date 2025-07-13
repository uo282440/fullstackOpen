
import { useState } from 'react'


const App = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)  
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)  
  }

  return (
    <div>

      {left}

      <CustomButton onClick={handleLeftClick} title="left"></CustomButton>

      <CustomButton onClick={handleRightClick} title="right"></CustomButton>

      {right}

      <History allClicks={allClicks}></History>

      <p>total {total}</p>    
      
    </div>
  )
}

const History = (props) => {  
  if (props.allClicks.length === 0) {    
    return (      
      <div>        the app is used by pressing the buttons      </div>    
    )  
  }  
  
  return (    <div>      button press history: {props.allClicks.join(' ')}    </div>  )
}

const CustomButton = ({onClick, title}) => {
  return (
    <>
      <button onClick={onClick}>{title}</button>
    </>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part p={props.parts[0]} />
      
      <Part p={props.parts[1]} />
      
      <Part p={props.parts[2]} />
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.p.name} {props.p.exercises}
      </p>
    </>
  )
}

export default App