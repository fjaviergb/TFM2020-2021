const HttpClient = require('@iota/http-client');

let settings = {
  provider: 'http://79.153.255.183:80',
  }

let httpClient = HttpClient.createHttpClient(settings);
httpClient.send({command:'getNodeAPIConfiguration'})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
})
