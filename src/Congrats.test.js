import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Congrats from './Congrats';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = { success: false };

/**
 * Factory function to crete a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */

// The 'setup' is going to be pretty specific to each component, which is why we are not centralizing this like we did with our 'findByTestAttr' function.
// It will take props, so that we can give it the props, depending on the test.
// And it will return a 'ShallowWrapper' that we can use for our tests.
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test('renders without error', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  // Expect a length that is not 0
  expect(message.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
