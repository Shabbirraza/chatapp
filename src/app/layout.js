import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ConfigProvider } from 'antd';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat App',
  description: 'Generated by create next app',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:image" content="https://media.istockphoto.com/id/1488105257/photo/chatbot-powered-by-ai-transforming-industries-and-customer-service-yellow-chatbot-icon-over.jpg?s=1024x1024&w=is&k=20&c=Q4raY3uxy-_J15PgbIfOzIhndHkCQ-UFSkxVDBitJcI=" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
