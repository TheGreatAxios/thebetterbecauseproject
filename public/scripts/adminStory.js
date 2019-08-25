'use strict';

$(document).ready(() => {
	$('#deleteButton').on('click', () => {
		let storyId = $(this).attr('data-id');
		$.ajax({
			method: 'POST', 
			url: '/admin/stories/delete',
			data: {'storyId': storyId},
			succcess: (result) => {
				if (result === true) {
					console.log('Success');
					location.reload();
				}
			}
		});
	});
});