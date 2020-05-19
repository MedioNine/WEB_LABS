import React from 'react';

import CardService from './CardComponent'
import { Container, Row, Col } from 'reactstrap';

function Home(props) {
    return(
        <React.Fragment>
        <Container>
       
            <Row>

               
            <Col xl='4' lg='6' md='6' sm={{ size: 12, offset: 0 }} xs='12'>
                    <CardService/>
                </Col>
                <Col  xl='4' lg='6' md='6' sm={{ size: 12, offset: 0 }} xs='12'>
                    <CardService/>
                </Col>
                <Col xl='4' lg='6' md='6' sm={{ size: 12, offset: 0 }} xs='12'>
                    <CardService/>
                </Col>
            </Row>
        
        </Container>
        </React.Fragment>
    );
}

export default Home;