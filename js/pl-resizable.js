(function ( $ ) {
	$.fn.resizable = function(options) {
		_this = this;

		var settings = $.extend({
			// These are the defaults.
			snap_to_grid: false,
			snap_to_width: 150,
			snap_to_height: 75,
			min_limit_x: 100,
			min_limit_y: 100,
			limit_to_container: true,
			horizontal: true,
			vertical: true,
			before: null,
			complete: null
		}, options);

		var app = {
			parent: null,
			snap_amount_x: 1,
			snap_amount_y: 1,
			container: null,
			operation: {
				hor: "horizontal",
				ver: "vertical",
				bot: "both",
			}
		};

		this.addClass("pl-resizable");
		app.container = this.parent().addClass("pl-container");


		if(settings.horizontal) {
			resizable(app.operation.hor);
		}
		if(settings.vertical) {
			resizable(app.operation.ver);
		}
		if(settings.horizontal && settings.vertical) {
			resizable(app.operation.bot);
		}
		function resizable(motion) {
			_this.append("<div class='pl-handle-"+motion+"'></div>");
			child = _this.children(".pl-handle-"+motion+"");
			child.on('mousedown', function() {
				__this = this;
				if (settings.before)
					settings.before();

				container = _this.parent();
				containeroff = container.offset();

				app.parent = $(this).parent(".pl-resizable");
				off = app.parent.offset();

				offContainer = app.container.offset();
				positionFix_x = (off.left - offContainer.left);
				positionFix_y = (off.top - offContainer.top);

				$('body').attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
				$(document).bind('mousemove', function(e) {

					mouse_x = (e.pageX-off.left);
					mouse_y = (e.pageY-off.top);

					if($(__this).hasClass("pl-handle-horizontal") || $(__this).hasClass("pl-handle-both")) {
						if(settings.limit_to_container && (e.pageX-containeroff.left) > container.width()) {
							mouse_x = container.width() - positionFix_x;
						}
						if((e.pageX-off.left) < settings.min_limit_x) {
							mouse_x = settings.min_limit_x;
						}

						if(settings.snap_to_grid) {
							snap = (Math.round(mouse_x / settings.snap_to_width) * settings.snap_to_width);
							app.parent.css({"width":snap+"px"});
						} else {
							app.parent.css({"width":mouse_x+"px"});
						}
					}

					if($(__this).hasClass("pl-handle-vertical") || $(__this).hasClass("pl-handle-both")) {
						if(settings.limit_to_container && (e.pageY-containeroff.top) > container.height()) {
							mouse_y = container.height() - positionFix_y;
						}
						if((e.pageY-off.top) < settings.min_limit_y) {
							mouse_y = settings.min_limit_y;
						}
						if(settings.snap_to_grid) {
							snap = (Math.round(mouse_y / settings.snap_to_height) * settings.snap_to_height);
							app.parent.css({"height":snap+"px"});
						} else {
							if((e.pageY-off.top) > 100) {
								app.parent.css({"height":mouse_y+"px"});
							}
						}
					}

				});
			});
		}

		$(document).on('mouseup', function() {
			$('body').removeAttr('unselectable');
			$('body').css({'UserSelect':'', 'MozUserSelect':''});
			$(document).unbind('mousemove');

			if (settings.complete)
				settings.complete();
		});

	};
}( jQuery ));


$(".draggable").resizable(
	{
		snap_to_grid: true,
		horizontal: true,
		vertical: true,
		snap_to_width: 100,
		snap_to_height: 100,
		before: function() {
			my_var = "hello";
			console.log("operation before");
		},
		complete: function() {
			console.log("operation finished");
		}
	}
);
