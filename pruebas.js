// Ejecutar con: node pruebas.js
const { calcular, convertir } = require("./app.js");
let fallos = 0;
function prueba(nombre, real, esperado) {
  const ok = real === esperado;
  if (!ok) fallos++;
  console.log((ok ? "OK    " : "FALLA ") + nombre + " -> " + real + (ok ? "" : " (esperado " + esperado + ")"));
}
// Conversor
prueba("1 m = 100 cm",     convertir("1", "m-cm").valor, 100);
prueba("100 cm = 1 m",     convertir("100", "cm-m").valor, 1);
prueba("1 kg = 1000 g",    convertir("1", "kg-g").valor, 1000);
prueba("1000 g = 1 kg",    convertir("1000", "g-kg").valor, 1);
prueba("0 = 0 (m-cm)",     convertir("0", "m-cm").valor, 0);
prueba("0 = 0 (g-kg)",     convertir("0", "g-kg").valor, 0);
prueba("1.5 m = 150 cm",   convertir("1.5", "m-cm").valor, 150);
prueba("campo vacío rechazado", convertir("  ", "m-cm").ok, false);
prueba("negativo rechazado",    convertir("-5", "kg-g").ok, false);
prueba("texto rechazado",       convertir("abc", "m-cm").ok, false);
prueba("Infinity rechazado",    convertir("Infinity", "m-cm").ok, false);
// Operaciones originales
prueba("12 + 3 = 15",           calcular("12", "3", "sumar").valor, 15);
prueba("12 / 3 = 4",            calcular("12", "3", "dividir").valor, 4);
prueba("suma con vacío",        calcular("", "3", "sumar").mensaje, "Complete las dos entradas.");
prueba("división con texto",    calcular("x", "3", "dividir").mensaje, "Escriba números válidos en ambas entradas.");
prueba("división entre cero",   calcular("5", "0", "dividir").mensaje, "No se puede dividir entre cero.");
prueba("suma con 0 no se bloquea", calcular("5", "0", "sumar").valor, 5);
console.log(fallos === 0 ? "\nTodas las pruebas pasaron." : "\nFallos: " + fallos);
process.exit(fallos ? 1 : 0);
