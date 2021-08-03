const fs = require('fs');
var isAdd = false;
var isEdit = false;
var styleColors = 'default';
var myOpenedWindow = window;
var myOpenWindow = function(URL) {
    var myOpenedWindow = myOpenedWindow || window.open(URL, "MyNewWindow");
    myOpenedWindow.location.href= URL;
    myOpenedWindow.focus();
}

var btn_checkHTML = '<img src="resources/Check_mark.png" />';
var btn_editHTML = '<img src="resources/Edit.png" />';
var btn_cancelHTML = '<img src="resources/Close.png" />';
var btn_checkAddHTML = '<img src="resources/Check_mark_add.png" />';
var btn_waitingHTML = '<img src="resources/Close_add.png" />';

window.addEventListener('load', function() {
	var body = document.getElementById('MainBody');
	var tthead = document.getElementById('tMainThead');
	body.style.setProperty('--body-color', "#ac7e59");
	tthead.style.setProperty('--maint-color_thead', "#473424");
	tthead.style.setProperty('--maint-colorText_thead', "#ddd");

	if(myOpenedWindow.name == "MyNewWindow"){
		fs.readFile("C:/Priority-list/input_File_wait.json", "utf8", function(error,data){ 
		if(error) throw error; 
		parsingFile(data);
		});
	}
	else{
		fs.readFile("C:/Priority-list/input_File.json", "utf8", function(error,data){ 
		if(error) throw error; 
		parsingFile(data);
	});
	}
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
	    btn_check.innerHTML = btn_checkHTML;
	    td3.appendChild(btn_check);

	    btn_edit = document.createElement('button');
	    btn_edit.id = 'edit';
	    btn_edit.addEventListener('click', function() {
	    	Edit(this.closest('tr'),$(this).closest('tr').index());
		  });
	    btn_edit.innerHTML = btn_editHTML;
	    td3.appendChild(btn_edit);

        row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
		tbody.appendChild(row);

	}
	SetColors('default');
}
 
document.getElementById("addRow").onclick = function() {
	AddRow();
}
document.getElementById("waiting").onclick = function() {
	myOpenWindow('waiting.html')
}
document.getElementById("save").onclick = function() {
	Save();
}
document.getElementById("settings").addEventListener('click', function() {
	Settings();
})


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
	    td3.appendChild(btn_check);

	    btn_waiting = document.createElement('button');
	    btn_waiting.id = 'wait';
	    btn_waiting.addEventListener('click', function() {
		    var a = this.closest('tr');
		    a.parentElement.removeChild(a);
		    isAdd = false;
		  });
	    td3.appendChild(btn_waiting);

	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    tbody.appendChild(row);
	    isAdd = true;
	    SetColors(styleColors);
	    btn_check.innerHTML = btn_checkAddHTML;
	    btn_waiting.innerHTML = btn_waitingHTML;
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
    btn_check.innerHTML = btn_checkHTML;
    btn_check.addEventListener('click', function() {
	    	result = confirm("Закрыть проект?");
			if (result) {var a = this.closest('tr'); a.parentElement.removeChild(a); Save();}
		  });
    td3.appendChild(btn_check);

    btn_edit = document.createElement('button');
    btn_edit.id = 'edit';
    btn_edit.innerHTML = btn_editHTML;
    btn_edit.addEventListener('click', function() {
	    Edit(this.closest('tr'),$(this).closest('tr').index());
	});
    td3.appendChild(btn_edit);

    if (styleColors == 'default') {td3.style.setProperty('--maint-color_td_last', "#8d6646");}
	if (styleColors == 'gray') {td3.style.setProperty('--maint-color_td_last', "#efefef");}
	if (styleColors == 'blue') {td3.style.setProperty('--maint-color_td_last', "#cfe8ea");}
	if (styleColors == 'dark') {td3.style.setProperty('--maint-color_td_last', "#30302f");}

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
			cellVal = cellVal.replace(`<textarea>`,``);
			text_json += cellVal.replace(`</textarea>`,``);
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
	if(myOpenedWindow.name == "MyNewWindow"){
		fs.writeFile("C:/Priority-list/input_File_wait.json", text_json, (err) => {
	    if(err) throw err;
	    fs.close(file_handle);
		})
	}
	else {
		fs.writeFile("C:/Priority-list/input_File.json", text_json, (err) => {
	    if(err) throw err;
	    fs.close(file_handle);
		})
	}
}

