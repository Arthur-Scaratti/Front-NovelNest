export interface Novelnameurl {
  name: string;
  url_name?: string;
  autor?: string;
  description?: string;
  updated?: Date;
  status?: string;
  nro_capitulos_en?: number;
  tag_name?: string;
  access_count?: number;
  tags: string[];
}

export interface TopByTag {
  tag?: string;
  novels: Novelnameurl[];
}


