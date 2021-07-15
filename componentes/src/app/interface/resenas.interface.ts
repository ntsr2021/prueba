export interface respResCompra {
    total_count: number;
    items:       resenaCompra[];
}
export interface respResProducto {
    total_count: number;
    items:       resenaProducto[];
}

export interface resenaCompra {
    id_resena_compra: string;
    puntaje:          string;
    estatus:          string;
    descripcion:      string;
}
export interface resenaProducto {
    id_resena_producto: string;
    puntaje:          string;
    estatus:          string;
    descripcion:      string;
}
