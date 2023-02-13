import React from 'react'
type Props={
    children:React.ReactElement,
    isLoading:boolean,
    isError:boolean,
    error:Error
}
const IsLoading = ({ children, isLoading, isError, error }:Props) => {
  return (
    <>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">{error.message}</p>
      )}
      {!isLoading && !isError && ( children )} 
    </>
    )
}

export default IsLoading;