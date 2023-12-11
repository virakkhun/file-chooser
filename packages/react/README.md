# react-file-chooser

a helper for choosing a file in react application.

### Install

with npm:

```code
npm install react-file-chooser
```

with yarn:

```code
yarn add react-file-chooser
```

with pnpm:

```code
pnpm add react-file-chooser
```

### Usage

with drag and drop

```tsx
export const FileChooser = () => {
  const { onChange, onDrag, destroy, isDragging, error, imageDataUrl } =
    useFileChooser()

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {!!error && <p className="py-2 text-red-500">{error}</p>}
      <label
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => onDrag(e, false)}
        onDragEnter={(e) => onDrag(e, true)}
        onDrop={(e) => onChange(e, true)}
        htmlFor="file"
        className={`${
          isDragging && 'bg-blue-50'
        } relative cursor-pointer w-96 h-56 border border-dashed border-blue-400 p-20 flex flex-col justify-center items-center gap-2 hover:bg-blue-50 duration-150 transition rounded-2xl`}
      >
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => onChange(e, false)}
        />

        {!imageDataUrl && (
          <>
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span className="text-blue-500 text-sm">
              Browse <span className="text-black/50">or</span> Drag & Drop
            </span>
          </>
        )}

        {!!imageDataUrl && (
          <>
            <img
              src={imageDataUrl}
              className="border border-black/5 w-32 h-32 rounded-full aspect-square object-cover object-center"
            />
          </>
        )}

        {!!imageDataUrl && (
          <span className="absolute top-2 right-2">
            <button onClick={(e) => destroy(e)}>
              <XMarkIcon className="w-5 h-5 fill-black" />
            </button>
          </span>
        )}
      </label>
    </div>
  )
}
```

without drag and drop

```tsx
export const FileChooser = () => {
  const { onChange, onDrag, destroy, isDragging, error, imageDataUrl } =
    useFileChooser()

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {!!error && <p className="py-2 text-red-500">{error}</p>}
      <label
        htmlFor="file"
        className={`${
          isDragging && 'bg-blue-50'
        } relative cursor-pointer w-96 h-56 border border-dashed border-blue-400 p-20 flex flex-col justify-center items-center gap-2 hover:bg-blue-50 duration-150 transition rounded-2xl`}
      >
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => onChange(e, false)}
        />

        {!imageDataUrl && (
          <>
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span className="text-blue-500 text-sm">
              Browse <span className="text-black/50">or</span> Drag & Drop
            </span>
          </>
        )}

        {!!imageDataUrl && (
          <>
            <img
              src={imageDataUrl}
              className="border border-black/5 w-32 h-32 rounded-full aspect-square object-cover object-center"
            />
          </>
        )}

        {!!imageDataUrl && (
          <span className="absolute top-2 right-2">
            <button onClick={(e) => destroy(e)}>
              <XMarkIcon className="w-5 h-5 fill-black" />
            </button>
          </span>
        )}
      </label>
    </div>
  )
}
```
