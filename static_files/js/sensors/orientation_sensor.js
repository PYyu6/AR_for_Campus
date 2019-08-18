function start_orientation_sensor(call_back){
  Promise.all([navigator.permissions.query({ name: "accelerometer" }),
              navigator.permissions.query({ name: "magnetometer" }),
              navigator.permissions.query({ name: "gyroscope" })])
        .then(results => {
              if (results.every(result => result.state === "granted")) {
                const sensor = new AbsoluteOrientationSensor({frequency: 1, referenceFrame: 'device'});

                sensor.addEventListener('reading', () => {
                  // let mtx = model.quaternion.fromArray(sensor.quaternion).inverse();
                  // alert(mtx)
                  // alert(JSON.stringify(sensor.quaternion));
                  // const [x, y, z, w] = sensor.quaternion;
                  let x = Number(sensor.quaternion[0]);
                  let y = Number(sensor.quaternion[1]);
                  let z = Number(sensor.quaternion[2]);
                  let w = Number(sensor.quaternion[3]); 
                  call_back([[1 - 2 * y * y - 2 * z * z, 2 * x * y - 2 * z * w, 2 * x * z + 2 * y * w], [2 * x * y + 2 * z * w, 1 - 2 * x * x - 2 * z * z, 2 * y * z - 2 * x * w], [2 * x * z - 2 * y * w, 2 * y * z + 2 * x * w, 1 - 2 * x * x - 2 * y * y]]);
                  // alert(JSON.stringify({x, y, z, w}));
                  // alert([1 - 2 * y * y - 2 * z * z, 2 * x * y - 2 * z * w, 2 * x * z + 2 * y * w]);
                  // alert([2 * x * y + 2 * z * w, 1 - 2 * x * x - 2 * z * z, 2 * y * z - 2 * x * w]);
                  // alert([2 * x * z - 2 * y * w, 2 * y * z + 2 * x * w, 1 - 2 * x * x - 2 * y * y]);
                });
                sensor.start();

                } else {
                  alert("No permissions to use AbsoluteOrientationSensor.");
                }
  }).catch(alert);
}

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