import React from 'react';
import { shallow } from 'enzyme';
import Advantages from './advantages';

describe('Advantages component', () => {
  it('should match snapshot', () => {
    const component = shallow(<Advantages />);

    expect(component).toMatchSnapshot();
  });
});
