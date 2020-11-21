/**
 * 创建并绑定数据到缓冲区
 * @param target 缓冲目标
 * @param data 数据
 * @param usage 数据的使用方法
 */
export function createAndBindBuffer(
  gl: WebGLRenderingContext,
  target: number,
  data: ArrayBufferView | ArrayBuffer | null,
  usage: number
): WebGLBuffer | null {
  const buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, usage);
  return buffer;
}
