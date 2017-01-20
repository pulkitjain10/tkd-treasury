function init(){
    filelist= document.getElementById('files');
    filelist.addEventListener('change', function(){
    	filelist= document.getElementById('files');
		if (!window.File || !window.FileReader || !window.FileList){
	 	   alert("File API's are not fully supported by browser");
		}
		filelist= filelist.files;
		for (var i= 0; i < filelist.length; i++)
		    ReadAndSend(filelist[i]);
    });
};
function ReadAndSend(file){
    var reader= new FileReader();
    reader.onloadend = function(event) {
		text = event.target.result;
		var fixed_data = fix_data (text);
		fixed_data.unshift(file.name);
		xhr.open("POST", "http://localhost:5000/submit", true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				var input= getList();
			}
		}
		xhr.send(JSON.stringify(fixed_data));
    }
    reader.readAsText(file);
};
function fix_data (text){
	var input = [], temp = "";
    for (var i= 0; i < text.length; i++){
    	var character= text.charAt(i);
    	if ((character == "\r" || character == "\n")){
    		if (temp != "") {
    			input.push(temp);
    			temp= "";
    		}
    	}
    	else
    		temp+= character;
    }
    return input;
};
function getList(){
	xhr.open("POST", "http://localhost:5000/list.json", true);
	xhr.onreadystatechange= function(){
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			alert(xhr.responseText);
		}
	};
	xhr.send();
};
var filelist, text= "", xhr, list;
window.onload = function(){
    xhr= new XMLHttpRequest();
    list= document.getElementById('list');
    init();
};
