import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

type Pkg = 'react' | 'vue'
type PkgConfig = {
  entry: string
  output: string
  type: 'js' | 'dts'
  external?: string[]
}

const entry = (pkg: Pkg) => `./packages/${pkg}/index.ts`
const output = (pkg: Pkg) => `./packages/${pkg}/dist`

const pkgConfigs: PkgConfig[] = [
  {
    entry: entry('vue'),
    output: output('vue'),
    type: 'js',
    external: ['vue']
  },
  {
    entry: entry('vue'),
    output: output('vue'),
    type: 'dts'
  }
  // {
  //   entry: entry('react'),
  //   output: output('react'),
  //   type: 'js',
  //   external: ['react', 'react-dom']
  // },
  // {
  //   entry: entry('react'),
  //   output: output('react'),
  //   type: 'dts'
  // }
]

const configs: RollupOptions[] = []

pkgConfigs.forEach(({ entry, output, type, external }) => {
  if (type === 'dts')
    configs.push({
      input: entry,
      plugins: [dts()],
      output: [
        {
          file: `${output}/index.d.ts`,
          format: 'es'
        }
      ]
    })
  else
    configs.push({
      input: entry,
      plugins: [
        esbuild(),
        resolve({ extensions: ['.ts'] }),
        commonjs(),
        terser()
      ],
      output: [
        {
          file: `${output}/index.mjs`,
          format: 'es'
        },
        {
          file: `${output}/index.cjs`,
          format: 'cjs'
        }
      ],
      external
    })
})

export default configs
