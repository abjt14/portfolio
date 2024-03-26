export const vertexShaderSource = `
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

export const fragmentShaderSource = `
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
