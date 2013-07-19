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
			},
			body: $("body"),
			document: $(document)
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

				if($(__this).hasClass("pl-handle-horizontal")) {
					app.body.css({"cursor": "ew-resize"});
				}
				if($(__this).hasClass("pl-handle-vertical")) {
					app.body.css({"cursor": "ns-resize"});
				}
				if($(__this).hasClass("pl-handle-both")) {
					app.body.css({"cursor": "se-resize"});
				}

				container = _this.parent();
				containeroff = container.offset();

				app.parent = $(this).parent(".pl-resizable");
				off = app.parent.offset();

				offContainer = app.container.offset();
				positionFix_x = (off.left - offContainer.left);
				positionFix_y = (off.top - offContainer.top);

				app.body.attr('unselectable','on').css('UserSelect','none').css('MozUserSelect','none');
				app.document.bind('mousemove', function(e) {

					mouse_x = (e.pageX-off.left);
					mouse_y = (e.pageY-off.top);

					if($(__this).hasClass("pl-handle-horizontal") || $(__this).hasClass("pl-handle-both")) {
						if(settings.limit_to_container && (e.pageX-containeroff.left) > container.width()) {
							mouse_x = container.width() - positionFix_x;
						}
						if(mouse_x < settings.min_limit_x) {
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
						if(mouse_y < settings.min_limit_y) {
							mouse_y = settings.min_limit_y;
						}
						if(settings.snap_to_grid) {
							snap = (Math.round(mouse_y / settings.snap_to_height) * settings.snap_to_height);
							app.parent.css({"height":snap+"px"});
						} else {
							app.parent.css({"height":mouse_y+"px"});
						}
					}

				});
			});
		}

		app.document.on('mouseup', function() {
			app.body.removeAttr('unselectable');
			app.body.css({'UserSelect':'', 'MozUserSelect':'', 'cursor':''});
			app.document.unbind('mousemove');

			if (settings.complete)
				settings.complete();
		});

	};
}( jQuery ));

