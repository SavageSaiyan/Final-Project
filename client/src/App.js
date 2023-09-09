import './App.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {  Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from "./pages/Auth"
import CreateRecipe from "./pages/CreateRecipe"
import SavedRecipes from "./pages/SavedRecipes"
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
        
    </div>
  );
}

export default App;
