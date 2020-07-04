import React from 'react';
import { shallow } from 'enzyme';
import TransactionDetails from '../transactions/TransactionDetails';

describe('TransactionDetails', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<TransactionDetails debug />);
    expect(component).toMatchSnapshot();
  });
});