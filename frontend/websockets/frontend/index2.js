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

        var newParameter = () => {
            let list = data._data
            let res = []
            list.map((obj) => {
                res[list.indexOf(obj)] = document.getElementById(obj).value
            })
            console.log('Submiting...');
            socket.emit('parameters', res);
        };
        addSearch.onclick = newParameter;
    
        var newSearch = () => {
            socket.emit(`${data.back[0]}`,'')
        };
        socket.on('searchCond', (_data) => {
            cond.innerHTML += _data.front
        });
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
            modalContent.innerHTML = _data.back;
            let span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";

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
