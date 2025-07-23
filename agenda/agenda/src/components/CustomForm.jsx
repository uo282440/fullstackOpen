const CustomForm = ({formHandler, nameHnadler, numberHandler}) => {

    return (
        <>  
            <form onSubmit={formHandler}>

                    <div>
                    name:  <input onChange={nameHnadler}/>
                    <br/>
                    number:  <input onChange={numberHandler}/>
                    </div>

                    <div>
                        <button type="submit">add</button>
                    </div>

            </form>

        </>
    )
}

export default CustomForm