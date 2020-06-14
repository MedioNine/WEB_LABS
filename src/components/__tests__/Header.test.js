import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import Header from '../HeaderComponent';
import { shallow } from 'enzyme';


describe('HeaderComponent', () => {
  
    const props = {
        isNavOpen: false,
        isLoginOpen: false,
        isRegOpen: false,
        errLog: "",
        errReg: "",
        username: "",
        password: "",
        Token: localStorage.getItem("Token"),
        reg: {
          username: "",
          password: "",
          password2: "",
          email: "",
        },
      };
    

      describe('Header container initial', () => {
        const headerContainer = (<Header {...props} />)

        it('renders properly', () => {
            expect(headerContainer).toMatchSnapshot()
          })    

          const component = shallow(<Header {...props} />)

        it('renders logo properly', () => {
            expect(component.find('NavbarBrand')).toHaveLength(1)
         })
         

         it('firstly no token', () => {
            expect(component.prop('Token')).toEqual(undefined)
         })
     })

     

})