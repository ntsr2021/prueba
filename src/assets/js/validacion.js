jQuery.validator.addMethod("correo", function(value, element) {
    return this.optional(element) || /^[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}$/.test(value);
}, "Formato de correo incorrecto");

jQuery.validator.addMethod("letras", function(value, element) {
    return this.optional(element) || /^[a-záéíóúñ\s]+$/i.test(value);
}, "Solo se permiten letras");

jQuery.validator.addMethod("flotante", function(value, element) {
    return this.optional(element) || /^\d*(\.\d{0,1})?\d{0,1}$/.test(value);
}, 'Solo se permiten números. En caso de introducir decimales debe dividirlos con un "." y estos no deben ser mayores a 2 dígitos.');

jQuery.validator.addMethod("entero", function(value, element) {
    return this.optional(element) || /^[-]{0,1}[0-9]{1,11}$/.test(value);
}, 'Solo se permiten números enteros');

jQuery.validator.addMethod("vhora", function(value, element) {
    return this.optional(element) || /^[0-9]{1,2}$/.test(value);
}, 'La hora debe poseer números enteros entre 1 y 12');

jQuery.validator.addMethod("vhora2", function(value, element) {
    return this.optional(element) || (parseInt(value)>0 && parseInt(value)<=12);
}, 'La hora debe poseer números enteros entre 1 y 12');

jQuery.validator.addMethod("vminuto", function(value, element) {
    return this.optional(element) || /^[0-9]{1,2}$/.test(value);
}, 'Los minutos debe poseer números enteros entre 1 y 59');

jQuery.validator.addMethod("vminuto2", function(value, element) {
    return this.optional(element) || (parseInt(value)>=0 && parseInt(value)<=59);
}, 'Los minutos debe poseer números enteros entre 10 y 59');

jQuery.validator.addMethod("telefono", function(value, element) {
    return this.optional(element) || /^[0-9]{11}$/.test(value);
}, "Formato de telefono incorrecto");

jQuery.validator.addMethod("alfanumerico", function(value, element) {
    return this.optional(element) || /^[a-záéíóúñ\s0-9]+$/i.test(value);
}, "Solo se permiten letras y numeros");

jQuery.validator.addMethod("descripcion", function(value, element) { 
    return this.optional(element) || !(/[<>\']/.test(value));
}, "Los siguientes caracteres no son permitidos: <>'");

jQuery.validator.addMethod("clave", function(value, element) {
  
  let letMay = /[A-Z]{1,}/.test(value);
  let letMin = /[a-z]{1,}/.test(value);
  let numeros = /[0-9]{1,}/.test(value);
  let carExpec = /[!@#$%^&*()_+\.]{1,}/.test(value);
  let cantCarac = (value.length >= 6 && value.length <= 20);

  return this.optional(element) || (letMay && letMin && numeros && carExpec && cantCarac);
}, "La contraseña debe tener una combinación de letras (mayúsculas y minúsculas), números y al menos un carácter especial");

jQuery.validator.addMethod("codigo_gift_card", function(value, element) {
  return this.optional(element) || /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/.test(value);
}, "Formato incorrecto, debe ser de la siguiente manera: XXXX-XXXX-XXXX");