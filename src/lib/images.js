// Shrinks photos before upload so phone and camera files (often 5–15 MB)
// load quickly on the site. Output is a JPEG no larger than MAX_EDGE px.
const MAX_EDGE = 2400
const QUALITY = 0.85

export async function prepareImage(file) {
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image.`)

  let bitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error(`${file.name} could not be read. Try saving it as a JPEG first.`)
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not process image.'))), 'image/jpeg', QUALITY),
  )
}
