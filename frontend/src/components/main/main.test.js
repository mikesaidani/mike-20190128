import React from 'react';
import { shallow} from 'enzyme';

import Main from './main';

describe('<Main />', () => {
  const component = <Main  />;

  it('renders without crashing', () => {
    shallow(component);
  });
});
