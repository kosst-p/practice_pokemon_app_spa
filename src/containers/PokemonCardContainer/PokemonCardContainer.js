import React, { useState, useEffect } from "react";
import classes from "./PokemonCardContainer.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loading from "../../components/Loading/Loading";
import Axios from "axios";
import PokemonSearchBox from "../../components/PokemonSearchBox/PokemonSearchBox";

const PokemonCardContainer = () => {
  const urlPokemonsApi = "https://pokeapi.co/api/v2/pokemon?limit=10"; // ?limit=964
  const [pokemons, setPokemons] = useState([]); // установка начального состояния для типа
  const [search, setSearch] = useState(""); // установка начального состояния для поиска
  // const [isConnect, setIsConnect] = useState(false);

  console.log(pokemons);

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(urlPokemonsApi).then(result =>
        setPokemons(result.data["results"])
      );
    };
    fetchData();
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const filteredPokemons = pokemons
    .filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((pokemon, index) => (
      <PokemonCard
        key={index}
        pokemonName={pokemon.name}
        pokemonURL={pokemon.url}
      />
    ));

  return (
    <div className="container">
      <div className={classes.PokemonCardContainer}>
        <PokemonSearchBox value={search} handleSearch={handleSearch} />
        {filteredPokemons.length !== 0 ? (
          filteredPokemons
        ) : (
          <h1
            className={`${classes.Empty} col-12 d-flex justify-content-center`}
          >
            Empty
          </h1>
        )}
      </div>
    </div>
  );
};

export default PokemonCardContainer;
