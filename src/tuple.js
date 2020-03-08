const tuple = (x, y, z, w) => ({ x, y, z, w });
const point = (x, y, z) => tuple(x, y, z, 1);
const vector = (x, y, z) => tuple(x, y, z, 0);

const add = (t1, t2) =>
  tuple(t1.x + t2.x, t1.y + t2.y, t1.z + t2.z, t1.w + t2.w);
const subtract = (t1, t2) =>
  tuple(t1.x - t2.x, t1.y - t2.y, t1.z - t2.z, t1.w - t2.w);
const negate = vec => subtract(vector(0, 0, 0), vec);
const mult = (t, scalar) =>
  tuple(t.x * scalar, t.y * scalar, t.z * scalar, t.w * scalar);
const divide = (t, scalar) =>
  tuple(t.x / scalar, t.y / scalar, t.z / scalar, t.w / scalar);
const magnitude = vec =>
  Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z + vec.w * vec.w);
const normalize = vec => divide(vec, magnitude(vec));

module.exports = {
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
};
