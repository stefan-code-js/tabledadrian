/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PointMaterial, Points } from "@react-three/drei";
import type { Group, Points as PointsImpl } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function FallbackAura() {
    return (
        <div className="immersive-hero__fallback">
            <span>Table d&apos;Adrian</span>
        </div>
    );
}

function HaloParticles() {
    const pointsRef = useRef<PointsImpl>(null);
    const positions = useMemo(() => {
        const count = 900;
        const radius = 3.2;
        const data = new Float32Array(count * 3);
        for (let index = 0; index < count; index += 1) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * (0.4 + Math.random() * 0.6);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi) * 0.65;
            const z = r * Math.sin(phi) * Math.sin(theta);
            data[index * 3] = x;
            data[index * 3 + 1] = y;
            data[index * 3 + 2] = z;
        }
        return data;
    }, []);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.08;
        }
    });

    return (
        <Points
            ref={pointsRef}
            positions={positions}
            stride={3}
            frustumCulled={false}
            rotation={[Math.PI * -0.1, Math.PI * 0.2, 0]}
        >
            <PointMaterial
                transparent
                color="#f7e9d7"
                size={0.045}
                sizeAttenuation
                depthWrite={false}
                opacity={0.65}
            />
        </Points>
    );
}

function AuroraCore() {
    const groupRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.28;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.18;
        }
    });

    return (
        <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.4}>
            <group ref={groupRef}>
                <mesh scale={[1.45, 1.45, 1.45]}>
                    <icosahedronGeometry args={[1, 2]} />
                    <meshStandardMaterial
                        color="#fdf1de"
                        emissive="#f2d6a5"
                        roughness={0.28}
                        metalness={0.35}
                        transparent
                        opacity={0.92}
                    />
                </mesh>
                <mesh scale={[2.05, 2.05, 2.05]} rotation={[0, 0, Math.PI / 5]}>
                    <torusKnotGeometry args={[0.82, 0.14, 220, 32, 2, 3]} />
                    <meshStandardMaterial
                        color="#f7e9d7"
                        emissive="#fff7ec"
                        emissiveIntensity={0.45}
                        roughness={0.6}
                        metalness={0.1}
                        transparent
                        opacity={0.28}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function AuroraScene() {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 4, 6]} intensity={1.1} color="#ffe4c7" />
            <directionalLight position={[-4, -3, -5]} intensity={0.6} color="#ffd8b2" />
            <AuroraCore />
            <HaloParticles />
            <Environment preset="sunset" background={false} />
        </>
    );
}

export default function LuxuryHeroExperience() {
    const prefersReduced = usePrefersReducedMotion();
    const [mounted, setMounted] = useState(false);
    const [supportsWebgl, setSupportsWebgl] = useState<boolean | null>(null);

    useEffect(() => {
        setMounted(true);
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
            setSupportsWebgl(Boolean(gl));
        } catch {
            setSupportsWebgl(false);
        }
    }, []);

    if (prefersReduced || !mounted || supportsWebgl === false) {
        return (
            <div className="immersive-hero" aria-hidden>
                <FallbackAura />
            </div>
        );
    }

    if (supportsWebgl === null) {
        return (
            <div className="immersive-hero" aria-hidden>
                <FallbackAura />
            </div>
        );
    }

    return (
        <div className="immersive-hero" aria-hidden>
            <Canvas
                dpr={[1, 1.8]}
                camera={{ position: [0, 0, 7.2], fov: 40 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            >
                <Suspense fallback={null}>
                    <AuroraScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
