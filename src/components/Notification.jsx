const Notification = ({ message, successMessage }) => {
  if (message === null && successMessage === null) {
    return null
  }

  // let  error
  // let success
  // if(message){
  //   error = (<div className='error'> {message} </div>)
  // }
  
  // if(successMessage){
  //   success = (<div className='success'> {successMessage} </div>)
  // }

  return (
    <>
      { message && (<div className='error'> {message}</div>)}
      { successMessage && (<div className='success'> {successMessage}</div>)}

      {/* <div className='error'>
        {message}
      </div> */}

      {/* {error} */}
      {/* {success} */}
    </>
  )
}
export default Notification