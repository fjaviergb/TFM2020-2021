function upperFont() {
    var x = document.getElementById("inputBox");
    x.value = x.value.toUpperCase();
}

function singleBox(boxOption) {
    var elem = document.getElementById(boxOption)

    if (elem.value == "false") {
        elem.value = "true";
        var div = document.createElement("div")
        var input = document.createElement("input");

        var att = document.createAttribute("type");
        att.value = "text";      
        input.setAttributeNode(att);

        var att = document.createAttribute("class");
        att.value = "input";      
        input.setAttributeNode(att);

        var att = document.createAttribute("id");
        att.value = boxOption + "input";      
        input.setAttributeNode(att);

        var father = document.getElementById('item6');
        div.appendChild(input)
        father.appendChild(div);
    }   

    else {
        elem.value="false"
        var father = document.getElementById(boxOption + 'input').parentNode;
        var div = document.getElementById(boxOption + 'input');
        father.removeChild(div);
    }
}

function submit() {
    var elem = document.getElementsByClassName("input");
    var outputArea = document.getElementById('outputArea');
   
    for(i=0;i<elem.length;i++){
        var x = elem[i].value;
        outputArea.innerHTML += x + '\n';
    }
}