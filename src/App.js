import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements, Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/Header'
import PokemonDetailsPage from './components/PokemonDetailsPage'
import PokemonListPage from './components/PokemonListPage'
import languageContext from './contexts/languageContext'
import pokemonListContext from './contexts/pokemonListContext'
import pokemonTypesContext from './contexts/pokemonTypesContext'

const CustomScreen = () => {
  return (
    <Box>
        <Header />
        <Outlet />
    </Box>
  )
}

function App() {
  const [typeList, setTypeList] = useState([])
  const [pokemonList, setPokemonList] = useState([])
  const [language, setLanguage] = useState('fr')
  const [languageList, setLanguageList] = useState([])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  useEffect(() => {
    const getTypeList = async () => {
      const response = await fetch('https://pokedex-jgabriele.vercel.app/types.json')
      const data = await response.json()
      const languagesKey = Object.keys(data[Object.keys(data)[0]].translations)

      setTypeList(data)
      setLanguageList(languagesKey.sort())
    }

    const getPokemonList = async () => {
      const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json')
      const data = await response.json()

      setPokemonList(data)
    }

    getTypeList()
    getPokemonList()
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<CustomScreen />}>
          <Route path='/' element={<PokemonListPage />}>
            <Route path='/pokemon/:pokemonId' element={<PokemonDetailsPage />} />
          </Route>
        </Route>
      </>,
    ),
  )

  return (
    <pokemonListContext.Provider value={pokemonList}>
      <pokemonTypesContext.Provider value={typeList}>
        <languageContext.Provider value={{ language, changeLanguage, languageList }}>
          <RouterProvider router={router} />
        </languageContext.Provider>
      </pokemonTypesContext.Provider>
    </pokemonListContext.Provider>
  )
}

export default App
