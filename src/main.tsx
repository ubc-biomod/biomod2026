import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Footer from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen flex flex-col">
      <header className="flex-shrink-0">
      </header>

      <main className="flex-grow">  
          <App />
      </main>

      <footer className="flex-shrink-0">
        <Footer 
          links={[
            {title: "Instagram", href: "https://www.instagram.com/ubcbiomod/?hl=en"}, 
            {title: "LinkedIn", href: "https://www.linkedin.com/company/ubc-biomod/posts/?feedView=all"},
            {title: "Website", href: "https://www.ubcbiomod.com"}, 
          ]} 
        />
      </footer>
    </div>
  </StrictMode>,
)
