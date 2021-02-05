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
setInterval(exchangeRates, 60000);


//операции с деньгами
//ВОПРОСЫ:
//1. вызов на 42 стр одновременно с вызовом на стр 40 не работают, только какой-то один из них. не понимаю, как это исправить и почему так происходит...
//2. "У дефолтных пользователей oleg@demo.ru и тд в избранном присутствуют существующие пользователи", но у меня их нет( поэтому никак не могу проверить блок на страницах 60-69.как это исправить? 
//3. вопрос по оформлению — после всех фигурных скобок надо ставить ";"? запуталась...
const theMoney = new MoneyManager;
theMoney.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!"); 
        }
       //theMoney.setMessage(serverResponse.success, serverResponse.error);
    }
    );
};

theMoney.conversionMoneyCallback = (data_2) => {
    ApiConnector.convertMoney(data_2, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!"); 
        }
        //theMoney.setMessage(serverResponse.success, serverResponse.error);
    }
    );
};

theMoney.sendMoneyCallback = (data_3) => {
    ApiConnector.transferMoney(data_3, serverResponse => {
        if (serverResponse.success) {
            ProfileWidget.showProfile(serverResponse.data); 
            theMoney.setMessage(serverResponse.success, "успех!"); 
        }
        //theMoney.setMessage(serverResponse.success, serverResponse.error);
    }
    );
};

