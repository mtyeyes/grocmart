import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Advantages from './advantages';

const setUp = () => shallow(<Advantages />);

describe('should render Advantages component', () => {
  let component: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;
  beforeEach(() => {
    component = setUp();
  });

  it('should render list', () => {
    const list = component.find('.advantages__list');
    expect(list.length).toBe(1);
  });

  it('should render at least 1 item', () => {
    const items = component.find('.advantages__item');
    expect(items.length).toBeGreaterThanOrEqual(1);
  });
});
