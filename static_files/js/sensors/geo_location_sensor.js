const start_watching_geolocation = (on_update, error) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function(position) {
      on_update({lat: position.coords.latitude, lon: position.coords.longitude});
    });
  } else {
    error({message: 'Geolocation not Available'});
  }
}
