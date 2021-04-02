import * as React from 'react';
import { shallow } from 'enzyme';
import AboutUs from './about-us';

it('should render about-us layout', () => {
  const component = shallow(<AboutUs />);
  const container = component.find('.about-us__container');
  expect(container.length).toBe(1);
});
