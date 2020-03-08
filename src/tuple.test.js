const { tuple, point, vector, add, subtract } = require("./tuple");

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
