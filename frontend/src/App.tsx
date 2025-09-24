import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './utils/Loader';
import routes from './routes';


import SignInPage from './pages/public/Authentication/SignInPage';
// import SignUpPage from './pages/public/Authentication/SignUpPage';
import HomePage from './pages/public/Home/HomePage';
import DataBencanaPage from './pages/public/MasterData/DataBencanaPage';
import DataLogpalPage from './pages/public/MasterData/DataLogpalPage';
import DokumenPage from './pages/public/Dokumen/DokumenPage';
import PengetahuanPage from './pages/public/Informasi/PengetahuanPage';
import TipsPage from './pages/public/Informasi/TipsPage';
import BeritaPage from './pages/public/Publikasi/BeritaPage';
import MajalahPage from './pages/public/Publikasi/MajalahPage';
import InfografisPage from './pages/public/Publikasi/InfografisPage';
import KontakKamiPage from './pages/public/Kontak/KontakKamiPage';
import KontakPentingPage from './pages/public/Kontak/KontakPentingPage';

// import Error from './layout/Error';
import DetailDataBencanaPage from './pages/public/MasterData/DetailDataBencanaPage';
import DetailBerita from './pages/public/Publikasi/DetailBeritaPage';
import DetailInfografis from './pages/public/Publikasi/DetailInfografisPage';
import DashboardPage from './pages/private/Dashboard/DashboardPage';


const PrivateLayout = lazy(() => import('./layout/PrivateLayout'));
const PublicLayout = lazy(() => import('./layout/PublicLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<any>();

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  useEffect(() => {
    const Reload = async () => {
      const response = await JSON.parse(localStorage.getItem('profile') || '{}')
      setUser(response?.data?.data?.result)
      setToken(response?.data?.data?.token)
    }
    Reload()
  }, [location]);


  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        {!token ? (
        <>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/data-bencana-publik" element={<DataBencanaPage />} />
          <Route path="/data-logpal-publik" element={<DataLogpalPage />} />
          <Route path="/majalah-publik" element={<MajalahPage />} />
          <Route path="/berita-publik" element={<BeritaPage />} />
          <Route path="/infografis-publik" element={<InfografisPage />} />
          <Route path="/detail-infografis-publik" element={<DetailInfografis />} />
          <Route path="/detail-berita-publik/:id" element={<DetailBerita />} />
          <Route path="/dokumen-publik" element={<DokumenPage />} />
          <Route path="/pengetahuan-publik" element={<PengetahuanPage />} />
          <Route path="/tips-publik" element={<TipsPage />} />
          <Route path="/kontak-kami" element={<KontakKamiPage />} />
          <Route path="/kontak-penting" element={<KontakPentingPage />} />
          <Route path="/detail-data-bencana-publik/:id" element={<DetailDataBencanaPage />}/>

            <Route path="/Auth/SignIn" element={<SignInPage />} />
            {/* <Route path="/Auth/SignUp" element={<SignUpPage />} /> */}
        </Route>
          </>
        ) : (
          <Route element={<PrivateLayout store={user} />}>
            <Route path="/*" element={<DashboardPage/>} />
          </Route>
        )}

        {token ? (
          <>
          <Route element={<PrivateLayout store={user} />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          </>
        ) : (
          <Route element={<PublicLayout />}>
            <Route path="/*" element={<SignInPage />} />
          </Route>
        )}
        

      </Routes>
    </>
  );
}

export default App;
