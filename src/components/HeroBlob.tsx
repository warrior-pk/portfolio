"use client";

import { useEffect, useRef, useState } from "react";
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Timer,
  WebGLRenderer,
} from "three";
import gsap from "gsap";
import { useMotionGate } from "@/lib/motion-gate";
import { computeLensedTarget, dampFactor, gravityRadiusFor } from "@/lib/gravity";
import { heroScrub } from "@/lib/scrub";

/**
 * HeroBlob — raw-three animated blob (ported off R3F: fiber still
 * constructs the deprecated THREE.Clock internally, which spams the
 * console on every Canvas mount; THREE.Timer is warning-free).
 * Self-contained: own shaders, own renderer, transparent background.
 * No lights/HDRIs — the ShaderMaterial is unlit, so they would only
 * add network fetches without changing the look.
 */

const vertexShader = /* glsl */ `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

// Classic Perlin 3D Noise
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

void main() {
    vUv = uv;

    vDisplacement = cnoise(position + vec3(2.0 * u_time));

    vec3 newPosition = position + normal * (u_intensity * vDisplacement);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform float u_intensity;
uniform float u_time;
uniform vec3 u_color;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = mix(u_color, vec3(1.0, 1.0, 1.0), distort);
    gl_FragColor = vec4(color, 1.0);
}
`;

function BlobCanvas({ color }: { color: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);

  // Late color changes reuse the live material — no renderer rebuild.
  useEffect(() => {
    materialRef.current?.uniforms.u_color.value.set(color);
  }, [color]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0.3 },
        u_color: { value: new Color(color) },
      },
    });
    materialRef.current = material;

    const mesh = new Mesh(new IcosahedronGeometry(2, 20), material);
    mesh.scale.setScalar(1.15);
    scene.add(mesh);

    const timer = new Timer();
    // God-particle gravity model: the blob is the black hole — it stays
    // put. Proximity (0..1) drives the intensity surge instead of motion.
    // Driven by gsap.ticker (delta-corrected, lag-smoothed) and the shared
    // gravity util so cursor + blob stay tuned identically.
    gsap.ticker.lagSmoothing(500, 33);
    let mouseX = -9999;
    let mouseY = -9999;
    let prox = 0;
    let intensity = 0.5;

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (_time: number, deltaTime: number) => {
      timer.update();
      const t = timer.getElapsed();
      material.uniforms.u_time.value = 0.4 * t;

      // Proximity in screen space: fresh rect each tick tracks scroll.
      // Radius covers the whole blob plus aura, so the entire surface pulls.
      const rect = renderer.domElement.getBoundingClientRect();
      let proxTarget = 0;
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        proxTarget = computeLensedTarget(
          mouseX,
          mouseY,
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          gravityRadiusFor(rect.width, rect.height),
        ).prox;
      }
      prox += (proxTarget - prox) * dampFactor(0.06, deltaTime);
      // Scroll joins pointer: the pinned hero writes shared progress, so
      // the surge reads identically to cursor proximity (god-particle stays
      // tuned in one place).
      const surge = 0.5 + prox * 0.6 + heroScrub.value * 0.5;
      intensity += (surge - intensity) * dampFactor(0.08, deltaTime);

      material.uniforms.u_intensity.value = intensity;
      // Black hole stays anchored: only a tiny idle float + close-range swell.
      mesh.position.set(Math.sin(t * 0.6) * 0.05, Math.cos(t * 0.5) * 0.05, 0);
      mesh.scale.setScalar(1.15 + prox * 0.1);
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      materialRef.current = null;
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} className="h-full w-full" />;
}

export function HeroBlob({ color = "#000000" }: { color?: string }) {
  const { motionOK } = useMotionGate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Motion gate: no WebGL canvas under reduced-motion — the hero
  // type and grid carry the section on their own.
  if (!mounted || !motionOK) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        id="god-particle"
        className="pointer-events-auto absolute top-[12%] left-1/2 h-[68vw] w-[68vw] -translate-x-1/2 opacity-90 sm:top-[4%] sm:right-[3%] sm:left-auto sm:h-[50vmin] sm:w-[50vmin] sm:translate-x-0 md:opacity-100 lg:h-[56vmin] lg:w-[56vmin]"
      >
        <BlobCanvas color={color} />
      </div>
    </div>
  );
}
