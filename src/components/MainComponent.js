import React, { Component } from "react";
import "../App.css";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import UserProfile from './UserProfileComponent'
import MyProducts from './MyProductsComponent'
import CreateProduct from './CreateProductComponent'
class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/user/:id" component={UserProfile} />
          <Route exact path="/myproducts" component={MyProducts}/>
          <Route exact path="/myproducts/create" component={CreateProduct}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// <Menu dishes={this.state.dishes}
// onClick={(dishId) => this.onDishSelect(dishId)}/>
// <DishDetail dish={this.state.dishes.filter((dish) =>
//   dish.id === this.state.selectedDish)[0]}/>
export default Main;
