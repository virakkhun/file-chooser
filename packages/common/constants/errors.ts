import { SUPPORTED_MAX_FILE_SIZE } from '../models/file-size'

const MAX_SIZE_ERROR_STRING = (sizeString: string) =>
  `File size is more than ${sizeString}`

const MAX_SIZE_ERROR_MAP = {
  [SUPPORTED_MAX_FILE_SIZE['1MB']]: MAX_SIZE_ERROR_STRING('1mb'),
  [SUPPORTED_MAX_FILE_SIZE['2MB']]: MAX_SIZE_ERROR_STRING('2mb'),
  [SUPPORTED_MAX_FILE_SIZE['3MB']]: MAX_SIZE_ERROR_STRING('3mb'),
  [SUPPORTED_MAX_FILE_SIZE['4MB']]: MAX_SIZE_ERROR_STRING('4mb'),
  [SUPPORTED_MAX_FILE_SIZE['5MB']]: MAX_SIZE_ERROR_STRING('5mb')
} as const

export const ERROR_MAX_FILE_SIZE = (size: SUPPORTED_MAX_FILE_SIZE) =>
  MAX_SIZE_ERROR_MAP[size]

export const ERROR_NOT_CHOOSE_FILE = 'Please choose a file'
export const ERROR_EXT_NOT_SUPPORTED = 'File extensions is not eligible'
