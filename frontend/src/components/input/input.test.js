import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Input from './input';

describe('<Input />', () => {
  const onChange = sinon.spy();

  it('renders without crashing', () => {
    shallow(<Input onChange={onChange}/>);
  });

  it('renders one <input />', () => {
    const wrapper = shallow(<Input onChange={onChange} />);
    expect(wrapper.type()).to.equal('input');
  });

  it('renders with default type text', () => {
    const wrapper = shallow(<Input onChange={onChange} />);
    expect(wrapper.find('input[type="text"]')).to.have.lengthOf(1);
  });

  it('simulates change events', () => {
    const testValue = 'hi';
    const wrapper = shallow(<Input onChange={onChange} />);
    wrapper.find('input').simulate('change', {target: {value: testValue}});

    expect(onChange).to.have.property('callCount', 1);
    expect(onChange.firstCall.args).to.be.an('array').that.has.lengthOf(1);
    expect(onChange.firstCall.args).to.be.an('array').that.includes(testValue);
  });
});
