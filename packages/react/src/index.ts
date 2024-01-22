import { ChangeEvent, MouseEvent, useState } from 'react'
import {
  ERROR_EXT_NOT_SUPPORTED,
  ERROR_MAX_FILE_SIZE,
  ERROR_NOT_CHOOSE_FILE
} from '../../common/constants/errors'
import { SUPPORTED_MAX_FILE_SIZE } from '../../common/models/file-size'
import { SUPPORTED_EXTENSIONS } from '../../common/models/supported-ext'
import { getFileCommonProps } from '../../common/utils/get-file-common-props.util'

/**
 * @function useFileChooser
 * a function which optionally accept the two params
 * @param exts SUPPORTED_EXTENSIONS[] | undefined
 * @param maxSize number | undefined
 *
 * @default exts ['.jpg', '.jpeg', '.png']
 * @default maxSize 1000000
 */
export const useFileChooser = (
  exts?: SUPPORTED_EXTENSIONS[],
  maxSize?: number
) => {
  const [file, setFile] = useState<File | null>(null)
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const _extensions: SUPPORTED_EXTENSIONS[] = exts
    ? exts
    : [
        SUPPORTED_EXTENSIONS.JPG,
        SUPPORTED_EXTENSIONS.JPEG,
        SUPPORTED_EXTENSIONS.PNG
      ]
  const _maxSize = maxSize ? maxSize : SUPPORTED_MAX_FILE_SIZE['1MB']

  async function _setFile(file: File) {
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

    return Promise.resolve(file)
  }

  function _readFileFromEvent(
    e: ChangeEvent<HTMLInputElement> | React.DragEvent,
    isDragEvent: boolean
  ) {
    const files = isDragEvent
      ? (<React.DragEvent>e).dataTransfer?.files
      : (<HTMLInputElement>e.target)?.files

    return files?.item(0)
  }

  function _fileToDataUrl(file: File) {
    _revokeObjectUrl()

    const blob = URL.createObjectURL(file)
    const fileReader = new FileReader()

    fileReader.addEventListener('load', () => {
      setImageDataUrl(() => blob)
    })
    fileReader.readAsArrayBuffer(file!)
  }

  function _getFileExtAndSize(file: File) {
    const { ext, size } = getFileCommonProps(file)
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
  function onChange(
    e: ChangeEvent<HTMLInputElement> | React.DragEvent,
    isDragEvent: boolean
  ) {
    e.preventDefault()
    setError(() => '')
    const file = _readFileFromEvent(e, isDragEvent)
    if (!file) {
      setError(() => ERROR_NOT_CHOOSE_FILE)
      return
    }
    _setFile(file).then((f) => {
      if (f) _fileToDataUrl(f)
    })
  }

  /**
   * a function to indicate that the file is being over the element
   * @param e DragEvent
   * @param dragging boolean
   */
  function onDrag(e: React.DragEvent, dragging: boolean) {
    e.preventDefault()
    setIsDragging(() => dragging)
  }

  /**
   * a function to reset state
   */
  function destroy(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    _revokeObjectUrl()
    setFile(() => null)
    setIsDragging((isDragging) => !isDragging)
    setError(() => '')
    setImageDataUrl(() => '')
  }

  return {
    isDragging,
    error,
    file,
    imageDataUrl,
    onChange,
    onDrag,
    destroy
  }
}
