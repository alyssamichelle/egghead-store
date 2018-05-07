export class Product {
  id: number;
  name: string;
  type: string; //should this be an interface?
  price: number; // in cents
  size?: string | null;
  imagePath: string;
}
