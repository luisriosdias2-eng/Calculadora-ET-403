# Calculadora ET403 · Semana 9

Trabajo grupal. Calculadora con suma y división (originales de la semana 7), resta, multiplicación y un conversor de unidades (m ↔ cm, kg ↔ g).

## Integrantes
- Luis Rios
- Brayan Kuja
- Maek Flores
- Naomi
- Michelli

## Enlaces
1. Sitio publicado (página de GitHub donde se subió el proyecto): https://github.com/luisriosdias2-eng
2. Repositorio: https://github.com/luisriosdias2-eng/Calculadora-ET-403
3. Versión original (semana 7): [`index-original.html`](index-original.html)

## Estructura del proyecto
| Archivo | Contenido |
|---|---|
| `index.html` | Estructura (calculadora y conversor) |
| `styles.css` | Estilos y personalización |
| `app.js` | Lógica: calculadora, lista `CONVERSIONES` y función `convertir` |
| `pruebas.js` | Pruebas automáticas (`node pruebas.js`) |
| `index-original.html` | Copia del original de la semana 7 |
| `README.md` | Este documento |

## Uso
1. **Calculadora:** escriba dos valores, elija la operación (Sumar, Restar, Multiplicar o Dividir) y pulse *Calcular* (o Enter).
2. **Conversor:** escriba un valor, elija la conversión y pulse *Convertir* (o Enter).
3. Se rechazan: campo vacío, texto o valor no finito. En el conversor también los valores negativos. En la división, el divisor cero.

## Cómo está hecho el conversor
- Los **datos** están en una lista de objetos `CONVERSIONES` (id, etiqueta, unidad de origen, unidad de destino, factor y si es inversa).
- El **cálculo** lo hace la función `convertir(texto, id)`: valida la entrada y multiplica o divide por el factor.
- No se usa un archivo JSON externo: la lista representa los datos y JavaScript ejecuta el cálculo.

## Personalización (CSS)
- Etiqueta modificada: `<label for="a">` cambió de "Primer dato" a "Primer valor".
- Tamaño por CSS: `label[for="a"] { font-size: 1.5rem; }` (antes 22 px heredado).
- Paleta elegida: azul **RGB(30, 64, 175)**.
  - Texto blanco **RGB(255, 255, 255)** sobre botones: contraste ≈ 8.7:1, legible.
  - Fondo de resultados: RGB(238, 243, 248).
  - Error: RGB(185, 28, 28) sobre RGB(254, 242, 242).

## Pruebas realizadas
| Caso | Esperado | Resultado |
|---|---|---|
| 1 m → cm | 100 | OK |
| 100 cm → m | 1 | OK |
| 1 kg → g | 1000 | OK |
| 1000 g → kg | 1 | OK |
| 0 → 0 | 0 | OK |
| 1.5 m → cm | 150 | OK |
| Campo vacío (conversor) | Rechazado | OK |
| Negativo (conversor) | Rechazado | OK |
| 12 + 3 | 15 | OK |
| 12 ÷ 3 | 4 | OK |
| Calculadora con campo vacío | "Complete las dos entradas." | OK |
| Calculadora con texto | "Escriba números válidos..." | OK |
| 5 ÷ 0 | "No se puede dividir entre cero." | OK |

Las pruebas se ejecutaron con `node pruebas.js` y también manualmente en el navegador.

## Aportes del grupo
| Integrante | Aporte |
|---|---|
| Luis Rios | Separó el proyecto en `index.html`, `styles.css` y `app.js`, y guardó la copia del `index.html` original. Completó las validaciones de la calculadora (vacío, texto y divisor cero). |
| Brayan Kuja | Programó el conversor: la lista de objetos `CONVERSIONES` y la función `convertir`, con rechazo de campo vacío, valor no finito y negativo. |
| Maek Flores | Hizo la personalización CSS: cambio del texto de la etiqueta, su tamaño y la paleta azul RGB(30, 64, 175). |
| Naomi | Ejecutó y registró las pruebas del conversor y de las operaciones originales (en `pruebas.js` y en el navegador). |
| Michelli | Redactó el README (uso, enlaces, aportes) y documentó los valores de la paleta y el cambio de la etiqueta. |
| Todo el grupo | Revisaron los resultados, subieron los archivos al repositorio y publicaron el sitio en GitHub Pages. |
