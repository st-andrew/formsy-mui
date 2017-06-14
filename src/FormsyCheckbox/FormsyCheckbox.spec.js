import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {mount} from 'enzyme';
import {Form} from 'formsy-react';

import Checkbox from 'material-ui/Checkbox';
import FormsyCheckbox from './FormsyCheckbox';

import test from 'tape';
import Sinon from 'sinon';

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyCheckbox renders a material-ui Checkbox', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' />
    </Form>
  );

  assert.equals(wrapper.find(Checkbox).length, 1);

  assert.end();
});

test('FormsyCheckbox sends value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' checked />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input').node;

  // Make sure the formsyCheckbox component has the right value
  assert.true(formsyCheckbox.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  // Make sure the DOM has the right value
  assert.true(input.checked);

  assert.end();
});

test('FormsyCheckbox change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' checked={false} />
    </Form>
  );

  const formsyForm = wrapper.find(Form).node;

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input');

  input.node.checked = true;

  input.simulate('change');

  // Make sure the formsyCheckbox component has the right value
  assert.true(formsyCheckbox.getValue());

  // Make sure the Formsy Form component has the right value
  assert.true(formsyForm.getCurrentValues().test);

  assert.end();
});

test('FormsyCheckbox resetValue sets value back to original value', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' checked={false} />
    </Form>
  );

  const formsyCheckbox = wrapper.find(FormsyCheckbox).node;

  const input = wrapper.find('input');

  assert.equals(input.node.checked, false);

  input.node.checked = true;

  input.simulate('change');

  assert.true(formsyCheckbox.getValue());

  formsyCheckbox.resetValue();

  assert.false(formsyCheckbox.getValue());

  assert.false(input.node.checked);

  assert.end();
});

test('FormsyCheckbox onChange prop is called', (assert) => {
  const onChangeSpy = Sinon.spy();

  const wrapper = mountWithContext(
    <Form>
      <FormsyCheckbox name='test' onChange={onChangeSpy} />
    </Form>
  );

  wrapper.find('input').simulate('change');

  assert.true(onChangeSpy.calledOnce);

  assert.end();
});
