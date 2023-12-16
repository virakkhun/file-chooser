import { SUPPORTED_EXTENSIONS } from '../models/supported-ext'

const SUPPORTED_EXTENSION_REGEX =
  /(\.jpg)|(\.png)|(\.jpeg)|(\.png)|(\.heic)|(\.heif)/

export const getFileCommonProps = (file: File) => {
  const { size, name } = file
  const ext = SUPPORTED_EXTENSION_REGEX.exec(name.toLowerCase())?.[0] ?? null
  return { ext, size } as { ext: SUPPORTED_EXTENSIONS; size: number }
}
