export interface Resource {
  name: string;
  type: 'natural' | 'agricultural' | 'mineral' | 'energy';
  country: string;
  quantity: number;
}