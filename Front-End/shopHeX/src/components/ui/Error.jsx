import React from 'react'

const Error = ({error}) => {
  return (
   
<div className="alert alert-danger my-5" role="alert">
  {error} {/* replaced A Simple danger alert-check it out! with a prop  from boostrap */}
</div>
    
  )
}

export default Error