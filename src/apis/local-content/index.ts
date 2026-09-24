import fs from "fs"
import path from "path"
import { TPost, TPosts } from "src/types"

type FrontMatter = Record<string, string | string[]>

const CONTENT_DIR = path.join(process.cwd(), "content")

function parseValue(value: string): string | string[] {
  const trimmed = value.trim().replace(/^["']|["']$/g, "")
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      return JSON.parse(trimmed)
    } catch {
      return trimmed.slice(1, -1).split(",").map((item) => item.trim()).filter(Boolean)
    }
  }
  if (trimmed.includes(",")) {
    return trimmed.split(",").map((item) => item.trim()).filter(Boolean)
  }
  return trimmed
}

function parseMarkdownFile(source: string) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: source }

  const data: FrontMatter = {}
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":")
    if (separator === -1) return
    const key = line.slice(0, separator).trim()
    data[key] = parseValue(line.slice(separator + 1))
  })
  return { data, content: match[2].trim() }
}

function asArray(value: string | string[] | undefined, fallback: string[]) {
  if (!value) return fallback
  return Array.isArray(value) ? value : [value]
}

function readPost(filename: string): TPost {
  const source = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
  const { data, content } = parseMarkdownFile(source)
  const slug = String(data.slug || filename.replace(/\.md$/, ""))
  const date = String(data.date || new Date().toISOString())
  const authorName = String(data.author || "Presson8")

  return {
    id: `local-${slug}`,
    date: { start_date: date },
    type: asArray(data.type, ["Post"]) as TPost["type"],
    slug,
    tags: asArray(data.tags, []),
    category: asArray(data.category, []),
    summary: String(data.summary || ""),
    author: [{ id: "local-author", name: authorName }],
    title: String(data.title || slug),
    status: asArray(data.status, ["Public"]) as TPost["status"],
    createdTime: date,
    fullWidth: false,
    thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
    content,
  }
}

export const getPosts = async (): Promise<TPosts> => {
  if (!fs.existsSync(CONTENT_DIR)) return []

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map(readPost)
    .sort(
      (a, b) =>
        new Date(b.date.start_date).getTime() -
        new Date(a.date.start_date).getTime()
    )
}
