import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://sabinpant.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    ...projectRoutes,
  ];
}
