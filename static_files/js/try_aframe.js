const ar_entity = document.querySelector('#dora_entity');
const loc_input = document.querySelector('#loc_input');
const nav_button = document.querySelector('#submit_loc');
const state = {
    cur_loc: undefined,
    next_loc: undefined,
    distance: undefined,
    way_points: undefined,
    is_navigating: false,
    orientation_matrix: undefined
};

const way_point_proximity_coefficient = 0.1;

nav_button.addEventListener("click", (e) => {
    const target_address = loc_input.value;
    // console.log(target_address);
    find_coordinate_by_address(target_address)
        .then(parse_coord_search_result)
        .then((to_coord) => {
            if(!!state.cur_loc){
                // console.log('address found ' + JSON.stringify(to_coord));
                return find_direction(state.cur_loc, to_coord);
            }else{
                throw "no current location";
            }
        })
        .then(parse_way_points)
        .then((wy_pts) => {
            // console.log('dir found');
            state.is_navigating = true;
            state.next_loc = wy_pts[0];
            state.way_points = wy_pts.slice(1);
            state.distance = math.norm(lat_lon_to_world(state.cur_loc, state.next_loc));
        })
        .catch(alert);
});

const is_at_way_point = () => {
    if(state.is_navigating){
        const dir = lat_lon_to_world(state.cur_loc, state.next_loc);
        const dis = math.norm(dir);
        return dis <= way_point_proximity_coefficient * state.distance;
    }else{
        return false;
    }

} 

const update_ar_display = () => {
    if(!!state.orientation_matrix && state.is_navigating){
        const display_position = world_to_mobile(state.orientation_matrix, [...lat_lon_to_world(state.cur_loc, state.next_loc), 0]);
        ar_entity.setAttribute('position', `${display_position[0][0]} ${display_position[1][0]} ${display_position[2][0]}`);
    }
}

start_watching_geolocation((loc) => {
    state.cur_loc = loc;
    // alert('lol');
    if(is_at_way_point()){
        let next_way_point_coord = state.way_points.shift();
        if(!!next_way_point_coord){
            state.next_loc = next_way_point_coord;
        }else{
            alert('navigation successfully ended');
            state.is_navigating = false;

        }
    }
    update_ar_display();
});

start_orientation_sensor((matrix) => {
    // alert('!');
    state.orientation_matrix = matrix;
})

// const times = {time: 1}
// setInterval(() => {
//   times.time += 1;
//   new_str = "0 0 " + (-times.time * 100).toString();
//   dora_entity.setAttribute('position', new_str);
//   console.log(new_str);
// }, 1000);

// navigator.permissions.query({name: 'gyroscope'}).then((result) => {
//   if(result.state === 'granted'){
//     // alert('?!');
//     let gyro_s = new Gyroscope({frequency: 1});
//     gyro_s.addEventListener('reading', (e) => {alert(JSON.stringify({x:gyro_s.x, y:gyro_s.y, z:gyro_s.z}))});
//     gyro_s.start();
//   }else{
//     alert('...');
//   }
// })