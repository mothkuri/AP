
//try1
/*function define(name, value) {
	Object.defineProperty(exports, name, {
		value : value,
		enumerable : true,
		writable:false
	});
}

define("SUCCESS", 'success');
define('ERROR', 'error');
define('RESPONSE', {
	"status" : "",
	"data" : null,
	"message" : ""
})*/

//try 2
var constants = {
	SUCCESS : 'success',
	ERROR : 'error',
	RESPONSE : {
		"status" : '',
		"data" : '',
		"message" : ''
	}
}

module.exports = constants;


