import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap';


 const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState({});
  const [imagen, setImagen] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [LoadClass, setLoadClass] = useState('');

  useEffect(() =>{
    getPokemon();
  },[]);

const getPokemon = async () => {
  const liga = params.poke.url;
  axios.get(liga).then( async(response) => {
    const respuesta = response.data;
    setPokemon(respuesta);
  })
}
  

  return (
    <Col sm='4' lg='3' className='mb-3'>
      <Card>
        <CardImg src={imagen} className='p-2' />
      </Card>
    </Col>
  )
}

export default PokeTarjeta
