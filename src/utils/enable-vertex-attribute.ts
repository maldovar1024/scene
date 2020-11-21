export interface VertexAttribConfig {
  target: number;
  buffer: WebGLBuffer | null;
  index: number;
  size: number;
  type: number;
  normalized?: boolean;
  stride?: number;
  offset?: number;
}

/** 激活指定的 attribute */
export function enableVertexAttribArray(
  gl: WebGLRenderingContext,
  {
    target,
    buffer,
    index,
    size,
    type,
    normalized = false,
    stride = 0,
    offset = 0,
  }: VertexAttribConfig
) {
  gl.bindBuffer(target, buffer);
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  gl.enableVertexAttribArray(index);
}
