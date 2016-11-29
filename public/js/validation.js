$(document).on('keyup','#name, #uname',function(e){
	if($(this).val() != ''){
		$(this).removeClass('invalid-textbox');
		$(this).addClass('valid-textbox');
	}else
	{
		$(this).removeClass('valid-textbox');
		$(this).addClass('invalid-textbox');
		$('#btn_register').prop('disabled',true);
	}
	enableSubmit();
	
});
$(document).on('keyup', '#password, #password2', function(e){
	if(($('#password').val() == $('#password2').val()) && ($(this).val() != '')){
		$('#password').removeClass('invalid-textbox');
		$('#password').addClass('valid-textbox');

		$('#password2').removeClass('invalid-textbox');
		$('#password2').addClass('valid-textbox');
	}else
	{
		$('#password').removeClass('valid-textbox');
		$('#password').addClass('invalid-textbox');

		$('#password2').removeClass('valid-textbox');
		$('#password2').addClass('invalid-textbox');

		$('#btn_register').prop('disabled',true);
	}
	enableSubmit();

});
$(document).on('blur', '#email', function (e){
	if(isValidEmailAddress($(this).val()))
	{
		$(this).removeClass('invalid-textbox');
		$(this).addClass('valid-textbox');
	}
	else{
		$(this).removeClass('valid-textbox');
		$(this).addClass('invalid-textbox');
		$('#btn_register').prop('disabled',true);
	}
	enableSubmit();
});
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function enableSubmit(){
	var validForm = true;
	$('.form-control').each(function(I){
		if($(this).hasClass('invalid-textbox'))
			validForm = false
	});

	if(validForm){
		$('#btn_register').prop('disabled',false);
	}

}