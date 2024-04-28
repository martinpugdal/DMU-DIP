fetch('https://jsonplaceholder.typicode.com/todos/2')
  .then(getResponse).catch(() => console.log("Noget gik galt"))
  .then(show);

function show(json) {
  console.log(json);
}
function getResponse(response) {
  if (response.status!== 200) {
    throw new Error("Fejl:" + response.status);
  }
  return response.json();
}

