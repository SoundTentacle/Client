var host = "http://192.168.10.69:1337";

function getData (path, data, method) {
	$.support.cors = true;

	$.ajax({
		url: host+path,
		type: "POST",
		crossDomain: true,
		data: data,
		dataType: "json",
		success:function(result){
			method (JSON.parse (JSON.stringify (result)));
		},
		error:function(xhr,status,error){}
	});
}

function setData (path, data) {
	$.ajax({
		url: host+path,
		type: "POST",
		crossDomain: true,
		data: data,
		dataType: "json",
		error:function(xhr,status,error){}
	});
}

function fillLibrary (music) {
	var items = [];
	$.each (music, function (i, item) {
		items.push ('<li id="path:'+item.path+'"><a href=""><h3>'
		+item.artist+' - '+item.title+'</h3><p>Album: '
		+item.album+
		'</p></a></li>');
	});

	$('#lib').append (items.join (''));
}

function fillPlayer (player) {
	var items = [];
	$.each (player, function (i, item) {
		items.push ('<li id="'+item.name+'"><a href=""><h3>'
		+item.name+'</h3></a></li>');
	});

	$('#player').append (items.join (''));
}

function fillDevices (devices) {
	var items = [];
	$.each (devices, function (i, item) {
		items.push ('<li id="'+item.name+'"><a href=""><h3>'
		+item.name+'</h3></a></li>');
	});

	$('#devices').append (items.join (''));
}

function fillPlayerDevices (devices) {
	var output = [];
	$.each(devices, function(i, item) {
		output.push('<option value="'+ item.name +'">'+ item.name +'</option>');
	});

	$('#player_devices').html(output.join(''));
	$('#player_devices').selectmenu ('refresh', true);
}

function getLibrary () {
	getData ('/lib', '{"cmd" : "get_all"}', fillLibrary);
}

function getPlayer () {
	getData ('/instance', '{"cmd" : "get_all"}', fillPlayer);
}

function getTest () {
	//$.mobile.loadPage( "test.html" , true );
	window.location="test.html";
}

function getDevices () {
	getData ('/hardware', '{"cmd" : "get_devices"}', fillDevices);
}

function initAddPlayer () {
	getData ('/hardware', '{"cmd" : "get_devices"}', fillPlayerDevices);
}

function addPlayer () {
	var choosen = $('#player_devices').val ();
	var player = '{"cmd" : "create_instance", "player_name" : "'+$('#player_name').val ()+'", "devices" : "'+choosen+'"}'
	setData ("/instance", player);
}