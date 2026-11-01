"use strict";

/* ===== Validación común ===== */
function leerNumero(texto) {
  const t = String(texto).trim();
  if (t === "") return { ok: false, mensaje: "Complete el campo." };
  const n = Number(t);
  if (!Number.isFinite(n)) return { ok: false, mensaje: "Escriba un número válido (use punto decimal)." };
  return { ok: true, valor: n };
}

/* ===== Calculadora: sumar y dividir (originales) + restar y multiplicar ===== */
function calcular(textoA, textoB, operacion) {
  if (String(textoA).trim() === "" || String(textoB).trim() === "") {
    return { ok: false, mensaje: "Complete las dos entradas." };
  }
  const a = Number(String(textoA).trim());
  const b = Number(String(textoB).trim());
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { ok: false, mensaje: "Escriba números válidos en ambas entradas." };
  }
  if (operacion === "dividir" && b === 0) {
    return { ok: false, mensaje: "No se puede dividir entre cero." };
  }
  const limpiar = function (x) { return Number(x.toPrecision(12)); };
  if (operacion === "sumar")       { const v = limpiar(a + b); return { ok: true, valor: v, mensaje: "Suma: " + v }; }
  if (operacion === "restar")      { const v = limpiar(a - b); return { ok: true, valor: v, mensaje: "Resta: " + v }; }
  if (operacion === "multiplicar") { const v = limpiar(a * b); return { ok: true, valor: v, mensaje: "Multiplicación: " + v }; }
  const v = limpiar(a / b);
  return { ok: true, valor: v, mensaje: "División: " + v };
}

/* ===== Conversor: lista de objetos (datos) + función (cálculo) ===== */
const CONVERSIONES = [
  { id: "m-cm", etiqueta: "Metros a centímetros",  desde: "m",  hacia: "cm", factor: 100,  inversa: false },
  { id: "cm-m", etiqueta: "Centímetros a metros",  desde: "cm", hacia: "m",  factor: 100,  inversa: true  },
  { id: "kg-g", etiqueta: "Kilogramos a gramos",   desde: "kg", hacia: "g",  factor: 1000, inversa: false },
  { id: "g-kg", etiqueta: "Gramos a kilogramos",   desde: "g",  hacia: "kg", factor: 1000, inversa: true  }
];

function convertir(texto, idConversion) {
  const conv = CONVERSIONES.find(function (c) { return c.id === idConversion; });
  if (!conv) return { ok: false, mensaje: "Conversión no reconocida." };

  const lectura = leerNumero(texto);
  if (!lectura.ok) return lectura;
  if (lectura.valor < 0) return { ok: false, mensaje: "No se permiten valores negativos." };

  const bruto = conv.inversa ? lectura.valor / conv.factor : lectura.valor * conv.factor;
  const valor = Number(bruto.toPrecision(12)); // evita ruido de coma flotante
  return { ok: true, valor: valor, mensaje: lectura.valor + " " + conv.desde + " = " + valor + " " + conv.hacia };
}

/* ===== Comportamiento en la página ===== */
function mostrar(idElemento, r) {
  const el = document.getElementById(idElemento);
  el.textContent = r.mensaje;
  el.classList.toggle("error", !r.ok);
}

function iniciar() {
  const selector = document.getElementById("conversor-tipo");
  CONVERSIONES.forEach(function (c) {
    const op = document.createElement("option");
    op.value = c.id;
    op.textContent = c.etiqueta;
    selector.appendChild(op);
  });

  function hacerCalculo() {
    mostrar("resultado", calcular(
      document.getElementById("a").value,
      document.getElementById("b").value,
      document.getElementById("operacion").value
    ));
  }
  function hacerConversion() {
    mostrar("conversor-resultado", convertir(document.getElementById("conversor-valor").value, selector.value));
  }

  document.getElementById("calcular").addEventListener("click", hacerCalculo);
  document.getElementById("convertir").addEventListener("click", hacerConversion);
  ["a", "b"].forEach(function (id) {
    document.getElementById(id).addEventListener("keydown", function (e) { if (e.key === "Enter") hacerCalculo(); });
  });
  document.getElementById("conversor-valor").addEventListener("keydown", function (e) { if (e.key === "Enter") hacerConversion(); });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
}

if (typeof module !== "undefined") module.exports = { calcular, convertir, CONVERSIONES };
