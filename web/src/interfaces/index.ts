export interface Item {
  id: number;
  title: string;
  image_url: string;
}

export interface UfIbge {
  sigla: string;
}

export interface CityIbge {
  name: string;
}

export interface Props {
  onFileUpload: (file: File) => void;
}
