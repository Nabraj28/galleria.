export interface ArtworkResponse {
    info: Info
    data: Data[]
}

export interface Info {
    total: number
    parameters: Parameters
}

export interface Parameters {
    skip: number
    limit: number
    select: string
}

export interface Data {
    id: number
    accession_number: string
    share_license_status: string
    tombstone: string
    current_location: string
    title: string
    creation_date: string
    creation_date_earliest: number
    creation_date_latest: number
    artists_tags: string[]
    culture: string[]
    technique: string
    support_materials: unknown[]
    department: string
    collection: string
    type: string
    measurements: string
    dimensions: Dimensions
    state_of_the_work: unknown
    edition_of_the_work: unknown
    copyright: unknown
    inscriptions: unknown[]
    exhibitions: Exhibitions
    provenance: Provenance[]
    find_spot: unknown
    related_works: unknown[]
    former_accession_numbers: string[]
    did_you_know: string
    early_education_description: unknown
    artlens_description: unknown
    description: string
    external_resources: ExternalResources
    citations: Citation[]
    url: string
    images: Images
    alternate_images: AlternateImage[]
    creditline: string
    image_credit: unknown
    sketchfab_id: unknown
    sketchfab_url: unknown
    gallery_donor_text: string
    athena_id: number
    creators: Creator[]
    legal_status: string
    accession_date: string
    sortable_date: number
    date_added_to_oa: unknown
    date_text: string
    collapse_artists: boolean
    on_loan: boolean
    recently_acquired: boolean
    record_type: string
    conservation_statement: unknown
    has_conservation_images: boolean
    cover_accession_number: unknown
    is_nazi_era_provenance: boolean
    impression: unknown
    alternate_titles: unknown[]
    is_highlight: boolean
    updated_at: string
}

export interface Dimensions {
    framed: Framed
    unframed: Unframed
}

export interface Framed {
    height: number
    height_inch: number
    height_inch_fraction: number
    width: number
    width_inch: number
    width_inch_fraction: number
    depth: number
    depth_inch: number
    depth_inch_fraction: number
}

export interface Unframed {
    height: number
    height_inch: number
    height_inch_fraction: number
    width: number
    width_inch: number
    width_inch_fraction: number
}

export interface Exhibitions {
    current: Current[]
    legacy: Legacy[]
}

export interface Current {
    id: number
    title: string
    description: string
    opening_date: string
}

export interface Legacy {
    description: string
    opening_date: string
}

export interface Provenance {
    description: string
    citations: unknown[]
    footnotes: unknown[]
    date: string
    sortorder: unknown
}

export interface ExternalResources {
    wikidata: string[]
    internet_archive: string[]
}

export interface Citation {
    citation: string
    page_number?: string
    url?: string
}

export interface Images {
    annotation: string
    web: Web
    print: Print
    full: Full
}

export interface Web {
    url: string
    width: string
    height: string
    filesize: string
    filename: string
}

export interface Print {
    url: string
    width: string
    height: string
    filesize: string
    filename: string
}

export interface Full {
    url: string
    width: string
    height: string
    filesize: string
    filename: string
}

export interface AlternateImage {
    web: Web2
    print: Print2
    full: Full2
    date_created: string
    annotation: string
}

export interface Web2 {
    url: string
    width: string
    height: string
    filesize: string
}

export interface Print2 {
    url: string
    width: string
    height: string
    filesize: string
}

export interface Full2 {
    url: string
    width: string
    height: string
    filesize: string
}

export interface Creator {
    id: number
    description: string
    extent: unknown
    qualifier: unknown
    role: string
    biography: unknown
    name_in_original_language: unknown
    birth_year: string
    death_year: string
    use_in_caption: boolean
    include_extent: boolean
    weight: number
}
