// console.log('at least i logged');
const ar_entity = document.querySelector('#Dora');
const loc_input = document.querySelector('#loc_input');
const arrive_button = document.querySelector('#arrived_button');
const scene = document.querySelector('ar-scene');
// setTimeout(() => {
//     alert(Object.keys(ar_entity).map((k) => {
//         try{
//             return JSON.stringify({key: k, value: ar_entity[k]})
//         }catch(error){
//             return k
//         }
//     }).join('\n'));
// }, 5000);
// const loc_input = document.querySelector('#loc_input');
// const nav_button = document.querySelector('#submit_loc');
// const camera = document.querySelector('#camera');

// loc_input.addEventListener("input", () => {
//     // console.log(Object.keys(camera).map(k => {
//     //     try{
//     //         return JSON.stringify({key: k, value: camera[k]});
//     //     }catch(error){
//     //         return k.toString();
//     //     }
        
//     // }).join('\n'));
//     // alert(JSON.stringify(camera.object3D.getWorldDirection()));
//     alert([
//         JSON.stringify(ar_entity.object3D.getWorldPosition()),
//         JSON.stringify(ar_entity.object3D.position)   
//     ].join('\n'));

// });


const state = {
    cur_loc: undefined,
    next_loc: undefined,
    distance: undefined,
    way_points: undefined,
    is_navigating: false,
    orientation_matrix: undefined,
    search_position: undefined
};


const way_point_proximity_coefficient = 0.1;
const ar_entity_distance = 100;

// horrible approach, wait for the first location then do it.
const nav_start = () => {
    console.log('TIMEOUT AND SEARCHING');
    const input_str = loc_input.value;
    if(input_str.length <= 0){
        console.log('NO INPUT');
        return;
    }else{
        state.search_position = input_str;
    }
    find_coordinate_by_address(state.search_position)
        .then(parse_coord_search_result)
        .then((to_coord) => {
            if(!!state.cur_loc){
                // console.log('ADDRESS FOUND');
                // console.log(JSON.stringify(to_coord));
                return find_direction(state.cur_loc, to_coord);
            }else{
                throw "no current location";
            }
        })
        .then(parse_way_points)
        .then((wy_pts) => {
            // console.log('DIR FOUND');
            // console.log(JSON.stringify(wy_pts));
            
            state.next_loc = wy_pts[0];
            state.way_points = wy_pts.slice(1);
            state.distance = math.norm(lat_lon_to_world(state.cur_loc, state.next_loc));
            state.is_navigating = true;
            console.log(JSON.stringify(state));
            // alert(JSON.stringify(state));
        })
        .catch(console.log);
};

// nav_button.addEventListener("click", (e) => {
//     const target_address = loc_input.value;
//     // console.log(target_address);
//     find_coordinate_by_address(target_address)
//         .then(parse_coord_search_result)
//         .then((to_coord) => {
//             if(!!state.cur_loc){
//                 // console.log('address found ' + JSON.stringify(to_coord));
//                 return find_direction(state.cur_loc, to_coord);
//             }else{
//                 throw "no current location";
//             }
//         })
//         .then(parse_way_points)
//         .then((wy_pts) => {
//             // console.log('dir found');
//             state.is_navigating = true;
//             state.next_loc = wy_pts[0];
//             state.way_points = wy_pts.slice(1);
//             state.distance = math.norm(lat_lon_to_world(state.cur_loc, state.next_loc));
//             // alert(JSON.stringify(state));
//         })
//         .catch(alert);
// });

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
    if(state.is_navigating){
        try{
            // [state.next_loc, ...state.way_points].map(create_ar_geopose_from_coords)
            //                                      .forEach((ele) => {
            //                                          console.log(`CREATING ${ele.tagName} at ${ele.getAttribute('lla')}, compared to ${ar_entity.tagName}`)
            //                                          scene.appendChild(ele);
            //                                      });
            const lat = state.next_loc.lat;
            const lon = state.next_loc.lon;
            // console.log();
            ar_entity.setAttribute('lla', `${lon} ${lat}`);
            // ar_entity.setAttribute('referenceframe', `lla: ${lon} ${lat}`);
            // console.log(`next_loc lat: ${lat} lon: ${lon}, ${JSON.stringify(ar_entity.getAttribute('lla'))}`);
            
        }catch(error){
            console.log(error);
            // console.log('IMPOSSIBLEEEEEEEEEEEEEEEE!');
        }        
    }
}


