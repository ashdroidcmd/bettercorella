import { RouteJsonLd } from '@/components/seo/RouteJsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { ProjectsPage } from '@/features/transparency/projects-page'

export const metadata = pageMetadata('/transparency/projects')

export default function Page() {
  return (
    <>
      <RouteJsonLd path="/transparency/projects" />
      <ProjectsPage />
    </>
  )
}
