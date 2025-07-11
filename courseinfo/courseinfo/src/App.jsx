const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />
      
      <Content parts={course.parts}  />
      
      <Total total={course.parts}/>
    </div>
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