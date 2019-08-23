// const start_watching_geolocation = (on_update, error) => {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.watchPosition(function(position) {
//       on_update({lat: position.coords.latitude, lon: position.coords.longitude});
//     });
//   } else {
//     error({message: 'Geolocation not Available'});
//   }
// }

const start_watching_geolocation = (on_update) => {
  if('geolocation' in navigator){
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((p) => {
        on_update({lat: p.coords.latitude, lon: p.coords.longitude});
      })
    }, 100);
  }else{
    // alert('geolocation not available');
  }
}

// start_watching_geolocation(console.log);
