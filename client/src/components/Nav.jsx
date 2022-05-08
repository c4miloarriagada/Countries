import { React, useState } from 'react'
//import { useDispatch } from 'react-redux'
//import { getCountryByName } from '../actions/index'


export default function Nav({onSearch}) {


    const [name, setName] = useState('')
    //const dispatch = useDispatch()



    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        onSearch(name)
    }
  /*  function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getCountryByName(name))
        setName('')

   }*/

    return (
        <form onSubmit={e => handleOnSubmit(e)}>

            <div>
                <input
                    type='text'
                    placeholder='Find your country'
                    value={name}
                    onChange={handleInputChange}
                />
                <button type='submit'> Search 🔍</button>
            </div>

        </form>
    )
}
