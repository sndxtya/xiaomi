// for (let i = 0; i < 10; i++) {
//   console.log(i);
// }
// for (var i = 0; i < 10; i++) {
//   console.log(i);
// }
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "/dt?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum&limit=24&start=24&_=1599619907370"
);
xhr.send();
xhr.onload = function () {
  console.log(JSON.parse(xhr.responseText));
};
