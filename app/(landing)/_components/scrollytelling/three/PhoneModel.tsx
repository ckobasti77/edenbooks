"use client"

import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { Group, Mesh } from "three"

import { DUPLICATE_PHONE_NODE_NAMES, PHONE_MODEL_PATH } from "./constants"

type GltfResult = {
  scene: Group
}

function PhoneModel() {
  const gltf = useGLTF(PHONE_MODEL_PATH) as GltfResult

  const phoneScene = useMemo(() => {
    const clonedScene = gltf.scene.clone(true)
    const duplicateNames = new Set<string>(DUPLICATE_PHONE_NODE_NAMES)
    const sceneRoot = clonedScene.getObjectByName("GLTF_SceneRootNode")
    const phoneGroups =
      sceneRoot?.children.filter((child) =>
        child.name.toLowerCase().includes("iphone17promax")
      ) ?? []

    if (phoneGroups.length > 1) {
      phoneGroups[0].visible = false
    }

    clonedScene.traverse((object) => {
      if (
        duplicateNames.has(object.name) ||
        object.name.toLowerCase().includes("iphone17promax_0")
      ) {
        object.visible = false
      }

      if (object instanceof Mesh) {
        object.castShadow = false
        object.receiveShadow = false
        object.frustumCulled = true
      }
    })

    return clonedScene
  }, [gltf.scene])

  return <primitive object={phoneScene} dispose={null} />
}

useGLTF.preload(PHONE_MODEL_PATH)

export { PhoneModel }
