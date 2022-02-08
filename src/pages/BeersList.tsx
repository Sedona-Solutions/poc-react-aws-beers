import {useEffect, useState} from "react";
import {useBeers} from "../hooks/beers-hook";
import {BeerModel} from "../models/BeerModel";
import {Link} from "react-router-dom";

const BeersList = () => {
  const beersInitVal: BeerModel[] = []
  const [beers, setBeers] = useState(beersInitVal);
  const {getAllBeers} = useBeers();

  useEffect(() => {
    (async () => {
      const response = await getAllBeers();
      setBeers(response);
    })();
  }, [])
  return (<>
    <h3>Liste des bières</h3>
    <ul>
      {beers?.map((beer: BeerModel) => {
        return <li key={beer.key}><Link to={`/beers/${encodeURIComponent(beer.key)}`}>{beer.name}</Link> ({beer.alcohol}%)</li>
      })}
    </ul>
  </>);
}

export default BeersList;