$(function() {
//    $.couchProfile.templates.profileReady = $("#new-message").html();
    $("#account").couchLogin({
        loggedIn : function(r) {
			$('#profile').hide();
			var ops = {
				plugins: {
				  'halloformat': {},
				  'halloblock': {},
				  'hallojustify': {},
				  'hallolists': {},
				  'halloreundo': {}
				}
			};
			$('#title, #body').attr("contenteditable", true).hallo(ops);
        },
        loggedOut : function() {
            $("#profile").html('<p>Please log in to see your profile.</p>').show();
        }
    });
 });
