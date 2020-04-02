import React, { useEffect, useState } from "react";
import classes from "./Pokemon.module.css";
import Axios from "axios";
import Evolution from "../Evolution/Evolution";

const Pokemon = props => {
  const handleGoToHomePage = () => {
    props.history.push({
      pathname: "/"
    });
  };
  const handleShowEvolution = () => {
    setShowEvolution(!showEvolution);
    console.log(showEvolution);
  };
  const [showEvolution, setShowEvolution] = useState(false);
  const [pokemon, setPokemon] = useState({
    img: "",
    name: "",
    weight: "",
    height: "",
    description: "",
    genus: "",
    types: [],
    abilities: [],
    moveList: [],
    eggGroups: [],
    stats: {},
    chanceToCatch: "",
    evolutionURL: ""
  });

  const pokemonNameForAPI = props.match.params.pokemonName.toLowerCase();
  const urlPokemonAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonNameForAPI}/`;
  const urlPokemonSpeciesAPI = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameForAPI}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultPokemonAPI = await Axios.get(urlPokemonAPI);
        const dataPokemonAPI = resultPokemonAPI.data;
        const resultPokemonSpeciesAPI = await Axios.get(urlPokemonSpeciesAPI);
        const dataPokemonSpeciesAPI = resultPokemonSpeciesAPI.data;
        console.log(
          "dataPokemonAPI: ",
          dataPokemonAPI,
          "dataPokemonSpeciesAPI: ",
          dataPokemonSpeciesAPI
        );

        /* Pokemon Information */
        const img = dataPokemonAPI.sprites.front_default;
        const name = dataPokemonAPI.name;
        const weight = Math.round(dataPokemonAPI.weight / 10); // hectograms->kilogram
        const height = dataPokemonAPI.height / 10; // decimeters->meters
        function getDescription(data) {
          let result = "";
          data.flavor_text_entries.forEach(flavor => {
            if (flavor.language.name === "en") {
              result = flavor.flavor_text;
            }
          });
          return result;
        }
        const description = getDescription(dataPokemonSpeciesAPI);
        function getGenus(data) {
          let result = "";
          data.genera.forEach(genera => {
            if (genera.language.name === "en") {
              result = genera.genus;
            }
          });
          return result;
        }
        const genus = getGenus(dataPokemonSpeciesAPI);
        const types = dataPokemonAPI.types.map(type => type.type.name);
        const abilities = dataPokemonAPI.abilities.map(
          ability => ability.ability.name
        );
        const moveList = dataPokemonAPI.moves.map(move => move.move.name);
        function getStats(data) {
          const result = {};
          data.stats.map(stat => {
            result[stat.stat.name] = stat.base_stat; // add keys: speed, special-defense, special-attack, attack, hp
          });
          return result;
        }
        const stats = getStats(dataPokemonAPI);
        const eggGroups = dataPokemonSpeciesAPI.egg_groups.map(
          egg_group => egg_group.name
        );
        const chanceToCatch = Math.round(
          (dataPokemonSpeciesAPI.capture_rate * 100) / 255 // 255/100=dataPokemonSpeciesAPI.capture_rate/x
        );
        const evolutionURL = dataPokemonSpeciesAPI.evolution_chain.url;
        /* ****** */

        /* update State */
        setPokemon(prev => {
          return {
            ...prev,
            img: img,
            name: name,
            weight: weight,
            height: height,
            description: description,
            genus: genus,
            types: types,
            abilities: abilities,
            moveList: moveList,
            eggGroups: eggGroups,
            stats: stats,
            chanceToCatch: chanceToCatch,
            evolutionURL: evolutionURL
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [urlPokemonAPI, urlPokemonSpeciesAPI]);
  console.log(pokemon);
  return (
    <div>
      <div>
        <img src={pokemon.img} alt={pokemon.name} />
      </div>
      <div>Имя: {pokemon.name} </div>
      <div>Тип: {pokemon.types.join(", ")}</div>
      <div>Способности: {pokemon.abilities.join(", ")}</div>
      <div>Приемы: {pokemon.moveList.join(", ")}</div>
      <div>Egg Group: {pokemon.eggGroups.join(", ")}</div>
      <div>Вес: {pokemon.weight}, kg</div>
      <div>Рост: {pokemon.height}, m</div>
      <div>Описание: {pokemon.description} </div>
      <div>Род: {pokemon.genus} </div>
      <div>Шанс поймать: {pokemon.chanceToCatch}, %</div>
      <button onClick={handleShowEvolution}>Эволюция</button>
      {showEvolution ? <Evolution evolution={pokemon.evolutionURL} /> : null}
      <button onClick={handleGoToHomePage}>Назад</button>
    </div>
  );
};

export default Pokemon;
