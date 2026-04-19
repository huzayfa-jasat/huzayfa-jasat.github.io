import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

const HologramShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#00d4ff'),
    uOpacity: 0.85,
  },
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      float scanline = sin(vUv.y * 120.0 + uTime * 3.0) * 0.08 + 0.92;
      float flicker = sin(uTime * 8.0) * 0.03 + 0.97;
      float edgeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
      float edgeY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
      float edge = edgeX * edgeY;
      float shimmer = sin(vUv.y * 40.0 - uTime * 1.5) * 0.5 + 0.5;
      shimmer = smoothstep(0.3, 0.7, shimmer) * 0.1;
      vec3 color = uColor + shimmer;
      float alpha = uOpacity * scanline * flicker * edge;
      gl_FragColor = vec4(color, alpha);
    }
  `
)

extend({ HologramShaderMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    hologramShaderMaterial: any
  }
}

export { HologramShaderMaterial }
