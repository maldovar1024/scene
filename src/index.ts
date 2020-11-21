import { mat4 } from 'gl-matrix';
import {
  initIndicesBuffer,
  initTextureCoordinatesBuffer,
  initVertexNormalsBuffer,
  initVerticesBuffer,
} from './bind-data';
import textureImg from './img/wall.jpg';
import './index.less';
import fsSource from './shaders/fragment.frag';
import vsSource from './shaders/vertex.vert';
import { initShaderProgram, loadTexture } from './utils';
import { enableVertexAttribArray } from './utils/enable-vertex-attribute';

const canvas = document.getElementById('container') as HTMLCanvasElement;

const gl = canvas.getContext('webgl');
if (!gl) {
  window.alert('你的浏览器不支持 WebGL，请使用更新版本的浏览器！');
  throw new Error("Don't support WebGL!");
}

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// 获取 attribute 的位置
const vertexPositionAttrib = gl.getAttribLocation(
  shaderProgram,
  'aVertexPosition'
);
const vertexNormalAttrib = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
const textureCoordAttrib = gl.getAttribLocation(shaderProgram, 'aTextureCoord');

// 获取 uniform 的位置
const projectionMatrixUniform = gl.getUniformLocation(
  shaderProgram,
  'uProjectionMatrix'
);
const modelViewMatrixUniform = gl.getUniformLocation(
  shaderProgram,
  'uModelViewMatrix'
);
const normalMatrixUniform = gl.getUniformLocation(
  shaderProgram,
  'uNormalMatrix'
);
const uSamplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');

// 创建缓冲区
const positionBuffer = initVerticesBuffer(gl);
const normalBuffer = initVertexNormalsBuffer(gl);
const textureCoordBuffer = initTextureCoordinatesBuffer(gl);
const indicesBuffer = initIndicesBuffer(gl);

const texture = loadTexture(gl, textureImg);

let rotation = 0;
let then = 0;

function render(now: number) {
  now *= 0.001;
  const deltaTime = now - then;
  then = now;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  drawScene(gl!, rotation);
  rotation += deltaTime;
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);

function drawScene(gl: WebGLRenderingContext, rotation: number) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // 创建透视矩阵
  const projectionMatrix = mat4.create();
  mat4.perspective(
    projectionMatrix,
    Math.PI / 4,
    gl.canvas.width / gl.canvas.height,
    0.1,
    100
  );

  // 创建模型矩阵
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 0, 1]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 0.7, [0, 1, 0]);

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // 设置 attribute 变量
  enableVertexAttribArray(gl, {
    target: gl.ARRAY_BUFFER,
    buffer: positionBuffer,
    index: vertexPositionAttrib,
    size: 3,
    type: gl.FLOAT,
  });
  enableVertexAttribArray(gl, {
    target: gl.ARRAY_BUFFER,
    buffer: textureCoordBuffer,
    index: textureCoordAttrib,
    size: 2,
    type: gl.FLOAT,
  });
  enableVertexAttribArray(gl, {
    target: gl.ARRAY_BUFFER,
    buffer: normalBuffer,
    index: vertexNormalAttrib,
    size: 3,
    type: gl.FLOAT,
  });

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

  gl.useProgram(shaderProgram);

  // 设置 uniform 变量
  gl.uniformMatrix4fv(projectionMatrixUniform, false, projectionMatrix);
  gl.uniformMatrix4fv(modelViewMatrixUniform, false, modelViewMatrix);
  gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);

  // TEXTURE0 表示注册到第一个纹理（支持同时使用 32 个纹理）
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // 使用 0 号纹理
  gl.uniform1i(uSamplerUniform, 0);

  // 绘制三角形
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}
