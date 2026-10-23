import { useState } from 'react'

const hasFiles = (e) => e.dataTransfer.types.includes('Files')

// Lets photos be dropped from the computer onto an area to upload them.
// Spread `dropProps` on the area; `dropping` is true while files hover over it.
export function useFileDrop(onFiles, disabled) {
  const [dropping, setDropping] = useState(false)

  const dropProps = {
    onDragOver: (e) => {
      if (disabled || !hasFiles(e)) return
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
      setDropping(true)
    },
    onDragLeave: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setDropping(false)
    },
    onDrop: (e) => {
      if (!hasFiles(e)) return
      e.preventDefault()
      setDropping(false)
      if (!disabled) onFiles(e.dataTransfer.files)
    },
  }

  return { dropping, dropProps }
}

// Drag-to-reorder for a list; onMove(from, to) gets the item indexes.
// The arrow buttons stay alongside for touch screens and keyboards.
export function useDragSort(onMove) {
  const [from, setFrom] = useState(null)
  const [over, setOver] = useState(null)
  const end = () => {
    setFrom(null)
    setOver(null)
  }

  const dragProps = (i) => ({
    draggable: true,
    onDragStart: (e) => {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', String(i)) // Firefox needs some data to start a drag.
      setFrom(i)
    },
    onDragOver: (e) => {
      if (from === null) return
      e.preventDefault()
      setOver(i)
    },
    onDrop: (e) => {
      if (from === null) return
      e.preventDefault()
      if (from !== i) onMove(from, i)
      end()
    },
    onDragEnd: end,
  })

  const dragClass = (i) => (i === from ? 'is-dragging' : i === over ? 'is-drop-target' : '')

  return { dragProps, dragClass }
}
