$('document').ready(function(){
	var changeSrc1 = $('#img_chosen').attr('src');
	var changeIconSrc1 = $('#img_chosen_icon').attr('src');

	var URL = window.URL || window.webkitURL;
   
	var input = document.querySelector('#add_pic_name');
    var preview = document.querySelector('#img_chosen');
    var previewBig = document.querySelector('#img_chosen_big');
	
	var input_icon = document.querySelector('#add_icon_name');
	var preview_icon = document.querySelector('#img_chosen_icon');
	var previewBig_icon = document.querySelector('#img_chosen_iconBig');
    
    // When the file input changes, create a object URL around the file.
    input.addEventListener('change', function () {
        preview.src = URL.createObjectURL(this.files[0]);
        previewBig.src = URL.createObjectURL(this.files[0]);
    });
	
	// When the image loads, release object URL
    preview.addEventListener('load', function () { // Preview in the little image selection
        URL.revokeObjectURL(this.src);
    });
	previewBig.addEventListener('load', function () { // Peview in the big image
        URL.revokeObjectURL(this.src);
		$('#changeBig1').css('display','none');
		$('#changeBig2').css('display','inline');
		$('.changeSmallHighlight').css('background-color','transparent');
		$('#changeSmall2').css('background-color','#868686');			
    });
	
	input_icon.addEventListener('change', function () {
        preview_icon.src = URL.createObjectURL(this.files[0]);
        previewBig_icon.src = URL.createObjectURL(this.files[0]);
    });
	
	preview_icon.addEventListener('load', function () {
        URL.revokeObjectURL(this.src);
    });
	
	previewBig_icon.addEventListener('load', function () {
        URL.revokeObjectURL(this.src);
		$('#changeIcon1').css('display','none');
		$('#changeIcon2').css('display','inline');
		//$('.changeSmallHighlight').css('background-color','transparent');
		//$('#changeSmall2').css('background-color','#868686');
    });
	
	//BIG IMAGES GAME
	$('#changeSmall1').click(function(){
		$('#changeBig1').css('display','inline');
		$('#changeBig2').css('display','none');
	});
	$('#changeSmall2').click(function(){
		changeSrc2 = $('#img_chosen').attr('src');
		if(changeSrc2!=changeSrc1){
		$('#changeBig1').css('display','none');
		$('#changeBig2').css('display','inline');
		}
	});
	$('.changeSmallHighlight').click(function(){
		changeSrc2 = $('#img_chosen').attr('src');
		if(changeSrc2!=changeSrc1){
			$('.changeSmallHighlight').css('background-color','transparent');
			$(this).css('background-color','#868686');
		}
	});
	
	//ICON IMAGES GAMES
	$('#changeImgIcon1').click(function(){
		$('#changeIcon1').css('display','inline');
		$('#changeIcon2').css('display','none');
	});
	$('#img_chosen_icon').click(function(){
		changeIconSrc2 = $('#img_chosen_icon').attr('src');
		if(changeIconSrc2!=changeIconSrc1){
			$('#changeIcon1').css('display','none');
			$('#changeIcon2').css('display','inline');
		}
	});
	$('.changeSmallIconHighlight').click(function(){
		changeIconSrc2 = $('#img_chosen_icon').attr('src');
		if(changeIconSrc2!=changeIconSrc1){
			$('.changeSmallIconHighlight').css('background-color','transparent');
			$(this).css('background-color','#868686');
		}
	});
	
	$('.input_add').focusout(function(){
		id = $(this).attr('id');
		input = $(this).val();
		$('#display_'+id).html(input);
	});
	
	// CHANGING INFORMATION FROM THE PUBLIC
	var originalInput;
	var adminInput;
	$('.verifyInputWrapper').click(function(){
		if($(this).find('.originalInput').length == 0){
			input = originalInput = $.trim($(this).find('.verifyTheInput').html());
		} else {
			originalInput = $.trim($(this).find('.originalInput').html());
			input = $.trim($(this).find('.verifyTheInput').html());
		}
		if($(this).find('.inputChangeVerify').length == 0){
			$(this).html("<input value='"+input+"' type='text' class='inputChangeVerify' id='change'/><div class='originalInput'>  "+originalInput+"</div>");
			field = $.trim($(this).parent().prev().html());
			AlertField = "Name";
			if(field==AlertField){
				NameCheck = "1";
			}
		}		
	});
	$(document).keyup(function (event) {
		switch(event.keyCode){
			case 13:
				if($('.inputChangeVerify').is(":focus")){
					adminInput = $.trim($('#change').val());
					originalInput = $.trim($('#change').parent().find('.originalInput').html());
					if(adminInput != ''){
						if(adminInput == originalInput){
							$('#change').parent().empty().html("<div class='verifyTheInput'>"+originalInput+"</div>");
						} else {
							ifAexists = $('#change').parent().parent().prev().find('a');
							if(ifAexists.length){
								field = ifAexists.html();
							} else {
								field = $('#change').parent().parent().prev().find('div').html();
							}
							$('#change').parent().empty().html(
							"<div class='verifyInputWrapper'>"+
							"<div class='verifyTheInput'>"+adminInput+"</div>"+
							"<div class='originalInput'>"+originalInput+"</div></div>").css('color','red');
							changes = $('#changes').html();
							$('#changes').html(changes + "FIELD" + field + "-"+adminInput+"END");
							$('.originalInput').css('color','black');
						}
					} else {
						$('#change').parent().empty().html("<div class='verifyTheInput'>"+originalInput+"</div>");
					}
				}
				break;
			default:
				break;
		}
	});
	
	$('.delete').click(function(){
		category = $('#verifyCategory').val();
		id = $('#verifyId').val();
		this_verify = $(this);
		check = 1;
		$.ajax({
			type:'POST',
			url:'Incs/Verify/delete.inc.php',
			data: {'category':category, 'id':id},
			success: function(data){
				alert(data);
				if(data==check){	 // FIX DETAIL PICTURE LIKES
					$('.verifyTable').find('#'+category+id).parent().find('.pic_verify').addClass('alreadyVerified').parent().parent().next().find('.verifyTimeAdded').addClass('deleteDone').html('DELETED');
				} else {
					$('.verifyTable').find('#'+category+id).parent().find('.verifyTimeAdded').html("Sorry, please try again later");
				}
			}
		});
	});
	
	$('.verify').click(function(){
		category = $('#verifyCategory').val();
		id = $('#verifyId').val();
		changes = $('#changes').html();
		this_verify = $(this);
		check = 1;
		//alert(NameCheck);
		$.ajax({
			type:'POST',
			url:'Incs/Verify/verify.inc.php',
			data: {'category':category, 'id':id, 'changes':changes},
			success: function(data){
				/*if(data==check){	 // FIX DETAIL PICTURE LIKES
					$('.verifyTable').find('#'+category+id).parent().find('.pic_verify').addClass('alreadyVerified').parent().parent().next().find('.verifyTimeAdded').addClass('verifyDone').html('DONE');
				} else {
					$('.verifyTable').find('#'+category+id).parent().find('.verifyTimeAdded').html("Sorry, please try again later");
				}*/
				$('#changes2').html(data);
				alert(data);
			}
		});
		//NameCheck = 0;
	});	
});