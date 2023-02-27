import "./styles.css";
import logo from "./logo.svg";
import json from "./pokemons.json"

const Logo = () => {
  return <img id="Logo" src={logo} alt="The logo of PokedexID"/>
}

const Header = ({title}) => {
  return (
    <div id="Header">
      <Logo/>
      <LanguageSelection/>
    </div>
  )
}

const LanguageSelection = () => {
  return (
    <select id="LanguageSelection">
      <option className="LanguageOption" value="fr">Francais</option>
      <option className="LanguageOption" value="en">Anglais</option>
    </select>
  )
}

const PokemonList = () => {
  const list =[];
  const pokemonNumber = Object.keys(json).length;
    for(let i=0; i<pokemonNumber; i++){
      list.push(<PokemonCard id={json[i]["id"]} name={json[i]["names"]["en"]} img={json[i]["image"]} types={json[i]["types"]}/>)
    }

    return ( 
      <div id="PokemonList">
        {list}
      </div>
    )
}

const PokemonCard = ({id, name, img, types}) => {
  let pokeId = PokeId({id});
  let pokeName = PokeName({name});
  let pokeImg = PokeImg({img, name});
  let pokeTypes = PokeTypes({types});

  return (
    <div id={id} className="PokemonCard">
      {pokeId} <br />
      {pokeName}
      {pokeImg}
      {pokeTypes}
    </div>  
  )
};

const PokeId = ({id}) => {
  return (
    <div className="PokemonId">No.{id}</div>
  )
}

const PokeName = ({name}) => {
  return (
    <div className="PokemonObjectZone">
      <div className="PokemonName">{name}</div>
    </div>
  )
}

const PokeImg = ({img, name}) => {
  return (
    <div className="PokemonObjectZone">
      <img className="PokemonImg" src={img} alt={name}/>
    </div>
  )
}

const PokeTypes = ({types}) => {
  let typesCase = [];
  types.forEach(type => {
    switch(type) {
      case "grass":
        typesCase.push(<div className="PokemonType Grass">{type}</div>);
        break;
      case "fire":
        typesCase.push(<div className="PokemonType Fire">{type}</div>);
        break;
      case "water":
        typesCase.push(<div className="PokemonType Water">{type}</div>);
        break;
      case "poison":
        typesCase.push(<div className="PokemonType Poison">{type}</div>);
        break;
      case "flying":
        typesCase.push(<div className="PokemonType Flying">{type}</div>);
        break;
      case "normal":
        typesCase.push(<div className="PokemonType Normal">{type}</div>);
        break;
      case "electric":
        typesCase.push(<div className="PokemonType Electric">{type}</div>);
        break;
      case "ground":
        typesCase.push(<div className="PokemonType Ground">{type}</div>);
        break;
      case "fairy":
        typesCase.push(<div className="PokemonType Fairy">{type}</div>);
        break;
      case "bug":
        typesCase.push(<div className="PokemonType Bug">{type}</div>);
        break;
      case "fighting":
        typesCase.push(<div className="PokemonType Fighting">{type}</div>);
        break;
      case "psychic":
        typesCase.push(<div className="PokemonType Psychic">{type}</div>);
        break;
      case "steel":
        typesCase.push(<div className="PokemonType Steel">{type}</div>);
        break;
      case "ice":
        typesCase.push(<div className="PokemonType Ice">{type}</div>);
        break;
      case "rock":
        typesCase.push(<div className="PokemonType Rock">{type}</div>);
        break;
      case "dragon":
        typesCase.push(<div className="PokemonType Dragon">{type}</div>);
        break;
      case "ghost":
        typesCase.push(<div className="PokemonType Ghost">{type}</div>);
        break;
       case "dark":
        typesCase.push(<div className="PokemonType Dark">{type}</div>);
        break;
      default:
        typesCase.push(<div className="PokemonType">{type}</div>);
        break;
    }
  });

  return (
    <div className="PokemonObjectZone">
      {typesCase}
    </div>
  )
};

export default function App() {
  return (
    <div className="App">
      <Header/>
      <PokemonList/>
    </div>
  );
}