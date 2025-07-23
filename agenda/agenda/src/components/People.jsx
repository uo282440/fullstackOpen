import Person from './Person'

const People = ({peopleToShow}) => {

    return(
        <>
            <ul>
                {peopleToShow.map( person => 
                   <Person key={person.id} person={person}/>
                )}
            </ul>
        </>
    )
}

export default People