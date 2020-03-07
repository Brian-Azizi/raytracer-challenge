const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { tuple, point, vector } = require("../../src/tuple");

Given("{word} {word} tuple\\({float}, {float}, {float}, {float})", function(
  variable,
  comparator,
  float,
  float2,
  float3,
  float4
) {
  if (comparator === "<-")
    this[variable] = tuple(float, float2, float3, float4);
  else if (comparator === "=")
    assert.deepEqual(this[variable], tuple(float, float2, float3, float4));
});

Then("{word}.{word} = {float}", function(variable, property, float) {
  assert.equal(this[variable][property], float);
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

Given("{word} <- point\\({float}, {float}, {float})", function(
  variable,
  float,
  float2,
  float3
) {
  this[variable] = point(float, float2, float3);
});

Given("{word} <- vector\\({float}, {float}, {float})", function(
  variable,
  float,
  float2,
  float3
) {
  this[variable] = vector(float, float2, float3);
});
