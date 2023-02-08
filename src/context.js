import React, { useState, useContext, useEffect } from 'react'
import {  useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  
  const [loading, setloading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('m')
  const [cocktails, setCockTails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setloading(true)
    try{
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data;
      if(drinks){
        const newCocktails = drinks.map((item)=> {
          const {idDrink, strDrink, strDrinkThumb, strAlcholic, strGlass} = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcholic,
            glass: strGlass,
          }
        })
        setCockTails(newCocktails)
      }
      else{
        setCockTails([])
      }
      setloading(false)
    } catch(error) {
      console.log(error)
      setloading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  },[searchTerm])

  return <AppContext.Provider 
  value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
