function obtenerInputMatriz() {
  const filas = document.getElementById('filas').value
  const columnas = document.getElementById('columnas').value
  const matriz1Container = document.getElementById('matriz1Inputs')
  const matriz2Container = document.getElementById('matriz2Inputs')
  matriz1Container.innerHTML = ''
  matriz2Container.innerHTML = ''

  if (filas && columnas) {
    for (let i = 0; i < filas; i++) {
      const fila1 = document.createElement('div')
      const fila2 = document.createElement('div')
      for (let j = 0; j < columnas; j++) {
        fila1.innerHTML += `<input type="number" class="matriz1" data-row="${i}" data-column="${j}" placeholder="M1[${
          i + 1
        },${j + 1}]">`
        fila2.innerHTML += `<input type="number" class="matriz2" data-row="${i}" data-column="${j}" placeholder="M2[${
          i + 1
        },${j + 1}]">`
      }
      matriz1Container.appendChild(fila1)
      matriz2Container.appendChild(fila2)
    }
    document.getElementById('matrizInputs').style.display = 'block'
  }
}

function subirMatrices() {
  const filas = document.getElementById('filas').value
  const columnas = document.getElementById('columnas').value

  const matriz1 = []
  const matriz2 = []

  const matriz1Inputs = document.querySelectorAll('.matriz1')
  const matriz2Inputs = document.querySelectorAll('.matriz2')

  for (let i = 0; i < filas; i++) {
    const fila1 = []
    const fila2 = []
    for (let j = 0; j < columnas; j++) {
      const m1Valor = parseFloat(matriz1Inputs[i * columnas + j].value)
      const m2Valor = parseFloat(matriz2Inputs[i * columnas + j].value)

      if (isNaN(m1Valor) || isNaN(m2Valor)) {
        alert('Por favor ingrese solo números')
        return
      }

      fila1.push(m1Valor)
      fila2.push(m2Valor)
    }
    matriz1.push(fila1)
    matriz2.push(fila2)
  }

  fetch('/sumar-matrices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matriz1, matriz2 }),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarResultado(data.resultado)
    })
    .catch((error) => {
      alert('Hubo un error al realizar la suma')
      console.error(error)
    })
}

function mostrarResultado(resultado) {
  const resultadoDiv = document.getElementById('resultado')
  resultadoDiv.innerHTML = '' // Limpiar cualquier contenido previo

  const table = document.createElement('table')
  table.style.borderCollapse = 'collapse'

  resultado.forEach((fila) => {
    const row = document.createElement('tr')
    fila.forEach((valor) => {
      const cell = document.createElement('td')
      cell.textContent = valor
      cell.style.border = '1px solid black'
      cell.style.padding = '5px'
      row.appendChild(cell)
    })
    table.appendChild(row)
  })

  resultadoDiv.appendChild(table)
}
