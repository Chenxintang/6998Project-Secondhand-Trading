const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: "us-east-1_bDH6MZLOq",
   ClientId: "4ktjq3mdvlgoqacc36g0dpuftp"
};
const pool_region = "us-east-1";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


function RegisterUser(username,password,email,callback){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));

    userPool.signUp(username, password, attributeList, null, function(err, result){
        console.log(username, password, email)
        if (err) {
            console.log(err);
            if (err["code"]=="UsernameExistsException"){
                ResendCode(username);
            }
            console.log("resend");
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        callback(cognitoUser);
    });
}

function ConfirmEmail(username,code,callback){
    var userData = {
        Username: username,
        Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
        callback("success");
    });

}

function Loginfunc(email,password,callback){
    console.log(password, email)
    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var userData = {
        Username: email,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            // var accessToken = result.getAccessToken().getJwtToken();
            console.log(result)
            callback('success', result.accessToken.payload.username);
        },

        onFailure: function(err) {
          console.log(err)
          callback('fail', err.message);
            // alert(err.message || JSON.stringify(err));
        },
    });

}

function ResendCode(username){
    var userData = {
        Username: username,
        Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	console.log(result);
});

}

export { RegisterUser,ConfirmEmail,Loginfunc,ResendCode }