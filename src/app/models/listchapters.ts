export interface ListChapters {
  language: string;
  cap_nro: number;
  name: string;
  titulo: string;
}

export interface ListChaptersResponse {
  novelName: string;
  autor: string;
  description: string;
  status?: string;
  nro_capitulos_en?: number;
  chapters: ListChapters[];
  
  tags: TagsNovel[];
}

export interface TagsNovel {
  tag_name: string;
}

export interface GruposDeCapitulos {
  rows: ListChapters[];
}
