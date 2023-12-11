import { FileChooser } from './components/file-chooser'

const App = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-between items-center py-20">
      <header>
        <h1 className="text-2xl font-bold">React Demo</h1>
      </header>
      <section>
        <FileChooser />
      </section>
      <footer className="flex items-center gap-2">
        <a
          href="https://github.com/virakkhun/file-chooser/tree/main/packages/playgrounds/react"
          className="hover:text-blue-500 duration-200"
          target="_blank"
        >
          github
        </a>
        <a
          href="https://www.npmjs.com/package/react-file-chooser"
          className="hover:text-blue-500 duration-200"
          target="_blank"
        >
          npm
        </a>
      </footer>
    </main>
  )
}

export default App
