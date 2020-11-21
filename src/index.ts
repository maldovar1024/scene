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

const canvas = document.getElementById('container') as HTMLCanvasElement;

const gl = canvas.getContext('webgl');
if (!gl) {
  window.alert('你的浏览器不支持 WebGL，请使用更新版本的浏览器！');
  throw new Error("Don't support WebGL!");
}

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// 获取 attribute 的位置
const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
const vertexNormal = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
const textureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord');

// 获取 uniform 的位置
const projectionMatrix = gl.getUniformLocation(
  shaderProgram,
  'uProjectionMatrix'
);
const modelViewMatrix = gl.getUniformLocation(
  shaderProgram,
  'uModelViewMatrix'
);
const normalMatrix = gl.getUniformLocation(shaderProgram, 'uNormalMatrix');
const uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');

// 创建缓冲区
const positionBuffer = initVerticesBuffer(gl);
const normalBuffer = initVertexNormalsBuffer(gl);
const textureCoordBuffer = initTextureCoordinatesBuffer(gl);
const indicesBuffer = initIndicesBuffer(gl);

const texture = loadTexture(gl, textureImg);
