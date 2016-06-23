$(document).ready(function(){	//executed after the page has loaded
	//console.log(window.localStorage);
	var webserviceUrl = 'http://192.168.2.15/webservice/';
	if(localStorage.getItem("loggedIn") !== '1')
	loadPage('login');
	else
	loadPage('dashboard');
});

function loadPage(page){
	var extension = '.html';
	$('#content').html('<div class="text-center"><hr><br><img src="img/loading.gif"><br></div>');
	$.ajax({
		type: "GET",
		url: page+extension,
		success: function(data){
			$('#content').html(data);
			window[page]();
		}
	});
}

function dashboard(){
	$("#logout").on('click', function(e){
		e.preventDefault();
		window.localStorage.removeItem("loggedIn");
		window.localStorage.removeItem("username");
		loadPage('login');
	});
}

function login(){
	var webserviceUrl = 'http://192.168.2.15/webservice/';
	var page = 'login.php';
	$("form#login").on("submit", function(e){
		e.preventDefault();
		username = $(this).find('#username').val();
		password = $(this).find('#password').val();
		if(username == '' || password == '')
		return false;
		$.ajax({
			type: "POST",
			url: webserviceUrl+page,
			data: { username: username, password: password },
			crossDomain: true,
			cache: false,
			beforeSend: function(){},
			success: function(data){
				window.localStorage.setItem("loggedIn", 1);
				window.localStorage.setItem("username", username);
				loadPage('dashboard');
			}
		});
	});
}
