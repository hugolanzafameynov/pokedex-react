import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box, FormControl, InputBase, MenuItem, Select, styled } from '@mui/material'
import logo from '../assets/logo.svg'
import languageContext from '../contexts/languageContext'

const LogoImg = styled('img')({
  height: '3em',
})

const Logo = () => {
  return (
    <Link to={`/`}>
      <LogoImg
        src={logo}
        alt='The logo of PokedexID'
      />
    </Link>
  )
}

const LanguageSelection = () => {
  const { language, changeLanguage, languageList } = useContext(languageContext)

  return (
    <FormControl sx={{ minWidth: '100px' }}>
      <Select
        value={language}
        onChange={(e) => {
          changeLanguage(e.target.value)
        }}
        input=
          {
            <InputBase
              sx=
                {{
                  borderRadius: 2,
                  position: 'relative',
                  border: '1px solid black',
                  paddingLeft: '10px',
                  color: 'grey',
                }}
            />
          }
      >
        {languageList.map((language, index) => (
          <MenuItem
            key={language + index}
            value={language}
            sx=
              {{
                paddingLeft: '10px',
                color: 'black',
              }}
          >
            {language.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 5% 15px 5%',
      }}
    >
      <Logo />
      <LanguageSelection />
    </Box>
  )
}

export default Header
