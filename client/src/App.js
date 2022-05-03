import './App.css';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateActivity from './components/CreateActivity'
import CountryDetails from './components/CountryDetails'

function App() {
  return (
    
    
    
    <BrowserRouter> 
    <Routes> 
     
     <Route exact path ='/' element={<LandingPage/>}/>
     <Route exact path = '/home/' element={<Home/>}/>
     <Route path='/home/:countryId' element={<CountryDetails/>}/>
     <Route path='/activity' element={<CreateActivity/>}/>

    </Routes>
 
    </BrowserRouter>
    
  );
}

export default App;
