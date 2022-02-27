const { makeHttpRequest } = require('../config/common');
const hashService = require('./hashService');
const crypto = require('crypto');

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }
    
     async sendOtpToUser(mobileNo,OTP){
        
        var apiAuth = "template_id=" + process.env.MSG_TEMPLATE_ID + "&mobile=" + "91" + mobileNo + "&authkey=" + process.env.MSG_API_AUTH + "&otp=" + OTP;
      
        var options = {
          method: 'GET',
          hostname: 'api.msg91.com',
          port: null,
          path: '/api/v5/otp?' + apiAuth,
          headers: {
            'Content-Type': 'application/JSON',
          }
        };
      
        const resp = await makeHttpRequest(options, null, function (err, data) {
          if (err) return err;
          console.log(err);
          return OTP;
        });
        console.log(resp);
        return resp;
      };
      
    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
