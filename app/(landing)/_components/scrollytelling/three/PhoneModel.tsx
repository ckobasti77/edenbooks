"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useVideoTexture } from "@react-three/drei"
import {
  BufferGeometry,
  ClampToEdgeWrapping,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SRGBColorSpace,
} from "three"

import {
  PHONE_FRONT_GLASS_NODE_NAME,
  PHONE_MODEL_PATH,
  PHONE_SCREEN_MESH_NODE_NAME,
  PHONE_SCREEN_VIDEO_ASPECT,
  PHONE_SCREEN_VIDEO_PATH,
  smoothstep,
} from "./constants"

type GltfResult = {
  scene: Group
}

type PhoneModelProps = {
  progress: number
}

type PhoneMaterials = {
  glassMaterial: MeshPhysicalMaterial
  screenBaseMaterial: MeshBasicMaterial
  screenMaterial: MeshBasicMaterial
}

function PhoneModel({ progress }: PhoneModelProps) {
  const gltf = useGLTF(PHONE_MODEL_PATH) as GltfResult
  const materialsRef = useRef<PhoneMaterials | null>(null)
  const videoTexture = useVideoTexture(PHONE_SCREEN_VIDEO_PATH, {
    crossOrigin: "anonymous",
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto",
    start: progress > 0.6,
  })

  const screenTexture = useMemo(() => {
    const texture = videoTexture.clone()

    texture.colorSpace = SRGBColorSpace
    texture.flipY = false
    texture.generateMipmaps = false
    texture.wrapS = ClampToEdgeWrapping
    texture.wrapT = ClampToEdgeWrapping
    texture.needsUpdate = true

    return texture
  }, [videoTexture])

  useEffect(() => {
    return () => {
      screenTexture.dispose()
    }
  }, [screenTexture])

  const phoneModel = useMemo(() => {
    const clonedScene = gltf.scene.clone(true)
    const screenMaterial = new MeshBasicMaterial({
      color: "#ffffff",
      depthTest: true,
      depthWrite: false,
      map: screenTexture,
      opacity: 0,
      side: DoubleSide,
      toneMapped: false,
      transparent: true,
    })
    const screenBaseMaterial = new MeshBasicMaterial({
      color: "#06101f",
      depthTest: true,
      depthWrite: false,
      opacity: 0.92,
      side: DoubleSide,
      toneMapped: false,
      transparent: true,
    })
    const glassMaterial = new MeshPhysicalMaterial({
      color: "#dfeeff",
      depthTest: true,
      depthWrite: false,
      metalness: 0,
      opacity: 0.12,
      roughness: 0.08,
      side: DoubleSide,
      toneMapped: false,
      transparent: true,
      transmission: 0.18,
    })

    clonedScene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = false
        object.receiveShadow = false
        object.frustumCulled = true
      }
    })

    const screenMesh = clonedScene.getObjectByName(PHONE_SCREEN_MESH_NODE_NAME)
    if (screenMesh instanceof Mesh) {
      const screenGeometry = createVideoScreenGeometry(
        screenMesh.geometry,
        PHONE_SCREEN_VIDEO_ASPECT
      )
      const screenBaseMesh = new Mesh(screenGeometry, screenBaseMaterial)

      screenBaseMesh.name = "EdenBooksScreenBase"
      screenBaseMesh.renderOrder = 35

      screenMesh.geometry = screenGeometry
      screenMesh.material = screenMaterial
      screenMesh.renderOrder = 36
      screenMesh.parent?.add(screenBaseMesh)
    }

    const frontGlassMesh = clonedScene.getObjectByName(
      PHONE_FRONT_GLASS_NODE_NAME
    )
    if (frontGlassMesh instanceof Mesh) {
      frontGlassMesh.material = glassMaterial
      frontGlassMesh.renderOrder = 37
    }

    return {
      glassMaterial,
      scene: clonedScene,
      screenBaseMaterial,
      screenMaterial,
    }
  }, [gltf.scene, screenTexture])

  useEffect(() => {
    materialsRef.current = {
      glassMaterial: phoneModel.glassMaterial,
      screenBaseMaterial: phoneModel.screenBaseMaterial,
      screenMaterial: phoneModel.screenMaterial,
    }

    return () => {
      materialsRef.current = null
      phoneModel.screenBaseMaterial.dispose()
      phoneModel.screenMaterial.dispose()
      phoneModel.glassMaterial.dispose()
    }
  }, [phoneModel])

  useFrame(() => {
    const captureGlow = smoothstep(0.45, 0.68, progress)
    const videoReveal = smoothstep(0.62, 0.78, progress)
    const materials = materialsRef.current

    if (!materials) {
      return
    }

    materials.screenMaterial.opacity = videoReveal
    materials.screenMaterial.color.setScalar(0.78 + captureGlow * 0.22)
    materials.glassMaterial.opacity = 0.12 + videoReveal * 0.1
  })

  return <primitive object={phoneModel.scene} dispose={null} />
}

useGLTF.preload(PHONE_MODEL_PATH)

export { PhoneModel }

function createVideoScreenGeometry(
  sourceGeometry: BufferGeometry,
  textureAspect: number
) {
  const geometry = sourceGeometry.clone()
  const uv = geometry.getAttribute("uv")
  const position = geometry.getAttribute("position")

  if (!uv || !position) {
    return geometry
  }

  let minU = Infinity
  let minV = Infinity
  let maxU = -Infinity
  let maxV = -Infinity
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (let index = 0; index < uv.count; index += 1) {
    const u = uv.getX(index)
    const v = uv.getY(index)

    minU = Math.min(minU, u)
    minV = Math.min(minV, v)
    maxU = Math.max(maxU, u)
    maxV = Math.max(maxV, v)
  }

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index)
    const y = position.getY(index)

    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }

  const uvWidth = maxU - minU
  const uvHeight = maxV - minV
  const screenWidth = maxX - minX
  const screenHeight = maxY - minY

  if (uvWidth <= 0 || uvHeight <= 0 || screenWidth <= 0 || screenHeight <= 0) {
    return geometry
  }

  const screenAspect = screenWidth / screenHeight
  const cover =
    textureAspect > screenAspect
      ? {
          offsetX: (1 - screenAspect / textureAspect) / 2,
          offsetY: 0,
          repeatX: screenAspect / textureAspect,
          repeatY: 1,
        }
      : {
          offsetX: 0,
          offsetY: (1 - textureAspect / screenAspect) / 2,
          repeatX: 1,
          repeatY: textureAspect / screenAspect,
        }

  for (let index = 0; index < uv.count; index += 1) {
    const normalizedU = (uv.getX(index) - minU) / uvWidth
    const normalizedV = (uv.getY(index) - minV) / uvHeight

    uv.setXY(
      index,
      cover.offsetX + normalizedU * cover.repeatX,
      cover.offsetY + normalizedV * cover.repeatY
    )
  }

  uv.needsUpdate = true

  return geometry
}
