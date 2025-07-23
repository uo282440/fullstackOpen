

const Total = ({parts}) => {

    const totalExercises = parts.reduce( (sum, obj) => sum + obj.exercises, 0 );

    return (
        <>
            <p><b>Total number of exercises: </b>{totalExercises}</p>
        </>
    )
}

export default Total