/// <reference lib="webworker" />
import type { NameCanvasMessage, Point } from "./nameCanvas.messages";

declare const self: DedicatedWorkerGlobalScope;

type PaintPoint = Point & { age: number };

type NameCanvasResources = {
  canvas: OffscreenCanvas;
  gl: WebGLRenderingContext;
  paintingTexture: PaintingTexture;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  program: WebGLProgram;
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  indexCount: number;
  cellSize: number;
  texture1: WebGLTexture | null;
  texture2: WebGLTexture | null;
  u_timeLocation: WebGLUniformLocation | null;
  u_modeLocation: WebGLUniformLocation | null;
};

class NameCanvas {
  readonly canvas: OffscreenCanvas;
  readonly height: number;
  readonly width: number;
  readonly gl: WebGLRenderingContext;
  readonly paintingTexture: PaintingTexture;
  readonly vertexShader: WebGLShader;
  readonly fragmentShader: WebGLShader;
  readonly program: WebGLProgram;
  readonly vertexBuffer: WebGLBuffer;
  readonly indexBuffer: WebGLBuffer;
  readonly indexCount: number;
  readonly cellSize: number;
  readonly texture1: WebGLTexture | null;
  readonly texture2: WebGLTexture | null;
  readonly u_timeLocation: WebGLUniformLocation | null;
  readonly u_modeLocation: WebGLUniformLocation | null;

  /** The only mutable piece of state; toggled by a worker message. */
  modeUniform = 0;

  private constructor(resources: NameCanvasResources) {
    this.canvas = resources.canvas;
    this.height = resources.canvas.height;
    this.width = resources.canvas.width;
    this.gl = resources.gl;
    this.paintingTexture = resources.paintingTexture;
    this.vertexShader = resources.vertexShader;
    this.fragmentShader = resources.fragmentShader;
    this.program = resources.program;
    this.vertexBuffer = resources.vertexBuffer;
    this.indexBuffer = resources.indexBuffer;
    this.indexCount = resources.indexCount;
    this.cellSize = resources.cellSize;
    this.texture1 = resources.texture1;
    this.texture2 = resources.texture2;
    this.u_timeLocation = resources.u_timeLocation;
    this.u_modeLocation = resources.u_modeLocation;
  }

  /** Builds every GL resource up front so each field is readonly. */
  static create(canvas: OffscreenCanvas, isMobile: boolean): NameCanvas {
    canvas.width = !isMobile ? 2304 : 700;
    canvas.height = !isMobile ? 384 : 329;

    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) throw new Error("WebGL is not available in this worker");

    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      gl,
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vertexShader || !fragmentShader) {
      throw new Error("Failed to compile the name canvas shaders");
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) throw new Error("Failed to link the name canvas program");
    gl.useProgram(program);

    const cellSize = canvas.height * 0.0368;
    const { vertices, indices } = createVerticesAndIndices(
      canvas.width,
      canvas.height,
      cellSize
    );
    const { vertexBuffer, indexBuffer } = createBuffer(gl, vertices, indices);
    createAttributes(gl, program);

    const paintingTexture = new PaintingTexture(isMobile);
    const texture2 = gl.createTexture();

    const nameCanvas = new NameCanvas({
      canvas,
      gl,
      paintingTexture,
      vertexShader,
      fragmentShader,
      program,
      vertexBuffer,
      indexBuffer,
      indexCount: indices.length,
      cellSize,
      texture1: gl.createTexture(),
      texture2,
      u_timeLocation: gl.getUniformLocation(program, "u_time"),
      u_modeLocation: gl.getUniformLocation(program, "u_mode"),
    });

    nameCanvas.clear();

    // Sampler parameters persist on the texture object and the sampler uniform
    // never changes, so bind them once rather than per frame.
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, "u_PaintingTexture"), 1);

    nameCanvas.setPaintingTexture(paintingTexture.export());
    nameCanvas.setConstantUniforms();
    nameCanvas.draw();

    return nameCanvas;
  }

  clear() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }






  async setNameTexture(data: ImageData) {
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture1);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGB,
      this.gl.RGB,
      this.gl.UNSIGNED_BYTE,
      data
    );
    // set the texture parameters
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR
    );
    // set the texture uniform
    const u_nameTextureLocation = this.gl.getUniformLocation(
      this.program,
      "u_nameTexture"
    );
    this.gl.uniform1i(u_nameTextureLocation, 0);
  }


  setPaintingTexture(bitmap: ImageBitmap) {
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture2);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      bitmap
    );
    bitmap.close();
  }

  setConstantUniforms() {
    // set canvas resolution uniform
    const u_resolutionLocation = this.gl.getUniformLocation(
      this.program,
      "u_resolution"
    );
    this.gl.uniform2f(
      u_resolutionLocation,
      this.canvas.width,
      this.canvas.height
    );
    // set cell size uniform for x axis
    const cellSizeX = this.cellSize * (this.canvas.height / this.canvas.height);
    const u_cellSizeXLocation = this.gl.getUniformLocation(
      this.program,
      "u_cellSizeX"
    );
    this.gl.uniform1f(u_cellSizeXLocation, cellSizeX);
    // set cell size uniform for y axis
    const cellSizeY = this.cellSize;
    const u_cellSizeYLocation = this.gl.getUniformLocation(
      this.program,
      "u_cellSizeY"
    );
    this.gl.uniform1f(u_cellSizeYLocation, cellSizeY);

    this.gl.uniform1f(this.u_modeLocation, this.modeUniform);
  }

  setTimeUniform(value: number) {
    this.gl.uniform1f(this.u_timeLocation, value);
  }

  toggleModeUniform() {
    this.modeUniform = this.modeUniform === 0 ? 1 : 0;
    this.gl.uniform1f(this.u_modeLocation, this.modeUniform);
  }

  draw() {
    this.paintingTexture.update();
    this.setPaintingTexture(this.paintingTexture.export());
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.indexCount,
      this.gl.UNSIGNED_SHORT,
      0
    );
  }

}

