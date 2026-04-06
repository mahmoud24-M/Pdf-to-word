export const metadata = {
  title: "PDF to Word Converter",
  description: "Convert PDF files to Word format easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
