import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBeers} from "../hooks/beers-hook";
import {BeerModel} from "../models/BeerModel";

const BeerDetails = () => {
  const params = useParams();
  const beerId = params.beerId;
  const [beer, setBeer] = useState<BeerModel | null>(null);
  const {getBeerById} = useBeers();

  useEffect(() => {
    getBeerById(beerId).then(beer => setBeer(beer));
  }, [])

  return (<>
    {beer && <h3>Biere : {beer.name} ({beer.alcohol}%)</h3>}
  </>);
}

export default BeerDetails;