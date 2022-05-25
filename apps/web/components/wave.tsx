// Modified example of https://threejs.org/examples/webgl_points_waves.html
import React, { memo, useEffect, useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import * as THREE from "three";

const vertexShader = `
attribute float scale;

void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = scale * ( 100.0 / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;

}

`;

const fragmentShader = `
uniform vec3 color;

void main() {

    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.457 ) discard;

    gl_FragColor = vec4( color, 1.0 );

}
`;

const SEPARATION = 200,
  AMOUNTX = 30,
  AMOUNTY = 30;

const Wave = ({ className = "" }) => {
  const stopRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stopRef.current = false;
    const container = containerRef.current;
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer;

    let particles: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>,
      count = 0;

    let mouseX = window.innerWidth / 2;
    let mouseY = -window.innerHeight / 2;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 1000;

      scene = new THREE.Scene();

      //

      const numParticles = AMOUNTX * AMOUNTY;

      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let i = 0,
        j = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

          scales[j] = 1;

          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      //

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      scene.translateY(-500);

      //

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      container.style.touchAction = "none";
      document.addEventListener("mousemove", onPointerMove, false);

      //

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function onPointerMove(
      event: {
        isPrimary: boolean;
        clientX: number;
        clientY: number;
      } & MouseEvent
    ) {
      mouseX = event.pageX - windowHalfX;
      mouseY = event.pageY - windowHalfY - window.scrollY;
    }

    //

    function animate() {
      if (stopRef.current) return;
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positions = particles.geometry.attributes.position
        .array as unknown as Number[];
      const scales = particles.geometry.attributes.scale
        .array as unknown as Number[];

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + count) * 0.5) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          scales[j] =
            (Math.sin((ix + count) * 0.3) + 1) * 20 +
            (Math.sin((iy + count) * 0.5) + 1) * 20;

          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);

      count += 0.1;
    }

    return () => {
      document.removeEventListener("mousemove", onPointerMove, false);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      stopRef.current = true;
    };
  }, []);

  return <div id="wave" className={className} ref={containerRef} />;
};

const WaveRenderer = () => {
  const { ref } = useParallax<HTMLDivElement>({
    opacity: [1, 0],
    easing: "easeInCubic",
  });
  return (
    <div ref={ref}>
      <Wave className="fade-in" />
    </div>
  );
};

export default memo(WaveRenderer);
