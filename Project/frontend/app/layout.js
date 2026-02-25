import "./globals.css";

export const metadata = {
  title: "AI Career Roadmap Generator",
  description: "Personalized career paths powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg"></div>
        <div className="blob" style={{ top: '-10%', left: '-10%' }}></div>
        <div className="blob" style={{ bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)' }}></div>
        <main>{children}</main>
      </body>
    </html>
  );
}
