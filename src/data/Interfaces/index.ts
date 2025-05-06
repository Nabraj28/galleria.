interface paginationType {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
    prev_url: string;
}


interface infoType {
    license_text: string;
    license_links: string[];
    version: string;
}

interface configType {
    iiif_url: string;
    website_url: string;
}

interface dataType {
    id: string;
    title: string;
    description: string;
    artist_title: string;
    date_end: number;
    publication_history: string;
    exhibition_history: string;
    provenance_text: string;
    image_id: string
}


export interface singleArtworkType {
    pagination: paginationType;
    info: infoType;
    config: configType;
    data: dataType;
}


export interface artWorksType {
    pagination: paginationType;
    info: infoType;
    config: configType;
    data: dataType[];
}

export interface ArtWorkProps {

    id?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    artist_title?: string | undefined;
    date_end?: number | undefined;
    publication_history?: string | undefined;
    exhibition_history?: string | undefined;
    provenance_text?: string | undefined;
    image_id?: string | undefined;
}



