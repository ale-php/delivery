var defineLanguage = function(translateProvider,configProvider){

    var preferredLanguage = "en";

    translateProvider
        .translations('en', {
            'MENU_HEADER' : 'Menu',
            'MENU_ORDER_BUTTON' : 'Carrinho',

            'SIDEMENU_HEADER' : 'Delivery',
            'SIDEMENU_MENU_LINK' : 'Menu',
            'SIDEMENU_CONTACT_LINK' : 'Contato',
            'SIDEMENU_ORDER_LINK' : 'Carrinho',

            'ORDER_HEADER' : 'Seu pedido',
            'ORDER_TOTAL_LABEL' : 'Total',
            'ORDER_ORDER_BUTTON' : 'Ordem !',

            'OPTION_HEADER' : 'Por favor selecione uma opção',
            'OPTION_TEAKEOUT_BUTTON' : 'Tirar',
            'OPTION_EATIN_BUTTON' : 'Comer',
            'OPTION_DELIVERY_BUTTON' : 'Delivery',
            'OPTION_NO_ORDER_MESSAGE' : "Nada foi encomendado", //
            'OPTION_CLOSED_MESSAGE' : "Estamos atualmente fechados, por favor, volte mais tarde", //
            'OPTION_CANCEL_BUTTON' : 'Cancelar',

            'EATIN_TITLE' : 'Comer',
            'TAKEOUT_TITLE' : 'Tirar',
            'DELIVERY_TITLE' : 'Delivery',

            'SERVICE_TIME_LABEL' : 'Tempo',
            'SERVICE_CHANGE_TIME_BUTTON' : 'Alterar',
            'SERVICE_TOTAL_LABEL' : 'Total',
            'SERVICE_SUBTOTAL_LABEL' : 'Subtotal',
            'SERVICE_VALIDATE_BUTTON' : 'Validar',
            'SERVICE_ORDER_SENT_MESSAGE' : 'O pedido foi enviado',
            'SERVICE_DELIVERY_LABEL' : 'Delivery',
            'SERVICE_ADDRESS_NAME_LABEL' : 'Nome Completo',
            'SERVICE_ADDRESS_STREET_LABEL' : 'Seu Endereço',
            'SERVICE_ADDRESS_CITY_LABEL' : 'Cidade',
            'SERVICE_ADDRESS_PHONE_NUMBER_LABEL' : 'Número de Telefone',

            'TIMEPICKER_HEADER' : 'Por favor, selecione uma hora', //
            'TIMEPICKER_CHOOSE_BUTTON' : "Escolher", //
            'TIMEPICKER_CLOSE_BUTTON' : "Fechar",  //

            'CONTACT_ADDRESS_LABEL' : 'Endereço',
            'CONTACT_PHONE_NUMBER_LABEL' : 'Celular',
            'CONTACT_EMAIL_LABEL' : 'E-mail'

        })

    switch(preferredLanguage){
        case 'fr':
            translateProvider.preferredLanguage('fr');
            configProvider.backButton.text("Retour");
            break;
        case 'es' :
            translateProvider.preferredLanguage('es');
            configProvider.backButton.text("Atras");
            break;
        default :
            translateProvider.preferredLanguage('en');
            configProvider.backButton.text("Back");
            break;
    }
}