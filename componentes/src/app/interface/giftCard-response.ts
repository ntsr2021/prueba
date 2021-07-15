export interface GiftCardResponse {
    id_gift_card:      string;
    img:               null;
    codigo:            null;
    titulo:            string;
    nombre_remitente:  string;
    mensaje:           string;
    saldo:             string;
    cantidad:          string;
    fecha_creacion:    null;
    fecha_expiracion:  null;
    id_user_remitente: null;
    id_user_receptor:  null;
}

export interface PresentacionGiftCard {
    id_gift_card_presentacion : number
    nombre: string
}








