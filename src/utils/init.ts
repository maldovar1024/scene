/**
 * 创建着色器
 * @param type 着色器类型
 * @param source 着色器代码
 */
function initShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Can't create shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const msg = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Compile error: ${msg}`);
  }

  return shader;
}

/**
 * 创建渲染程序
 * @param vsSource 顶点着色器代码
 * @param fsSource 片段着色器代码
 */
export function initShaderProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram {
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) {
    throw new Error("Can't create program");
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(`Link error: ${gl.getProgramInfoLog(shaderProgram)}`);
  }

  return shaderProgram;
}