let nameCanvas: NameCanvas | null = null;

let lastRender = 0;
function render(timestamp: number) {
  const delta = timestamp - lastRender;

  // limit to 90 fps
  if (delta >= 1000 / 90) {
    nameCanvas?.setTimeUniform(timestamp / 1000);
    nameCanvas?.draw();
    lastRender = timestamp;
  }

  self.requestAnimationFrame(render);
}

self.onmessage = (event: MessageEvent<NameCanvasMessage>) => {
  const { data } = event;
  switch (data.command) {
    case "init":
      nameCanvas = NameCanvas.create(data.canvas, data.isMobile);
      self.requestAnimationFrame(render);
      break;
    case "toggleModeUniform":
      nameCanvas?.toggleModeUniform();
      break;
    case "setNameTexture":
      nameCanvas?.setNameTexture(data.image);
      break;
    case "addPoint":
      nameCanvas?.paintingTexture.addPoint(data.point);
      break;
    case "updateMousePosition":
      if (nameCanvas) {
        nameCanvas.paintingTexture.mousePosition = data.mousePosition;
      }
      break;
  }
};

/*
 *
 *
 *
 * PAINTING TEXTURE
 *
 *
 *
 *
 */

class PaintingTexture {
  points: PaintPoint[];
  height: number;
  width: number;
  radius: number;
  maxAge: number;
  intensityFactor: number;
  mousePosition: Point;
  canvas: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;

