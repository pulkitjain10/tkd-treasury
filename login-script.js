function init(banner){ //opens field for accepting password
    banner.addEventListener('click', acceptPW);
    function acceptPW(){
	banner.innerHTML = html1;
	removeEL();
    };
    function removeEL(){
	banner.removeEventListener('click', acceptPW);
    };
};
function checkForm(form){ //checks password and changes page accordingly
    xhr.open("POST", "http://tkd-server.herokuapp.com/check", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    pw.password= form.password.value;
    xhr.send(JSON.stringify(pw));
    xhr.onreadystatechange= function(){
	if(xhr.status === 200 && xhr.readyState === 4){
	    exitPage(banner);
	}
	else if(xhr.status === 400){	    
	    banner.innerHTML = html2;
	    document.getElementById('password').focus();
	}
    };
};
function exitPage(banner){ //changes page if password was correct
    banner.innerHTML = html3;
    setTimeout(function(){
	window.location = "/home/tuftscs/Desktop/tkd-treasury/main.html";
    }, 900);
};

var xhr= new XMLHttpRequest();
var banner, html1, html2, html3, pw;
window.onload= function(){
    banner= document.getElementById("banner");
    
    html1= '<style>h1, form{-webkit-animation: fadein 0.9s;animation: fadein 0.9s;}#banner{-webkit-filter: invert(1);filter: invert(1);transition: max-height 0.105s ease-out; -webkit-transition: max-height 0.105s ease-out; max-height: 50%;}</style><img id="tkd-symbol" src="tkd-symbol.png" alt="tkd-symbol"/><h1>ENTER PASSWORD</h1><form onsubmit="checkForm(this); return false;"><input type="password" autofocus="autofocus" id="password"><input type="submit"></form>';

    html2= '<style>#banner{-webkit-filter: invert(1);filter: invert(1);transition: max-height 0.45s linear; -webkit-transition: max-height 0.45s linear; max-height: 90%;}</style><img id="tkd-symbol" src="tkd-symbol.png" alt="tkd-symbol"/><h1>ENTER PASSWORD</h1><form onsubmit="checkForm(this); return false;"><input type="password" autofocus="autofocus" id="password"><input type="submit"></form><p class="error">Incorrect Password</p>';

    html3= '<style>body{-webkit-animation: fadeout 1.20s;animation: fadeout 1.2xs0s;}#banner{-webkit-filter: invert(1);filter: invert(1);transition: max-height 0.45s linear; -webkit-transition: max-height 0.45s linear; max-height: 90%;}</style><img id="tkd-symbol" src="tkd-symbol.png" alt="tkd-symbol"/><h1>ENTER PASSWORD</h1><form onsubmit="checkForm(this); return false;"><input type="password" autofocus="autofocus" id="password"><input type="submit"></form><p class="correct">Correct Password</p>';

    pw = { password: "" };

    init(banner);
};
