const fs = require('fs');
var isAdd = false;

window.addEventListener('load', function() {
	document.body.style.background = "#ac7e59";
	fs.readFile("C:/Priority-list/input_File.json", "utf8", function(error,data){ 
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
	    btn_edit.addEventListener('click', function() {
	    	Edit(this.closest('tr'),$(this).closest('tr').index());
		  });
	    btn_edit.innerHTML = '<img src="resources/Edit.png" />';
	    td3.appendChild(btn_edit);

        row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
		tbody.appendChild(row);
	}
}
 
document.getElementById("addRow").onclick = function() {
	AddRow();
}
document.getElementById("save").onclick = function() {
	Save();
}
document.getElementById("settings").addEventListener('click', function() {
	Settings();
})
document.getElementById("closeWindow").addEventListener('click', function() { 
	Save();
	window.close(); 
}, false);

function AddRow(){
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
		    AddMaintbl(input_progect.value, input_description.value, -10);
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
	    btn_waiting.innerHTML = '<img src="resources/Close_add.png" />';
	    td3.appendChild(btn_waiting);

	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    tbody.appendChild(row);
	    isAdd = true;
	}
}
function AddMaintbl(input_progect, input_description, index) {
	var tbody = document.getElementById('tMainBody');
	if (index >= 0) {
		var row = tbody.insertRow(index);
		var td1 = row.insertCell(0);
		td1.appendChild(document.createTextNode(input_progect));
		var td2 = row.insertCell(1);
		td2.appendChild(document.createTextNode(input_description));
		var td3 = row.insertCell(2);
	}
    else {
    	var row = document.createElement("tr");
    	var td1 = document.createElement("td");
    	td1.appendChild(document.createTextNode(input_progect));
    	var td2 = document.createElement("td");
    	td2.appendChild(document.createTextNode(input_description));
    	var td3 = document.createElement("td");
    }
    

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
    btn_edit.addEventListener('click', function() {
	    Edit(this.closest('tr'),$(this).closest('tr').index());
	});
    btn_edit.innerHTML = '<img src="resources/Edit.png" />';
    td3.appendChild(btn_edit);

    if (index < 0) {
	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    tbody.appendChild(row);
	}
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

	let dir = 'C:/Priority-list';
	fs.mkdir(dir, function(){});
	fs.writeFile("C:/Priority-list/input_File.json", text_json, (err) => {
    if(err) throw err;
    fs.close(file_handle);
	})
}

function Edit(row,index){
	var table = document.getElementById('rootTable');
	var table_body = document.getElementById('tMainBody');
	var newRow = table_body.insertRow(index);
	const input_progect = row.childNodes[0];
	const input_description = row.childNodes[1];

	for(var i = 0; i < 2; i++){
		var newCell = newRow.insertCell(i);
		var input = document.createElement('TEXTAREA');
		row_text = row.childNodes[i].innerHTML;
		input.innerHTML = row_text;
		if(i == 0) {var input_progect_new = input;}
		if(i == 1) {var input_description_new = input;}
		newCell.appendChild(input);
	}

	var buttonCell = newRow.insertCell(2);
	btn_check = document.createElement('button');
    btn_check.id = 'add';
    btn_check.addEventListener('click', function() {
	    AddMaintbl(input_progect_new.value, input_description_new.value, index);
	    var a = this.closest('tr'); 
	    a.parentElement.removeChild(a); 
	    Save();
	  });
    btn_check.innerHTML = '<img src="resources/Check_mark.png" />';
    buttonCell.appendChild(btn_check);

    btn_waiting = document.createElement('button');
    btn_waiting.id = 'wait';
    btn_waiting.addEventListener('click', function() {
    	AddMaintbl(input_progect.innerHTML, input_description.innerHTML, index);
	    var a = this.closest('tr');
	    a.parentElement.removeChild(a);
	    isAdd = false;
	  });
    btn_waiting.innerHTML = '<img src="resources/Close.png" />';
    buttonCell.appendChild(btn_waiting);

    row.parentElement.removeChild(row);
}

function Settings(){
	/*var myWindow=window.open("/settings.html","DescriptiveWindowName","resizable,scrollbars,status");*/
	color = true;
}
