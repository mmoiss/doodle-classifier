'use client'
import React, { useRef, useEffect, useState } from 'react'

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const gridSize = 28
  const cellSize = 15

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = gridSize * cellSize
    canvas.height = gridSize * cellSize

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(canvas.width, i * cellSize)
      ctx.stroke()
    }

    saveToHistory(ctx)
  }, [])

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory(prev => [...prev, imageData])
  }

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const gridX = Math.floor(x / cellSize)
    const gridY = Math.floor(y / cellSize)

    ctx.fillStyle = 'black'
    ctx.fillRect(gridX * cellSize + 1, gridY * cellSize + 1, cellSize - 2, cellSize - 2)
  }

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          saveToHistory(ctx)
        }
      }
    }
    setIsDrawing(false)
  }

  const undo = () => {
    if (history.length <= 1) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setHistory(prev => prev.slice(0, -1))
    const previousState = history[history.length - 2]
    ctx.putImageData(previousState, 0, 0)
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(canvas.width, i * cellSize)
      ctx.stroke()
    }

    setHistory([])
    saveToHistory(ctx)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-xl font-light mb-8 text-gray-800 tracking-wide">Doodle Classifier</h1>
      
      <div className="mb-6 flex gap-3">
        <button
          onClick={undo}
          disabled={history.length <= 1}
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-25 disabled:cursor-not-allowed transition-colors"
        >
          Undo
        </button>
        <button
          onClick={clear}
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Clear
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-gray-200 cursor-crosshair shadow-sm"
        style={{ imageRendering: 'pixelated' }}
      />
      
      <p className="mt-5 text-xs text-gray-500 font-light">Draw on the 28×28 grid above</p>
    </div>
  )
}

export default Home