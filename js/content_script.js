var showTable = function () {
	var tableDiv = document.getElementById('totals-table');
	if (tableDiv == undefined) {
	  tableDiv = document.createElement('div');
	  tableDiv.id = 'totals-table'
	}
	var footer = document.getElementById('footer');
	footer.insertBefore(tableDiv, footer.childNodes[0]);

	var days = jQuery('.tempo-timesheet-table').last();
	days = days.find('.day.tt-right-border.nav.edit-day.value-cell');
	var day;
	var $row;
	var key;
	var totals = {};

	for (var i = 0; i < days.length ; i++) {
	  day = days[i];
	  dates = day.abbr.split('|');
	  date = dates[0];
	  $row = jQuery(day.parentNode);
	  key = $row.find('.issuekey')[0].innerText.trim();
	  projectKey = key.split('-')[0];

	  if (totals[date] == undefined) {
	    totals[date] = {};
	  }
	  if (totals[date][projectKey] == undefined) {
	    totals[date][projectKey] = {
	      'items': {},
	      'total': 0
	    };
	  }
	  dayValue = Number(day.innerText);
	  totals[date][projectKey]['items'][key] = dayValue;
	  totals[date][projectKey]['total'] += dayValue;
	}

	var sortedTotals = [];

	for (k in totals) {
		if (totals.hasOwnProperty(k)) {
			sortedTotals.push(k);
		}
	};
	sortedTotals.sort();

	var html = '';
	var tickets = [];
	var total = 0;
	for (var sortedKey = 0; sortedKey < sortedTotals.length; sortedKey++) {
		key = sortedTotals[sortedKey];
	  	day = totals[key];
	  	dayHtml = '<div style="float: left; margin: 2px; font-size: 0.9em; height: 100%; box-sizing: border-box; border: 1px solid gray;padding: 0.5em;"><span>' + key + '</span><br/>';

	  	for (projectKey in day) {
	    	total = day[projectKey]['total']
	    	dayHtml += '<span>' + projectKey + '</span><br/>';
	    	dayHtml += '<span>' + total + '</span><br/>';
	    	tickets = day[projectKey]['items'];
	    	for (ticket in tickets) {
	      		dayHtml += '<span>' + ticket + ' (' + tickets[ticket] + ')</span><br/>'
	    	}
	  	}
	  	dayHtml += '</div>';
	  	html += dayHtml;
	}

	html = '<div style="min-height: 50px; background-color: red; overflow: hidden;">' + html + '</div>';
	jQuery(tableDiv).html(html);
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
	button.addEventListener('click', showTable);
}