function Edit(row,index){
	if (!isEdit){
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
			if (styleColors == 'default'){input.style.setProperty('--textarea-colorText', "#ddd");}
			if (styleColors == 'gray' || styleColors == 'blue' || styleColors == 'dark')
				{input.style.setProperty('--textarea-colorText', "#040404");}
			if(i == 0) {var input_progect_new = input;}
			if(i == 1) {var input_description_new = input;}
			newCell.appendChild(input);
		}

		var buttonCell = newRow.insertCell(2);
		btn_check = document.createElement('button');
	    btn_check.id = 'add';
	    btn_check.innerHTML = btn_checkHTML;
	    btn_check.addEventListener('click', function() {
		    AddMaintbl(input_progect_new.value, input_description_new.value, index);
		    var a = this.closest('tr'); 
		    a.parentElement.removeChild(a); 
		    Save();
		    isEdit = false;
		  });
	    buttonCell.appendChild(btn_check);

	    btn_cancel = document.createElement('button');
	    btn_cancel.id = 'cancel';
	    btn_cancel.innerHTML = btn_cancelHTML;
	    btn_cancel.addEventListener('click', function() {
	    	AddMaintbl(input_progect.innerHTML, input_description.innerHTML, index);
		    var a = this.closest('tr');
		    a.parentElement.removeChild(a);
		    Save();
		    isEdit = false;
		  });
	    buttonCell.appendChild(btn_cancel);
	    if (styleColors == 'default') {buttonCell.style.setProperty('--maint-color_td_last', "#8d6646");}
	    if (styleColors == 'gray') {buttonCell.style.setProperty('--maint-color_td_last', "#efefef");}
	    if (styleColors == 'blue') {buttonCell.style.setProperty('--maint-color_td_last', "#cfe8ea");}
	    if (styleColors == 'dark') {buttonCell.style.setProperty('--maint-color_td_last', "#30302f");}

	    row.parentElement.removeChild(row);
	    isEdit = true;
	}
}

