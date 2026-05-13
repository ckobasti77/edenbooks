"use client"

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.86} />
      <directionalLight color="#f7faff" intensity={2.15} position={[2.6, 3.2, 4.8]} />
      <directionalLight color="#2f8cff" intensity={1.2} position={[-3.5, 1.8, 2.4]} />
      <pointLight color="#7cc7ff" intensity={1.35} position={[2.5, -1.2, 2.2]} />
    </>
  )
}

export { SceneLights }
