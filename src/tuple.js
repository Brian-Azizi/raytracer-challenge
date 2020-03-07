const tuple = (x, y, z, w) => ({ x, y, z, w });
const point = (x, y, z) => tuple(x, y, z, 1);
const vector = (x, y, z) => tuple(x, y, z, 0);
module.exports = {
  tuple,
  point,
  vector
};
