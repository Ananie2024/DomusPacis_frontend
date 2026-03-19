import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/components/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Domus Pacis — Catholic Archdiocese of Kigali',
    template: '%s | Domus Pacis',
  },
  description:
    'Domus Pacis offers premium accommodation, conference facilities, wedding venues, and retreat centres under the Catholic Archdiocese of Kigali.',
  keywords: ['Domus Pacis', 'Kigali', 'accommodation', 'conference', 'wedding', 'retreat', 'Catholic'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1c1917',
                color: '#fdf9ec',
                border: '1px solid #2d2b29',
                borderRadius: '8px',
                fontFamily: 'DM Sans, sans-serif',
              },
              success: { iconTheme: { primary: '#d4a017', secondary: '#fdf9ec' } },
              error:   { iconTheme: { primary: '#dc2626', secondary: '#fdf9ec' } },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
