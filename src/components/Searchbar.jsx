import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FiSearch} from "react-icons/fi"

const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchterm] = useState('')
  // function for submitting form 
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }

 return(
  <form onSubmit={handleSubmit} autoComplete="off" className="p-2 mt-3 text-gray-400 focus-within:text-gray-600">
    <label htmlFor="search-field" className="sr-only">Find your desired song</label>
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4 mr-4 text-[#7da994]"/>
      <input name="search-field" autoComplete="off" id="search-field" placeholder="Search" type="search" value={searchTerm} 
      onChange={(e)=> setSearchterm(e.target.value)} className="flex-1 bg-transparent border-none outline-none placeholder-[#5c8571] text-base text-white
      "/>
    </div>
  </form>
)}
export default Searchbar;
