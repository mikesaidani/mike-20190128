import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Documents from './documents';

describe('<Documents />', () => {
  const onDocumentDelete = sinon.spy();
  const documents = [{
    _id: '1',
    name: 'file',
    size: 2000
  }, {
    _id: '2',
    name: 'file2',
    size: 4000
  }];

  const component = <Documents documents={documents} onDocumentDelete={onDocumentDelete} />;

  it('renders without crashing', () => {
    shallow(component);
  });

  it('renders all nodes />', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.total-docs').text()).to.equal('2 Documents');
    expect(wrapper.find('.total-size').text()).to.equal('Total size: 6kB');
  });
});
