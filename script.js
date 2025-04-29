consultaCodigoMoneda();
function consultaCodigoMoneda() {
  const url = "https://api.frankfurter.dev/v1/currencies";
  const zonaSelect = document.getElementById("zona-select");
  const monedaAconvertir = document.getElementById("monedaAconvertir");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const codigoMoneda in data) {
        if (data.hasOwnProperty(codigoMoneda)) {
          const nombreMoneda = data[codigoMoneda];

          const option1 = document.createElement("option");
          option1.value = codigoMoneda;
          option1.textContent = ` ${nombreMoneda} - ${codigoMoneda}`;
          zonaSelect.appendChild(option1);

          const option2 = document.createElement("option");
          option2.value = codigoMoneda;
          option2.textContent = `${nombreMoneda} - ${codigoMoneda}`;
          monedaAconvertir.appendChild(option2);
        }
      }
    });
}



const botonConvertir = document.getElementById("boton-convertir");
botonConvertir.addEventListener("click", convertidorMoneda);

function convertidorMoneda() {
  const zonaSelect = document.getElementById("zona-select");
  const monedaAconvertir = document.getElementById("monedaAconvertir");
  const monto = document.getElementById("monto");

  const montoValor = parseFloat(monto.value);
  const monedaBase = zonaSelect.value;
  const monedaDestino = monedaAconvertir.value;


  if(monedaBase === monedaDestino) return alert (`No puede convertirse a la misma moneda`);

  const url = `https://api.frankfurter.dev/v1/latest?base=${monedaBase}&symbols=${monedaDestino}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const conversion = (montoValor * data.rates[monedaDestino]).toFixed(2);
    mostrarResultados(conversion, montoValor, monedaBase, monedaDestino);
    })

    .catch((err) => {
      console.log("No se establecio la conexion");
    });
}

function mostrarResultados(conversion, montoValor, monedaBase, monedaDestino){
  const resultado = document.getElementById('contenedor-resultado')
  
  const p = document.createElement("p");
  resultado.textContent = '';
  p.textContent =  `${montoValor} ${monedaBase} = ${conversion} ${monedaDestino}`
  resultado.appendChild(p);
}

const generateSpaceLayer = (size, selector, totalStars, duration ) => {
  const colors = ["#fff2", "#fff4", "#fff7", "#fffc"];
  const layer = [];
  for(let i =0 ; i < totalStars; i++){
    const color = colors[Math.floor(Math.random()*colors.length)]
    const x = Math.floor(Math.random()*100);
    const y = Math.floor(Math.random()*100);
    layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color} `);
  }
  
  const container = document.querySelector(selector);
  container.style.setProperty("--space-layer", layer.join(","));
  container.style.setProperty("--size", size);
  container.style.setProperty("--duration",duration)
}
generateSpaceLayer("1px", ".space-1", 200, "24s");
generateSpaceLayer("2px", ".space-2", 100, "20s");
generateSpaceLayer("4px", ".space-3", 25, "15s");

