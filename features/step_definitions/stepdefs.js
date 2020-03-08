const assert = require("assert");
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
  magnitude
} = require("../../src/tuple");
const get = require("lodash/get");

defineParameterType({
  name: "function_expression",
  regexp: /(?:tuple|point|vector|Math\.sqrt)\([,\s\d\-\.]*\)/
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
  assert.equal(eval(`${func}(x)`), eval(expected));
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
