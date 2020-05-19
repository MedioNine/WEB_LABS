import React, {Component} from "react";


class Footer extends Component {
    render(){
        return (

            
            <footer className="page-footer font-small  module">
              <div className="container">
                <div className="row text-center d-flex justify-content-center pt-5 mb-3">

                  <div className="col-md-2 mb-3">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!">About us</a>
                    </h6>
                  </div>

                  <div className="col-md-2 mb-3">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!">Products</a>
                    </h6>
                  </div>

                  <div className="col-md-2 mb-3">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!">Awards</a>
                    </h6>
                  </div>

                  <div className="col-md-2 mb-3">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!">Help</a>
                    </h6>
                  </div>
         
                  <div className="col-md-2 mb-3">
                    <h6 className="text-uppercase font-weight-bold">
                      <a href="#!">Contact</a>
                    </h6>
                  </div>
           

                </div>
              
                <hr className="rgba-white-light" style={{margin:' 0 15%'}}/> 
                <hr className="clearfix d-md-none rgba-white-light" style={{margin: '10% 15% 5%'}}/>
   
              </div>
 
              <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <span> Wanderlace</span>
              </div>

            
            </footer>
    

          );
    }
}
  


export default Footer;