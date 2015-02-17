var showTable = function () {
	var tableDiv = document.getElementById('totals-table');
if (tableDiv == undefined) {
  tableDiv = document.createElement('div');
  tableDiv.id = 'totals-table'
}
var footer = document.getElementById('footer');
footer.insertBefore(tableDiv, footer.childNodes[0]);

var days = jQuery('.tempo-timesheet-table').last();
days = days.find('.day.tt-right-border.nav.edit-day');
var day, $row, key, dayValue;
var totals = {};

for (var i = 0; i < days.length ; i++) {
  day = days[i];
  dates = day.abbr.split('|');
  date = Number.parseInt(dates[0].substring(0,2));
  date += '-' + Number.parseInt(dates[0].substring(2,4));
  date += '-' + Number.parseInt(dates[0].substring(4));
  $row = jQuery(day.parentNode);
  key = $row.find('.issuekey')[0].innerText.trim();
  projectKey = key.split('-')[0];

  if (totals[date] == undefined) {
    totals[date] = {
      endOfWeek: false
    };
  }
  if (totals[date][projectKey] == undefined) {
    totals[date][projectKey] = {
      items: {},
      total: 0
    };
  }
  if (jQuery(day).hasClass('value-cell')) {
    dayValue = Number(day.innerText);
    totals[date][projectKey]['items'][key] = dayValue;
    totals[date][projectKey]['total'] += dayValue;
  }
  
  if (jQuery(day).hasClass('tt-end-of-week')) {
    totals[date]['endOfWeek'] = true;
  }
}

var html = '';
var tickets = [];
var total = 0;
var rowHtml = '<div class="totals-row style="display:table-row"">';
for (key in totals) {
  day = totals[key];
  dayHtml = '<div class="totals-cell" style="margin: 2px; font-size: 0.9em; height: 100%; box-sizing: border-box; border: 1px solid gray;padding: 0.5em; display: table-cell;"><span>' + key + '</span><br/>';

  for (projectKey in day) {
    if (projectKey == 'endOfWeek') {
      continue;
    }

    total = day[projectKey]['total'];
    if (total == 0) {
      continue;
    }
    
    dayHtml += '<span>' + projectKey + '</span>: ';
    dayHtml += '<span>' + total + '</span><br/>';
    tickets = day[projectKey]['items'];
    for (ticket in tickets) {
      dayHtml += '<span>' + ticket + ' (' + tickets[ticket] + ')</span><br/>'
    }
  }
  dayHtml += '</div>';
  rowHtml += dayHtml;
  if (day.endOfWeek == true) {
    rowHtml += '</div>';
    html += rowHtml;
    rowHtml = '<div class="totals-row" style="display:table-row">';
  }
}

if (rowHtml != '' && rowHtml != '<div class="totals-row style="display:table-row"">') {
  html += rowHtml;
}

html = '<div style="min-height: 50px; overflow: hidden; display: table; width: 100%;">' + html + '</div>';
jQuery(tableDiv).html(html);
}

var itemHeader = document.querySelector('.navigator-issue-only #summary-val');
if (itemHeader != undefined) {
	var span = document.createElement('span');
	var issueElement = document.getElementById('summary-val');
	var branchName = document.getElementById('key-val').textContent + '-' + issueElement.textContent.replace(/[^\w]+/gi, '-');
	var spanText = document.createTextNode(branchName);
	span.appendChild(spanText);
	issueElement.parentNode.appendChild(span);
}

var tempoHeader = document.querySelector('.tempo .aui-page-header-inner');//document.getElementsByClassName('aui-page-header-inner')[0];
if (tempoHeader != undefined) {
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
	tempoHeader.appendChild(div);
	button.addEventListener('click', showTable);
}