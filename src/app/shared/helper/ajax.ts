declare var $:any; 	

function ajax(url, datos, success)
{
	$.ajax({
		async: false,
		url: url,
		type: 'POST',
		dataType: 'html',
		data: JSON.stringify(datos),
		cache: false,
		contentType: false,
		processData: false,

    success: success,

    timeout: 5000
  });
}

function ajax2(url, success)
{
	$.ajax({
		async: false,
		url: url,
		type: 'GET',
		dataType: 'html',
		cache: false,
		contentType: false,
		processData: false,

    success: success,

    timeout: 5000
  });
}

export { ajax, ajax2 };