import { RouteJsonLd } from '@/components/RouteJsonLd'
import { pageMetadata } from '@/lib/metadata'
import { ProjectsPage } from '@/views/ProjectsPage'

export const metadata = pageMetadata('/transparency/projects')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/projects" />
      <ProjectsPage />
    </>
  )
}
