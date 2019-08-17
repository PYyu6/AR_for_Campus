// let dora_entity = document.querySelector('#dora_entity');
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