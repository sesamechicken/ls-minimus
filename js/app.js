// DO NOT EDIT BELOW THIS LINE
$(document).ready(function() {
	// fire off first run
	clock();
	showLoader();
	getWeather(locale);
});
var clockInt = setInterval(clock, 1000);
function clock() {
  
  var time = new Date();
  var currentHours = time.getHours();
  var currentMinutes = time.getMinutes();
  var currentSeconds = time.getSeconds();
  if(currentHours >= 12){ am_pm = "p";}else{ am_pm = "a"; }
  if(twelve_hour_time){
	if(currentHours >= 13){ currentHours = currentHours - 12;}
if(currentHours == 0){currentHours = 12;}
	if(currentMinutes < 10){ currentMinutes = "0" + currentMinutes;}
    if(currentSeconds < 10) { currentSeconds = "0" + currentSeconds;}
  }
  
  if(show_seconds){
	var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;
  }else{
	var currentTime = currentHours + ":" + currentMinutes;
  }
  $('#clock').html(currentTime + " <span class='am-pm'>" + am_pm + "</span>");
  $('#date').html((time.getMonth()+1) + "/" + time.getDate() + "/" + time.getFullYear());
  time.textDay();
  $('#day_of_week').html(time.day);
}
Date.prototype.textDay = function(){
  if (this.getDay()==0){this.day="Sunday"};
  if (this.getDay()==1){this.day="Monday"};
  if (this.getDay()==2){this.day="Tuesday"};
  if (this.getDay()==3){this.day="Wednesday"};
  if (this.getDay()==4){this.day="Thursday"};
  if (this.getDay()==5){this.day="Friday"};
  if (this.getDay()==6){this.day="Saturday"};
}
// The call to get the weather data
function getWeather(locale){
	if(celcius){ 
		tempType = 'c';
	}else{
		tempType = 'f';
	}
	if(useSmallData){
		var salt = Math.floor((Math.random()*999999)+100000);
		$.ajax({
		type: 'GET',
		//	url: 'forecastrss.xml', // local testing
		url: 'http://project107.net/api/lockscreen/weather/small-data.php?locale='+locale+'&tempType='+tempType+'&salt='+salt,
		crossDomain: true,
		dataType: 'text',
		success: function(data){ parseWeather(data, 'small');},
		error: function(data){ $('#status').html("An error occured getting weather data from project107"); useSmallData = false; getWeather(locale);}
	      });
	}
	else{
	    $.ajax({
		type: 'GET',
		//	url: 'forecastrss.xml', // local testing
		url: 'http://weather.yahooapis.com/forecastrss?u='+tempType+'&p='+locale+'&callback=c'+'&salt='+salt,
		crossDomain: true,
		dataType: 'text',
		success: function(data){ parseWeather(data, 'big');},
		error: function(data){ $('#status').html("An error occured getting weather data from yahoo");}
	      });
	}
}
function parseWeather(data, datatype){
	if(datatype == 'small'){
		var raw = data,
		xmlDoc = $.parseXML(raw),
		$xml = $(xmlDoc),
		$current = $xml.find("temp"),
		$currentDesc = $xml.find("desc"),
		$code = $xml.find("code"),
		$highTemp = $xml.find("high"),
		$lowTemp = $xml.find("low");
	}
	else{
		var raw = data,
		xmlDoc = $.parseXML(raw),
		$xml = $(xmlDoc),
		$current = $xml.find("yweather\\:condition, temp").attr("temp"),
		$currentDesc = $xml.find("yweather\\:condition, text").attr("text"),
		$code = $xml.find("yweather\\:condition, code").attr("code"),
		$highTemp = $xml.find("yweather\\:forecast, high").attr("high"),
		$lowTemp = $xml.find("yweather\\:forecast, low").attr("low");
	}
	// Set vals
	$('#temp_max').html($highTemp);
	$('#temp_min').html($lowTemp);
	$('#temp_val').html($current);
	$('#temp_conditions').html($currentDesc);
	$('#weather-icon').html("<img src='Weather/icons/"+$code.text()+".png' class='icon' />");
	// Hide loader after values have been set
	hideLoader();
}
function showLoader(){
	$('#weather_container').hide();
	$('#loader').show();
}
function hideLoader(){
	$('#loader').fadeOut();
	$('#weather_container').fadeIn();
}