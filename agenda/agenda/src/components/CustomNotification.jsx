

const CustomNotification = ({ message }) => {

  if (message === null) {
    return (
        <>
        </>
    )
  } else {

    const notificationStyle = {    
        color: 'green',
        background: 'lightgrey',
        fontsize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px' 
    } 

    return (
        <div style={notificationStyle}>
        {message}
        </div>
    )
  }

}


export default CustomNotification