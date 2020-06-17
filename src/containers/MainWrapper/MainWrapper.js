import React, { useState, useEffect, useRef, useCallback } from "react";
import PokemonCardContainer from "../../containers/PokemonCardContainer/PokemonCardContainer";
import Pokemon from "../../components/Pokemon/Pokemon";
import { HashRouter, Route, Switch } from "react-router-dom";
import classes from "./MainWrapper.module.css";
import Axios from "axios";
// import logger from "react-logger";

const MainWrapper = (props) => {
  /* States */
  const [pokemons, setPokemons] = useState([]); // состояние для покемонов
  const [loading, setLoading] = useState(true); // начальное состояние загрузки покемонов
  const [error, setError] = useState(false); // начальное состояние ошибки
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  /* ****** */

  /* Logic */
  const observer = useRef();
  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(nextPage);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading, nextPage]
  );

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
  }, [currentPage]);
  /* ******* */

  /* Render */
  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <PokemonCardContainer
              pokemons={pokemons}
              loading={loading}
              error={error}
              lastPokemonElementRef={lastPokemonElementRef}
            />
          )}
        />
        <Route path="/pokemon/:pokemonName" component={Pokemon} />
        <Route
          render={() => <h1 className={classes.notFound}> Not Found</h1>}
        />
      </Switch>
    </HashRouter>
  );
  /* ***** */
};

export default MainWrapper;
