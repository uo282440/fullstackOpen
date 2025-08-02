const Country = ({data}) => {

    if (data !== null) {
        const languages = data.languages
        return (
            <>
                <h3>{data.name.official}</h3>

                <p>Capital: {data.capital}</p>
                <br/>
                <p>Area: {data.area}</p>

                <h4>Laguages</h4>
                <ul>
                    {Object.values(data.languages).map( (lang, index) => 
                        <li key={index}>{lang}</li>
                    )}
                </ul>
                
                <h4>Flag</h4>
                <img src={data.flags.png}></img>


            </>
        )
    }
    
}


export default Country