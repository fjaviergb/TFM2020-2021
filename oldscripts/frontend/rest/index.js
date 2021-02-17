window.onload = () => {
    const newHtml = document.getElementById('newHtml');
    const xhr = new XMLHttpRequest;
    xhr.open('GET', '/');
    xhr.onload = () => {console.log(xhr.response)};
    xhr.send()
}
