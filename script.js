var alphabet = "abcdefghijklmnopqrstuvwxyz";

//makin the user write his name
function startApp(){
    let userName= document.querySelector("#name-input").value;
    if(userName === ""){
        alert("You must enter your name to continue!");
        return;
    }
    document.querySelector("#main-title").innerHTML= "Welcome to Cipher-x, " + userName + "!";
    document.querySelector("#name-gate").style.display= "none";
    document.querySelector("#main-content").style.display= "block";
}

//make the user's feedback vanish after click on send btn and write a thnx u msg for the user
function sendFeedBack(){
    let feedbackText= document.querySelector("#feedback-text").value;
    if(feedbackText === ""){
        alert("write your FeedBack first!")
        return;
    }
    document.querySelector("#feedback-text").value = "";
    alert("Thank you for your feedback ♡");
}

//swich tabs
function showTab(id){
    document.querySelector("#mainHome").style.display = "none";
    document.querySelector("#encrypt").style.display = "none";
    document.querySelector("#decrypt").style.display = "none";
    document.querySelector("#breakCipher").style.display = "none";
    document.querySelector("#about").style.display = "none";
    document.querySelector("#feedback").style.display = "none";
    document.querySelector("#id").style.display = "block";
}

//close all tabs and show mainHome
function goMain(){
    document.querySelector("#mainHome").style.display = "block";
    document.querySelector("#encrypt").style.display = "none";
    document.querySelector("#decrypt").style.display = "none";
    document.querySelector("#breakCipher").style.display = "none";
    document.querySelector("#about").style.display = "none";
    document.querySelector("#feedback").style.display = "none";
}

//show keyNumber if its Caesar, show keyWord if its Vigenère
function toggleEncKeyField(){
    let algo = document.querySelector("#enc-algo").value;
    if(algo === "caesar"){
        document.querySelector("#enc-key-number").style.display = "block";
        document.querySelector("#enc-key-word").style.display = "none";
    } else{
        document.querySelector("#enc-key-number").style.display = "none";
        document.querySelector("#enc-key-word").style.display = "block";
    }
}

//Caesar Cipher
function caesarShift(text, shift){
    var result = "";
    for(let i=0; i<text.length; i++){
        let char = text[i];
        let lower = char.toLowerCase();
        let index = alphabet.indexOf(lower);
        if(index === -1){
            result = result + char;
        }else{
            let newIndex = (index + shift)%26;
            if(newIndex < 0){
                newIndex = newIndex + 26;
            }
            let newChar = alphabet[newIndex];
            if(char === char.toUpperCase()){
                newChar = newChar.toUpperCase();
            }
            result = result + newChar;
        }
    }
    return result;
}

//Vigenère Cipher
function vigenereShift(text, key, encrypt){
    let cleanKey = "";
    for (let i=0; i<key.length; i++){
        let k = key[i].toLowerCase();
        if(alphabet.indexOf(k) != -1){
            cleanKey = cleanKey + k;
        }
    }
    if(cleanKey.length === 0){
        return null;
    }
    let result = "";
    let keyPos = 0;
    for(let i=0; i<text.length; i++){
        let char = text[i];
        let lower = char.toLowerCase();
        let letterIndex = alphabet.indexOf(lower);
        if(letterIndex === -1){
            result = result + char;
        }else{
            let keyChar = cleanKey[keyPos % cleanKey.length];
            let shift = alphabet.indexOf(keyChar);
            if(encrypt === false){
                shift = 26 - shift;
            }
            let newIndex = (letterIndex + shift) % 26;
            let newChar = alphabet[newIndex];
            if(char === char.toUpperCase()){
                newChar = newChar.toUpperCase();
            }
            result = result + newChar;
            keyPos = keyPos + 1;
        }
    }
    return result;
}

function doEncrypt(){
    let text = document.querySelector("#enc-text").value;
    let algo = document.querySelector("#enc-algo").value;
    if (text === ""){
        alert("write your text first");
        return;
    }
    if (algo === "caesar"){
        let key = document.querySelector("#enc-key-number").value;
        if (key === ""){
            alert("write your keyNumber");
            return;
        }
        let shift =Number(key);
        document.querySelector("#enc-output").innerHTML = caesarShift(text,  shift);
    }else{
        let key = document.querySelector("#enc-key-word").value;
        if (key === ""){
            alert("write your keyWord");
            return;
        }
        let result = vigenereShift(text, key, true);
        if (result === null){
            alert("key must consist English letters");
        }else{
            document.querySelector("#enc-output").innerHTML = result;
        }
    }
}

function doDecrypt(){
    let text = document.querySelector("#dec-text").value;
    let algo = document.querySelector("#dec-algo").value;
    let key = document.querySelector("#dec-key").value;
    if (text === ""){
        alert("write your encrypted text");
        return;
    }
    if (key === ""){
        alert("write your key");
        return;
    }
    if (algo === "caesar"){
        let shift = Number(key);
        document.querySelector("#dec-output").innerHTML = caesarShift(text, 26-shift);
    }else{
    let result = vigenereShift(#text, key, false);
        if (result === null){
            alert("key must consist English letters");
        }else{
            document.querySelector("#dec-output").innerHTML = result;
        }
    }
}

//Break Caesar Cipher
function doBreak(){
    let text = document.querySelector("#break-text").value;
    if (text === ""){
        alert("write your encrypted text");
        return;
    }

    //
    let counts = [];
    for (let i=0; i<26; i++){
        counts.push(0);
    }
    for (let i=0; i<text.length; i++){
        let char = text[i].toLowerCase();
        let index = alphabet[char];
        if (index !== -1){
            counts[index] = counts[index] + 1;
        }
    }

    //
    let charHTML = "Letter Frequency Distribution:<br>";
    for (let i=0; i<26; i++){
        let letter = alphabet[i].toUpperCase();
        let stars = "";
        for (let j=0; j<counts[i]; j++){
            stars = stars + "*";
        }
        charHTML = charHTML + letter + ": " + stars + " (" +  counts[i] + ")<br>";
    }
    document.querySelector("#break-chart").innerHTML = charHTML;

    //
    let listHTML = "";
    for (let shift=0; shift<26; shift++){
        let decrypted = caesarShift(text, 26-shift);
        listHTML = listHTML + "Shift" + shift + ": " + decrypted + "<br>";
    }
    document.querySelector("#break-output").innerHTML = listHTML;
}

goMain();
