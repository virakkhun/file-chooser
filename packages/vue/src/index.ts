import { ref, type Ref } from 'vue'
import {
  ERROR_EXT_NOT_SUPPORTED,
  ERROR_MAX_FILE_SIZE,
  ERROR_NOT_CHOOSE_FILE
} from '../../common/constants/errors'
import { IFileChooser } from '../../common/models/file-chooser'
import { MaxFileSize } from '../../common/models/file-size'
import { EXTS } from '../../common/models/supported-ext'

/**
 * @class FileChooser
 * @constructor exts:? EXTS[] | undefined , maxSize?: number
 * a class which constructor optionally accept the two params
 * @param exts EXTS[] | undefined
 * @param maxSize number | undefined
 *
 * @default exts ['.jpg', '.jpeg', '.png']
 * @default maxSize 1000000
 */
export class FileChooser implements IFileChooser {
  private _file: Ref<File | null> = ref(null)
  private _error: Ref<string> = ref('')
  private _imageDataUrl: Ref<string> = ref('')
  private _isDragging: Ref<boolean> = ref(false)
  private _extensions: EXTS[] = [EXTS.JPG, EXTS.JPEG, EXTS.PNG]
  private _maxSize = MaxFileSize['1MB']

  constructor(exts?: EXTS[], maxSize?: number) {
    if (exts) this._extensions = exts
    if (maxSize) this._maxSize = maxSize
  }

  get file() {
    return this._file
  }

  get imageDataUrl() {
    return this._imageDataUrl
  }

  get isDragging() {
    return this._isDragging
  }

  get error() {
    return this._error
  }

  /**
   * a function to listen to change event or drag event
   * @param e Event | DragEvent
   * @param isDragEvent boolean
   * @returns void
   */
  onChange(e: Event | DragEvent, isDragEvent: boolean) {
    e.preventDefault()
    const file = this._readFileFromEvent(e, isDragEvent)
    if (!file) {
      this._error.value = ERROR_NOT_CHOOSE_FILE
      return
    }
    this._setFile(file)
  }

  /**
   * a function to indicate that the file is being over the element
   * @param e DragEvent
   * @param dragging boolean
   */
  onDrag(e: DragEvent, dragging: boolean) {
    e.preventDefault()
    this._isDragging.value = dragging
  }

  /**
   * a function to destroy all the state
   */
  destroy() {
    this._revokeObjectUrl()
    this._isDragging.value = false
    this._imageDataUrl.value = ''
    this._file.value = null
  }

  private _setFile(file: File) {
    const { ext, size } = this._getFileExtAndSize(file)

    if (!ext || !this._extensions.includes(ext)) {
      this._handleOnFail()
      this._error.value = ERROR_EXT_NOT_SUPPORTED
      return
    }

    if (size > this._maxSize) {
      this._handleOnFail()
      this._error.value = ERROR_MAX_FILE_SIZE(this._maxSize)
      return
    }

    this._file.value = file
    this._fileToDataUrl()
  }

  private _handleOnFail() {
    this._isDragging.value = false
  }

  private _getFileExtAndSize(file: File) {
    const extReg =
      /(\.jpg)|(\.png)|(\.JPEG)|(\.jpeg)|(\.JPG)|(\.png)|(\.PNG)|(\.heic)|(\.HEIC)|(\.heif)|(\.HEIF)/
    const ext = extReg.exec(file.name)?.[0]! as EXTS
    const size = file.size
    return { ext, size }
  }

  private _fileToDataUrl() {
    this._revokeObjectUrl()

    const blob = URL.createObjectURL(this._file.value!)
    const fileReader = new FileReader()

    fileReader.addEventListener('load', () => {
      this._imageDataUrl.value = blob
    })
    fileReader.readAsArrayBuffer(this._file.value!)
  }

  private _readFileFromEvent(e: Event | DragEvent, isDragEvent: boolean) {
    const files = isDragEvent
      ? (<DragEvent>e).dataTransfer?.files
      : (<HTMLInputElement>e.target)?.files

    return files?.item(0)
  }

  private _revokeObjectUrl() {
    if (this._imageDataUrl.value) URL.revokeObjectURL(this._imageDataUrl.value)
  }
}
