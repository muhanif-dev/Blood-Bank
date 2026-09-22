import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchDonors from './pages/SearchDonors';
import RegisterDonor from './pages/RegisterDonor';
import DonorDetails from './pages/DonorDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchDonors />} />
            <Route path="/register" element={<RegisterDonor />} />
            <Route path="/donors/:id" element={<DonorDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;