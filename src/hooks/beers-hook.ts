import axios from "axios";
import {BeerModel} from "../models/BeerModel";

const ENDPOINT_URL = 'https://3dol46q3hd.execute-api.eu-west-1.amazonaws.com/dev/protected';

export const useBeers = () => {
  const getAllBeers = (): Promise<BeerModel[]> => {
    return axios.get(`${ENDPOINT_URL}/beers`).then(response => response.data);
  }

  const getBeerById = (id): Promise<BeerModel> => {
    const idEncoded = encodeURIComponent(id);
    return axios.get(`${ENDPOINT_URL}/beers/${idEncoded}`).then(response => response.data);
  }

  return {
    getAllBeers,
    getBeerById
  }
}