const create_ar_geopose_from_coords = (p) => {
    const lat = p.lat;
    const lon = p.lon;
    const ele_str = `<ar-geopose look-at id="Dora" lla="${lon} ${lat}" userotation="false"> <a-entity fixedsize="20" billboard><a-entity css-object="div: #dora_text_div" scale="0.02 0.02 0.02" position="0 3 0"></a-entity></a-entity></ar-geopose>`
    return $.parseHTML(ele_str)[0];
    
}

// const update_ar_display = () => {
//     // alert('updating')
//     // if(!!state.orientation_matrix && state.is_navigating){
//     //     const display_position = world_to_mobile(state.orientation_matrix, [...lat_lon_to_world(state.cur_loc, state.next_loc), 0]);
//     //     alert(JSON.stringify(
//     //         {
//     //             walking_direction: display_position,
//     //             next_loc: state.next_loc,
//     //             cur_loc: state.cur_loc
//     //         }
//     //     ));
//     //     ar_entity.setAttribute('position', `${display_position[0][0]} ${display_position[1][0]} ${display_position[2][0]}`);
//     // }
//     // if(state.is_navigating){
//     //     // let next_lat =  state.next_loc.lat;
//     //     // let next_lon = state.next_loc.lon;
//     //     let next_lat = 43.659167499999995;
//     //     let next_lon = -79.39752949999999;
//     //     ar_entity.setAttribute('gps-entity-place', {
//     //         latitude: next_lat,
//     //         longitude: next_lon
//     //     });
//         // alert(JSON.stringify(ar_entity.getAttribute('gps-entity-place')));
//         // const display_position = lat_lng_to_screen(state.cur_loc, state.next_loc);
//         // // alert(JSON.stringify(
//         // //     {
//         // //         walking_direction: display_position,
//         // //         next_loc: state.next_loc,
//         // //         cur_loc: state.cur_loc
//         // //     }
//         // // ));
//         // let p = [display_position[0], 0, display_position[2]];
//         // let p_norm = math.norm(p);
//         // let coefficient = ar_entity_distance / p_norm;
//         // // if(coefficient > 1){
//         // //     coefficient = 1;
//         // // }
//         // p = p.map((pi) => {return pi * coefficient});

//         // ar_entity.setAttribute('position', `${p[0]} ${p[1]} ${p[2]}`);
//         // }
// }

start_watching_geolocation((loc) => {
    // alert(JSON.stringify(state))
    state.cur_loc = loc;
    // alert('lol');
    if(is_at_way_point()){
        let next_way_point_coord = state.way_points.shift();
        if(!!next_way_point_coord){
            state.next_loc = next_way_point_coord;
        }else{
            console.log('navigation successfully ended');
            state.is_navigating = false;

        }
    }
    update_ar_display();
});

// start_orientation_sensor((matrix) => {
    
//     state.orientation_matrix = matrix;
// })

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

scene.addEventListener('argon-initialized', (evt) => {
    // const bt = document.createElement('button');
    // bt.textContent='LOL';
    // console.log('INIT')
    // Object.keys(scene.sceneEl.hud).forEach(console.log);
    scene.sceneEl.hud.appendChild(document.querySelector('#hud-display'));
    document.querySelector('#nav_button').addEventListener('click', () => {
        // console.log('LOLLLLLLLLLLLLLLL')
        nav_start();
    });

    arrive_button.addEventListener('click', () => {
        console.log('ARRIVE CLICKED')
        if(state.is_navigating){
            console.log('ARRIVED CLICKED AND IS NAV')
            let next_way_point_coord = state.way_points.shift();
            if(!!next_way_point_coord){
                
                state.next_loc = next_way_point_coord;
                console.log(`NEXT POINT UPATED ${state.next_loc.lat}, ${state.next_loc.lon}`)
                update_ar_display();
            }else{
                console.log('NAV ENDED');
                state.is_navigating = false;

            }
        }
    })
});
