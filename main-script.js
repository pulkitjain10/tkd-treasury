function init(){
    filelist= document.getElementById('files');
    filelist.addEventListener('change', function(){
	filelist= document.getElementById('files');
	if (window.File && window.FileReader && window.FileList){
	} else {
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
	data.raw_data= text;
	console.log(text);
	xhr.open("POST", "http://localhost:5000/submit", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(JSON.stringify(data));
    }
    reader.readAsText(file);
};
var filelist, text= "", xhr, data;
window.onload = function(){
    data= { raw_data: "" };
    xhr= new XMLHttpRequest();
    init();
};
