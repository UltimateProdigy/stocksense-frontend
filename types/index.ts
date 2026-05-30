export interface Product {
  _id: string;
  name: string;
  currentStock: number;
  costPrice: number;
}

export interface Sale {
  _id: string;
  productId: string;
  productName: string;
  unitsSold: number;
  sellingPrice: number;
  date: string;
}

export interface Insight {
  criticalRestockAlerts: { itemName: string; reason: string }[];
  nextMonthTrendForecast: string;
  deadStockWarning: { itemName: string; actionAdvice: string }[];
}