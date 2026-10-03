import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

const VIRTUAL = 'virtual:project-shots'
const RESOLVED = '\0' + VIRTUAL
const EXT = /\.(png|jpe?g|webp)$/i

/** Serves project screenshots from public/assets/shots/<Repo>/ as URLs; repo = folder name. */
function projectShots(): Plugin {
  let root = ''
  const scan = (): Record<string, string[]> => {
    const byRepo: Record<string, string[]> = {}
    let repos: string[] = []
    try {
      repos = readdirSync(join(root, 'public/assets/shots'), { withFileTypes: true })
        .filter(d => d.isDirectory()).map(d => d.name)
    } catch { return byRepo }
    for (const repo of repos) {
      const files = readdirSync(join(root, 'public/assets/shots', repo)).filter(f => EXT.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      if (files.length) byRepo[repo] = files.map(f => `/assets/shots/${encodeURIComponent(repo)}/${encodeURIComponent(f)}`)
    }
    return byRepo
  }
  const invalidate = (server: ViteDevServer, file: string) => {
    const p = file.replace(/\\/g, '/')
    if (!p.includes('/assets/shots/')) return
    const mod = server.moduleGraph.getModuleById(RESOLVED)
    if (mod) { server.moduleGraph.invalidateModule(mod); server.ws.send({ type: 'full-reload' }) }
  }
  return {
    name: 'project-shots',
    configResolved(c) { root = c.root },
    resolveId(id) { return id === VIRTUAL ? RESOLVED : null },
    load(id) {
      if (id !== RESOLVED) return null
      return `export const screenshotsByRepo = JSON.parse(${JSON.stringify(JSON.stringify(scan()))})`
    },
    configureServer(server) {
      // chokidar passes (path, stats?) — the path is the first argument for every event.
      const onFs = (file: string) => invalidate(server, file)
      server.watcher.on('add', onFs)
      server.watcher.on('unlink', onFs)
      server.watcher.on('addDir', onFs)
      server.watcher.on('unlinkDir', onFs)
    },
  }
}

export default defineConfig({ plugins: [react(), projectShots()] })
