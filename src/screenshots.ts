// Project screenshots are auto-discovered: drop files into src/assets/shots/<RepoName>/
// (folder name must match the project's `repo` exactly) and they appear with no data.json edit.
// Files sort in display order by filename, so name them 1.png, 2.png, ... 10.png.
const modules = import.meta.glob<string>(
  './assets/shots/**/*.{png,jpg,jpeg,webp}',
  { eager: true, query: '?url', import: 'default' },
)

const byRepo: Record<string, { path: string; url: string }[]> = {}
for (const [path, url] of Object.entries(modules)) {
  const repo = path.split('/')[3]
  if (!byRepo[repo]) byRepo[repo] = []
  byRepo[repo].push({ path, url })
}

export const screenshotsByRepo: Record<string, string[]> = Object.fromEntries(
  Object.entries(byRepo).map(([repo, files]) => [
    repo,
    files.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true })).map(f => f.url),
  ]),
)
