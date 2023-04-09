import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, Box } from '@mui/material'
import languageContext from '../contexts/languageContext'
import pokemonListContext from '../contexts/pokemonListContext'
import { PokeId, PokeImg, PokeMoves, PokeName, PokeType, PokeHeightWeight } from './PokemonInfos'

const PokemonDetailsPage = () => {
  const [pokemon, setPokemon] = useState()
  const { pokemonId } = useParams()
  const pokemonList = useContext(pokemonListContext)
  const { language } = useContext(languageContext)
  const navigate = useNavigate()

  const onClose = () => {
    navigate('/')
  }

  useEffect(() => {
    const pokemon = pokemonList.find((pokemon) => pokemon.id === parseInt(pokemonId))
    setPokemon(pokemon)
  }, [pokemonList, pokemonId])

  if (pokemon !== undefined) {
    return (
      <Dialog onClose={onClose} open={true}>
        <DialogContent>
          <PokeId id={pokemon.id}></PokeId>
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
            <PokeName name={pokemon.names[language]} />
            <PokeImg image={pokemon.image} name={pokemon.names[language]} />
            <PokeType types={pokemon.types} />
            <PokeHeightWeight height={pokemon.height} weight={pokemon.weight}/>
            <PokeMoves moves={pokemon.moves} />
          </Box>
        </DialogContent>
      </Dialog>
    )
  }
}

export default PokemonDetailsPage
