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
	var webserviceUrl = 'http://192.168.2.15/webservice/';
	var page = 'dashboard.php';
	$.ajax({
		type: "POST",
		url: webserviceUrl+page,
		data: { user_id: localStorage.getItem("user_id") },
		dataType: 'json',
		crossDomain: true,
		cache: false,
		beforeSend: function(){  },
		success: function(data){
			console.log(data);
			var totale = parseInt(0);
			$.each(data, function(i, item) {
				$('#ordini_inseriti').append('<li class="list-group-item"><span class="badge">'+data[i].timestamp+'</span><b>'+data[i].servizi+'</b> <span class="label label-success">'+data[i].importo+' €</span></li>');
				totale += parseInt(data[i].importo);
			});
			$("#contratti_inseriti").html('Contratti inseriti: '+data.length);
			$("#importo_totale").html('Importo totale: '+totale+'€');
		}
	});	
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
			dataType: 'json',
			crossDomain: true,
			cache: false,
			beforeSend: function(){},
			success: function(data){
				if(data === 'false'){
					alert('Username o password non corretti');
					return false;
				}
				window.localStorage.setItem("loggedIn", 1);
				window.localStorage.setItem("user_id", data.user_id);
				window.localStorage.setItem("username", username);
				loadPage('dashboard');
			}
		});
	});
}
