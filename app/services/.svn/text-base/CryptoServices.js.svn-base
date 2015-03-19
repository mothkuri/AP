var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var cryptoServices={
		encrypt : function(text,next){
			var cipher = crypto.createCipher(algorithm,password)
			var crypted = cipher.update(text,'utf8','hex')
			crypted += cipher.final('hex');
			next(crypted);
		},
		
		decrypt : function(encryptedText,next){
			var decipher = crypto.createDecipher(algorithm,password)
			var dec = decipher.update(encryptedText,'hex','utf8')
			dec += decipher.final('utf8');
			next(dec);
		}
		
};

module.exports=cryptoServices;