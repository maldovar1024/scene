import { createAndBindBuffer } from './utils';

/** 创建顶点坐标的缓冲区 */
export function initVerticesBuffer(
  gl: WebGLRenderingContext
): WebGLBuffer | null {
  // 顶点坐标
  const vertices = [
    // 前
    ...[-1.0, -1.0, 1.0],
    ...[1.0, -1.0, 1.0],
    ...[1.0, 1.0, 1.0],
    ...[-1.0, 1.0, 1.0],
    // 后
    ...[-1.0, -1.0, -1.0],
    ...[-1.0, 1.0, -1.0],
    ...[1.0, 1.0, -1.0],
    ...[1.0, -1.0, -1.0],
    // 上
    ...[-1.0, 1.0, -1.0],
    ...[-1.0, 1.0, 1.0],
    ...[1.0, 1.0, 1.0],
    ...[1.0, 1.0, -1.0],
    // 下
    ...[-1.0, -1.0, -1.0],
    ...[1.0, -1.0, -1.0],
    ...[1.0, -1.0, 1.0],
    ...[-1.0, -1.0, 1.0],
    // 右
    ...[1.0, -1.0, -1.0],
    ...[1.0, 1.0, -1.0],
    ...[1.0, 1.0, 1.0],
    ...[1.0, -1.0, 1.0],
    // 左
    ...[-1.0, -1.0, -1.0],
    ...[-1.0, -1.0, 1.0],
    ...[-1.0, 1.0, 1.0],
    ...[-1.0, 1.0, -1.0],
  ];
  const positionBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW
  );
  return positionBuffer;
}

/** 创建顶点法向量的缓冲区 */
export function initVertexNormalsBuffer(
  gl: WebGLRenderingContext
): WebGLBuffer | null {
  // 顶点法向量
  const vertexNormals = [
    // 前
    ...[0.0, 0.0, 1.0],
    ...[0.0, 0.0, 1.0],
    ...[0.0, 0.0, 1.0],
    ...[0.0, 0.0, 1.0],
    // 后
    ...[0.0, 0.0, -1.0],
    ...[0.0, 0.0, -1.0],
    ...[0.0, 0.0, -1.0],
    ...[0.0, 0.0, -1.0],
    // 上
    ...[0.0, 1.0, 0.0],
    ...[0.0, 1.0, 0.0],
    ...[0.0, 1.0, 0.0],
    ...[0.0, 1.0, 0.0],
    // 下
    ...[0.0, -1.0, 0.0],
    ...[0.0, -1.0, 0.0],
    ...[0.0, -1.0, 0.0],
    ...[0.0, -1.0, 0.0],
    // 右
    ...[1.0, 0.0, 0.0],
    ...[1.0, 0.0, 0.0],
    ...[1.0, 0.0, 0.0],
    ...[1.0, 0.0, 0.0],
    // 左
    ...[-1.0, 0.0, 0.0],
    ...[-1.0, 0.0, 0.0],
    ...[-1.0, 0.0, 0.0],
    ...[-1.0, 0.0, 0.0],
  ];
  const normalBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(vertexNormals),
    gl.STATIC_DRAW
  );
  return normalBuffer;
}

/** 创建纹理坐标的缓冲区 */
export function initTextureCoordinatesBuffer(
  gl: WebGLRenderingContext
): WebGLBuffer | null {
  // 纹理坐标
  const textureCoordinates = [
    // 前
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
    // 后
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
    // 上
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
    // 下
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
    // 右
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
    // 左
    ...[0.0, 0.0],
    ...[1.0, 0.0],
    ...[1.0, 1.0],
    ...[0.0, 1.0],
  ];
  const textureCoordBuffer = createAndBindBuffer(
    gl,
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoordinates),
    gl.STATIC_DRAW
  );
  return textureCoordBuffer;
}

/** 创建三角形索引的缓冲区 */
export function initIndicesBuffer(
  gl: WebGLRenderingContext
): WebGLBuffer | null {
  const indices = [
    // front
    ...[0, 1, 2],
    ...[0, 2, 3],
    // back
    ...[4, 5, 6],
    ...[4, 6, 7],
    // top
    ...[8, 9, 10],
    ...[8, 10, 11],
    // bottom
    ...[12, 13, 14],
    ...[12, 14, 15],
    // right
    ...[16, 17, 18],
    ...[16, 18, 19],
    // left
    ...[20, 21, 22],
    ...[20, 22, 23],
  ];
  const indexBuffer = createAndBindBuffer(
    gl,
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  return indexBuffer;
}
