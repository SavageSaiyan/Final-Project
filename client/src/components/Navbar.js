import React from 'react'
import {Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';
// Create Navbar 
function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate =useNavigate();
// create logout
  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID");
    navigate("/auth")
  } // Make the links for Home, Create Recipe, Login/Register, Saved Recipes
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
       
        {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
        ) : (  
        <>
        <Link to="/saved-recipes">Saved Recipes</Link> 
        <button className='button-animation button-color2' onClick={logout}> Logout</button> 
        </>
        )}
    </div>
  )
}

export default Navbar;