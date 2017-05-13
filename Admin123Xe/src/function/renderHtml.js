function renderHtml(body, medias, deviceWidth) {
	if (medias == null){
		return body;
	}

	var bodySplit = body.split('<br/>');
	if (bodySplit.length == 1){
		return body;
	}

	var htmlImage = [];
	for (i=0;i<medias.length;i++){  // tao list the html image
		media = medias[i];
		htmlImageItem = '<p align = "center" ><img src="'+media.href+'" alt="Mountains" width="'+deviceWidth+'" height="600"><p style="color:#0000ff; font-style:italic; text-align:center">'+media.title+'</p></p><br/>';
		htmlImage.push(htmlImageItem);
	}

	var result = '';
	var count = (htmlImage.length > bodySplit.length) ? bodySplit.length : htmlImage.length;
	for (i=0;i<count;i++){
		result = result +'<p>'+ bodySplit[i] +'<br/></p>'+htmlImage[i];
	}

	return result;

}
export default renderHtml;