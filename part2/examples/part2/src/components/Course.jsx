import Part from './Part'
import Total from './Total'

const Course = ({course}) => {

    return (
        <>
            <h2>Course name: {course.name}</h2>
            <h3>Content</h3>

            <ul>
                {course.parts.map(
                    part =>
                        <Part key={part.id} part={part}></Part>
                )}

            </ul>

            <Total parts={course.parts}></Total>
        </>
    )

}

export default Course
