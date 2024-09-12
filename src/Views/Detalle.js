import { useEffect, useState } from "react"
import React from 'react'
import { Link, useParams } from "react-router-dom"
import { Container, Row, col, Card, CardBody, CardText, Badge, Progress, Col } from "reactstrap"
import axios from 'axios'
import PokeTarjeta from "../components/PokeTarjeta"

export const Detalle = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitad, setHabitad] = useState('Desconoicido');
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [ptipos, setTipos] = useState([]);
  const [cardClass, setCardClass] = useState('d-none');
  const [LoadClass, setLoadClass] = useState('');
  useEffect(() =>{
    getPokemon();
  },[]);
  const getPokemon = async () => {
    const liga = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios .get(liga).then( async(response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      setTipos(respuesta.types);
      if(respuesta.sprites.other.dream_world.front_default !== null){
        setImagen(respuesta.sprites.other.dream_world.front_default)
      } else {
        setImagen(respuesta.sprites.other['official-artwork'].front_default)
      }
      setCardClass('');
      setLoadClass('d-none');
    })
  }

  return (
    <Container className="bg-danger mt-3">
      <Row>
        <Col>
        <Card className="shadow mt-3 mb-3">
          <CardBody className="mt-3">
            <Row>
              <Col className="text-center">
              <Link to='/' className= 'btn btn-warning'>
              <i className='fa-solid fa-home'></i>Inicio
              </Link>
              </Col>
            </Row>
            <Row className={LoadClass}>
              <Col md='12'>
              <img src='/pokeclasic.gif' className="w-100"></img>
              </Col>
            </Row>
            <Row className={cardClass}>
              <Col md='6'>
                <CardText>{pokemon.name}</CardText>
              </Col>
              <Col md='6'></Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle;
