import React, { useState, useEffect } from "react";
import classes from "./PokemonCardContainer.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loader from "../../components/Loader/Loader";
import Axios from "axios";
import PokemonSearchBox from "../../components/PokemonSearchBox/PokemonSearchBox";
import logger from "react-logger";
import Pokemon from "../../components/Pokemon/Pokemon";

const PokemonCardContainer = () => {
  const [pokemons, setPokemons] = useState([]); //состояние для покемонов
  const [search, setSearch] = useState(""); // состояние для поиска
  const [pokemonsInList, setPokemonsInList] = useState(30); // состояние количества покемонов в списке
  const [loading, setLoading] = useState(true); // начальное состояние загрузки покемонов
  const [error, setError] = useState(false); // начальное состояние ошибки
  const urlPokemonsAPI = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsInList}`; // ?limit=964

  useEffect(() => {
    setError(false);

    const fetchData = async () => {
      await Axios.get(urlPokemonsAPI)
        .then(result => {
          setPokemons(result.data["results"]);
          setLoading(false);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
    };
    fetchData();
  }, [urlPokemonsAPI]);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  /* фильтр массива + выборка элемента*/
  // const filteredPokemons = pokemons
  //   .filter(pokemon =>
  //     pokemon.name.toLowerCase().includes(search.toLowerCase())
  //   )
  //   .map((pokemon, index) => (
  //     <PokemonCard
  //       key={index}
  //       pokemonName={pokemon.name}
  //       pokemonURL={pokemon.url}
  //     />
  //   ));

  const mappedPokemons = pokemons.map((pokemon, index) => (
    <PokemonCard
      key={index}
      pokemonName={pokemon.name}
      pokemonURL={pokemon.url}
      loading={loading}
    />
  ));

  return (
    <>
      <PokemonSearchBox value={search} handleSearch={handleSearch} />
      <div className=" d-flex justify-content-center">
        {error ? (
          <h1 className={classes.ErrorConnect}>Could not connect to server</h1>
        ) : loading ? (
          <Loader />
        ) : null}
      </div>
      {mappedPokemons.length ? mappedPokemons : null}
    </>
  );
};

export default PokemonCardContainer;
