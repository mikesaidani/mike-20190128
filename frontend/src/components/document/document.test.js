import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Document from './document';

describe('<Document />', () => {
  const props = {
    _id: '1',
    name: 'file',
    size: 2000,
    onDocumentDelete: sinon.spy()
  };

  it('renders without crashing', () => {
    shallow(<Document {...props} />);
  });

  it('renders all nodes />', () => {
    const wrapper = shallow(<Document {...props} />);
    expect(wrapper.find('h3').text()).to.equal('file');
    expect(wrapper.find('span').text()).to.equal('2kB');
  });
});
