socket.on('backPage', (_data) => {
    pageContainer.innerHTML = _data.front;
    console.log(_data.user[0])

    let searcher = document.getElementById('searcher');
    let profile = document.getElementById('profile');
    let optionsContainer2 = document.getElementById('optionsContainer2');


    searcher.addEventListener('click', () => {
        console.log('On Searching...')
        socket.emit('searcher', '')
    })

    profile.addEventListener('click', () => {
        console.log('On profiles...')
        socket.emit('profile', '')
    })

    socket.on('optionsContainerProfile', (data) => {
        optionsContainer2.innerHTML=data.front;

        let addressSubmit = document.getElementById(data.back[0]);
        let tagSubmit = document.getElementById(data.back[1]);
        let listAddresses = document.getElementById(data.back[2]);
        let listTags = document.getElementById(data.back[3]);

        addressSubmit.addEventListener('click', () => {
            socket.emit('addressSubmit', document.getElementById('regAddress').value)
         });

        tagSubmit.addEventListener('click', () => {
            socket.emit('tagSubmit', document.getElementById('regTag').value)
         });

        socket.on('newTag', (_data) => {
            listTags.innerHTML += _data;
         });

        socket.on('newAddress', (_data) => {
            listAddresses.innerHTML += _data;
         });
    });
    
    socket.on('optionsContainerSearcher', (data) => {
        optionsContainer2.innerHTML=data.front;

        var searchSubmit = document.getElementById(data.back[0]);
        var addSearch = document.getElementById(data.back[1]);
        var cond = document.getElementById(data.back[2]);
        var results = document.getElementById(data.back[3]);
        var searchContainer = document.getElementById(data.back[4]);
        var clearCond = document.getElementById(data.back[5]);
        var clearSearch = document.getElementById(data.back[6]);
        var sortSearch = document.getElementById(data.back[7]);
        var orderContainer = document.getElementById(data.back[8]);

        sortSearch.onclick = () => {
            results.innerHTML = '';
            let form = orderContainer.querySelector("form");
            let dataForm = new FormData(form);
            socket.emit('sortThis', dataForm.get('order'));
        };

        clearCond.onclick = () => {
            socket.emit('clearCond', '');
        };

        socket.on('clearCond', (data) => {
            cond.innerHTML = ''
        });

        clearSearch.onclick = () => {
            socket.emit('clearSearch', '');
        };

        socket.on('clearSearch', () => {
            results.innerHTML = ''
        });

        var newParameter = () => {
            let form = searchContainer.querySelector("form");
            let dataForm = new FormData(form);
            let list = data._data
            let res = []
            list.map((obj) => {
                res[list.indexOf(obj)] = dataForm.get(obj)
            })
            console.log('Submiting...');
            socket.emit('parameters', res);
        };
        addSearch.onclick = newParameter;
    
        socket.on('searchCond', (_data) => {
            cond.innerHTML += _data.front
        });

        var newSearch = () => {
            socket.emit(`${data.back[0]}`,'')
            results.innerHTML = ''
        };
        searchSubmit.addEventListener('click', newSearch);
    
        socket.on('searchResponse', (_data) => {
            results.innerHTML += _data.front
            _data.buttons.forEach((el) => {
                document.getElementById(el).addEventListener('click', () => socket.emit('expandThis',document.getElementById(el).value))
            });
        });     

        socket.on('expandThat', (_data) => {
            let modal = document.getElementById("myModal");
            let modalContent = document.getElementsByClassName("modal-content")[0];
            modalContent.innerHTML = _data[0];
            let _text = document.getElementsByClassName("text")[0];
            if (_data[1].type === 'trytes') {_text.innerHTML =`${_data[1].content}`;}
            else {
                _text.innerHTML =
                `Hash: ${_data[1].hash} <br>`+
                `Timestamp: ${_data[1].timestamp} <br>`+
                `Address: ${_data[1].address} <br>`+
                `Tag: ${_data[1].tag} <br>`+
                `Message: ${trytesToAscii(_data[1].message)}`;

                let submitDecrypt = document.getElementById("submitDecrypt");
                let decryptRes = document.getElementsByClassName("text-decrypt")[0];
                let form = modalContent.querySelector("form");
    
                submitDecrypt.addEventListener("click", () => {
                    let dataForm = new FormData(form);
                    socket.emit(`decrypt`,[dataForm.get('decrypyOptions'),dataForm.get('pKey'),trytesToAscii(_data[1].message)])
                });
    
                socket.on('decryptResponse', (dataDecrypted) => {
                    decryptRes.innerHTML = dataDecrypted;
                });
    
            }
            
            let span = document.getElementsByClassName("close")[0];
            let trytesOption = document.getElementById("trytesOption");
            let structOption = document.getElementById("structOption");

            modal.style.display = "block";


            trytesOption.onclick = () => {
                socket.emit(`swapExpand`,'trytes')
            };

            structOption.onclick = () => {
                socket.emit(`swapExpand`,'structured')
            };

            span.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        });

    });
});

const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const asciiToTrytes = (input) => {
    let trytes = '';
    for (let i = 0; i < input.length; i++) {
        var dec = input[i].charCodeAt(0);
        trytes += TRYTE_ALPHABET[dec % 27];
        trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
    }
    return trytes;
};

const trytesToAscii = (trytes) => {
    let ascii = '';
    for (let i = 0; i < trytes.length - 1; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};

