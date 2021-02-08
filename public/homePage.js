"use strick";

const theLogout = new LogoutButton;
theLogout.action = () => {
        ApiConnector.logout((serverResponse) => {
                if (serverResponse.success) {
                    location.reload();
                }
            }
        );
};

ApiConnector.current((serverResponse) => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data);
        }
    }
);

const theRates = new RatesBoard;
const exchangeRates = () => {
    ApiConnector.getStocks((serverResponse) => {
        if (serverResponse.success) {
            theRates.clearTable();
            theRates.fillTable(serverResponse.data);
        }
    }
    );
};
exchangeRates();
setInterval(exchangeRates, 60000);


//операции с деньгами

const theMoney = new MoneyManager;
theMoney.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!");
        }
        else {
            theMoney.setMessage(serverResponse.success, serverResponse.error);
        }
    }
    );
};



theMoney.conversionMoneyCallback = (data_2) => {
    ApiConnector.convertMoney(data_2, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!"); 
        }
        else {
            theMoney.setMessage(serverResponse.success, serverResponse.error);
        }
    }
    );
};
theMoney.sendMoneyCallback = (data_3) => {
    ApiConnector.transferMoney(data_3, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!"); 
        }
        else {
            theMoney.setMessage(serverResponse.success, serverResponse.error);
        }
    }
    );
};


//Работа с избранным
const theFavorit = new FavoritesWidget;
ApiConnector.getFavorites(serverResponse => {
    if (serverResponse.success) {
        theFavorit.clearTable();
        theFavorit.fillTable(serverResponse.data);
        theMoney.updateUsersList(serverResponse.data);
        theFavorit.setMessage(serverResponse.success, "успех!"); 
    }
    else {
        theFavorit.setMessage(serverResponse.success, serverResponse.error);
    }
}
);

theFavorit.addUserCallback = (id) => {
    ApiConnector.addUserToFavorites(id, serverResponse => {
        if (serverResponse.success) {
            theFavorit.clearTable();
            theFavorit.fillTable(serverResponse.data);
            theMoney.updateUsersList(serverResponse.data);
            theFavorit.setMessage(serverResponse.success, "успех!"); 
        }
        else {
            theFavorit.setMessage(serverResponse.success, serverResponse.error);
        }
    }
    );
};

//"Также выведите сообщение об успехе или ошибку", а как в этом блоке вообще может возникнуть ошибка, что надо сделать?)
theFavorit.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, serverResponse => {
        if (serverResponse.success) {
            theFavorit.clearTable();
            theFavorit.fillTable(serverResponse.data);
            theMoney.updateUsersList(serverResponse.data);
        }
        else {
            theFavorit.setMessage(serverResponse.success, serverResponse.error);
        }
    }
    );
};

