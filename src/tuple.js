const tuple = (x, y, z, w) => ({ x, y, z, w });
const point = (x, y, z) => tuple(x, y, z, 1);
const vector = (x, y, z) => tuple(x, y, z, 0);

const add = (t1, t2) =>
  tuple(t1.x + t2.x, t1.y + t2.y, t1.z + t2.z, t1.w + t2.w);
const subtract = (t1, t2) =>
  tuple(t1.x - t2.x, t1.y - t2.y, t1.z - t2.z, t1.w - t2.w);

module.exports = {
  tuple,
  point,
  vector,
  add,
  subtract
};
