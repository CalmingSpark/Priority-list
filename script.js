const fs = require('fs');
window.addEventListener('load', function() {
	fs.readFile("resources/input_File.json", "utf8", function(error,data){ 
	if(error) throw error; 
	parsingFile(data);
	});
})

function parsingFile(data) {
	var tbody = document.getElementById('tMainBody');
    let c = data.split('},\n').length;

    for (var i = 1; i <= c ; i++) {
    	let start = '{\n"id":"' + i;
    	if (i != c) {
		    let end = '"id":"' + (i + 1);
            let indexStart = data.indexOf(start);
    		let indexEnd = data.indexOf(end);
    		obj_json = data.slice(indexStart, indexEnd);
    		obj_json = obj_json.replace(`,\n{`,``);
		}

		if (i == c) {
		    let end = '{end}';
            let indexStart = data.indexOf(start);
    		let indexEnd = data.indexOf(end);
    		obj_json = data.slice(indexStart, indexEnd);
		}

		var row = document.createElement("tr");
	    var td1 = document.createElement("td");
	    var td2 = document.createElement("td");
	    var td3 = document.createElement("td");

	    var text = JSON.parse(obj_json);
        td1.innerHTML = text.progect;
        td2.innerHTML = text.description;

        btn_check = document.createElement('button');
	    btn_check.id = 'check';
	    btn_check.addEventListener('click', function() {
	    	result = confirm("Закрыть проект?");
			if (result) {var a = this.closest('tr'); a.parentElement.removeChild(a); Save();}
		  });
	    btn_check.innerHTML = '<img src="resources/Check_mark.png" />';
	    td3.appendChild(btn_check);

	    btn_edit = document.createElement('button');
	    btn_edit.id = 'edit';
	    btn_edit.innerHTML = '<img src="resources/Edit.png" />';
	    td3.appendChild(btn_edit);

        row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
		tbody.appendChild(row);
	}
}

var isAdd = false; 
document.getElementById("addRow").onclick = function() {
	if (!isAdd) {
		var tbody = document.getElementById('addtbody');
	    var row = document.createElement("tr");
	    var td1 = document.createElement("td");
	    var td2 = document.createElement("td");
	    var td3 = document.createElement("td");

	    var input_progect = document.createElement('TEXTAREA');
	    td1.appendChild(input_progect);

	    var input_description = document.createElement('TEXTAREA');
	    td2.appendChild(input_description);

	    btn_check = document.createElement('button');
	    btn_check.id = 'add';
	    btn_check.addEventListener('click', function() {
		    AddMaintbl(input_progect.value, input_description.value);
		    var a = this.closest('tr');
		    a.parentElement.removeChild(a);
		    isAdd = false;
		  });
	    btn_check.innerHTML = '<img src="resources/Check_mark_add.png" />';
	    td3.appendChild(btn_check);

	    btn_waiting = document.createElement('button');
	    btn_waiting.id = 'wait';
	    btn_waiting.addEventListener('click', function() {
		    var a = this.closest('tr');
		    a.parentElement.removeChild(a);
		    isAdd = false;
		  });
	    btn_waiting.innerHTML = '<img src="resources/Close.png" />';
	    td3.appendChild(btn_waiting);

	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    tbody.appendChild(row);
	    isAdd = true;
	}
}
function AddMaintbl(input_progect, input_description) {
	var tbody = document.getElementById('tMainBody');
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(input_progect));
    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(input_description));
    var td3 = document.createElement("td");

    btn_check = document.createElement('button');
    btn_check.id = 'check';
    btn_check.innerHTML = '<img src="resources/Check_mark.png" />';
    btn_check.addEventListener('click', function() {
	    	result = confirm("Закрыть проект?");
			if (result) {var a = this.closest('tr'); a.parentElement.removeChild(a); Save();}
		  });
    td3.appendChild(btn_check);

    btn_edit = document.createElement('button');
    btn_edit.id = 'edit';
    btn_edit.innerHTML = '<img src="resources/Edit.png" />';
    td3.appendChild(btn_edit);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
    Save();
}

document.getElementById("save").onclick = function() {
	Save();
}

function Save() {
	let text_json = '';

	var table = document.getElementById('rootTable');
	
	var rowLength = table.rows.length;
	for (i = 1; i < rowLength; i++){
		var oCells = table.rows.item(i).cells;
		var cellLength = oCells.length;
		text_json += '{\n';
		for(var j = 0; j < (cellLength - 1); j++){
			var cellVal = oCells.item(j).innerHTML;
			if (j % 2 != 0) {
				text_json += '"description":"';
			}
			if (j % 2 == 0) {
				text_json += '"id":"' + i + '",\n"progect":"';
			}
			text_json += cellVal;
			if (j != (cellLength - 2)) {
				text_json += '",\n';
			}
		}
		text_json += '"}';
		if (i != (rowLength - 1)) {
			text_json += ',\n';
		}
		if (i == (rowLength - 1)) {
			text_json += '{end}';
		}
	}
	
	fs.writeFile("resources/input_File.json", text_json, (err) => {
    if(err) throw err;
    })
}
document.getElementById("closeWindow").addEventListener('click', function() { 
	Save();
	window.close(); 
}, false);