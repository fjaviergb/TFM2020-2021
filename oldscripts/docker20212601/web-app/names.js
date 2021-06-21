const DATABASE = {
    // #########
    // DATA-BASE
    // #########
    CONNECTIONLIMIT: 10,
    HOST: "database",
    USER: "root",
    PORT: 3306,
    PASSWORD: "13186",
    DATABNAME: "TFM_DB",
};

const FRONTPAGE = {
    NAME:'frontPage',
    HTML: {
        'front':
        '<div id=\'options\'>'+
        '<button id=\'register\' type=\'submit\'>Register</button>'+
        '<button id=\'login\' type=\'submit\'>Login</button>'+
        '</div>'+
        '<div id=\'optionsContainer\'></div>',
        'page': 'frontPage'
    },
};

const OPTIONSCONTAINER = {
    HTML_REGISTER: {
        'front':
        '<div id=\'registerContainer\'>'+
        '<input type=\'text\' id=\'regName\'>Name</input>'+
        '<br>'+
        '<input type=\'text\' id=\'regPassword\'>Password</input>'+
        '<br>'+
        '<input type=\'text\' id=\'regEmail\'>Email</input>'+
        '<br>'+
        '<button id=\'registerSubmit\' type=\'submit\'>Submit</button>'+
        '</div>'+
        '<div id=\'registerStatus\'></div>',
        'back': 'registerSubmit',
        '_data': ['regName','regPassword','regEmail'],
        'status': 'registerStatus',
    },
    HTML_LOGIN: {
        'front':
        '<div id=\'loginContainer\'>'+
        '<input type=\'text\' id=\'logName\'>Name</input>'+
        '<br>'+
        '<input type=\'text\' id=\'logPassword\'>Password</input>'+
        '<br>'+
        '<button id=\'loginSubmit\' type=\'submit\'>Submit</button>'+
        '</div>'+
        '<div id=\'loginStatus\'></div>',
        'back': `loginSubmit`,
        '_data': ['logName','logPassword'],
        'status': 'loginStatus',
    }
}

const BACKPAGE = {
    HTML: {
        'front':
        '<div id=\'options\'>'+
        '<button id=\'profile\' type=\'submit\'>Profile</button>'+
        '<button id=\'searcher\' type=\'submit\'>Searcher</button>'+
        '</div>'+
        '<div id=\'optionsContainer2\'></div>',
        'page': 'backPage',
        }
}

const OPTIONSCONTAINERPROFILE = {
    HTML: {
        'type': 0,
        'front':
        '<div id=\'profileContainer\'>'+
        '<input type=\'text\' id=\'regAddress\'>New Address</input>'+
        '<button id=\'addressSubmit\' type=\'submit\'>Add</button>'+
        '<br>'+
        '<input type=\'text\' id=\'regTag\'>New Tag</input>'+
        '<button id=\'tagSubmit\' type=\'submit\'>Add</button>'+
        '<br><p>List of addresses</p>'+
        '<div id=\'listAddresses\'></div>'+
        '<br><p>List of tags</p>'+
        '<div id=\'listTags\'></div>'+
        '</div>',
        'back': ['addressSubmit','tagSubmit','listAddresses','listTags'],
    },

    NEWADDRESS(data,name) {return `<div>${data}`+
    `<button id=${data}Button> Name as</button>`+
    `<input type=\'text\' id=\'${data}\' placeholder=\'${name}\'></div>`+
    `<button id=${data}Del>Delete</button>`},

    NEWTAG(data,name) {return `<div>${data}`+
    `<button id=${data}Button> Name as</button>`+
    `<input type=\'text\' id=\'${data}\' placeholder=\'${name}\'></div>`+
    `<button id=${data}Del>Delete</button>`}

};

