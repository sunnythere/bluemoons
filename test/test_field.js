// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import { spy } from 'sinon';
// import Field from '../src/Field';
// import Main from '../src/Main';

// describe('<Field /> component', () => {

// 	let fieldWrapper;
// 	beforeEach(() => {
// 		onChangeSpy = spy();
// 		fieldWrapper = shallow(<Field writeText={onChangeSpy}/>);
// 	});

// 	it('has a form which takes input and sets it as props.text', () => {

// 		const form = mount(<Field />);
// 		const input = form.find('input');
// 		input.value = "A group of kittens is called a kindle."
// 		// const inputWrapper = wrapper.find('input');
// 		// inputWrapper.simulate('change');
// 		expect(fieldWrapper.node.props.value).to.be.equal(input.value);
// console.log(fieldWrapper.node.props)
// 	});

// });
