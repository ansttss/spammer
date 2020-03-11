$(function () {
	$('.deleteBtn').click(function () {
		if (confirm("Are you sure you want to delete this user?")) {
			$('form#delete' + $(this).attr('data-id')).submit();
		}
	});

	$('.modalBtn').click(function () {
		$('#modal' + $(this).attr('data-id')).css("display", "block");
	});

	$('.close').click(function () {
		$('.modal').each(function () {
			$(this).css("display", "none");
		})
	});

	$('.modal').each(function () {
		$('.modal').click(function (event) {
			if (event.target === $(this)[0]) {
				$(this).css("display", "none");
			}
		})
	});

	window.history.pushState({}, document.title, window.location.pathname);
});