function SetColors(styleColors){
	var body = document.getElementById('MainBody');
	var tthead = document.getElementById('tMainThead');
	var tbody = document.getElementById('tMainBody');
	var tbodyLast = document.querySelector('tbody tr:last-child td:last-child');
	var tbodyAdd = document.getElementById('addtbody');
	var tbodyAddLast = document.querySelector('.added-table tbody tr:last-child td:last-child');

	if(styleColors == 'default'){
		body.style.setProperty('--body-color', "#ac7e59");
		body.style.setProperty('--body-img',"none");
		tbody.style.setProperty('--maint-color_td', "#705138");
		tbody.style.setProperty('--maint-colorText_td', "#ddd");
		tthead.style.setProperty('--maint-color_thead', "#473424");
		tthead.style.setProperty('--maint-colorText_thead', "#ddd");
		tbodyLast.style.setProperty('--maint-color_td_last', "#8d6646");
		var rowLength = tbody.rows.length;
		for (i = 0; i < rowLength; i++){
			var oCells = tbody.rows.item(i).cells;
			var cellVal = oCells.item(2);
			cellVal.style.setProperty('--maint-color_td_last', "#8d6646");
		}

		document.getElementById('closeWindowImg').src="resources/default/CloseWindow.png";
		document.getElementById('addRowImg').src="resources/default/Add.png";
		if(!myOpenedWindow.name == "MyNewWindow"){
			document.getElementById('waitingImg').src="resources/default/Waiting.png";
			document.getElementById('settingsImg').src="resources/default/Settings.png";
		}
		document.getElementById('saveImg').src="resources/default/Save.png";

		tbodyAdd.style.setProperty('--addt-color_td', "#387051");
		tbodyAdd.style.setProperty('--addt-colorText_td', "#ddd");
		tbodyAddLast.style.setProperty('--addt-color_td_last' , "#468d66");
	}

	if(styleColors == 'gray'){
		body.style.setProperty('--body-color', "#cfd0d0");
		body.style.setProperty('--body-img',"none");
		tbody.style.setProperty('--maint-color_td', "#e3e4e4");
		tbody.style.setProperty('--maint-colorText_td', "#040404");
		tthead.style.setProperty('--maint-color_thead', "#b6b8b8");
		tthead.style.setProperty('--maint-colorText_thead', "#040404");
		var rowLength = tbody.rows.length;
		for (i = 0; i < rowLength; i++){
			var oCells = tbody.rows.item(i).cells;
			var cellVal = oCells.item(2);
			cellVal.style.setProperty('--maint-color_td_last', "#efefef");
		}

		document.getElementById('closeWindowImg').src="resources/gray/CloseWindow.png";
		document.getElementById('addRowImg').src="resources/gray/Add.png";
		document.getElementById('waitingImg').src="resources/gray/Waiting.png";
		document.getElementById('settingsImg').src="resources/gray/Settings.png";
		document.getElementById('saveImg').src="resources/gray/Save.png";

		tbodyAdd.style.setProperty('--addt-color_td', "#8bc5a5");
		tbodyAdd.style.setProperty('--addt-colorText_td', "#040404");
		tbodyAddLast.style.setProperty('--addt-color_td_last' , "#a3d1b7");
	}
	if(styleColors == 'dark') {
		body.style.setProperty('--body-img',"url(resources/dark/dark.jpg)");
		tbody.style.setProperty('--maint-color_td', "#262625");
		tbody.style.setProperty('--maint-colorText_td', "#37e03d");
		tthead.style.setProperty('--maint-color_thead', "#353534");
		tthead.style.setProperty('--maint-colorText_thead', "#37e03d");
		var rowLength = tbody.rows.length;
		for (i = 0; i < rowLength; i++){
			var oCells = tbody.rows.item(i).cells;
			var cellVal = oCells.item(2);
			cellVal.style.setProperty('--maint-color_td_last', "#30302f");
		}

		document.getElementById('closeWindowImg').src="resources/dark/CloseWindow.png";
		document.getElementById('addRowImg').src="resources/dark/Add.png";
		document.getElementById('waitingImg').src="resources/dark/Waiting.png";
		document.getElementById('settingsImg').src="resources/dark/Settings.png";
		document.getElementById('saveImg').src="resources/dark/Save.png";

		tbodyAdd.style.setProperty('--addt-color_td', "#8bc5a5");
		tbodyAdd.style.setProperty('--addt-colorText_td', "#040404");
		tbodyAddLast.style.setProperty('--addt-color_td_last' , "#a3d1b7");
	}
	if(styleColors == 'blue') {
		body.style.setProperty('--body-img',"url(resources/blue/blue.jpg)");
		tbody.style.setProperty('--maint-color_td', "#add8dc");
		tbody.style.setProperty('--maint-colorText_td', "#040404");
		tthead.style.setProperty('--maint-color_thead', "#7bc0c7");
		tthead.style.setProperty('--maint-colorText_thead', "#040404");
		var rowLength = tbody.rows.length;
		for (i = 0; i < rowLength; i++){
			var oCells = tbody.rows.item(i).cells;
			var cellVal = oCells.item(2);
			cellVal.style.setProperty('--maint-color_td_last', "#cfe8ea");
		}

		document.getElementById('closeWindowImg').src="resources/blue/CloseWindow.png";
		document.getElementById('addRowImg').src="resources/blue/Add.png";
		document.getElementById('waitingImg').src="resources/blue/Waiting.png";
		document.getElementById('settingsImg').src="resources/blue/Settings.png";
		document.getElementById('saveImg').src="resources/blue/Save.png";

		tbodyAdd.style.setProperty('--addt-color_td', "#8bc5a5");
		tbodyAdd.style.setProperty('--addt-colorText_td', "#040404");
		tbodyAddLast.style.setProperty('--addt-color_td_last' , "#a3d1b7");
	}
}

function Settings(){
	/*var myWindow=window.open("/settings.html","DescriptiveWindowName","resizable,scrollbars,status");*/
	if(styleColors == 'default') {
		styleColors = 'gray';
		SetColors(styleColors);
		return;
	}
	if(styleColors == 'gray') {
		styleColors = 'blue';
		SetColors(styleColors);
		return;
	}
	if(styleColors == 'blue') {
		styleColors = 'dark';
		SetColors(styleColors);
		return;
	}
	if(styleColors == 'dark') {
		styleColors = 'default';
		SetColors(styleColors);
		return;
	}
}
