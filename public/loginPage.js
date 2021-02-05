
"use strict";

const theUser = new UserForm;

theUser.loginFormCallback = data => {
    ApiConnector.login(data, serverResponse => {
        if (serverResponse.success) {
            location.reload();
            return;
        }
        theUser.setLoginErrorMessage("неверный логин или пароль");
    }
    )
};

theUser.registerFormCallback = data => {
    ApiConnector.register(data, serverResponse => {
        if (serverResponse.success) {
            location.reload();
            return;
        }
        theUser.setRegisterErrorMessage("такой пользователь уже есть");
    }
    )
};


