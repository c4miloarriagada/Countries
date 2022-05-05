import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
            <Link to='/'>
        <button>
            Go Home 
        </button>
            </Link>
        <h1>404 Not Found</h1>
        <h3>Houston Nothing to do here 🚀</h3>
        </div>
  )
}

export default NotFound