export interface Item {
  id: number;
  title: string;
  image_url: string;
}

export interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

export interface Params {
  point_id: number;
}

export interface ParamsHome {
  uf: string;
  city: string;
}

export interface Data {
  point: {
    id: number;
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

export interface UfIbge {
  item: {
    label: string;
    value: string;
  }[];
}

export interface CityIbge {
  item: {
    label: string;
    value: string;
  }[];
}

export interface Item {
  label: string;
  value: string;
}
