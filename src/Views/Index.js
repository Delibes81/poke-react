import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, InputGroupText, Input } from 'reactstrap';
import axios from 'axios';
import PokeTarjeta from '../components/PokeTarjeta';

const Index = () => {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() =>{
    getPokemones(offset);
  },[]);

  const getPokemones = async (o) => {
    const liga = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${o}`;
    axios.get(liga).then( async(response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results);
    })
  }

  return (
    <Container className='shadow bg-danger mt-3'>
      <Row>
        <Col>
          <InputGroup className='mt-3 mb-3 shadow'>
          <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
          <Input type="text" placeholder="Buscar Pokemon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className='mt-3'>
        {pokemones.map ((pok,i)  => (
          <PokeTarjeta poke={pok} key={i} />
        )) }
      </Row>
    </Container>
  );
};

export default Index; 