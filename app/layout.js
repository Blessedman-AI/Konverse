import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import ThemeProvider from './Providers/ThemeProvider.jsx';
import AuthProvider from './Providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My blog',
  description: 'The best blog ever!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
