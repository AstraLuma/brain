function save() {
	var rev = $('article').data('rev');
	if (rev) {
		var doc = {
			'_id': document.location.pathname.replace(/^\//, ''),
			'_rev': rev,
			'title': $('#title').html(),
			'body': $('#body').html()
		};
		if (!(doc.title && doc.body)) {
			return;
		}
		$('article').data('rev', null);
		$.ajax({
			type: "PUT",
			url: "/!api/"+doc._id,
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(doc),
			complete: function(req) {
				var resp = $.parseJSON(req.responseText);
				if (req.status == 200 || req.status == 201 || req.status == 202) {
					$('article').data('rev', resp.rev);
				} else {
					console.error(resp);
				}
			}
		});
	}
}
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
			var observer = new MutationObserver(save);
			$('#title, #body').attr("contenteditable", true).each(function(i, ele) {
				observer.observe(ele, { attributes: true, childList: true, characterData: true });
			}).blur(save).hallo(ops);
        },
        loggedOut : function() {
            $("#profile").html('<p>Please log in to see your profile.</p>').show();
        }
    });
 });

$('#create-page').click(function() {
	$.showDialog('/!script/newpage.html', {
		submit: function(data, callback) {
			if (!data.slug || data.slug.length == 0) {
              callback({slug: "Please enter a slug."});
              return;
            }
            doc = {
				_id: data.slug,
				title: data.slug,
				body: "Page Content Here",
			};
			$.ajax({
				type: "PUT",
				url: "/!api/"+doc._id,
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(doc),
				complete: function(req) {
					var resp = $.parseJSON(req.responseText);
					if (req.status == 200 || req.status == 201 || req.status == 202) {
						callback();
						window.location = '/'+doc._id;
					} else {
						console.error(resp);
						callback({slug: resp.reason});
					}
				}
			});
		}
	});
});
