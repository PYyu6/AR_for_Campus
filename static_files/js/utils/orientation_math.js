const R_earth = 6378100;

const world_to_mobile = (m, x) => {
  return math.multiply(math.inv(m), [[x[0]], [x[1]], [x[2]]]);
  // return math.multiply(m, [[x[0]], [x[1]], [x[2]]]);
}

const lat_lon_to_world = (from_coord, to_coord) => {
  const lat1 = toRad(from_coord.lat);
  const lat2 = toRad(to_coord.lat);
  const lon1 = toRad(from_coord.lon);
  const lon2 = toRad(to_coord.lon);
  const north = lat2 - lat1;
  const east = Math.cos(lat1) * (lon2 - lon1);
  return [north * R_earth, east * R_earth];
}

const toRad = (dg) => {
  return (dg / 180) * Math.PI;
}

const lat_lng_to_screen = (from_coord, to_coord) => {
  const lat1 = toRad(from_coord.lat);
  const lat2 = toRad(to_coord.lat);
  const lon1 = toRad(from_coord.lon);
  const lon2 = toRad(to_coord.lon);
  let lat = lat2 - lat1;
  let lng = lon2 - lon1;

  lat = Math.PI / 2 - lat;

  //distribute to sphere
  const out = [Math.sin( lat ) * Math.sin( lng ), Math.cos( lat ), Math.sin( lat ) * Math.cos( lng )];
      

  return out;

}
