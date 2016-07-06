var defineLanguage = function(translateProvider,configProvider){

    var preferredLanguage = "en";

    translateProvider
        .translations('en', {
            'MENU_HEADER' : 'Our menu',
            'MENU_ORDER_BUTTON' : 'Order',

            'SIDEMENU_HEADER' : 'Menu',
            'SIDEMENU_MENU_LINK' : 'Our menu',
            'SIDEMENU_CONTACT_LINK' : 'Contact',
            'SIDEMENU_ORDER_LINK' : 'Order',

            'ORDER_HEADER' : 'Your Order',
            'ORDER_TOTAL_LABEL' : 'Total',
            'ORDER_ORDER_BUTTON' : 'Order !',

            'OPTION_HEADER' : 'Please select an option',
            'OPTION_TEAKEOUT_BUTTON' : 'Take out',
            'OPTION_EATIN_BUTTON' : 'Eat in',
            'OPTION_DELIVERY_BUTTON' : 'Delivery',
            'OPTION_NO_ORDER_MESSAGE' : "Nothing has been ordered", //
            'OPTION_CLOSED_MESSAGE' : "We are currently closed, please come back later", //
            'OPTION_CANCEL_BUTTON' : 'Cancel',

            'EATIN_TITLE' : 'Eat in',
            'TAKEOUT_TITLE' : 'Take out',
            'DELIVERY_TITLE' : 'Delivery',

            'SERVICE_TIME_LABEL' : 'Time',
            'SERVICE_CHANGE_TIME_BUTTON' : 'Change',
            'SERVICE_TOTAL_LABEL' : 'Total',
            'SERVICE_SUBTOTAL_LABEL' : 'Subtotal',
            'SERVICE_VALIDATE_BUTTON' : 'Validate',
            'SERVICE_ORDER_SENT_MESSAGE' : 'The order has been sent',
            'SERVICE_DELIVERY_LABEL' : 'Delivery',
            'SERVICE_ADDRESS_NAME_LABEL' : 'Full name',
            'SERVICE_ADDRESS_STREET_LABEL' : 'Street address',
            'SERVICE_ADDRESS_CITY_LABEL' : 'City',
            'SERVICE_ADDRESS_PHONE_NUMBER_LABEL' : 'Phone number',

            'TIMEPICKER_HEADER' : 'Please select an hour', //
            'TIMEPICKER_CHOOSE_BUTTON' : "Choose", //
            'TIMEPICKER_CLOSE_BUTTON' : "Close",  //

            'CONTACT_ADDRESS_LABEL' : 'Address',
            'CONTACT_PHONE_NUMBER_LABEL' : 'Phone number',
            'CONTACT_EMAIL_LABEL' : 'Email'

        })
        .translations('fr',{
            'MENU_HEADER' : 'Notre menu',
            'MENU_ORDER_BUTTON' : 'commande',

            'SIDEMENU_HEADER' : 'Menu',
            'SIDEMENU_MENU_LINK' : 'Notre menu',
            'SIDEMENU_CONTACT_LINK' : 'Contact',
            'SIDEMENU_ORDER_LINK' : 'Commade',

            'ORDER_HEADER' : 'Votre Commande',
            'ORDER_TOTAL_LABEL' : 'Total',
            'ORDER_ORDER_BUTTON' : 'Commander !',

            'OPTION_HEADER' : 'Veuillez choisir une option',
            'OPTION_TEAKEOUT_BUTTON' : 'Récupérer',
            'OPTION_EATIN_BUTTON' : 'Sur Place',
            'OPTION_DELIVERY_BUTTON' : 'Livraison',
            'OPTION_NO_ORDER_MESSAGE' : "Vous n'avez rien commandé", //
            'OPTION_CLOSED_MESSAGE' : "Nous sommes couramment fermés, veuillez revenir plus tard.", //
            'OPTION_CANCEL_BUTTON' : 'Annuler',

            'EATIN_TITLE' : 'Récupérer',
            'TAKEOUT_TITLE' : 'Sur Place',
            'DELIVERY_TITLE' : 'Livraison',


            'SERVICE_TIME_LABEL' : 'Heure',
            'SERVICE_CHANGE_TIME_BUTTON' : 'Modifier',
            'SERVICE_TOTAL_LABEL' : 'Total',
            'SERVICE_SUBTOTAL_LABEL' : 'Sous Total',
            'SERVICE_VALIDATE_BUTTON' : 'Valider',
            'SERVICE_VALIDATE_BUTTON_WARNING' : 'un email sera envoyé',
            'SERVICE_ORDER_SENT_MESSAGE' : 'La commande a été envoyé',
            'SERVICE_DELIVERY_LABEL' : 'Livraison',
            'SERVICE_ADDRESS_NAME_LABEL' : 'Nom complet',
            'SERVICE_ADDRESS_STREET_LABEL' : 'Nom de rue',
            'SERVICE_ADDRESS_CITY_LABEL' : 'Ville',
            'SERVICE_ADDRESS_PHONE_NUMBER_LABEL' : 'Numéro de téléphone',

            'TIMEPICKER_HEADER' : 'Veuillez choisir une heure', //
            'TIMEPICKER_CHOOSE_BUTTON' : "Choisir", //
            'TIMEPICKER_CLOSE_BUTTON' : "Fermer",  //


            'CONTACT_ADDRESS_LABEL' : 'Adresse',
            'CONTACT_PHONE_NUMBER_LABEL' : 'Numéro de téléphone',
            'CONTACT_EMAIL_LABEL' : 'Email'
        })
        .translations('es',{
            'MENU_HEADER' : 'Nuestro menú',
            'MENU_ORDER_BUTTON' : 'Orden',

            'SIDEMENU_HEADER' : 'Menú',
            'SIDEMENU_MENU_LINK' : 'Nuestro menú',
            'SIDEMENU_CONTACT_LINK' : 'Contactar',
            'SIDEMENU_ORDER_LINK' : 'Orden',

            'ORDER_HEADER' : 'Su comando',
            'ORDER_TOTAL_LABEL' : 'Total',
            'ORDER_ORDER_BUTTON' : 'Orden !',

            'OPTION_HEADER' : 'Seleccione una opción por favor',
            'OPTION_TEAKEOUT_BUTTON' : 'Recuperar',
            'OPTION_EATIN_BUTTON' : 'Comer en',
            'OPTION_DELIVERY_BUTTON' : 'Entrega',
            'OPTION_NO_ORDER_MESSAGE' : "Usted ha pedido nada", //
            'OPTION_CLOSED_MESSAGE' : "Estamos cerrados actualmente , por favor regrese más tarde", //
            'OPTION_CANCEL_BUTTON' : 'Cancelar',

            'EATIN_TITLE' : 'Recuperar',
            'TAKEOUT_TITLE' : 'Comer en',
            'DELIVERY_TITLE' : 'Entrega',


            'SERVICE_TIME_LABEL' : 'Hora',
            'SERVICE_CHANGE_TIME_BUTTON' : 'Cambio',
            'SERVICE_TOTAL_LABEL' : 'Total',
            'SERVICE_SUBTOTAL_LABEL' : 'Total parcial',
            'SERVICE_VALIDATE_BUTTON' : 'Validar',
            'SERVICE_VALIDATE_BUTTON_WARNING' : 'Se enviará un correo electrónico',
            'SERVICE_ORDER_SENT_MESSAGE' : 'La orden fue enviada',
            'SERVICE_DELIVERY_LABEL' : 'Entrega',
            'SERVICE_ADDRESS_NAME_LABEL' : 'Nombre completo',
            'SERVICE_ADDRESS_STREET_LABEL' : 'Nombre de la calle',
            'SERVICE_ADDRESS_CITY_LABEL' : 'Ciudad',
            'SERVICE_ADDRESS_PHONE_NUMBER_LABEL' : 'Número telefónico',

            'TIMEPICKER_HEADER' : 'Por favor, elija un momento', //
            'TIMEPICKER_CHOOSE_BUTTON' : "Elegir", //
            'TIMEPICKER_CLOSE_BUTTON' : "Cerrar",  //

            'CONTACT_ADDRESS_LABEL' : 'Dirección',
            'CONTACT_PHONE_NUMBER_LABEL' : 'Número de teléfono',
            'CONTACT_EMAIL_LABEL' : 'correo electrónico'
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