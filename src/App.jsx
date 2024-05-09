import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import RedditList from './components/RedditList';
import { Separator } from './components/ui/separator';
import AsideMenu from './components/AsideMenu';

function App() {
  return (
    <div className="pageLayout">
      <header className="shadow">
        <div className="container py-4">
          <Header />
        </div>
      </header>
      <main>
        <div className="container relative flex items-start gap-4 md:gap-8 my-8 max-w-[800px] md:max-w-[1200px] mx-auto ">
          <aside>
            <AsideMenu />
          </aside>
          <div className="grow overflow-hidden">
            <RedditList />
          </div>
        </div>
      </main>
      <footer>
        <Separator />
        <div className="container py-2">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default App;
