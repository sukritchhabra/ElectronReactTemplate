import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/Header';

describe('Header.jsx', () => {
  const wrapper = shallow(<Header />);

  test('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
    const header = wrapper.find('h1');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('ReactTemplate');
  });

  test('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
