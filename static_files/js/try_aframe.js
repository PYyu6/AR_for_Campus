let dora_entity = document.querySelector('#dora_entity');
const times = {time: 1}
setInterval(() => {
  times.time += 1;
  new_str = "0 0 " + (-times.time * 100).toString();
  dora_entity.setAttribute('position', new_str);
  console.log(new_str);
}, 1000);