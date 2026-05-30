
import "./globals.css";

export const metadata = {
  title: "StockSense AI",
  description: "AI Inventory Predictor for Nigerian Retailers"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
