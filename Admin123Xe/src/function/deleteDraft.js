async function deleteDraft(id, sessionKey) {
	return await fetch ('http://api.cms.mobilelab.vn/api/v1/draft/'+id,{
		method:'DELETE',
		headers:{
			'Accept': 'application/json',
			sessionKey
		}
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			return true
		}
		return false;
	})
}

export default deleteDraft;

/*
{
        "abstraction": "Hiện tại, mức giá vé máy bay các hãng đưa ra chỉ từ vài trăm nghìn đồng, thậm chí \"0 đồng\" cho các chặng bay. Vậy, giá vé sẽ thay đổi thế nào nếu áp giá sàn như đề xuất của Jetstar?",
        "body": "Hiện nay, nhiều hãng hàng không đưa ra mức giá vé máy bay chỉ từ vài trăm nghìn đồng, thậm chí \"0 đồng\" cho một số chặng bay. Tuy nhiên, mới đây, góp ý trong Dự thảo Quyết định khung giá dịch vụ vận chuyển hàng không hạng vé phổ thông cơ bản trên các đường bay nội địa, hãng hàng không Jetstar Pacific đã đề xuất áp giá sàn vé máy bay.<br/>Cụ thể, báo chí dẫn văn bản đề xuất của hãng hàng không này cho biết hiệu quả kinh doanh, sự bền vững của các hãng cũng như của ngành bị ảnh hưởng do hàng không Việt Nam phát triển quá nóng với tải cung ứng tăng trên 30%, hãng liên tục phải giảm giá, thậm chí bán dưới giá thành, rẻ hơn vé tàu. ",
        "categories": [
          18
        ],
        "categoriesDetail": [
          {
            "description": "Kinh doanh",
            "id": 18,
            "name": "Kinh doanh"
          }
        ],
        "createAt": 1491361579,
        "description": "Vé máy bay Hà Nội - TP.HCM rẻ nhất 1,1 triệu, vé 0 đồng hết thời.",
        "id": 181,
        "medias": null,
        "owner": {
          "displayName": "Cấn Cát",
          "email": "cancat95@gmail.com",
          "id": 4,
          "userType": 1
        },
        "status": 5,
        "tags": [
          "vé máy bay"
        ],
        "title": "Vé máy bay Hà Nội - TP.HCM rẻ nhất 1,1 triệu, vé 0 đồng hết thời",
        "updateAt": 1491384574
      }
*/