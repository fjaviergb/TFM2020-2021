from urllib import request
import json

_command = json.dumps({
  "command": "findTransactions",
  "addresses": [
    "FYYR9AJO9JFSOZMMAUMUITSEQPAEG9DGQEZSLEIP9JIZBRKQQ9TLGGKIOIREPCTLOJ9PS9HEJIRYXFEEZYHPYDAMSD"
  ]
}).encode("utf-8")

_headers = {
    'content-type': 'application/json',
    'X-IOTA-API-Version': '1'
}

_request = request.Request(url='http://79.159.208.251:80', data=_command, headers=_headers)
returnData = request.urlopen(_request).read()

jsonData = json.loads(returnData)['hashes']

print(len(jsonData))