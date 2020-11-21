/**
 * 加载纹理
 * @param url 纹理图片的 URL
 */
export function loadTexture(
  gl: WebGLRenderingContext,
  url: string
): WebGLTexture | null {
  const texture = gl.createTexture();
  const image = new Image();
  image.onload = () => {
    // 绑定当前操作的纹理
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 写入纹理数据
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // 放大图片时使用线性过滤
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 缩小图片时使用多级渐进纹理过滤
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_NEAREST
    );
    // 生成多级渐进纹理
    gl.generateMipmap(gl.TEXTURE_2D);
    // 解绑
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
  image.src = url;

  return texture;
}
