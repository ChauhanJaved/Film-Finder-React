import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {   
      console.log(`${process.env.REACT_APP_OMDB_API_URL}&s=${query}`);  
      const response = await axios.get(`${process.env.REACT_APP_OMDB_API_URL}&s=${query}`);
      const json = await response.data;        
      json.Response ? setMovies(json.Search) : setMovies([]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form className="justify-content-center" onSubmit={e => {
            e.preventDefault();
            searchMovies();
          }}>
            <Form.Control
              type="text"
              placeholder="Search Movies"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="mb-2 mr-sm-2"
            />
            <Button onClick={searchMovies} className="mb-2">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      {movies ? (
        <Row className="mt-5">        
        {movies.map(movie => (
        <Col md={3} key={movie.imdbID}>
          <Card>
            <Card.Img variant="top" src={movie.Poster} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>                                    
                Year: {movie.Year}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      ):(
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '50vh' }}>
        <h2>No movies found</h2>           
    </div>        
      )
      }      
    </Container>
  );
};


