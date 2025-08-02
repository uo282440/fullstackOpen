const Person = ({person, handler}) => {
    return (
        <>
            <li key={person.id}> {person.name}, {person.number}, <button onClick={() => handler(person.id)}>Delete</button> </li> 
        </>
    )
}

export default Person