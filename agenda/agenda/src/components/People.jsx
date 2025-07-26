import Person from './Person'

const People = ({peopleToShow, buttonHandler}) => {

    return(
        <>
            <ul>
                {peopleToShow.map( person => 
                   <Person key={person.id} person={person} handler={buttonHandler}/>
                )}
            </ul>
        </>
    )
}

export default People