import React, {useState, useEffect} from 'react';
import { Link}  from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCountries , postActivity}  from '../actions/index'


const  CreateActivity = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const countries = useSelector((state) => state.countries)
   // const [error , ] = useState({})
    const [input, setInput] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: []
    })
    console.log(input.name)
    console.log(handleInputChange)
    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.value] : e.target.value
        })
        
        
    }
    
    
    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
    
    
    function handleSubmit(e){
        if(!input.name || !input.difficult || !input.duration || !input.season || !input.countries){
        e.preventDefault()
        alert('All inputs must contain valid information')
       }else{
        e.preventDefault()
        dispatch(postActivity(input))
        alert('Activity was created successfully')
        history.push('/home')
        setInput({
           name: '',
           difficult: '',
           duration: '',
           season: '',
           countries: []
        })
    }
    }
    
    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(c=> c !== e)
        })
    }
    
    useEffect(()=>{
    dispatch(getCountries(''))
    },[dispatch])
    


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
                    <input type="text" 
                    value={input.name}
                     name='name'
                     onChange={handleInputChange}/>
                   
                </div>
                <div >
                    <label >Difficult : </label>
                    <label>
                    <input type="radio" value='1' name='difficult'/>
                    1</label>
                    <label>
                    <input type="radio" value='2' name='difficult'/>
                    2</label>
                    <label>
                    <input type="radio" value='3' name='difficult'/>
                    3</label>
                    <label>
                    <input type="radio" value='4' name='difficult'/>
                    4</label>
                    <label>
                    <input type="radio" value='5' name='difficult'/>
                    5</label>
                </div>
                <div >
                    <label>Duration : </label>
                    <input type="text" 
                    value={input.duration} 
                    name='duration'
                    onChange={handleInputChange} />
                   
                </div>
                <div >
                    <label >Season : </label>
                    <label>
                    <input type="radio" value='Summer' name='season' onChange={(e) => handleSelect(e)}/>
                    Summer</label>
                    <label>
                    <input type="radio" value='Spring' name='season' onChange={(e) => handleSelect(e)}/>
                    Spring</label>
                    <label>
                    <input type="radio" value='Autumn' name='season' onChange={(e) => handleSelect(e)}/>
                    Autumn</label>
                    <label>
                    <input type="radio" value='Winter' name='season' onChange={(e) => handleSelect(e)}/>
                    Winter</label>
                   
                </div>
                <div >
                    <label >Country Activity: </label>
                    <div >
                    <select onChange={(e) => handleSelect(e)} >
                    {countries.map((country) => (
                        <option value={country.name}>{country.name}</option>
                    ))}
                    </select>
                    </div>
                 
                </div>
                {input.countries.map((e) =>
                <div >
                    <p >{e}</p>
                    <button type='button' onClick={() => handleDelete(e)}>X</button>
                </div>
                )}
                <div>
                <button>Crear actividad</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default CreateActivity