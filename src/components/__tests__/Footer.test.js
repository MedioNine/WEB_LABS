import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import Footer from '../FooterComponent';
import { shallow } from 'enzyme';


describe('FooterComponent', () => {

    

      describe('Header container initial', () => {
        const FooterContainer = (<Footer/>)

        it('renders properly', () => {
            expect(FooterContainer).toMatchSnapshot()
          })    
        
          const component = shallow(<Footer/>)

          it('company name visible', () => {
            expect(component.find('span').text()).toEqual(' Wanderlace')
          })
          
          

     })

     

})