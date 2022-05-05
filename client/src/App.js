import './App.css';
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CountryDetails from './components/CountryDetails'
import CreateActivity from './components/CreateActivity';
import NotFound from './components/NotFound';

function App() {
  return (
    
    
    
    <BrowserRouter> 
    <Routes> 
     
     <Route exact path ='/' element={<LandingPage/>}/>
     <Route exact path = '/home/' element={<Home/>}/>
     <Route path='/home/:countryId' element={<CountryDetails/>}/>
     <Route path= '/activity' element={<CreateActivity/>}/>
     <Route path= '*' element={<NotFound/>}/>

    </Routes>
 
    </BrowserRouter>
    
  );
}

export default App;
