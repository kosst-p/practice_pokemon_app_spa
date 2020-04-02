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
  const urlPokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameForAPI}/`;

  useEffect(() => {
    const fetchData = async () => {
      await Axios({
        method: "GET",
        url: urlPokemonAPI
      })
        .then(result => {
          const pokemonResponse = result.data;
          /* Pokemon Information */
          const img = pokemonResponse.sprites.front_default;
          const name = pokemonResponse.name;
          const weight = Math.round(pokemonResponse.weight / 10);
          const height = pokemonResponse.height / 10;
          const types = pokemonResponse.types.map(type => type.type.name);
          const abilities = pokemonResponse.abilities.map(
            ability => ability.ability.name
          );
          const moveList = pokemonResponse.moves.map(move => move.move.name);
          let stats = {};
          pokemonResponse.stats.map(stat => {
            stats[stat.stat.name] = stat.base_stat; // add keys: speed, special-defense, special-attack, attack, hp
          });
          setPokemon(prev => {
            return {
              ...prev,
              img: img,
              name: name,
              weight: weight,
              types: types,
              abilities: abilities,
              moveList: moveList,
              height: height,
              stats: stats
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
      await Axios({
        method: "GET",
        url: urlPokemonSpecies
      }).then(result => {
        let description = "";
        result.data.flavor_text_entries.forEach(flavor => {
          if (flavor.language.name === "en") {
            description = flavor.flavor_text;
          }
        });
        let genus = "";
        result.data.genera.forEach(genera => {
          if (genera.language.name === "en") {
            genus = genera.genus;
          }
        });
        const evolutionURL = result.data.evolution_chain.url;
        const eggGroups = result.data.egg_groups.map(
          egg_group => egg_group.name
        );
        const chanceToCatch = Math.round(
          (result.data.capture_rate * 100) / 255
        );
        setPokemon(prev => {
          return {
            ...prev,
            description: description,
            genus: genus,
            chanceToCatch: chanceToCatch,
            evolutionURL: evolutionURL,
            eggGroups: eggGroups
          };
        });
      });
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [urlPokemonAPI, urlPokemonSpecies]);

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
