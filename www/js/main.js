$(document).ready(function(){	//executed after the page has loaded

$.post( "http://192.168.2.15/verifylogin", { username: "admin", password: "admin" })
  .done(function( data ) {
    alert( "Data Loaded: " + data );
});
//loadPage();
/*
	checkURL();	//check if the URL has a reference to a page and load it

	$('ul li a').click(function (e){	//traverse through all our navigation links..

			checkURL(this.hash);	//.. and assign them a new onclick event, using their own hash as a parameter (#page1 for example)

	});

	setInterval("checkURL()",250);	//check for a change in the URL every 250 ms to detect if the history buttons have been used
*/
});

var lasturl="";	//here we store the current URL hash

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;	//if no parameter is provided, use the hash value from the current address

	if(hash != lasturl)	// if the hash value has changed
	{
		lasturl=hash;	//update the current hash
		loadPage(hash);	// and load the new page
	}
}

function loadPage(url)	//the function that loads pages via AJAX
{
	//url=url.replace('#page','');	//strip the #page part of the hash and leave only the page number

	
	$('#loading').css('visibility','visible');	//show the rotating gif animation

	$.ajax({	//create an ajax request to load_page.php
		type: "POST",
		url: "http://192.168.2.15/verifylogin",
		data: { username: 'admin', password: 'admin'},
		success: function(msg){
			console.log(msg);

			//$('.container').html(msg);	//load the returned html into pageContet
			if(parseInt(msg)!=0)	//if no errors
			{
				$('#loading').css('visibility','hidden');	//and hide the rotating gif
			}
		}

	});

}
