import './index.less';

const canvas = document.getElementById('container') as HTMLCanvasElement;

const gl = canvas.getContext('webgl');
if (!gl) {
  window.alert('你的浏览器不支持 WebGL，请使用更新版本的浏览器！');
  throw new Error("Don't support WebGL!");
}
