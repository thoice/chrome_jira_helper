var showModalTable = function () {
	console.log('show modal table');
}


var header = document.getElementsByClassName('aui-page-header-inner')[0];
if (header != undefined) {
	var div = document.createElement('div');
	div.className = 'aui-avatar-large';
	var button = document.createElement('button');
	button.id = 'button-exportable-show';
	button.className = 'aui-button';
	var span = document.createElement('span');
	var text = document.createTextNode('Show Export Table');
	span.appendChild(text);
	button.appendChild(span);
	div.appendChild(button);
	header.appendChild(div);
	button.addEventListener('click', showModalTable);
}