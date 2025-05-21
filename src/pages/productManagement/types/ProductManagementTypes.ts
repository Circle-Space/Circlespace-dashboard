export type Product = {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  SKU: string;
  CategoryId: string;
  ParentProductId: string;
  IsAvailable: boolean;
}

export type Category = {
  Id: string;
  Name: string;
  Description: string;
}