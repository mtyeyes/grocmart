import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './button';

const setUp = (props?: React.ComponentProps<'button'>) =>
  shallow(<Button {...props} />);

describe('should render Button component', () => {
  it('should render default button', () => {
    const component = setUp();
    const btn = component.find('.btn');
    expect(btn.length).toBe(1);
  });
  it('should render button with custom classname', () => {
    const component = setUp({ className: 'custom' });
    const btn = component.find('.custom');
    expect(btn.length).toBe(1);
  });
});
