import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import CabinetOptions from '../CabinetOptionsComponent';
import { shallow } from 'enzyme';


describe('CabinetComponent', () => {
    const props = {
        id: "",
        user: "",
        image: null,
        imagenew: null,
        fetched: false,
        isSetOpen: true,
        isNameOpen: false,
        isPasOpen: false,
        isDelOpen: false,
        imgUrl: "",
        upd_first_name: "",
        upd_last_name: "",
        errPas: "",
        Token: "50753d1cb8379b45840f36c30a95d8a5ea0a5244",
      };

      

      describe('Options container initial', () => {
        const OptionsContainer = (<CabinetOptions {...props} />)

        it('renders properly', () => {
            expect(OptionsContainer).toMatchSnapshot()
          })    

        const component = shallow(<CabinetOptions {...props} />)

        it('settings closed', () => {
            expect(component.find('.Sett')).toHaveLength(0)
         })
         

         it('password change closed', () => {
            expect(component.find('.PasM')).toHaveLength(0)
         })
         it('delete acc closed', () => {
            expect(component.find('.DelM')).toHaveLength(0)
         })
         it('name change closed', () => {
            expect(component.find('.NameM')).toHaveLength(0)
         })
        
     })

     

})