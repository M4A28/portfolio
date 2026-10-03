// Project screenshots are auto-discovered from public/assets/shots/<Repo>/ (repo = folder
// name, must match the project's `repo` exactly). Files sort by filename in display order.
import { screenshotsByRepo } from 'virtual:project-shots'

const byRepo: Record<string, string[]> = {}
for (const [repo, urls] of Object.entries(screenshotsByRepo)) byRepo[repo.toLowerCase()] = urls

/** Screenshots for one repo, matched case-insensitively; [] when the folder has no images. */
export const shotsFor = (repo: string): string[] => byRepo[repo.toLowerCase()] ?? []

/** Folders in public/assets/shots that have images but no data.json entry yet — rendered
 *  automatically as new projects (title from the folder name, links derived from repoBase).
 *  Adding a real entry to data.json with the same `repo` replaces the automatic one. */
export function extraProjects(known: { repo: string }[]) {
  const seen = new Set(known.map(p => p.repo.toLowerCase()))
  return Object.keys(screenshotsByRepo).filter(repo => !seen.has(repo.toLowerCase()))
    .map(repo => ({ repo, title: repo.replace(/[_-]+/g, ' '), desc: '', tags: [] as string[], img: '' }))
}
