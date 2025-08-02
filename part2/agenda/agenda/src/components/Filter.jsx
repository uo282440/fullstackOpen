const Filter = ({handler}) => {

    return (
        <>
            <div>
                Filter by name:  <input onChange={handler}/>
            </div>
        </>
    )
}

export default Filter