  constructor(isMobile: boolean) {
    this.points = [];
    this.height = (!isMobile ? 384 : 329) / 64;
    this.width = (!isMobile ? 2304 : 700) / 64;
    this.radius = (this.width * (!isMobile ? 384 : 329 * 2)) / 10000;
    this.maxAge = 64;
    this.intensityFactor = 1.0;
    this.mousePosition = { x: -10000, y: -10000 };

    this.canvas = new OffscreenCanvas(this.width, this.height);
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("2D context is not available in this worker");
    this.ctx = ctx;
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  addPoint(point: Point) {
    this.points.push({ x: point.x, y: point.y, age: 0 });
  }

  drawPoint(point: PaintPoint) {
    // Convert normalized position into canvas coordinates and scale
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };
    const radius = this.radius;
    const ctx = this.ctx;

    let intensity = 1;
    intensity = 1 - point.age / this.maxAge;

    const color = "255,255,255";

    // 1. Give the shadow a high offset.
    const offset = this.width * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius * 1;
    ctx.shadowColor = `rgba(${color},${this.intensityFactor * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,255,255,1)";

    // 2. Move the point to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.clear();

    this.points.forEach((point, i) => {
      point.age += 1;
      if (point.age > this.maxAge) {
        this.points.splice(i, 1);
      }
    });
    this.points.forEach((point) => {
      this.drawPoint(point);
    });

    // add new point
    const pos = {
      x: this.mousePosition.x,
      y: this.mousePosition.y,
    };

    this.addPoint(pos);
  }

  export() {
    return this.canvas.transferToImageBitmap();
  }
}

/*
 *
 *
 *
 * CONSTANTS AND WEBGL HELPERS
 *
 *
 *
 *
 */

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute float a_vertexIndex;
  attribute vec2 a_cellIndex;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_cellSizeX;
  uniform float u_cellSizeY;
  uniform float u_mode;

  uniform sampler2D u_PaintingTexture;

  varying vec2 v_resolution;
  varying float v_time;
  varying vec2 v_texCoord;
  varying float v_mode;

  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
  }

  void main() {
    // Calculate the position of the cell in the global space
    vec2 globalPosition = a_position.xy + a_cellIndex * vec2(u_cellSizeX, u_cellSizeY);

    // Normalize the global position to the clip space
    vec2 clipSpacePosition = (globalPosition / u_resolution) * 2.0 - 1.0;

    vec2 pos = clipSpacePosition;

    // calculating texture coordinates
    vec2 texCoord = pos * 0.5 + 0.5;
    vec2 flippedTexCoord = vec2(texCoord.x, 1.0 - texCoord.y);

    // scale u_cellSizeX and u_cellSizeY to canvas size
    float cellSizeX = u_cellSizeX / u_resolution.x;
    float cellSizeY = u_cellSizeY / u_resolution.y;

    // get the color value from the painting texture
    float scale = -0.01;
    if (u_mode == 1.0) {
      scale = (1.0 - texture2D(u_PaintingTexture, flippedTexCoord).r) - 0.01 - 0.33;
    }

    // apply scaling on each vertex by vertex index
    if (a_vertexIndex == 1.0) {
      pos.x += cellSizeX * scale;
      pos.y += cellSizeY * scale;
    } else if (a_vertexIndex == 2.0) {
      pos.x -= cellSizeX * scale;
      pos.y += cellSizeY * scale;
    } else if (a_vertexIndex == 3.0) {
      pos.x += cellSizeX * scale;
      pos.y -= cellSizeY * scale;
    } else if (a_vertexIndex == 4.0) {
      pos.x -= cellSizeX * scale;
      pos.y -= cellSizeY * scale;
    } else {
      pos.x += 0.0;
      pos.y += 0.0;
    }

    gl_Position = vec4(pos, 0, 1);

    // gl_Position = vec4(a_position, 0.0, 1.0);

    // Pass the data to the fragment shader
    v_resolution = u_resolution;
    v_time = u_time;
    v_texCoord = flippedTexCoord;
    v_mode = u_mode;
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  varying vec2 v_resolution;
  varying float v_time;
  varying vec2 v_texCoord;
  varying float v_mode;

  uniform sampler2D u_nameTexture;
  uniform sampler2D u_PaintingTexture;

  void warpingTextureImage(out vec4 fragColor, in vec2 fragCoord) {
    float effectDensity = 8.0;
    float effectScale = 0.3;
    float scaledTime = v_time * 0.0025;

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/v_resolution.xy;

    // scale y to the aspect ratio
    uv.y *= v_resolution.y / v_resolution.x;

    // effect density/repeat
    uv = uv * effectDensity;

    for(float k = 1.0; k < 8.0; k += 1.0){
      uv.x += effectScale * cos(uv.y * k + scaledTime * k) - scaledTime * k * 10.0;
      uv.y += effectScale * sin(uv.x * k + scaledTime * k) - scaledTime * k * 2.5;
    }

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*sin(v_time+uv.xyx+vec3(2,4,0));

    // Output to screen
    fragColor = vec4(col,1.0);
}

  void main() {
      // main texture
      vec4 nameTexture = texture2D(u_nameTexture, v_texCoord);
      // cropping out the black part
      if (v_mode == 0.0 && nameTexture.rgb == vec3(0.0, 0.0, 0.0)) {
        discard;
      }

      // gradient texture
      vec4 paintingTexture = texture2D(u_PaintingTexture, v_texCoord);

      // warping texture
      vec4 warpingTexture;
      warpingTextureImage(warpingTexture, gl_FragCoord.xy);

      // mix grayscale and normal color based on painting texture
      float luminance = dot(warpingTexture.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 grayScaledColor = vec3(luminance, luminance, luminance);
      vec3 finalColor = mix(grayScaledColor, warpingTexture.rgb, paintingTexture.r);

      // Increase contrast
      float contrast = 1.5; // Adjust this value to increase or decrease contrast
      finalColor = (finalColor - 0.5) * contrast + 0.5;

      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: GLenum
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
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

function createBuffer(
  gl: WebGLRenderingContext,
  vertices: number[],
  indices: number[]
) {
  // Create a single buffer that contains the vertices for all cells
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Create an index buffer that specifies the vertices for each cell
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  return { vertexBuffer, indexBuffer };
}

function createVerticesAndIndices(
  canvasWidth: number,
  canvasHeight: number,
  cellSize: number
) {
  const vertices: number[] = [];
  const indices: number[] = [];
  let cellIndex = 0;
  for (let i = 0; i < canvasHeight / cellSize; i++) {
    for (let j = 0; j < canvasWidth / cellSize; j++) {
      // normalize x and y between -1 and 1
      const x = (j * cellSize * 2) / canvasWidth - 1;
      const y = (i * cellSize * 2) / canvasHeight - 1;

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

function createAttributes(gl: WebGLRenderingContext, program: WebGLProgram) {
  // Set up vertex attribute
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 20, 0);

  // set up vertex index attribute
  const vertexIndexAttributeLocation = gl.getAttribLocation(
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
  const cellIndexAttributeLocation = gl.getAttribLocation(program, "a_cellIndex");
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
