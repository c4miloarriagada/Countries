import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountryByName } from '../actions/index'


export default function Nav() {


    const [name, setName] = useState('')
    const dispatch = useDispatch()



    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getCountryByName(name))
        setName('')

    }

    return (
        <form onSubmit={e => handleOnSubmit(e)}>

            <div>
                <input
                    type='text'
                    placeholder='Find your country'
                    onChange={e => handleInputChange(e)}
                />
                <button type='submit'> Search 🔍</button>
            </div>

        </form>
    )
}
