import { Card, CardBody, CardImg, CardTitle, CardText , CardLink, ListGroupItem, ListGroup} from "reactstrap";
import React, { Component } from "react";

class CardService extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <CardImg variant="top" src="images/cat.jpg" />
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
        </CardBody>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <CardBody>
          <CardLink href="#">Card Link</CardLink>
          <CardLink href="#">Another Link</CardLink>
        </CardBody>
      </Card>
    );
  }
}

export default CardService;