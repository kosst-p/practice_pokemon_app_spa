import React, { useState, useEffect, useRef, useCallback } from "react";
import classes from "./PokemonCardContainer.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loader from "../../components/Loader/Loader";
import Axios from "axios";
import PokemonSearchBox from "../../components/PokemonSearchBox/PokemonSearchBox";
// import logger from "react-logger";

const PokemonCardContainer = () => {
  /* States */
  const [pokemons, setPokemons] = useState([]); // состояние для покемонов
  const [search, setSearch] = useState(""); // состояние для поиска
  const [loading, setLoading] = useState(true); // начальное состояние загрузки покемонов
  const [error, setError] = useState(false); // начальное состояние ошибки
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState(false);

  /* ******* */
  const observer = useRef();
  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => {
            return nextPage;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading, nextPage]
  );

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    let cancel;
    const fetchData = () => {
      setLoading(true);
      setError(false);
      Axios({
        method: "GET",
        url: currentPage,
        cancelToken: new Axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setPokemons((prevPokemons) => {
            return [...prevPokemons, ...res.data.results];
          });
          setNextPage(res.data.next);
          setHasMore(res.data.results.length > 0);
          setLoading(false);
        })
        .catch((error) => {
          if (Axios.isCancel(error)) return;
          setError(true);
        });
    };
    fetchData();
    return () => cancel();
  }, [currentPage, search]);

  const mappedPokemons = pokemons.map((pokemon, index) => (
    <PokemonCard
      key={index}
      pokemonName={pokemon.name}
      pokemonURL={pokemon.url}
      loading={loading}
      forwardRef={pokemons.length === index + 1 ? lastPokemonElementRef : null}
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
      {/* {mappedPokemons.length ? mappedPokemons : null*/}
      {mappedPokemons}
    </>
  );
};

export default PokemonCardContainer;
