export function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function setBuffer(gl, vertices, indices) {
  // Create a single buffer that contains the vertices for all cells
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Create an index buffer that specifies the vertices for each cell
  let indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  return { vertexBuffer, indexBuffer };
}

export function createVerticesAndIndices(canvasWidth, canvasHeight, cellSize) {
  let vertices = [];
  let indices = [];
  let cellIndex = 0;
  for (let i = 0; i < canvasHeight / cellSize; i++) {
    for (let j = 0; j < canvasWidth / cellSize; j++) {
      // normalize x and y between -1 and 1
      let x = (j * cellSize * 2) / canvasWidth - 1;
      let y = (i * cellSize * 2) / canvasHeight - 1;

      const cellIndexX = j;
      const cellIndexY = i;

      vertices.push(
        x,
        y,
        1,
        cellIndexX,
        cellIndexY, // Vertex 1
        x + cellSize,
        y,
        2,
        cellIndexX,
        cellIndexY, // Vertex 2
        x,
        y + cellSize,
        3,
        cellIndexX,
        cellIndexY, // Vertex 3
        x + cellSize,
        y + cellSize,
        4,
        cellIndexX,
        cellIndexY // Vertex 4
      );
      indices.push(
        cellIndex * 4 + 0,
        cellIndex * 4 + 1,
        cellIndex * 4 + 2,
        cellIndex * 4 + 2,
        cellIndex * 4 + 1,
        cellIndex * 4 + 3
      );
      cellIndex++;
    }
  }

  return { vertices, indices };
}

export function setAttributes(gl, program) {
  // Set up vertex attribute
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 20, 0);

  // set up vertex index attribute
  var vertexIndexAttributeLocation = gl.getAttribLocation(
    program,
    "a_vertexIndex"
  );
  gl.enableVertexAttribArray(vertexIndexAttributeLocation);
  gl.vertexAttribPointer(
    vertexIndexAttributeLocation,
    1,
    gl.FLOAT,
    false,
    20,
    8
  );

  // set up vertex index attribute
  var cellIndexAttributeLocation = gl.getAttribLocation(program, "a_cellIndex");
  gl.enableVertexAttribArray(cellIndexAttributeLocation);
  gl.vertexAttribPointer(
    cellIndexAttributeLocation,
    2,
    gl.FLOAT,
    false,
    20,
    12
  );
}
