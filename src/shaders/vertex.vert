attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;

    // 环境光的颜色
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    // 方向光的颜色
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    // 方向光的方向，注意这里实际是方向光的反方向
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec3 transformedNormal = normalize((uNormalMatrix * vec4(aVertexNormal, 0.0)).xyz);

    highp float directional = max(dot(transformedNormal, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
}