const OPTIONSCONTAINERSEARCH = {
    HTML: {
        'type': 1,
        'front':
        '<div id=\'searchContainer\'>Choose between options'+
        '<br>'+
        `<form>`+

        '<select name=\'parenthStart\' multiple>'+
        '<option value=\'(\'>(</option>'+
        '<option selected="selected" value=\'\'>null</option>'+      
        '</select>'+

        '<select name=\'ifOptions\' id=\'ifOption\' multiple>'+
        '<option selected="selected" value=\'\'>YES</option>'+
        '<option value=\'NOT\'>NOT</option>'+      
        '</select>'+

        '<select name=\'searchOptions\' id=\'searchOption\' multiple>'+
        '<option value=\'idad=\'>Address</option>'+
        '<option value=\'idta=\'>Tag</option>'+
        '<option selected="selected" value=\'\'>null</option>'+
        '</select>'+

        '<select name=\'contentOptions\' id=\'contentOptions\'>'+
        '`<option selected="selected" value=\'\'>null</option>`</select>'+
        // TODO: PONER LISTA DE ADDRESSES/TAGS ASOCIADAS AL CLIENTE

        '<select name=\'parenthEnd\' multiple>'+
        '<option value=\')\'>)</option>'+
        '<option selected="selected" value=\'\'>null</option>'+      
        '</select>'+

        '<select name=\'logicOptions\' id=\'logicOption\' multiple>'+
        '<option value=\'AND\'>AND</option>'+
        '<option value=\'OR\'>OR</option>'+
        '<option value=\'XOR\'>XOR</option>'+     
        '<option selected="selected" value=\'\'>null</option>'+
        '</select>'+

        `</form>`+
        '<br>'+
        '<button id=\'addSearch\' type=\'submit\'>Add</button>'+
        '</div>'+
        '<div id=\'searchCond\'><p>Search conditions:</p></div>'+
        '<button id=\'clearCond\' type=\'submit\'>Clear</button>'+
        '<br>'+
        '<button id=\'searchSubmit\' type=\'submit\'>Search</button>'+
        '<br>'+
        '<p>Results: </p>'+
        '<div id=\'searchResult\'></div>'+
        '<button id=\'clearSearch\' type=\'submit\'>Clear</button>'+

        '<div id=\'orderContainer\'>'+
        '<form>'+
        '<select name=\'order\' multiple>'+
        '<option value=\'desc\'>desc</option>'+
        '<option value=\'asc\'>asc</option>'+ 
        '<option selected="selected" value=\'\'>null</option>'+                 
        '</select>'+
        '<label for=\'startDate\'>Start date:</label>'+
        '<input type=\'date\' id=\'startDate\' name=\'startDate\' value=\'2020-11-01\' min=\'2018-01-01\'></input>'+
        '<label for=\'endDate\'>End date:</label>'+
        '<input type=\'date\' id=\'endDate\' name=\'endDate\' value=\'2020-11-16\' min=\'2018-01-01\'></input>'+
        '</form>'+
        '<button id=\'sortSearch\' type=\'submit\'>Sort</button>'+
        '</div>'+

        '</div>'+
        '<div id="myModal" class="modal">'+
        '<div class="modal-content">'+
        '</div>'+
        '</div>',
        'back': ['searchSubmit','addSearch','searchCond','searchResult','searchContainer','clearCond','clearSearch','sortSearch','orderContainer','contentOptions'],
        '_data': ['parenthStart','ifOptions', 'searchOptions', 'contentOptions', 'logicOptions','parenthEnd']
    }
}

const RESPONSE = {
    'trytes': {
        'type': 'trytes',
        'options': '<span class="close">&times;</span>'+
        `<input type="radio" id="structOption" name="expandOptions">`+
        `<label for="structOption">Structured</label><br></br>`+
        `<input type="radio" id="trytesOption" name="expandOptions">`+
        `<label for="trytesOption">AsTrytes</label><br>`+
        `<p class="text"></p>`
    },
    'structured': {
        'type': 'structure',
        'options': '<span class="close">&times;</span>'+
        `<input type="radio" id="structOption" name="expandOptions">`+
        `<label for="structOption">Structured</label><br></br>`+
        `<input type="radio" id="trytesOption" name="expandOptions">`+
        `<label for="trytesOption">AsTrytes</label><br>`+
        `<p class="text"></p>`+
        `<form>`+
        `<input type="radio" id="diffieHellman" name="decrypyOptions" value="diffieHellman">`+
        `<label for="diffieHellman">Diffie-Hellman</label><br>`+
        `<input type="radio" id="RSA" name="decrypyOptions" value="RSA">`+
        `<label for="RSA">RSA</label><br>`+
        `<input type="radio" id="DSA" name="decrypyOptions" value="DSA">`+
        `<label for="DSA">DSA</label><br>`+
        `<label for="pKey">Public Key:</label><br>`+
        `<input type="text" id="pKey" name="pKey"><br>`+
        `</form>`+
        '<button id=\'submitDecrypt\'>Decrypt</button>'+
        `<p class="text-decrypt"></p>`
        }
};

const NEWRESPONSE = {
    HTML(el) { return `<p>Hash: ${el.name} <br>`+
    `Date: ${new Date(el.timestamp*1000)} <br>`+
    `<button id=${el.name}Button value=${el.name}>Expand</button>`+
    `</p>`}
};

module.exports.DATABASE = DATABASE;
module.exports.FRONTPAGE = FRONTPAGE;
module.exports.OPTIONSCONTAINER = OPTIONSCONTAINER;
module.exports.BACKPAGE = BACKPAGE;
module.exports.OPTIONSCONTAINERPROFILE = OPTIONSCONTAINERPROFILE;
module.exports.OPTIONSCONTAINERSEARCH = OPTIONSCONTAINERSEARCH;
module.exports.RESPONSE = RESPONSE;
module.exports.NEWRESPONSE = NEWRESPONSE;

