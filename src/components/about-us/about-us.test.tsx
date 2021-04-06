import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from './about-us';

describe('AboutUs component', () => {
  it('should match snapshot', () => {
    const component = shallow(<AboutUs />);

    expect(component).toMatchSnapshot();
  });
});
