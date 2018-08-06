/**
*FourSquare API
*/
const CLIENT_ID = 'GWO5RIOXSR3HNCXM41HF1VXES3HAFV4HW54ZTE0BAFALLFXE';
const CLIENT_SECRET = 'BYCOMFR2RD1RCJUGQWPZKZJ2CMWJPBOB12CCL4PF12V5JYUR';
const API = "https://api.foursquare.com/v2";
const VERSION = "20180725";

const RADIUS_M = 250;
const SEARCH_RESULTS = 1;

/**
*Return a venue id from FourSquare. Takes lat, lng & name.
*/
export const getSearchResult = (lat, lng, name) =>
	fetch(`${API}/venues/search?ll=${lat},${lng}&limit=${SEARCH_RESULTS}&radius=${RADIUS_M}&query=${name}
    	&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues[0].id)
	  	.catch('error')
/**
*Return an array of details about a place from FourSquare. Takes venue id.
*/
export const getDetails = (id) =>
	fetch(`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
  		.then(res => res.json())
  		.catch('error')