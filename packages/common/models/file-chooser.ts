export interface IFileChooser {
  onChange(e: Event | DragEvent, isDragEvent: boolean): void
  onDrag(e: DragEvent, isOver: boolean): void
  destroy(): void
}
