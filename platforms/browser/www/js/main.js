$(document).ready(function(){	//executed after the page has loaded
	//console.log(window.localStorage);
	var webserviceUrl = 'http://192.168.2.15/webservice/';
	loadPage('login');
	//login(webserviceUrl);
});

function loadPage(page){
	var baseUrl = '/';
	var extension = '.html';
	$.ajax({
		type: "GET",
		url: baseUrl+page+extension,
		crossDomain: false,
		cache: false,
		beforeSend: function(){},
		success: function(data){
			$('#content').html(data);
		}
	});
}


function login(webserviceUrl){
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
			}
		});
	});
}
