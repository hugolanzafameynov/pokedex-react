import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { PokeId, PokeImg, PokeName, PokeType } from './PokemonInfos'
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import pokemonListContext from '../contexts/pokemonListContext'
import languageContext from '../contexts/languageContext'
import pokemonTypesContext from '../contexts/pokemonTypesContext'

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
    onSearch(event.target.value)
    localStorage.setItem('search', event.target.value)
  }

  useEffect(() => {
    const storedSearch = localStorage.getItem('search')
    if (storedSearch) {
      setSearch(storedSearch)
      onSearch(storedSearch)
    }
  }, [onSearch])

  return (<OutlinedInput
    placeholder='Enter a pokemon name'
    value={search}
    onChange={handleSearch}
    color='warning'
    sx=
      {{
        borderRadius: 2, border: '1px solid black', color: '#fff', width: '65%',
      }}
  />)
}

const SearchID = ({ onSearchID }) => {
  const [searchID, setSearchID] = useState('Or a type')

  const handleSearch = (event) => {
    setSearchID(event.target.value)
    onSearchID(event.target.value)
    localStorage.setItem('searchID', event.target.value)
  }

  useEffect(() => {
    const storedSearchID = localStorage.getItem('searchID')
    if (storedSearchID) {
      setSearchID(storedSearchID)
      onSearchID(storedSearchID)
    }
  }, [onSearchID])

  return (<OutlinedInput
    placeholder='Or an ID'
    value={searchID}
    onChange={handleSearch}
    color='warning'
    type='number'
    sx=
      {{
        borderRadius: 2, border: '1px solid black', margin: '5px', color: '#fff', width: '10%', minWidth: '120px',
      }}
  />)
}

const SearchType = ({ onSearchType }) => {
  const [searchType, setSearchType] = useState('Or a type')
  const pokemonTypes = useContext(pokemonTypesContext)
  const { language } = useContext(languageContext)

  const handleSearch = (event) => {
    setSearchType(event.target.value)
    onSearchType(event.target.value)
    localStorage.setItem('searchType', event.target.value)
  }

  useEffect(() => {
    const storedSearchType = localStorage.getItem('searchType')
    if (storedSearchType) {
      setSearchType(storedSearchType)
      onSearchType(storedSearchType)
    }
  }, [onSearchType])

  return (
    <Select
      value={searchType}
      onChange={handleSearch}
      inputProps={{ 'aria-label': 'Without label' }}
      color='warning'
      sx=
        {{
          borderRadius: 2,
          border: '1px solid black',
          color: 'grey',
          width: '15%',
          minWidth: '150px',
        }}
    >
      <MenuItem value='Or a type'>
        Or a type
      </MenuItem>
      {Object.entries(pokemonTypes).map(([type, translations]) => {
        return (
          <MenuItem key={type} value={type}>
            {translations['translations'][language]}
          </MenuItem>
        )
      })}
    </Select>
  )

}

const PokemonCard = ({ id, name, image, types }) => {
  return (<Link to={`/pokemon/${id}`}>
    <Card
      sx=
        {{
          margin: '5px',
          height: '225px',
          width: '225px',
          borderRadius: '10px',
          borderStyle: 'solid',
          borderColor: 'black',
          backgroundColor: 'white',
        }}
    >
      <CardContent>
        <PokeId id={id}></PokeId>
        <Box
          sx=
            {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
        >
          <PokeName name={name} />
          <PokeImg image={image} name={name} lazy={true} />
          <PokeType types={types} />
        </Box>
      </CardContent>
    </Card>
  </Link>)
}

const PokemonList = ({ searchText, searchID, searchType }) => {
  const pokemonList = useContext(pokemonListContext)
  const { language } = useContext(languageContext)

  const [filteredPokemonList, setFilteredPokemonList] = useState([])

  useEffect(() => {
    if (searchText !== '') {
      const filteredPokemons = pokemonList.filter((pokemon) => {
        return pokemon.names[language].toLowerCase().includes(searchText.toLowerCase())
      })
      setFilteredPokemonList(filteredPokemons)
    } else if (searchID !== '') {
      const filteredPokemons = pokemonList.filter((pokemon) => {
        return (pokemon.id.toString().includes(searchID))
      })
      setFilteredPokemonList(filteredPokemons)
    } else if (searchType !== 'Or a type') {
      const filteredPokemons = pokemonList.filter((pokemon) => {
        return (pokemon.types.indexOf(searchType) !== -1)
      })
      setFilteredPokemonList(filteredPokemons)
    } else {
      setFilteredPokemonList(pokemonList)
    }
  }, [searchText, searchID, searchType, pokemonList, language])

  return (<Grid
    container
    alignItems='center'
    justifyContent='center'
    sx=
      {{
        marginTop: '15px',
      }}
  >
    {filteredPokemonList.map((pokemon, index) => {
      return (<Grid key={index}>
        <PokemonCard
          id={pokemon.id}
          name={pokemon.names[language]}
          image={pokemon.image}
          types={pokemon.types}
        />
      </Grid>)
    })}
  </Grid>)
}

const PokemonListPage = () => {
  const [searchText, setSearchText] = useState('')
  const [searchID, setSearchID] = useState('')
  const [searchType, setSearchType] = useState('')

  const handleSearchText = (search) => {
    setSearchText(search)
  }
  const handleSearchID = (search) => {
    setSearchID(search)
  }
  const handleSearchType = (search) => {
    setSearchType(search)
  }


  return (<Box>
    <Outlet />
    <Box
      sx=
        {{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}
    >
      <SearchBar onSearch={handleSearchText} />
      <SearchID onSearchID={handleSearchID} />
      <SearchType onSearchType={handleSearchType} />
    </Box>
    <PokemonList searchText={searchText} searchID={searchID} searchType={searchType} />
  </Box>)
}

export default PokemonListPage
