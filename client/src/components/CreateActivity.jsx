import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../actions/index'


const CreateActivity = () => {
    const dispatch = useDispatch()
    //const history = useNavigate()
    const country = useSelector((state) => state.countries)
    const [error , setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        country: []
    })

    function handleOnChange(e) {

        setInput((state) => {
            const newState ={
                ...state,
                [e.target.name]: e.target.value
                
            }
            setError(validate(newState))
            return  newState;
        })
    }

    function handleCheckBox(e) {
        console.log(e.target.checked)
            setInput({
                ...input,
                [e.target.name]: e.target.value,
               
            })   
    }


    function handleSelect(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    }



    function handleSubmit(e) {
         console.log(input)
         if (!input.name || !input.difficult || !input.duration || !input.season || input.country.length === 0) {
             e.preventDefault()
            alert('All inputs must contain valid information')
        } else {
            e.preventDefault()
            dispatch(postActivity(input))
            alert('Activity was created successfully')
            setInput({
                name: '',
                difficult: '',
                duration: '',
                season: '',
                country: []
            })

        }
    }  

    function handleDelete(e) {
        setInput({
            ...input,
            country: input.country.filter(c => c !== e)
        })
    }

    function validate(input){
        let error = {};
        if(input.name.length === 0){
            error.name = 'Name of activity is required'
        }
        if(!input.duration){
            error.duration = 'Duration must be declared in hours'
        }
        if(!input.season){
            error.season = 'Season is required'
        }
        if(!input.difficult){
            error.difficult = 'Difficult is required'
        }
        if(input.country.length === 0){
            error.country = 'Must be included at least 1 country'
        }
        return error
    }

    useEffect(() => {
        dispatch(getCountries(''))
    }, [dispatch])


    return (
        <div  >
            <div >
                <Link to='/home'>
                    <button >Home</button>
                </Link>
            </div>
            <h1 >Create Activity</h1>
            <form
                onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <div >
                        <label > Name of activity : </label>
                        <input
                            placeholder='Activity...'
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={handleOnChange} />
                            {error.name && <p>{error.name}</p>}
                    </div>
                    <div >
                        <label >Difficult : </label>
                        <label>
                            <input
                                type='radio'
                                value='1'
                                name='difficult'
                                onChange={e => handleCheckBox(e)}/>
                                
                            Very Easy</label>
                        <label>
                            <input
                                type='radio'
                                value='2'
                                name='difficult'
                                onChange={e => handleCheckBox(e)}
                            />
                            Easy</label>
                        <label>
                            <input
                                type='radio'
                                value='3'
                                name='difficult'
                                onChange={e => handleCheckBox(e)}
                            />
                            Medium</label>
                        <label>
                            <input
                                type='radio'
                                value='4'
                                name='difficult'
                                onChange={e => handleCheckBox(e)}
                            />
                           Hard</label>
                        <label>
                            <input

                                type='radio'
                                value='5'
                                name='difficult'
                                onChange={e => handleCheckBox(e)}
                            />
                            Challenging</label>
                    </div>
                    <div >
                        <label>Duration : </label>
                        <input
                            placeholder= 'For how long?...'
                            type='number'
                            value={input.duration}
                            name='duration'
                            onChange={handleOnChange} />
                             {error.duration && <p>{error.duration}</p>}
                    </div>
                    <div >
                        <label >Season : </label>
                        <label>
                            <input
                                type='radio'
                                value='summer'
                                name='season'
                                onChange={e => handleCheckBox(e)}
                            />
                            Summer</label>
                        <label>
                            <input
                                type='radio'
                                value='spring'
                                name='season'
                                onChange={e => handleCheckBox(e)}
                            />
                            Spring</label>
                        <label>
                            <input
                                type='radio'
                                value='autumn'
                                name='season'
                                onChange={e => handleCheckBox(e)}
                            />
                            Autumn</label>
                        <label>
                            <input
                                type="radio"
                                value='winter'
                                name='season'
                                onChange={e => handleCheckBox(e)}
                            />
                            Winter</label>

                    </div>
                    <div >
                        <label >Country : </label>
                        <div >
                             <select
                                onChange={(e) => handleSelect(e)} >
                                {country?.map((e) => (
                                    <option
                                    value= {e.name}
                                    key={e.id} 
                                    >{e.name}
                                    </option>
                                ))}
                            </select>
                        </div> 
                        {error.country && <p>{error.country}</p>}               
                    </div>
                    {input.country.map((e) =>
                        <div >
                            <p >{e}</p>
                            <button
                                type='button'
                                onClick={() => handleDelete(e)}>X</button>
                        </div>
                    )}
                    <div>
                        <input type='submit' value='Create'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateActivity
/*
<select onChange={} > 
<option hidden>Difficult </option>
<option value='1'> 1 </option>
<option value='2'> 2 </option>
<option value='3'> 3 </option>
<option value='4'> 4 </option>
<option value='5'> 5 </option>
</select>*/