// import { request } from "https";

const find_coordinate_by_address = (address_str) => {
  return new Promise((resolve, reject) => {
    req_str = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address_str}.json?access_token=${api_key}&autocomplete=true`;
    // $.post('/cors_bypass', data={url: req_str}, sucess = (data, status) => {
    //   if(status >= 500){
    //     reject('unsuccessful cors address');
    //   }else{
    //     resolve(data);
    //   }
    // })
    $.get('/cors_bypass?' + $.param({url: req_str}), (data, status) => {
      // console.log(JSON.stringify(data));
      resolve(data);
    });

  });
};

const find_direction = (from_coord, to_coord) => {
  // coord has lat, lon
  // -73.989%2C40.733%3B-74%2C40.733
  const coord_to_str = (coord) => {
    return `${coord.lon}, ${coord.lat}`
  };
  return new Promise((resolve, reject) => {
    req_str = `https://api.mapbox.com/directions/v5/mapbox/walking/${coord_to_str(from_coord)};${coord_to_str(to_coord)}.json?access_token=${api_key}&steps=true`;
    // $.post('/cors_bypass', data={url: req_str}, success=(data, status) => {
    //   if(status >= 500){
    //     reject('unsuccessful cors dir');
    //   }else{
    //     resolve({
    //           dt: data,
    //           from_coord: from_coord,
    //           to_coord: to_coord
    //     });
      
    //   }
    // })
    $.get('/cors_bypass?' + $.param({url: req_str}), (data, status) => {
      // alert(JSON.stringify(to_coord));
      // alert(JSON.stringify(data));
      // resolve(data, from_coord, to_coord);
      // console.log(JSON.stringify(data));
      resolve({
        dt: data,
        from_coord: from_coord,
        to_coord: to_coord
      });

    });

  });
};

const parse_coord_search_result = (dt) => {
  const entry = dt.features[0];
  // console.log(JSON.stringify(entry));
  const coord = entry.geometry.coordinates;
  // console.log(JSON.stringify(coord));
  const coord_obj = {lon: coord[0], lat: coord[1]};
  return new Promise((resolve, reject) => resolve(coord_obj));
}

const parse_way_points = (kargs) => {
  // console.log(JSON.stringify(kargs));
  const dt = kargs.dt;
  // const end_coord = kargs.to_coord;
  // alert(JSON.stringify(from_coord));
  // const wy_pts = dt.waypoints;
  // const way_points = wy_pts.map((wy_pt) => {
  //   let wy_pt_coord = wy_pt.location;
  //   let wy_pt_coord_obj = {lon: wy_pt_coord[0], lat:wy_pt_coord[1]};
  //   return wy_pt_coord_obj;
  // });
  // // alert(JSON.stringify(end_coord));
  // way_points.push(end_coord);
  // return new Promise((resolve, reject)=> resolve(way_points));
  const way_points = [];
  // console.log(`DT ${JSON.stringify(dt)}`);
  dt.routes.legs[0].steps.forEach((stp_i) => {
    const instr = stp_i.maneuver.instruction;
    stp_i.intersections.forEach((intr) => {
      const lat = intr.location[1];
      const lon = intr.location[0];
      way_points.push({lat: lat, lon: lon, instruction: instr});
      
    });

  });
  return new Promise((resolve, reject) => {resolve(way_points)});



}

// for(let i = 0; i<100; i++){
//   find_direction({lon: -73.989, lat:40.733}, {lon: -74.4, lat: 40.733})
//     .then(parse_way_points)
//     // .then((...arg) => alert(JSON.stringify(arg)))
//     .then(console.log)
//     .catch(console.log);
// }
// find_coordinate_by_address('111 st. george street, Toronto, Ontario').then(parse_coord_search_result).then(console.log).catch(console.log);