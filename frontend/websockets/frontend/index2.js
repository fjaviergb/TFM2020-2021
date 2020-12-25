

socket.on('backPage', (_data) => {
    pageContainer.innerHTML = _data.front;

    if (_data.page='backPage') {
        pageContainer.innerHTML += '<p>\'GOLAAAZO\'</p>';
    };
});
