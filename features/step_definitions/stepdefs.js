const assert = require("assert");
const expect = require("expect");
const { Given, When, Then, defineParameterType } = require("cucumber");
const {
  tuple,
  point,
  vector,
  add,
  subtract,
  negate,
  mult,
  divide,
  magnitude,
  normalize
} = require("../../src/tuple");
const get = require("lodash/get");

defineParameterType({
  name: "function_expression",
  regexp: /(?:tuple|point|vector|normalize|Math\.sqrt)\([,\s\d\-\.]*\)/
});
defineParameterType({
  name: "nested_variable",
  regexp: /([a-zA-Z]+)\.([a-zA-Z]+(?:\.[a-zA-Z]+)*)/,
  transformer: (variable, nested_property) => [variable, nested_property]
});
defineParameterType({
  name: "variable",
  regexp: /[a-zA-Z_]+[a-zA-Z_0-9]*/
});

Given("{variable} <- {function_expression}", function(
  variable,
  function_expression
) {
  this[variable] = eval(function_expression);
});
Then("{variable} = {function_expression}", function(
  variable,
  function_expression
) {
  assert.deepEqual(this[variable], eval(function_expression));
});
Then("{variable} + {variable} = {function_expression}", function(
  variable1,
  variable2,
  function_expression
) {
  assert.deepEqual(
    add(this[variable1], this[variable2]),
    eval(function_expression)
  );
});
Then("{variable} - {variable} = {function_expression}", function(
  variable1,
  variable2,
  function_expression
) {
  assert.deepEqual(
    subtract(this[variable1], this[variable2]),
    eval(function_expression)
  );
});
Then("-{variable} = {function_expression}", function(
  variable,
  function_expression
) {
  assert.deepEqual(negate(this[variable]), eval(function_expression));
});
Then("{variable} * {float} = {function_expression}", function(
  variable,
  scalar,
  function_expression
) {
  assert.deepEqual(mult(this[variable], scalar), eval(function_expression));
});
Then("{variable} / {float} = {function_expression}", function(
  variable,
  scalar,
  function_expression
) {
  assert.deepEqual(divide(this[variable], scalar), eval(function_expression));
});
Then("{variable}\\({variable}) = {float}", function(func, variable, float) {
  const x = this[variable];
  assert.equal(eval(`${func}(x)`), float);
});
Then("{variable}\\({variable}) = {function_expression}", function(
  func,
  variable,
  expected
) {
  const x = this[variable];
  assert.deepEqual(eval(`${func}(x)`), eval(expected));
});
Then("{variable}\\({variable}) = approximately {function_expression}", function(
  func,
  variable,
  result
) {
  const x = this[variable];
  const v = eval(`${func}(x)`);
  const expected = eval(result);
  expect(v.x).toBeCloseTo(expected.x);
  expect(v.y).toBeCloseTo(expected.y);
  expect(v.z).toBeCloseTo(expected.z);
});
When("{variable} <- {variable}\\({variable})", function(
  variable,
  func,
  variable2
) {
  const x = this[variable2];
  this[variable] = eval(`${func}(x)`);
});
Then("{nested_variable} = {float}", function(
  [variable, nested_property],
  float
) {
  assert.equal(get(this[variable], nested_property), float);
});

Then("{variable} is a point", function(variable) {
  assert.equal(this[variable].w, 1.0);
});
Then("{variable} is not a point", function(variable) {
  assert.notEqual(this[variable].w, 1.0);
});
Then("{variable} is a vector", function(variable) {
  assert.equal(this[variable].w, 0);
});
Then("{variable} is not a vector", function(variable) {
  assert.notEqual(this[variable].w, 0);
});
