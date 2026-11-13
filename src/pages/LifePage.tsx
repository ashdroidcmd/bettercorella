import { LocalizedText } from '../i18n/LocalizedText'
import {
  ArrowRight,
  Camera,
  Car,
  ExternalLink,
  Flower2,
  Landmark,
  Plane,
  Ship,
  Utensils,
  Waves,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import type { PlaceImage } from '../data/places'
import { useLanguage } from '../i18n/language'
import { usePageMeta } from '../lib/usePageMeta'

const cityTourismUrl = 'https://inabanga.gov.ph/tourism/'
const provincialTourismPhoto = (src: string, alt: string): PlaceImage => ({
  src: `/places/${src}`,
  alt,
  credit: 'Municipality of Inabanga, Bohol',
  creditUrl: 'https://inabanga.gov.ph',
})

const experiencePhotos = {
  beaches: provincialTourismPhoto('inabanga-beach-coast.webp', 'Danajon Bank and Inabanga coastal waters.'),
  heritage: provincialTourismPhoto('inabanga-municipal-hall.webp', 'Historic heritage landmarks of Inabanga.'),
  food: provincialTourismPhoto('people-park-fountain.jpg', 'Local Boholano culinary and town dining.'),
  nature: provincialTourismPhoto('carrile-tower.webp', 'Inabanga River Nature Park and verdant watershed.'),
  outdoors: provincialTourismPhoto('bacsil-ridge-monument.webp', 'Mt. Ilihan and Macaban Cave historical trails.'),
}

const experiences = [
  {
    title: 'Inabanga River & Danajon Bank waters',
    summary: 'River nature cruises, mangrove eco-walks, and coral reef island-hopping.',
    icon: Waves,
    photo: experiencePhotos.beaches,
    items: [
      'River cruising and boating along the Inabanga River, the largest and longest river system in Bohol.',
      'Island-hopping across the Danajon Bank double-barrier reef to Cuaming and Hambongan islands.',
      'Mangrove boardwalks and birdwatching along the coastal river delta in Lawis, Bugang, and Ondol.',
      'Firefly watching and sunset views along the calm riverfront and Port of U-og.',
    ],
  },
  {
    title: 'Heritage, faith, and Dagohoy history',
    summary: 'Historic stone churches, revolutionary caves, and local shrines.',
    icon: Landmark,
    photo: experiencePhotos.heritage,
    items: [
      'Saint Paul the Apostle Parish Church, established by Jesuit missionaries in 1744 with historic coral stone architecture.',
      'Macaban Cave, the historic mountain cavern and hideout utilized during the 85-year Francisco Dagohoy Rebellion.',
      'Mt. Ilihan scenic viewpoint and religious pilgrimage grotto overlooking north-western Bohol.',
      'Historic river mouth marker and Port of U-og maritime heritage.',
    ],
  },
  {
    title: 'Raffia craft and Boholano gastronomy',
    summary: 'World-famous handloom raffia weaving and fresh seafood catches.',
    icon: Utensils,
    photo: experiencePhotos.food,
    items: [
      'Visits to community loomweaving workshops where artisans hand-craft natural buri palm raffia fabrics, bags, and mats.',
      'Fresh mud crabs (alimasag), milkfish (bangus), and succulent Danajon seaweeds (guso) at local coastal eateries.',
      'Traditional Boholano sweets including freshly cooked calamay, native torta, and bibingka.',
    ],
  },
  {
    title: 'Nature trails and riverside relaxation',
    summary: 'Lush riverbank vegetation, cold springs, and agro-tourism farms.',
    icon: Flower2,
    photo: experiencePhotos.nature,
    items: [
      'Inabanga River Nature Park picnic grounds, bamboo hanging bridges, and open-air river pavilions.',
      'Cold springs and natural swimming spots in upland Lonoy Cainsican and Canlinte.',
      'Agro-forestry and organic demo farms along the scenic Luyo–Cagawasan agricultural corridor.',
    ],
  },
  {
    title: 'Island life and coastal exploration',
    summary: 'Densely populated coral reef islands and community marine sanctuaries.',
    icon: Camera,
    photo: experiencePhotos.outdoors,
    items: [
      'Experiencing the vibrant island fishing culture of Cuaming, one of Bohol’s most unique island barangays.',
      'Snorkeling over protected coral reefs and giant clams within municipal marine protected areas (MPAs).',
      'Panoramic photography of fishermen’s bancas, tidal sandbars, and the Cebu Strait skyline at sunset.',
    ],
  },
]

type FestivalCard = {
  title: string
  image: string
  imageAlt: string
  photoCredit: string
  sourceUrl: string
  imageNote?: string
}

const festivals: FestivalCard[] = [
  {
    title: 'Feast of Saint Paul the Apostle (Town Fiesta)',
    image: '/places/inabanga-municipal-hall.webp',
    imageAlt: 'Saint Paul the Apostle Parish in Poblacion, Inabanga, Bohol.',
    photoCredit: 'Parish of Saint Paul · Municipality of Inabanga',
    sourceUrl: 'https://inabanga.gov.ph',
    imageNote: 'Celebrated every June 30 with solemn novenas, cultural programs, and grand community hospitality.',
  },
  {
    title: 'Raffia Festival & Handloom Showcase',
    image: '/city/festivals/cityhood-parade.webp',
    imageAlt: 'Performers in handwoven raffia costumes celebrating Inabanga’s loomweaving heritage.',
    photoCredit: 'Raffia Festival Showcase · LGU Inabanga',
    sourceUrl: 'https://inabanga.gov.ph',
    imageNote: 'Celebrates Inabanga’s status as the Raffia Capital of Bohol through colorful street dancing and artisanal trade fairs.',
  },
  {
    title: 'Rano Festival (River Heritage Day)',
    image: '/city/festivals/rano-river-festival.webp',
    imageAlt: 'Cultural river celebration honoring the ecology and life of the Inabanga River.',
    photoCredit: 'Rano Festival · Municipality of Inabanga',
    sourceUrl: 'https://inabanga.gov.ph',
  },
  {
    title: 'Agri-Aqua and Coastal Tourism Fair',
    image: '/city/festivals/agri-tourism-fair.webp',
    imageAlt: 'Fresh local agricultural harvests and seafood displayed during the annual municipal fair.',
    photoCredit: 'Municipal Agriculture Office · LGU Inabanga',
    sourceUrl: 'https://inabanga.gov.ph',
  },
]

const visitorLinks = [
  {
    label: 'Bohol tourism plan',
    url: 'https://www.bohol.gov.ph',
  },
  {
    label: 'Accredited establishments',
    url: 'https://drive.google.com/open?id=1M99J4Y-eS0uPHIoJXyERrZLkquxlnbv1',
  },
]

const adventureMapUrl = 'https://drive.google.com/file/d/13MAdp7BVYczEM16xBTzd_UQsHQ3YyA58/view?usp=sharing'
const adventureMapPreviewUrl = '/city/city-adventour-map.webp'

const tourismPhotos = [
  {
    src: '/places/people-park-fountain.jpg',
    alt: 'City Fountain and People’s Park illuminated at night.',
    label: 'City Plaza',
  },
  {
    src: '/city/heritage.webp',
    alt: 'Stone arches and greenery at a local heritage site.',
    label: 'Heritage',
  },
  {
    src: '/city/food.webp',
    alt: 'Local dishes and desserts served on banana leaves.',
    label: 'Local flavors',
  },
]

const gettingHere = [
  {
    title: 'By land',
    icon: Car,
    lines: [
      'About 270 km from Manila, or 4.5 to 6 hours via NLEX–SCTEX–TPLEX.',
      'Daily direct bus trips with Partas, Dominion, Viron, and Fariñas.',
      'Vans and car rentals are widely available.',
    ],
  },
  {
    title: 'By air',
    icon: Plane,
    lines: [
      'Inabanga Airport, between Barangay Canaoay and Barangay San Francisco, serves private and chartered flights.',
      'Clark International Airport is about 170 km away, or 3.5 to 4 hours by land.',
      'Laoag International Airport is about 200 km away, or 4.5 to 5 hours by land.',
    ],
  },
  {
    title: 'By sea',
    icon: Ship,
    lines: [
      'The Inabanga International Seaport is primarily a cargo port.',
      'It accommodates private vessels and yachts as an entry point for sea travelers.',
    ],
  },
]

export function LifePage() {
  const { translate } = useLanguage()
  const lenis = useLenis()
  const [activeExperience, setActiveExperience] = useState<(typeof experiences)[number] | null>(null)
  const experienceDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!activeExperience) return

    const bodyOverflow = document.body.style.overflow
    const rootOverflow = document.documentElement.style.overflow
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = rootOverflow
      lenis?.start()
    }
  }, [activeExperience, lenis])

  usePageMeta(
    'Life and tourism',
    'Things to do in Inabanga, Bohol: beach circuits, surfing, marine sanctuaries, heritage sites, festivals, local food, and how to get here.',
  )

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line bg-[linear-gradient(135deg,#f5f7ff_0%,#ffffff_70%)]">
        <div aria-hidden="true" className="dot-grid absolute inset-y-0 right-0 -z-10 w-2/3 opacity-35" />
        <div className="container-page grid gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <Breadcrumbs items={[{ label: 'City', href: '/city' }, { label: 'Life and tourism' }]} className="mb-7" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-700"><LocalizedText text={"Life in Inabanga · Culture & Heritage"} /></p>
            <h1 className="max-w-2xl text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-950 sm:text-4xl lg:text-[3.25rem]">
              <LocalizedText text={"River, reef, and raffia heritage"} /></h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-ink-600 sm:text-lg">
              <LocalizedText text={"Explore Inabanga’s river tours, Danajon reef islands, raffia handloom crafts, Boholano delicacies, and vibrant community celebrations."} /></p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/city/places"
                viewTransition
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <LocalizedText text={"Browse city places"} trailingSpace /><ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                href="#visit-map-title"
                className="inline-flex min-h-11 items-center rounded-xl border border-line-dark bg-white px-4 text-sm font-bold text-ink-800 transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <LocalizedText text={"Plan a visit"} /></a>
            </div>
          </div>

          <figure className="group relative min-h-64 overflow-hidden rounded-3xl border border-line bg-ink-950 shadow-float sm:min-h-80 lg:min-h-[360px]">
            <img
              src="/city/coast.webp"
              alt="Rocky coastline and the sea along Inabanga."
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/5 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
              <span className="text-lg font-extrabold text-white sm:text-xl"><LocalizedText text={"Along the Inabanga coast"} /></span>
              <a
                href={cityTourismUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink-950/55 px-3 py-1.5 text-[11px] font-semibold text-white underline decoration-white/50 underline-offset-2 backdrop-blur-sm hover:bg-ink-950/75"
              >
                <LocalizedText text={"Photo: Municipal Government"} /></a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="visit-map-title" className="border-b border-line bg-surface">
        <div className="container-page grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700"><LocalizedText text={"Plan your visit"} /></p>
            <h2 id="visit-map-title" className="scroll-mt-28 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              <LocalizedText text={"Find your way around the city"} /></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-600 sm:text-base sm:leading-7">
              <LocalizedText text={"Preview the City AdvenTour map for visitor spots, food, places to stay, and travel routes. It is the city’s 2022 edition, so confirm current access and business details before you go."} /></p>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3" role="group" aria-label={translate('Tourism highlights')}>
              {tourismPhotos.map((photo) => (
                <figure key={photo.src} className="min-w-0 overflow-hidden rounded-xl border border-line bg-white">
                  <img
                    src={photo.src}
                    alt={translate(photo.alt)}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="px-2 py-1.5 text-center text-[11px] font-semibold text-ink-700 sm:px-3 sm:py-2 sm:text-xs">
                    <LocalizedText text={photo.label} />
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-ink-500">
              <LocalizedText text={"Photos:"} trailingSpace /><a href={cityTourismUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-700"><LocalizedText text={"Municipal Government of Inabanga"} /></a>
            </p>
          </div>

          <a
            href={adventureMapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={translate('Open the full City AdvenTour 2022 map in a new tab')}
            className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:border-brand-200 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <div className="flex min-h-48 items-center justify-center bg-[#168ca3] p-2 sm:min-h-64 sm:p-3">
              <img
                src={adventureMapPreviewUrl}
                alt={translate('Preview of the official City AdvenTour map, showing visitor trails, attractions, food, lodging, services, and travel routes.')}
                loading="lazy"
                decoding="async"
                className="max-h-[360px] w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span>
                <span className="block text-sm font-bold text-ink-950"><LocalizedText text={"City AdvenTour map · 2022"} /></span>
                <span className="mt-0.5 block text-xs text-ink-500"><LocalizedText text={"Open the full-size map"} /></span>
              </span>
              <ExternalLink aria-hidden="true" className="size-4 shrink-0 text-brand-700 transition group-hover:translate-x-0.5" />
            </div>
          </a>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Getting here"
              title="Three ways into the city"
              description="Inabanga sits at the center of Bohol, linked by highway, air, and sea."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {gettingHere.map((option, index) => {
              const Icon = option.icon
              return (
                <Reveal key={option.title} delay={index * 0.05} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={option.title} /></h3>
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-ink-600">
                      {option.lines.map((line) => (
                        <li key={line}><LocalizedText text={line} /></li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Things to do"
              title="Coast, culture, and cuisine"
              description="The city’s attractions are grouped the way the tourism office presents them."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((experience, index) => {
              const Icon = experience.icon
              return (
                <Reveal key={experience.title} delay={(index % 3) * 0.05} className="h-full">
                  <div className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
                    {experience.photo ? (
                      <figure className="relative aspect-[16/8] overflow-hidden bg-surface">
                        <img
                          src={experience.photo.src}
                          alt={translate(experience.photo.alt)}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-2 pt-6">
                          <a
                            href={experience.photo.creditUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-semibold text-white underline decoration-white/50 underline-offset-2 sm:text-[11px]"
                          >
                            <LocalizedText text={"Photo:"} trailingSpace />{experience.photo.credit}
                          </a>
                        </figcaption>
                      </figure>
                    ) : null}
                    <div className="p-5">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={experience.title} /></h3>
                      <p className="mt-2 text-sm leading-6 text-ink-600"><LocalizedText text={experience.summary} /></p>
                      <div className="mt-4 border-t border-line pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            lenis?.stop()
                            setActiveExperience(experience)
                            experienceDialogRef.current?.showModal()
                          }}
                          className="flex min-h-8 w-full items-center justify-between gap-3 rounded-lg text-left text-sm font-bold text-brand-700 outline-none transition hover:text-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                          aria-haspopup="dialog"
                        >
                          <span><LocalizedText text={"See places and activities"} /></span>
                          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Festivals and events"
              title="Festivals and city celebrations"
              description="A mix of religious, cultural, and city-wide celebrations. Check with the city for current dates and schedules."
            />
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {festivals.map((festival) => (
              <li
                key={festival.title}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <figure className="relative aspect-[16/9] overflow-hidden bg-brand-50">
                  <img
                    src={festival.image}
                    alt={translate(festival.imageAlt)}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-2 pt-7">
                    <a
                      href={festival.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-right text-[10px] font-semibold text-white underline decoration-white/50 underline-offset-2 sm:text-[11px]"
                    >
                      <LocalizedText text={"Photo:"} trailingSpace />{festival.photoCredit}
                    </a>
                  </figcaption>
                </figure>
                <div className="p-4">
                  <h3 className="text-sm font-extrabold leading-5 text-ink-900 sm:text-base">{festival.title}</h3>
                  {festival.imageNote ? <p className="mt-1.5 text-xs leading-5 text-ink-500"><LocalizedText text={festival.imageNote} /></p> : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {visitorLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
              >
                <LocalizedText text={link.label} />
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
                />
              </a>
            ))}
          </div>

          <div className="mt-10">
            <SourceNote
              href="https://inabanga.gov.ph"
              linkLabel="Tourism and culture on the municipal portal"
            >
              <LocalizedText text={"Tourism information and civic highlights are published by the Municipal Government of Inabanga. The provincial tourism plan covers Inabanga and wider Bohol circuits. Confirm current schedules and access with the municipal tourism office; source pages publish their own update dates."} /></SourceNote>
          </div>

          <div className="mt-8">
            <Link
              to="/city/business"
              viewTransition
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
            >
              <LocalizedText text={"See the business and investment profile"} /><ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <dialog
        ref={experienceDialogRef}
        aria-labelledby="experience-dialog-title"
        onClose={() => setActiveExperience(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) experienceDialogRef.current?.close()
        }}
        className="m-auto max-h-[90dvh] w-[min(92vw,44rem)] max-w-none overflow-hidden rounded-2xl border border-line bg-white p-0 text-ink-900 shadow-float backdrop:bg-ink-950/60"
      >
        {activeExperience ? (
          <div data-lenis-prevent className="max-h-[90dvh] overflow-y-auto overscroll-contain">
            {activeExperience.photo ? (
              <figure className="relative aspect-[16/7] overflow-hidden bg-surface">
                <img
                  src={activeExperience.photo.src}
                  alt={translate(activeExperience.photo.alt)}
                  className="size-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-2 pt-6">
                  <a
                    href={activeExperience.photo.creditUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-white underline decoration-white/50 underline-offset-2"
                  >
                    <LocalizedText text={"Photo:"} trailingSpace />{activeExperience.photo.credit}
                  </a>
                </figcaption>
                <button
                  type="button"
                  onClick={() => experienceDialogRef.current?.close()}
                  aria-label={translate('Close experience details')}
                  className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-white text-ink-800 shadow-card transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </figure>
            ) : null}
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"Places and activities"} /></p>
                  <h2 id="experience-dialog-title" className="mt-1 text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
                    <LocalizedText text={activeExperience.title} />
                  </h2>
                </div>
                {!activeExperience.photo ? (
                  <button
                    type="button"
                    onClick={() => experienceDialogRef.current?.close()}
                    aria-label={translate('Close experience details')}
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink-700 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-600"><LocalizedText text={activeExperience.summary} /></p>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-ink-700 marker:text-brand-600">
                {activeExperience.items.map((item) => (
                  <li key={item}><LocalizedText text={item} /></li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
