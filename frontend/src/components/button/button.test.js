import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Button from './button';

describe('<Button />', () => {
  it('renders without crashing', () => {
    shallow(<Button />);
  });

  it('renders one <button />', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button')).to.have.lengthOf(1);
  });

  it('renders text when passed in', () => {
    const wrapper = shallow((
      <Button>Click me</Button>
    ));
    expect(wrapper.text()).to.equal('Click me');
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <Button>
        <span>My Button</span>
      </Button>
    ));
    expect(wrapper.contains(<span>My Button</span>)).to.equal(true);
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(onClick).to.have.property('callCount', 1);
  });
});
