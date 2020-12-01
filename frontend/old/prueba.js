const HttpClient = require('@iota/http-client');

let settings = {
  provider: 'http://79.159.208.251:80',
  }

let httpClient = HttpClient.createHttpClient(settings);
httpClient.send({command:'getNodeInfo'})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
})
