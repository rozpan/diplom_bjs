
"use strict";

const theUser = new UserForm;
 
// написала разными визуалами однопитные блоки, чтобы вы помогли понять каким из этих способов все же лучше оформлять подобные функции.
//"В случае провала запроса выведите ошибку в окно для ошибок" - вывести ошибку свою, как я написла, или нужен текст ошибки с сервера?
theUser.loginFormCallback = data => {
    ApiConnector.login(data, serverResponse => {
        if (serverResponse.success) {
            location.reload();
            return;
        }
        theUser.setLoginErrorMessage("неверный логин или пароль");
    }
    )
}

theUser.registerFormCallback = data => ApiConnector.register(data, serverResponse => 
        serverResponse.success ? location.reload() : theUser.setRegisterErrorMessage("такой пользователь уже есть"));






