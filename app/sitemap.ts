import type { MetadataRoute } from "next"

const BASE_URL = "https://chonam.dev"
const routes = ["", "/about", "/resume", "/portfolio"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))
}
