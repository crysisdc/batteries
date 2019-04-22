$(window).scroll(function() {
	var st = $(this).scrollTop();

	$(".img-one").css({
		"transform" : "translate(0%, " + st/14 + "%"
	});
});


$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  	margin:25,
  	items:2,
  	autoHeight:true  	
  });  
});

var el = document.getElementById('rose');



var numo=8;
var ncer=0;
var kST=2;
var Smod=2;
var Pmod=0.295;
;
var aaz=['северо-запад','север','северо-восток','восток','юго-восток','юг','юго-запад','запад','северо-запад','север'];

  
$(document).ready(function () {
  

  $('#rose_knob').click( function(){ $('#rose_knob').css('display','block'); })

  var rose = JogDial(document.getElementById('rose'), 
    { wheelSize:'200px', knobSize:'40px', degreeStartAt: 104})
    .on('mousemove', function(evt){
      if (evt.target.rotation<0) evt.target.rotation=evt.target.rotation+3600;
      z=Math.round(evt.target.rotation)%360;  
      $('input[name=azimut]').val(z);
            $('.orient').html( aaz[Math.round((z+45)/45)] );            
    });

  $(document).on('change', '#standart', function() {
    if($("#standart").is(":checked")) {
      $('.orient').html('Юг')
    }
  })




    
  $('select[name=type_station]').change(function(){ 
    $('.sts>div').hide(); 
    t=$(this).val()-1;
    $('.sts>div').eq(t).show();
    V=1;
    switch(t)
    {
      case 0:
        V=1;
        $("#ex1").slider({ min: V, max: 30, step:0.5, value:1, focus: true});
        $('.type_auto').hide();    
        $('.type_man').hide();    
        $('.type_private').show();    
        $('.type_net').show();    
        Kst=1;
      break; 
      
    }
    s=Math.round(num*Smod); 
    $('input[name=Sphoto]').val(s);
    $('input[name=STphoto]').val(s*kST);
    $('input[name=Vphoto]').val(V);
    num=Math.round(V/Pmod); 
    $('input[name=Numphoto]').val(num);
  });

  
  $('select[name=type_panel]').change(function(){ 
  	if ($(this).val()==1) { 
  		Smod=2; Pmod=0.295;
  	} V=$('input[name=Vphoto]').val(); 
  	num=Math.round(V/Pmod); 
  	$('input[name=Numphoto]').val(num); 
  	s=Math.round($('input[name=Numphoto]').val()*Smod); 
  	$('input[name=Sphoto]').val(s); 
  	$('input[name=STphoto]').val(s*kST); });
           
  
  $('path').on('click', function() { 
     numo=$('path').index(this); 
     $('input[name=reg]').val(numo);    
     $('path').eq(numo).attr('fill','#91c84f'); 
     offset = $(this).offset();
     l=offset.left;
     t=offset.top;
     $('.texto').css({left:l+'px',top:t+'px'});
     $('.texto').html($(this).find('title').html());
     $('.texto').show();
   });
     
  
  $('path').hover( function(){ switchMap(this) } , function() { $('path').attr('fill','#fff'); $('path').eq(numo).attr('fill','#91c84f'); } );
  
  $('.st_change').click(function(){ $('.st_change').css('background','#b0d681'); $(this).css('background','#91c84f'); });  
  
  $("#ex1").slider({ min: 1, max: 30, step:0.5, value: 1313, focus: true , formatter: function(value) { $('input[name=Vphoto]').val(value); num=Math.round(value/Pmod); $('input[name=Numphoto]').val(num); s=Math.round(num*Smod); $('input[name=Sphoto]').val(s); $('input[name=STphoto]').val(s*kST); return 'Мощность: ' + value; } });
  
  $("#ex2").slider({ min: 5, max: 75, step:0.5, value: 42.5, focus: true , formatter: function(value) { $('input[name=Aphoto]').val(value); return 'Угол: ' + value; }});

  $('.colapse').css('height','1px');
  $('.calculate').click(function(){ $('.boxcalc').show(); });  
  $('.bcx').click(function(){ $('.boxcalc').hide(); });  
  $('.boxstick>div').click(function(){ i=$(this).index('.boxstick>div'); $('.tab-controls>li').removeClass('active'); $('.tab-controls>li').eq(i).addClass('active'); $('.popup').show(); });  
  $('.call').click(function(){ i=0; $('.tab-controls>li').removeClass('active'); $('.tab-controls>li').eq(i).addClass('active'); $('.popup').show(); });  
  
  $('.tab-controls a').click(function(){    
    if(!$(this).parent().hasClass('active'))
      TabShow($(this).attr('href'));
    return false;
  });

  $('select[name=type_batt]').val(3); 
  $('select[name=type_panel]').val(2); 
  $('select[name=type_station]').val(2);
  setTimeout("set_type_station(2)",2000);                
      

      $('path').eq(numo).click();
        
    $('.popup-close').click(function(){
    $('.popup').hide();
    }); 

    $('[data-popup]').click(function(){
    $($(this).data('popup')).addClass('active');
    if($(this).data('tab'))
      TabShow($(this).data('tab'));
    return false;
    });

});

function switchMap(obj) { 
    $('path').attr('fill','#fff');
    ncer=$('path').index(obj);
    $('path').eq(ncer).attr('fill','#91c84f');
    $('path').eq(numo).attr('fill','#91c84f');
}

function TabShow(tab_selector){

  $(tab_selector).parents('.tab-content').find('.tab').removeClass('active');
  $(tab_selector).addClass('active');
  
  $('a[href='+tab_selector+']').parents('.tab-controls').find('li').removeClass('active');
  $('a[data-tab='+tab_selector+']').parents('.tab-controls').find('li').removeClass('active');
  $('a[href='+tab_selector+']').parent().addClass('active');
  $('a[data-tab='+tab_selector+']').parent().addClass('active');
}

function set_type_station(n)
{
  $('.sts>div').hide(); 
  t=n-1;
  $('.sts>div').eq(t).show();
  V=1;
  
  switch(t)
  {
    case 0:
      V=1;
      $("#ex1").slider({ min: V, max: 30, step:0.5, value:1, focus: true});
      $('.type_private').show();    
      $('.type_auto').hide();    
      $('.type_man').hide();    
      Kst=1;
    break;
    
    case 1:
      V=100;
      $("#ex1").slider({ min: V, max: 2000, step:1 , value:100, focus: true});
      $('.type_man').show();    
      $('.type_auto').hide();    
      $('.type_private').hide();    
      Kst=2;
    break;
    
    case 2:
      V=0.5;
      $("#ex1").slider({ min: V, max: 20, step:0.5, value:0.5, focus: true});
      $('.type_auto').show();    
      $('.type_private').show();    
      $('.type_man').hide();    
      Kst=1;
    break;
  }
  V=1313;
  $('input[name=Vphoto]').val(V);
  num=Math.round(V/Pmod); 
  $('input[name=Numphoto]').val(num);
  s=Math.round(num*Smod); 
  $('input[name=Sphoto]').val(s);
  $('input[name=STphoto]').val(s*kST);
}


