import React, { useContext } from 'react'
import { Box, Chip, Typography } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import loading from '../assets/loading.svg'
import pokemonTypesContext from '../contexts/pokemonTypesContext'
import languageContext from '../contexts/languageContext'

const PokeId = ({ id }) => {
  return (
    <Typography
      sx=
        {{
          fontSize: 'small',
        }}
    >
      No.{id}
    </Typography>
  )
}

const PokeName = ({ name }) => {
  return (
    <Typography
      sx=
        {{
          fontSize: 'large',
        }}
    >
      {name}
    </Typography>
  )
}

const PokeImg = ({ image, name, lazy = false }) => {
  if (lazy) {
    return (
      <Box className={'pokemonImg'}>
        <LazyLoadImage src={image} alt={name} placeholderSrc={loading} />
      </Box>
    )
  } else {
    return (
      <Box className={'pokemonImg'}>
        <img src={image} alt={name} />
      </Box>
    )
  }
}

const PokeType = ({ types }) => {
  const pokemonTypes = useContext(pokemonTypesContext)
  const { language } = useContext(languageContext)

  return (
    <Box>
      {types.map((type, index) => {
        const color = pokemonTypes[type].backgroundColor
        const typeName = pokemonTypes[type].translations[language]

        return (
          <Chip
            key={type + index}
            label={typeName}
            sx=
              {{
                textAlign: 'center',
                fontSize: 'small',
                fontWeight: 'bold',
                borderRadius: '4px',
                border: '1px solid black',
                margin: '2px',
                backgroundColor: color,
              }} />
        )
      })}
    </Box>
  )
}

const PokeHeightWeight = ({ height, weight }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
      }}
    >
      <Typography>
        Height : {(height / 10).toFixed(1)}m
      </Typography>
      &nbsp;
      &nbsp;
      &nbsp;
      <Typography>
        Weight : {(weight / 10).toFixed(1)}kg
      </Typography>
    </Box>
  )
}

const PokeMoves = ({ moves }) => {
  return (
    <Box
    >
      <Typography
        sx={{
          margin: '2px',
        }}>
        Moves :
      </Typography>
      {moves.map((move, index) => {
        return (
            <Chip
              label={move.toString().charAt(0).toUpperCase() + move.toString().slice(1)}
              key={move+index}
              sx={{
                textAlign: 'center',
                fontSize: 'medium',
                margin: '2px',
              }}
            />
        )
      })}
    </Box>
  )
}

export { PokeId, PokeName, PokeImg, PokeType, PokeHeightWeight, PokeMoves }
