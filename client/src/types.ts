export type User = {
  _id: string;
  email: string;
  name: string;
  NPM: string;
  faculty: string;
  cluster: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Canteen = {
  _id: string;
  user: string;
  canteenName: string;
  faculty: string;
  cluster: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  canteen: Canteen;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    NPM: string;
    faculty: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  canteenId: string;
};

export type CanteenSearchResponse = {
  data: Canteen[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
