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
} = require("./tuple");

test("A tuple with w=1.0 is a point", () => {
  const a = tuple(4.3, -4.2, 3.1, 1.0);
  expect(a).toEqual({ x: 4.3, y: -4.2, z: 3.1, w: 1.0 });
  expect(a.w).toEqual(1);
  expect(a.w).not.toEqual(0);
});
test("A tuple with w=0.0 is a vector", () => {
  const a = tuple(4.3, -4.2, 3.1, 0.0);
  expect(a).toEqual({ x: 4.3, y: -4.2, z: 3.1, w: 0.0 });
  expect(a.w).toEqual(0);
  expect(a.w).not.toEqual(1);
});

test("point() creates tuples with w=1", () => {
  const p = point(4, -4, 3);
  expect(p).toEqual(tuple(4, -4, 3, 1));
});
test("vector() creates tuples with w=0", () => {
  const p = vector(4, -4, 3);
  expect(p).toEqual(tuple(4, -4, 3, 0));
});

test("Adding two tuples", () => {
  const a1 = tuple(3, -2, 5, 1);
  const a2 = tuple(-2, 3, 1, 0);
  expect(add(a1, a2)).toEqual(tuple(1, 1, 6, 1));
});
test("Subtracting two points", () => {
  const p1 = point(3, 2, 1);
  const p2 = point(5, 6, 7);
  expect(subtract(p1, p2)).toEqual(vector(-2, -4, -6));
});
test("Subtracting a vector from a point", () => {
  const p = point(3, 2, 1);
  const v = vector(5, 6, 7);
  expect(subtract(p, v)).toEqual(point(-2, -4, -6));
});
test("Subtracting two vectors", () => {
  const v1 = vector(3, 2, 1);
  const v2 = vector(5, 6, 7);
  expect(subtract(v1, v2)).toEqual(vector(-2, -4, -6));
});
test("Subtracting a vector from the zero vector", () => {
  const zero = vector(0, 0, 0);
  const v = vector(1, -2, 3);
  expect(subtract(zero, v)).toEqual(vector(-1, 2, -3));
});
test("Negating a tuple", () => {
  const a = tuple(1, -2, 3, -4);
  expect(negate(a)).toEqual(tuple(-1, 2, -3, 4));
});

test("Multiplying a tuple by a scalar", () => {
  const a = tuple(1, -2, 3, -4);
  expect(mult(a, 3.5)).toEqual(tuple(3.5, -7, 10.5, -14));
});
test("Multiplying a tuple by a fraction", () => {
  const a = tuple(1, -2, 3, -4);
  expect(mult(a, 0.5)).toEqual(tuple(0.5, -1, 1.5, -2));
});
test("Dividing a tuple by a scalar", () => {
  const a = tuple(1, -2, 3, -4);
  expect(divide(a, 2)).toEqual(tuple(0.5, -1, 1.5, -2));
});

test.each([
  ["vector(1, 0, 0)", 1],
  ["vector(0, 1, 0)", 1],
  ["vector(0, 0, 1)", 1],
  ["vector(1, 2, 3)", Math.sqrt(14)],
  ["vector(-1, -2, -3)", Math.sqrt(14)]
])("Computing the magnitude of %s", (v, expected) => {
  const vec = eval(v);
  expect(magnitude(vec)).toEqual(expected);
});

test("Normalizing vector(4, 0, 0) gives (1, 0, 0)", () => {
  const v = vector(4, 0, 0);
  expect(normalize(v)).toEqual(vector(1, 0, 0));
});
test("Normalizing vector(1, 2, 3)", () => {
  const v = vector(1, 2, 3);
  const expected = vector(0.26726, 0.53452, 0.80178);
  expect(normalize(v)).toEqual(
    vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
  );
});
test("The magnitude of a normalized vector", () => {
  const v = vector(1, 2, 3);
  const norm = normalize(v);
  expect(magnitude(norm)).toEqual(1);
});
