import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Header from './header';

describe('<Header />', () => {
  const onDocumentAdd = sinon.spy();
  const onSearchBoxChange = sinon.spy();
  const component = <Header onDocumentAdd={onDocumentAdd} onSearchBoxChange={onSearchBoxChange} />;

  it('renders without crashing', () => {
    shallow(component);
  });

  it('renders two inputs', () => {
    const wrapper = mount(component);
    expect(wrapper.find('input')).to.have.lengthOf(2);
  });
});
