import { useState } from 'react'
import {
  ERROR_EXT_NOT_SUPPORTED,
  ERROR_MAX_FILE_SIZE,
  ERROR_NOT_CHOOSE_FILE
} from '../../common/constants/errors'
import { MaxFileSize } from '../../common/models/file-size'
import { EXTS } from '../../common/models/supported-ext'

/**
 * @function useFileChooser
 * a function which optionally accept the two params
 * @param exts EXTS[] | undefined
 * @param maxSize number | undefined
 *
 * @default exts ['.jpg', '.jpeg', '.png']
 * @default maxSize 1000000
 */
export const useFileChooser = (exts?: EXTS[], maxSize?: number) => {
  const [file, setFile] = useState<File | null>(null)
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const _extensions: EXTS[] = exts ? exts : [EXTS.JPG, EXTS.JPEG, EXTS.PNG]
  const _maxSize = maxSize ? maxSize : MaxFileSize['1MB']

  function _setFile(file: File) {
    const { ext, size } = _getFileExtAndSize(file)

    if (!ext || !_extensions.includes(ext)) {
      _handleOnFail()
      setError(() => ERROR_EXT_NOT_SUPPORTED)
      return
    }

    if (size > _maxSize) {
      _handleOnFail()
      setError(() => ERROR_MAX_FILE_SIZE(_maxSize))
      return
    }

    setFile(() => file)
    _fileToDataUrl()
  }

  function _readFileFromEvent(e: Event | DragEvent, isDragEvent: boolean) {
    const files = isDragEvent
      ? (<DragEvent>e).dataTransfer?.files
      : (<HTMLInputElement>e.target)?.files

    return files?.item(0)
  }

  function _fileToDataUrl() {
    _revokeObjectUrl()

    const blob = URL.createObjectURL(file!)
    const fileReader = new FileReader()

    fileReader.addEventListener('load', () => {
      setImageDataUrl(() => blob)
    })
    fileReader.readAsArrayBuffer(file!)
  }

  function _getFileExtAndSize(file: File) {
    const extReg =
      /(\.jpg)|(\.png)|(\.JPEG)|(\.jpeg)|(\.JPG)|(\.png)|(\.PNG)|(\.heic)|(\.HEIC)|(\.heif)|(\.HEIF)/
    const ext = extReg.exec(file.name)?.[0]! as EXTS
    const size = file.size
    return { ext, size }
  }

  function _handleOnFail() {
    setIsDragging(() => false)
  }

  function _revokeObjectUrl() {
    if (imageDataUrl) URL.revokeObjectURL(imageDataUrl)
  }

  /**
   * a function to listen to change event or drag event
   * @param e Event | DragEvent
   * @param isDragEvent boolean
   * @returns void
   */
  function onChange(e: Event | DragEvent, isDragEvent: boolean) {
    e.preventDefault()
    const file = _readFileFromEvent(e, isDragEvent)
    if (!file) {
      setError(() => ERROR_NOT_CHOOSE_FILE)
      return
    }
    _setFile(file)
  }

  /**
   * a function to indicate that the file is being over the element
   * @param e DragEvent
   * @param dragging boolean
   */
  function onDrag(e: DragEvent, dragging: boolean) {
    e.preventDefault()
    setIsDragging(() => dragging)
  }

  return [
    { isDragging, error, file, imageDataUrl },
    { onChange, onDrag }
  ]
}