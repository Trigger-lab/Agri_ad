"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass"
import { Badge } from "@/components/ui/badge"

interface QuantumNeuralNetworkProps {
  className?: string
}

export default function QuantumNeuralNetwork({ className }: QuantumNeuralNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // React state for settings linked to shader uniforms
  const [paused, setPaused] = useState(false)
  const [activePaletteIndex, setActivePaletteIndex] = useState(0)
  const [currentFormation, setCurrentFormation] = useState(0)
  const [densityFactor, setDensityFactor] = useState(1.0)

  // Keep configuration refs to access latest values in requestAnimationFrame loop
  const configRef = useRef({
    paused: false,
    activePaletteIndex: 0,
    currentFormation: 0,
    densityFactor: 1.0,
  })

  useEffect(() => {
    configRef.current = { paused, activePaletteIndex, currentFormation, densityFactor }
  }, [paused, activePaletteIndex, currentFormation, densityFactor])

  // Refs to hold Three.js instances that need to be updated dynamically
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const bloomPassRef = useRef<UnrealBloomPass | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const nodesMeshRef = useRef<THREE.Points | null>(null)
  const connectionsMeshRef = useRef<THREE.LineSegments | null>(null)
  const pulseUniformsRef = useRef<any>(null)
  const starFieldRef = useRef<THREE.Points | null>(null)

  const colorPalettes = [
    [
      new THREE.Color(0x22c55e), // Emerald Green for agriculture
      new THREE.Color(0x15803d), // Darker green
      new THREE.Color(0xa3e635), // Lime green
      new THREE.Color(0xeab308), // Gold/Yellow
      new THREE.Color(0x064e3b), // Forest green
    ],
    [
      new THREE.Color(0x667eea),
      new THREE.Color(0x764ba2),
      new THREE.Color(0xf093fb),
      new THREE.Color(0x9d50bb),
      new THREE.Color(0x6e48aa),
    ],
    [
      new THREE.Color(0x4facfe),
      new THREE.Color(0x00f2fe),
      new THREE.Color(0x43e97b),
      new THREE.Color(0x38f9d7),
      new THREE.Color(0x4484ce),
    ],
  ]

  const noiseFunctions = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }`

  const nodeShader = {
    vertexShader: `${noiseFunctions}
    attribute float nodeSize;
    attribute float nodeType;
    attribute vec3 nodeColor;
    attribute float distanceFromRoot;
    
    uniform float uTime;
    uniform vec3 uPulsePositions[3];
    uniform float uPulseTimes[3];
    uniform float uPulseSpeed;
    uniform float uBaseNodeSize;
    
    varying vec3 vColor;
    varying float vNodeType;
    varying vec3 vPosition;
    varying float vPulseIntensity;
    varying float vDistanceFromRoot;
    varying float vGlow;
    float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
        if (pulseTime < 0.0) return 0.0;
        float timeSinceClick = uTime - pulseTime;
        if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
        float pulseRadius = timeSinceClick * uPulseSpeed;
        float distToClick = distance(worldPos, pulsePos);
        float pulseThickness = 3.0;
        float waveProximity = abs(distToClick - pulseRadius);
        return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
    }
    void main() {
        vNodeType = nodeType;
        vColor = nodeColor;
        vDistanceFromRoot = distanceFromRoot;
        vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vPosition = worldPos;
        float totalPulseIntensity = 0.0;
        for (int i = 0; i < 3; i++) {
            totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
        }
        vPulseIntensity = min(totalPulseIntensity, 1.0);
        float breathe = sin(uTime * 0.7 + distanceFromRoot * 0.15) * 0.15 + 0.85;
        float baseSize = nodeSize * breathe;
        float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.5);
        vGlow = 0.5 + 0.5 * sin(uTime * 0.5 + distanceFromRoot * 0.2);
        vec3 modifiedPosition = position;
        if (nodeType > 0.5) {
            float noise = snoise(position * 0.08 + uTime * 0.08);
            modifiedPosition += normal * noise * 0.15;
        }
        vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
        gl_PointSize = pulseSize * uBaseNodeSize * (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }`,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uPulseColors[3];
    
    varying vec3 vColor;
    varying float vNodeType;
    varying vec3 vPosition;
    varying float vPulseIntensity;
    varying float vDistanceFromRoot;
    varying float vGlow;
    void main() {
        vec2 center = 2.0 * gl_PointCoord - 1.0;
        float dist = length(center);
        if (dist > 1.0) discard;
        float glow1 = 1.0 - smoothstep(0.0, 0.5, dist);
        float glow2 = 1.0 - smoothstep(0.0, 1.0, dist);
        float glowStrength = pow(glow1, 1.2) + glow2 * 0.3;
        float breatheColor = 0.9 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25);
        vec3 baseColor = vColor * breatheColor;
        vec3 finalColor = baseColor;
        if (vPulseIntensity > 0.0) {
            vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.4);
            finalColor = mix(baseColor, pulseColor, vPulseIntensity * 0.8);
            finalColor *= (1.0 + vPulseIntensity * 1.2);
            glowStrength *= (1.0 + vPulseIntensity);
        }
        float coreBrightness = smoothstep(0.4, 0.0, dist);
        finalColor += vec3(1.0) * coreBrightness * 0.3;
        float alpha = glowStrength * (0.95 - 0.3 * dist);
        float camDistance = length(vPosition - cameraPosition);
        float distanceFade = smoothstep(100.0, 15.0, camDistance);
        if (vNodeType > 0.5) {
            finalColor *= 1.1;
            alpha *= 0.9;
        }
        finalColor *= (1.0 + vGlow * 0.1);
        gl_FragColor = vec4(finalColor, alpha * distanceFade);
    }`,
  }

  const connectionShader = {
    vertexShader: `${noiseFunctions}
    attribute vec3 startPoint;
    attribute vec3 endPoint;
    attribute float connectionStrength;
    attribute float pathIndex;
    attribute vec3 connectionColor;
    
    uniform float uTime;
    uniform vec3 uPulsePositions[3];
    uniform float uPulseTimes[3];
    uniform float uPulseSpeed;
    
    varying vec3 vColor;
    varying float vConnectionStrength;
    varying float vPulseIntensity;
    varying float vPathPosition;
    varying float vDistanceFromCamera;
    float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
        if (pulseTime < 0.0) return 0.0;
        float timeSinceClick = uTime - pulseTime;
        if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
        
        float pulseRadius = timeSinceClick * uPulseSpeed;
        float distToClick = distance(worldPos, pulsePos);
        float pulseThickness = 3.0;
        float waveProximity = abs(distToClick - pulseRadius);
        
        return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
    }
    void main() {
        float t = position.x;
        vPathPosition = t;
        vec3 midPoint = mix(startPoint, endPoint, 0.5);
        float pathOffset = sin(t * 3.14159) * 0.15;
        vec3 perpendicular = normalize(cross(normalize(endPoint - startPoint), vec3(0.0, 1.0, 0.0)));
        if (length(perpendicular) < 0.1) perpendicular = vec3(1.0, 0.0, 0.0);
        midPoint += perpendicular * pathOffset;
        vec3 p0 = mix(startPoint, midPoint, t);
        vec3 p1 = mix(midPoint, endPoint, t);
        vec3 finalPos = mix(p0, p1, t);
        float noiseTime = uTime * 0.15;
        float noise = snoise(vec3(pathIndex * 0.08, t * 0.6, noiseTime));
        finalPos += perpendicular * noise * 0.12;
        vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;
        float totalPulseIntensity = 0.0;
        for (int i = 0; i < 3; i++) {
            totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
        }
        vPulseIntensity = min(totalPulseIntensity, 1.0);
        vColor = connectionColor;
        vConnectionStrength = connectionStrength;
        
        vDistanceFromCamera = length(worldPos - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    }`,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uPulseColors[3];
    
    varying vec3 vColor;
    varying float vConnectionStrength;
    varying float vPulseIntensity;
    varying float vPathPosition;
    varying float vDistanceFromCamera;
    void main() {
        float flowPattern1 = sin(vPathPosition * 25.0 - uTime * 4.0) * 0.5 + 0.5;
        float flowPattern2 = sin(vPathPosition * 15.0 - uTime * 2.5 + 1.57) * 0.5 + 0.5;
        float combinedFlow = (flowPattern1 + flowPattern2 * 0.5) / 1.5;
        
        vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.6 + vPathPosition * 12.0));
        float flowIntensity = 0.4 * combinedFlow * vConnectionStrength;
        vec3 finalColor = baseColor;
        if (vPulseIntensity > 0.0) {
            vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
            finalColor = mix(baseColor, pulseColor * 1.2, vPulseIntensity * 0.7);
            flowIntensity += vPulseIntensity * 0.8;
        }
        finalColor *= (0.7 + flowIntensity + vConnectionStrength * 0.5);
        float baseAlpha = 0.7 * vConnectionStrength;
        float flowAlpha = combinedFlow * 0.3;
        float alpha = baseAlpha + flowAlpha;
        alpha = mix(alpha, min(1.0, alpha * 2.5), vPulseIntensity);
        float distanceFade = smoothstep(100.0, 15.0, vDistanceFromCamera);
        gl_FragColor = vec4(finalColor, alpha * distanceFade);
    }`,
  }

  class Node {
    position: THREE.Vector3
    connections: { node: Node; strength: number }[]
    level: number
    type: number
    size: number
    distanceFromRoot: number
    helixIndex?: number
    helixT?: number

    constructor(position: THREE.Vector3, level = 0, type = 0) {
      this.position = position
      this.connections = []
      this.level = level
      this.type = type
      this.size = type === 0 ? THREE.MathUtils.randFloat(0.8, 1.4) : THREE.MathUtils.randFloat(0.5, 1.0)
      this.distanceFromRoot = 0
    }

    addConnection(node: Node, strength = 1.0) {
      if (!this.isConnectedTo(node)) {
        this.connections.push({ node, strength })
        node.connections.push({ node: this, strength })
      }
    }

    isConnectedTo(node: Node) {
      return this.connections.some((conn) => conn.node === node)
    }
  }

  function generateNeuralNetwork(formationIndex: number, density: number) {
    let nodes: Node[] = []
    let rootNode: Node = new Node(new THREE.Vector3(0, 0, 0), 0, 0)

    function generateCrystallineSphere() {
      rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0)
      rootNode.size = 2.0
      nodes.push(rootNode)
      const layers = 5
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      for (let layer = 1; layer <= layers; layer++) {
        const radius = layer * 4
        const numPoints = Math.floor(layer * 12 * density)
        for (let i = 0; i < numPoints; i++) {
          const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints)
          const theta = (2 * Math.PI * i) / goldenRatio
          const pos = new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          )
          const isLeaf = layer === layers || Math.random() < 0.3
          const node = new Node(pos, layer, isLeaf ? 1 : 0)
          node.distanceFromRoot = radius
          nodes.push(node)
          if (layer > 1) {
            const prevLayerNodes = nodes.filter((n) => n.level === layer - 1 && n !== rootNode)
            prevLayerNodes.sort((a, b) => pos.distanceTo(a.position) - pos.distanceTo(b.position))
            for (let j = 0; j < Math.min(3, prevLayerNodes.length); j++) {
              const dist = pos.distanceTo(prevLayerNodes[j].position)
              const strength = 1.0 - dist / (radius * 2)
              node.addConnection(prevLayerNodes[j], Math.max(0.3, strength))
            }
          } else {
            rootNode.addConnection(node, 0.9)
          }
        }
        const layerNodes = nodes.filter((n) => n.level === layer && n !== rootNode)
        for (let i = 0; i < layerNodes.length; i++) {
          const node = layerNodes[i]
          const nearby = layerNodes
            .filter((n) => n !== node)
            .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position))
            .slice(0, 5)
          for (const nearNode of nearby) {
            const dist = node.position.distanceTo(nearNode.position)
            if (dist < radius * 0.8 && !node.isConnectedTo(nearNode)) {
              node.addConnection(nearNode, 0.6)
            }
          }
        }
      }
      const outerNodes = nodes.filter((n) => n.level >= 3)
      for (let i = 0; i < Math.min(20, outerNodes.length); i++) {
        const n1 = outerNodes[Math.floor(Math.random() * outerNodes.length)]
        const n2 = outerNodes[Math.floor(Math.random() * outerNodes.length)]
        if (n1 !== n2 && !n1.isConnectedTo(n2) && Math.abs(n1.level - n2.level) > 1) {
          n1.addConnection(n2, 0.4)
        }
      }
    }

    function generateHelixLattice() {
      rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0)
      rootNode.size = 1.8
      nodes.push(rootNode)
      const numHelices = 4
      const height = 30
      const maxRadius = 12
      const nodesPerHelix = Math.floor(50 * density)
      const helixArrays: Node[][] = []
      for (let h = 0; h < numHelices; h++) {
        const helixPhase = (h / numHelices) * Math.PI * 2
        const helixNodes: Node[] = []
        for (let i = 0; i < nodesPerHelix; i++) {
          const t = i / (nodesPerHelix - 1)
          const y = (t - 0.5) * height
          const radiusScale = Math.sin(t * Math.PI) * 0.7 + 0.3
          const radius = maxRadius * radiusScale
          const angle = helixPhase + t * Math.PI * 6
          const pos = new THREE.Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle))
          const level = Math.ceil(t * 5)
          const isLeaf = i > nodesPerHelix - 5 || Math.random() < 0.25
          const node = new Node(pos, level, isLeaf ? 1 : 0)
          node.distanceFromRoot = Math.sqrt(radius * radius + y * y)
          node.helixIndex = h
          node.helixT = t
          nodes.push(node)
          helixNodes.push(node)
        }
        helixArrays.push(helixNodes)
        rootNode.addConnection(helixNodes[0], 1.0)
        for (let i = 0; i < helixNodes.length - 1; i++) {
          helixNodes[i].addConnection(helixNodes[i + 1], 0.85)
        }
      }
      for (let h = 0; h < numHelices; h++) {
        const currentHelix = helixArrays[h]
        const nextHelix = helixArrays[(h + 1) % numHelices]
        for (let i = 0; i < currentHelix.length; i += 5) {
          const t = currentHelix[i].helixT!
          const targetIdx = Math.round(t * (nextHelix.length - 1))
          if (targetIdx < nextHelix.length) {
            currentHelix[i].addConnection(nextHelix[targetIdx], 0.7)
          }
        }
      }
      for (const helix of helixArrays) {
        for (let i = 0; i < helix.length; i += 8) {
          const node = helix[i]
          const innerNodes = nodes.filter(
            (n) => n !== node && n !== rootNode && n.distanceFromRoot < node.distanceFromRoot * 0.5
          )
          if (innerNodes.length > 0) {
            const nearest = innerNodes.sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position))[0]
            node.addConnection(nearest, 0.5)
          }
        }
      }
      const allHelixNodes = nodes.filter((n) => n !== rootNode)
      for (let i = 0; i < Math.floor(30 * density); i++) {
        const n1 = allHelixNodes[Math.floor(Math.random() * allHelixNodes.length)]
        const nearby = allHelixNodes.filter((n) => {
          const dist = n.position.distanceTo(n1.position)
          return n !== n1 && dist < 8 && dist > 3 && !n1.isConnectedTo(n)
        })
        if (nearby.length > 0) {
          const n2 = nearby[Math.floor(Math.random() * nearby.length)]
          n1.addConnection(n2, 0.45)
        }
      }
    }

    function generateFractalWeb() {
      rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0)
      rootNode.size = 1.6
      nodes.push(rootNode)
      const branches = 6
      const maxDepth = 4
      function createBranch(startNode: Node, direction: THREE.Vector3, depth: number, strength: number, scale: number) {
        if (depth > maxDepth) return
        const branchLength = 5 * scale
        const endPos = new THREE.Vector3().copy(startNode.position).add(direction.clone().multiplyScalar(branchLength))
        const isLeaf = depth === maxDepth || Math.random() < 0.3
        const newNode = new Node(endPos, depth, isLeaf ? 1 : 0)
        newNode.distanceFromRoot = rootNode.position.distanceTo(endPos)
        nodes.push(newNode)
        startNode.addConnection(newNode, strength)
        if (depth < maxDepth) {
          const subBranches = 3
          for (let i = 0; i < subBranches; i++) {
            const angle = (i / subBranches) * Math.PI * 2
            const perpDir1 = new THREE.Vector3(-direction.y, direction.x, 0).normalize()
            const perpDir2 = direction.clone().cross(perpDir1).normalize()
            const newDir = new THREE.Vector3()
              .copy(direction)
              .add(perpDir1.clone().multiplyScalar(Math.cos(angle) * 0.7))
              .add(perpDir2.clone().multiplyScalar(Math.sin(angle) * 0.7))
              .normalize()
            createBranch(newNode, newDir, depth + 1, strength * 0.7, scale * 0.75)
          }
        }
      }
      for (let i = 0; i < branches; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / branches)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const direction = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi)
        ).normalize()
        createBranch(rootNode, direction, 1, 0.9, 1.0)
      }
      const leafNodes = nodes.filter((n) => n.level >= 2)
      for (let i = 0; i < leafNodes.length; i++) {
        const node = leafNodes[i]
        const nearby = leafNodes
          .filter((n) => {
            const dist = n.position.distanceTo(node.position)
            return n !== node && dist < 10 && !node.isConnectedTo(n)
          })
          .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position))
          .slice(0, 3)
        for (const nearNode of nearby) {
          if (Math.random() < 0.5 * density) {
            node.addConnection(nearNode, 0.5)
          }
        }
      }
      const midLevelNodes = nodes.filter((n) => n.level >= 2 && n.level <= 3)
      for (const node of midLevelNodes) {
        if (Math.random() < 0.3) {
          const innerNodes = nodes.filter((n) => n !== node && n.distanceFromRoot < node.distanceFromRoot * 0.6)
          if (innerNodes.length > 0) {
            const target = innerNodes[Math.floor(Math.random() * innerNodes.length)]
            if (!node.isConnectedTo(target)) {
              node.addConnection(target, 0.4)
            }
          }
        }
      }
    }

    switch (formationIndex % 3) {
      case 0:
        generateCrystallineSphere()
        break
      case 1:
        generateHelixLattice()
        break
      case 2:
        generateFractalWeb()
        break
    }

    if (density < 1.0) {
      const targetCount = Math.ceil(nodes.length * Math.max(0.3, density))
      const toKeep = new Set<Node>([rootNode])
      const sortedNodes = nodes
        .filter((n) => n !== rootNode)
        .sort((a, b) => {
          const scoreA = a.connections.length * (1 / (a.distanceFromRoot + 1))
          const scoreB = b.connections.length * (1 / (b.distanceFromRoot + 1))
          return scoreB - scoreA
        })
      for (let i = 0; i < Math.min(targetCount - 1, sortedNodes.length); i++) {
        toKeep.add(sortedNodes[i])
      }
      nodes = nodes.filter((n) => toKeep.has(n))
      nodes.forEach((node) => {
        node.connections = node.connections.filter((conn) => toKeep.has(conn.node))
      })
    }

    return { nodes, rootNode }
  }

  function createNetworkVisualization(formationIndex: number, density: number, paletteIdx: number) {
    const scene = sceneRef.current
    if (!scene) return

    // Clean up old meshes
    if (nodesMeshRef.current) {
      scene.remove(nodesMeshRef.current)
      nodesMeshRef.current.geometry.dispose()
      ;(nodesMeshRef.current.material as THREE.Material).dispose()
      nodesMeshRef.current = null
    }
    if (connectionsMeshRef.current) {
      scene.remove(connectionsMeshRef.current)
      connectionsMeshRef.current.geometry.dispose()
      ;(connectionsMeshRef.current.material as THREE.Material).dispose()
      connectionsMeshRef.current = null
    }

    const network = generateNeuralNetwork(formationIndex, density)
    if (!network || network.nodes.length === 0) return

    const palette = colorPalettes[paletteIdx]

    // Create Nodes Geometry & Mesh
    const nodesGeometry = new THREE.BufferGeometry()
    const nodePositions: number[] = []
    const nodeTypes: number[] = []
    const nodeSizes: number[] = []
    const nodeColors: number[] = []
    const distancesFromRoot: number[] = []

    network.nodes.forEach((node) => {
      nodePositions.push(node.position.x, node.position.y, node.position.z)
      nodeTypes.push(node.type)
      nodeSizes.push(node.size)
      distancesFromRoot.push(node.distanceFromRoot)
      const colorIndex = Math.min(node.level, palette.length - 1)
      const baseColor = palette[colorIndex % palette.length].clone()
      baseColor.offsetHSL(
        THREE.MathUtils.randFloatSpread(0.03),
        THREE.MathUtils.randFloatSpread(0.08),
        THREE.MathUtils.randFloatSpread(0.08)
      )
      nodeColors.push(baseColor.r, baseColor.g, baseColor.b)
    })

    nodesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3))
    nodesGeometry.setAttribute("nodeType", new THREE.Float32BufferAttribute(nodeTypes, 1))
    nodesGeometry.setAttribute("nodeSize", new THREE.Float32BufferAttribute(nodeSizes, 1))
    nodesGeometry.setAttribute("nodeColor", new THREE.Float32BufferAttribute(nodeColors, 3))
    nodesGeometry.setAttribute("distanceFromRoot", new THREE.Float32BufferAttribute(distancesFromRoot, 1))

    const nodesMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pulseUniformsRef.current),
      vertexShader: nodeShader.vertexShader,
      fragmentShader: nodeShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    nodesMeshRef.current = new THREE.Points(nodesGeometry, nodesMaterial)
    scene.add(nodesMeshRef.current)

    // Create Connections Geometry & Mesh
    const connectionsGeometry = new THREE.BufferGeometry()
    const connectionColors: number[] = []
    const connectionStrengths: number[] = []
    const connectionPositions: number[] = []
    const startPoints: number[] = []
    const endPoints: number[] = []
    const pathIndices: number[] = []
    const processedConnections = new Set<string>()
    let pathIndex = 0

    network.nodes.forEach((node, nodeIndex) => {
      node.connections.forEach((conn) => {
        const connectedNode = conn.node
        const connectedIndex = network.nodes.indexOf(connectedNode)
        if (connectedIndex === -1) return
        const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join("-")
        if (!processedConnections.has(key)) {
          processedConnections.add(key)
          const startPoint = node.position
          const endPoint = connectedNode.position
          const numSegments = 20
          for (let i = 0; i < numSegments; i++) {
            const t = i / (numSegments - 1)
            connectionPositions.push(t, 0, 0)
            startPoints.push(startPoint.x, startPoint.y, startPoint.z)
            endPoints.push(endPoint.x, endPoint.y, endPoint.z)
            pathIndices.push(pathIndex)
            connectionStrengths.push(conn.strength)
            const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1)
            const baseColor = palette[avgLevel % palette.length].clone()
            baseColor.offsetHSL(
              THREE.MathUtils.randFloatSpread(0.03),
              THREE.MathUtils.randFloatSpread(0.08),
              THREE.MathUtils.randFloatSpread(0.08)
            )
            connectionColors.push(baseColor.r, baseColor.g, baseColor.b)
          }
          pathIndex++
        }
      })
    })

    connectionsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3))
    connectionsGeometry.setAttribute("startPoint", new THREE.Float32BufferAttribute(startPoints, 3))
    connectionsGeometry.setAttribute("endPoint", new THREE.Float32BufferAttribute(endPoints, 3))
    connectionsGeometry.setAttribute("connectionStrength", new THREE.Float32BufferAttribute(connectionStrengths, 1))
    connectionsGeometry.setAttribute("connectionColor", new THREE.Float32BufferAttribute(connectionColors, 3))
    connectionsGeometry.setAttribute("pathIndex", new THREE.Float32BufferAttribute(pathIndices, 1))

    const connectionsMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(pulseUniformsRef.current),
      vertexShader: connectionShader.vertexShader,
      fragmentShader: connectionShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    connectionsMeshRef.current = new THREE.LineSegments(connectionsGeometry, connectionsMaterial)
    scene.add(connectionsMeshRef.current)

    // Load active palette into uniforms
    palette.forEach((color, i) => {
      if (i < 3) {
        connectionsMaterial.uniforms.uPulseColors.value[i].copy(color)
        nodesMaterial.uniforms.uPulseColors.value[i].copy(color)
      }
    })
  }

  function updateTheme(paletteIndex: number) {
    const palette = colorPalettes[paletteIndex]
    const nodesMesh = nodesMeshRef.current
    const connectionsMesh = connectionsMeshRef.current

    if (!nodesMesh || !connectionsMesh) return

    // Nodes update
    const nodeColorsAttr = nodesMesh.geometry.attributes.nodeColor as THREE.BufferAttribute
    const network = generateNeuralNetwork(configRef.current.currentFormation, configRef.current.densityFactor)
    for (let i = 0; i < nodeColorsAttr.count; i++) {
      const node = network.nodes[i]
      if (!node) continue
      const colorIndex = Math.min(node.level, palette.length - 1)
      const baseColor = palette[colorIndex % palette.length].clone()
      baseColor.offsetHSL(
        THREE.MathUtils.randFloatSpread(0.03),
        THREE.MathUtils.randFloatSpread(0.08),
        THREE.MathUtils.randFloatSpread(0.08)
      )
      nodeColorsAttr.setXYZ(i, baseColor.r, baseColor.g, baseColor.b)
    }
    nodeColorsAttr.needsUpdate = true

    // Connections update
    const connectionColors: number[] = []
    const processedConnections = new Set<string>()
    network.nodes.forEach((node, nodeIndex) => {
      node.connections.forEach((conn) => {
        const connectedNode = conn.node
        const connectedIndex = network.nodes.indexOf(connectedNode)
        if (connectedIndex === -1) return
        const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join("-")
        if (!processedConnections.has(key)) {
          processedConnections.add(key)
          const numSegments = 20
          for (let i = 0; i < numSegments; i++) {
            const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1)
            const baseColor = palette[avgLevel % palette.length].clone()
            baseColor.offsetHSL(
              THREE.MathUtils.randFloatSpread(0.03),
              THREE.MathUtils.randFloatSpread(0.08),
              THREE.MathUtils.randFloatSpread(0.08)
            )
            connectionColors.push(baseColor.r, baseColor.g, baseColor.b)
          }
        }
      })
    })

    connectionsMesh.geometry.setAttribute("connectionColor", new THREE.Float32BufferAttribute(connectionColors, 3))
    ;(connectionsMesh.geometry.attributes.connectionColor as THREE.BufferAttribute).needsUpdate = true

    palette.forEach((color, i) => {
      if (i < 3) {
        (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[i].copy(color);
        (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[i].copy(color);
      }
    })
  }

  // Setup Three.js environment
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || 600

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0c1d17, 0.002)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 8, 28)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true, // Allow layout background styling to peak through
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0.0) // Translucent background to blend with our page layout styles
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    // Create starfield
    function createStarfield() {
      const count = 3000
      const positions = []
      const colors = []
      const sizes = []
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(50, 150)
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2))
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
        positions.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
        const colorChoice = Math.random()
        if (colorChoice < 0.7) {
          colors.push(0.1, 0.6, 0.2) // Green twinkle
        } else if (colorChoice < 0.85) {
          colors.push(0.7, 0.8, 1)
        } else {
          colors.push(1, 0.9, 0.8)
        }
        sizes.push(THREE.MathUtils.randFloat(0.1, 0.3))
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
      geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float uTime;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                float twinkle = sin(uTime * 2.0 + position.x * 100.0) * 0.3 + 0.7;
                gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);
                if (dist > 0.5) discard;
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * 0.8);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      return new THREE.Points(geo, mat)
    }

    const starField = createStarfield()
    scene.add(starField)
    starFieldRef.current = starField

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.6
    controls.minDistance = 8
    controls.maxDistance = 80
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.2
    controls.enablePan = false
    controlsRef.current = controls

    // Post processing setup
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.2, 0.4, 0.7)
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())
    composerRef.current = composer
    bloomPassRef.current = bloomPass

    // Initial uniforms setup
    pulseUniformsRef.current = {
      uTime: { value: 0.0 },
      uPulsePositions: {
        value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)],
      },
      uPulseTimes: { value: [-1e3, -1e3, -1e3] },
      uPulseColors: { value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)] },
      uPulseSpeed: { value: 18.0 },
      uBaseNodeSize: { value: 0.6 },
    }

    createNetworkVisualization(
      configRef.current.currentFormation,
      configRef.current.densityFactor,
      configRef.current.activePaletteIndex
    )

    // Raycasting & pointer variables
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const interactionPoint = new THREE.Vector3()
    let lastPulseIndex = 0

    function triggerPulse(clientX: number, clientY: number) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(pointer, camera)
      interactionPlane.normal.copy(camera.position).normalize()
      interactionPlane.constant = -interactionPlane.normal.dot(camera.position) + camera.position.length() * 0.5

      if (raycaster.ray.intersectPlane(interactionPlane, interactionPoint)) {
        const time = clock.getElapsedTime()
        const nodesMesh = nodesMeshRef.current
        const connectionsMesh = connectionsMeshRef.current
        if (nodesMesh && connectionsMesh) {
          lastPulseIndex = (lastPulseIndex + 1) % 3;
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulseTimes.value[lastPulseIndex] = time;
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulseTimes.value[lastPulseIndex] = time;
          const palette = colorPalettes[configRef.current.activePaletteIndex];
          const randomColor = palette[Math.floor(Math.random() * palette.length)];
          (nodesMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[lastPulseIndex].copy(randomColor);
          (connectionsMesh.material as THREE.ShaderMaterial).uniforms.uPulseColors.value[lastPulseIndex].copy(randomColor);
        }
      }
    }

    const handleCanvasClick = (e: MouseEvent) => {
      // Don't trigger if click originates from overlays
      if ((e.target as HTMLElement).closest(".glass-panel, #control-buttons, button, input")) return
      if (!configRef.current.paused) triggerPulse(e.clientX, e.clientY)
    }

    const handleCanvasTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest(".glass-panel, #control-buttons, button, input")) return
      if (e.touches.length > 0 && !configRef.current.paused) {
        triggerPulse(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    renderer.domElement.addEventListener("click", handleCanvasClick)
    renderer.domElement.addEventListener("touchstart", handleCanvasTouchStart)

    // Resize handling
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      bloomPass.resolution.set(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Animation Loop
    const clock = new THREE.Clock()
    let animFrameId: number

    const tick = () => {
      animFrameId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      if (!configRef.current.paused) {
        if (nodesMeshRef.current) {
          (nodesMeshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t
          nodesMeshRef.current.rotation.y = Math.sin(t * 0.04) * 0.05
        }
        if (connectionsMeshRef.current) {
          (connectionsMeshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t
          connectionsMeshRef.current.rotation.y = Math.sin(t * 0.04) * 0.05
        }
      }

      if (starFieldRef.current) {
        starFieldRef.current.rotation.y += 0.0002;
        (starFieldRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t
      }

      controls.update()
      composer.render()
    }
    tick()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", handleResize)
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener("click", handleCanvasClick)
        rendererRef.current.domElement.removeEventListener("touchstart", handleCanvasTouchStart)
        rendererRef.current.dispose()
      }
      controls.dispose()
    }
  }, [])

  // Morph Formation Handler
  const handleMorph = () => {
    const nextFormation = (currentFormation + 1) % 3
    setCurrentFormation(nextFormation)
    createNetworkVisualization(nextFormation, densityFactor, activePaletteIndex)
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false
      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.autoRotate = true
      }, 2500)
    }
  }

  // Freeze/Play Animation Handler
  const handleFreeze = () => {
    setPaused(!paused)
    if (controlsRef.current) {
      controlsRef.current.autoRotate = paused // resume autoRotate when play resumes
    }
  }

  // Reset Camera handler
  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
      controlsRef.current.autoRotate = false
      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.autoRotate = true
      }, 2000)
    }
  }

  // Density slider update handler
  const handleDensityChange = (val: number) => {
    setDensityFactor(val / 100)
    createNetworkVisualization(currentFormation, val / 100, activePaletteIndex)
  }

  // Active theme change handler
  const handleThemeChange = (idx: number) => {
    setActivePaletteIndex(idx)
    updateTheme(idx)
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full select-none ${className}`}>
      {/* Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair absolute top-0 left-0 z-0" />

      {/* Glass Panel overlay: Instructions */}
      <div
        id="instructions-container"
        className="glass-panel hidden md:block absolute z-20 top-8 left-8 w-[320px] p-6 text-left rounded-3xl"
        style={{
          backdropFilter: "blur(24px) saturate(120%)",
          WebkitBackdropFilter: "blur(24px) saturate(120%)",
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4
            id="instruction-title"
            className="font-semibold text-lg bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent"
          >
            Agri-Network Matrix
          </h4>
          <Badge className="bg-emerald-500/20 text-emerald-300 border-none font-bold text-[9px] uppercase tracking-wider">
            Active
          </Badge>
        </div>
        <p className="instruction-text text-xs leading-relaxed text-slate-400 font-light">
          Click the space to transmit energy pulses. <br />
          Drag anywhere in the background to orbit and explore.
        </p>
      </div>

      {/* Glass Panel overlay: Theme Selector */}
      <div
        id="theme-selector"
        className="glass-panel absolute z-20 top-8 right-8 w-[240px] p-6 text-left rounded-3xl flex flex-col gap-4"
        style={{
          backdropFilter: "blur(24px) saturate(120%)",
          WebkitBackdropFilter: "blur(24px) saturate(120%)",
          background: "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div>
          <div id="theme-selector-title" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2">
            Visual Grid Theme
          </div>
          <div className="theme-grid grid grid-cols-3 gap-3 justify-items-center">
            <button
              onClick={() => handleThemeChange(0)}
              className={`theme-button w-10 h-10 rounded-full border-none cursor-pointer transition-all duration-300 relative ${
                activePaletteIndex === 0 ? "scale-110 active-theme-btn" : "opacity-75 hover:opacity-100"
              }`}
              style={{
                background: "radial-gradient(circle at 30% 30%, #34d399, #065f46)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
              aria-label="Agri Emerald"
            >
              {activePaletteIndex === 0 && (
                <div className="absolute inset-[-4px] rounded-full border-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              )}
            </button>
            <button
              onClick={() => handleThemeChange(1)}
              className={`theme-button w-10 h-10 rounded-full border-none cursor-pointer transition-all duration-300 relative ${
                activePaletteIndex === 1 ? "scale-110 active-theme-btn" : "opacity-75 hover:opacity-100"
              }`}
              style={{
                background: "radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
              aria-label="Purple Nebula"
            >
              {activePaletteIndex === 1 && (
                <div className="absolute inset-[-4px] rounded-full border-2 border-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
              )}
            </button>
            <button
              onClick={() => handleThemeChange(2)}
              className={`theme-button w-10 h-10 rounded-full border-none cursor-pointer transition-all duration-300 relative ${
                activePaletteIndex === 2 ? "scale-110 active-theme-btn" : "opacity-75 hover:opacity-100"
              }`}
              style={{
                background: "radial-gradient(circle at 30% 30%, #38bdf8, #0c4a6e)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
              aria-label="Ocean Aurora"
            >
              {activePaletteIndex === 2 && (
                <div className="absolute inset-[-4px] rounded-full border-2 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              )}
            </button>
          </div>
        </div>

        <div id="density-controls" className="flex flex-col gap-2">
          <div className="density-label flex justify-between items-center text-xs text-slate-400 font-light">
            <span>Node Density</span>
            <span className="text-emerald-400 font-semibold">{Math.round(densityFactor * 100)}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={densityFactor * 100}
            onChange={(e) => handleDensityChange(parseInt(e.target.value))}
            className="density-slider w-full h-[6px] rounded-lg outline-none cursor-pointer accent-emerald-500 bg-white/10"
            aria-label="Network Density"
          />
        </div>
      </div>

      {/* Control Buttons overlay */}
      <div
        id="control-buttons"
        className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 p-2 bg-black/30 rounded-[2rem] backdrop-blur-md border border-white/5"
      >
        <button
          onClick={handleMorph}
          className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all font-serif text-xs font-semibold tracking-wider uppercase"
        >
          Morph
        </button>
        <button
          onClick={handleFreeze}
          className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all font-serif text-xs font-semibold tracking-wider uppercase"
        >
          {paused ? "Resume" : "Freeze"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all font-serif text-xs font-semibold tracking-wider uppercase"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
