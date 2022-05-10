import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../actions/index'
import styles from './CreateActivity.module.css'


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

    function handleSelect(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    }



    function handleSubmit(e) {
         console.log(input)
         if (!input.name || !input.difficult || !input.duration || !input.season || input.country.length === 0 ) {
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
            error.name = 'Activity name is required'
        }
        if(!input.duration){
            error.duration = 'Duration must be specified in hours'
        }
        if(!input.season){
            error.season = 'Season is required'
        }
        if(!input.difficult){
            error.difficult = 'Difficult is required'
        }
        if(input.country.length === 0){
            error.country = 'At least one country must be selected'
        }
        return error
    }
   
    useEffect(() => {
        dispatch(getCountries(''))
    }, [dispatch])
   
   
    return (
        <div >
           <div className={styles.nav}>
            <li className={styles.li}><Link to='/home'> Go Home</Link></li>
            </div>
            <h1 className={styles.h1} >Create Activity 🏄‍♂️</h1>
            <div className={styles.container}> 

            <form
                onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div >
                    <div >
                        <label > Name of the activity : </label>
                        <input
                            placeholder='Activity'
                            type='text'
                            value={input.name}
                            name='name'
                            autoComplete='off'
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
                                onChange={handleOnChange}/>
                                
                            1</label>
                        <label>
                            <input
                                type='radio'
                                value='2'
                                name='difficult'
                                onChange={handleOnChange}
                            />
                            2</label>
                        <label>
                            <input
                                type='radio'
                                value='3'
                                name='difficult'
                                onChange={handleOnChange}
                            />
                            3</label>
                        <label>
                            <input
                                type='radio'
                                value='4'
                                name='difficult'
                                onChange={handleOnChange}
                            />
                           4</label>
                        <label>
                            <input

                                type='radio'
                                value='5'
                                name='difficult'
                                onChange={handleOnChange}
                            />
                            5</label>
                            {error.difficult && <p>{error.difficult}</p>}
                    </div>
                    <div >
                        <label>Duration : </label>
                        <input
                            placeholder= 'Time in hours'
                            type='number'
                            value={input.duration}
                            name='duration'
                            autoComplete='off'
                            min='0'
                            onChange={handleOnChange} />
                             {error.duration && <p>{error.duration}</p>}
                    </div>
                    <div >
                        <label >Season : </label>
                        <label>
                            <input
                                type='radio'
                                value='Summer'
                                name='season'
                                onChange={handleOnChange}
                            />
                            Summer</label>
                        <label>
                            <input
                                type='radio'
                                value='Spring'
                                name='season'
                                onChange={handleOnChange}
                            />
                            Spring</label>
                        <label>
                            <input
                                type='radio'
                                value='Fall'
                                name='season'
                                onChange={handleOnChange}
                            />
                            Fall</label>
                        <label>
                            <input
                                type="radio"
                                value='Winter'
                                name='season'
                                onChange={handleOnChange}
                            />
                            Winter</label>
                            {error.season && <p>{error.season}</p>}

                    </div>
                    <div >
                        <label >Country : </label>
                        <div >
                             <select
                                onChange={(e ) => handleSelect(e)} >
                                {country && country.map((e, i ) => (
                                    <option
                                    value= {e.name}
                                    key={e.id + i} 
                                    >{e.name}
                                    </option>
                                ))}
                            </select>
                        </div> 
                        {error.country && <p>{error.country}</p>}               
                    </div>
                    {input.country.map((e) =>
                        <ul key = {e}>
                            <p className={styles.element}>{e}</p>
                            <button className={styles.button}
                                type='button'
                                onClick={() => handleDelete(e)}>X</button>
                        </ul>
                    )}
                    <div >
                        <input type='submit' value='Create'/>
                    </div>
                </div>
            </form>
            </div>
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