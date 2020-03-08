const assert = require("assert");
const { Given, When, Then, defineParameterType } = require("cucumber");
const { tuple, point, vector } = require("../../src/tuple");
const get = require("lodash/get");

defineParameterType({
  name: "function_expression",
  regexp: /(?:tuple|point|vector)\([,\s\d\-\.]*\)/
});
defineParameterType({
  name: "nested_variable",
  regexp: /([a-zA-Z]+)\.([a-zA-Z]+(?:\.[a-zA-Z]+)*)/,
  transformer: (variable, nested_property) => [variable, nested_property]
});

Given("{word} <- {function_expression}", function(
  variable,
  function_expression
) {
  this[variable] = eval(function_expression);
});
Then("{word} = {function_expression}", function(variable, function_expression) {
  assert.deepEqual(this[variable], eval(function_expression));
});
Then("{nested_variable} = {float}", function(
  [variable, nested_property],
  float
) {
  assert.equal(get(this[variable], nested_property), float);
});

Then("{word} is a point", function(variable) {
  assert.equal(this[variable].w, 1.0);
});
Then("{word} is not a point", function(variable) {
  assert.notEqual(this[variable].w, 1.0);
});
Then("{word} is a vector", function(variable) {
  assert.equal(this[variable].w, 0);
});
Then("{word} is not a vector", function(variable) {
  assert.notEqual(this[variable].w, 0);
});
