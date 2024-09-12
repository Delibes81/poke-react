import { useEffect, useState } from "react"
import React from 'react'
import { Link, useParams } from "react-router-dom"
import { Container, Row, col, Card, CardBody, CardText, Badge, Progress, Col } from "reactstrap"
import axios from 'axios'
import PokeTarjeta from "../components/PokeTarjeta"
import { text } from "@fortawesome/fontawesome"

export const Detalle = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitad, setHabitad] = useState('Desconoicido');
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
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
      await getTipos(respuesta.types);
      await getHabilidades(respuesta.abilities);
      await getEspecie(respuesta.species.name);
      setCardClass('');
      setLoadClass('d-none');
    })
  }

    const getTipos = async(tip)=> {
      let listaTipos = [];
      tip.forEach( (t) => {
        axios.get(t.type.url).then( async(response) => {
        listaTipos.push(response.data.names[5].name);
        setTipos(listaTipos);
      });
    });
    }

    const getHabilidades = async (hab) => {
      let listaHab = [];
      for (const h of hab) {
        if (h.ability && h.ability.url) {
          try {
            const response = await axios.get(h.ability.url);
            listaHab.push(response.data.names[5].name);
          } catch (error) {
            console.error(`Error fetching ability: ${error}`);
          }
        }
      }
      setHabilidades(listaHab);
    };


    const getEspecie = async (esp) => {
      const liga = `https://pokeapi.co/api/v2/pokemon-species/${esp}`;
      axios.get(liga).then( async(response) => {
        const respuesta = response.data;
        setEspecie(respuesta);
        if(respuesta.habitat !== null){
          await getHabitad(respuesta.habitat.url);
        }
        await getDescripcion(respuesta.flavor_text_entries);
      })
    }

    const getHabitad = async (hab) => {
      axios.get(hab).then( async(response) => {
        setHabitad(response.data.names[1].name);
      })
    }

    const getDescripcion = async (desc) => {
      let texto = '';	
      desc.forEach((d) => {
        if(d.language.name === 'es'){
          texto = d.flavor_text;
        }
      });
      setDescripcion(texto);
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
                <CardText className="h1 text-capitalize">{pokemon.name}</CardText>
                <CardText className="fs-3">{descripcion}</CardText>
                <CardText className="fs-5">
                  Altura: <b>{(pokemon.height)/10} m</b>
                </CardText>
                <CardText className="fs-5">
                  Peso: <b>{(pokemon.weight)/10} kg</b>
                </CardText>
                {/* <CardText className="fs-5">
                  Tipos: 
                  { tipos.type.name.map((tip,index) => (
                    <Badge pill color='danger' key={index} className='mx-1'>{tip}</Badge>
                  ))}
                  </CardText> */}
                  <CardText className="fs-5 text-capitalize">
                  Habitad: <b> {habitad}</b>
                  </CardText>
                  <CardText className="fs-5">
                  Habilidades 
                  { habilidades.map((hab,i) => (
                    <Badge pill color='dark' key={i} className='mx-1'>{hab}</Badge>
                  ))}
                  </CardText>
              </Col>
              <Col md='6'>
                <img src={imagen} className="img-fluid"></img>
              </Col>
              <Col md='12 mt-3'>
                <CardText className="fs-4 text-center"><b>Estadísticas</b></CardText>
              </Col>
              <Col md='12 mt-3'>
                <CardText className="fs-4 text-center"><b>Cadena de evolucion</b></CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle;
