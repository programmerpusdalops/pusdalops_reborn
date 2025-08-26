import { lazy } from 'react';
// Batas Awal import page fix
const DashboardPage = lazy(
  () => import('../pages/private/Dashboard/DashboardPage'),
);
const DataBencanaPage = lazy(
  () => import('../pages/private/DataBencana/DataBencanaPage'),
);
const TambahDataBencanaPage = lazy(
  () => import('../pages/private/DataBencana/TambahDataBencanaPage'),
);
const UbahDataBencanaPage = lazy(
  () => import('../pages/private/DataBencana/UbahDataBencanaPage'),
);
const DetailDataBencanaPage = lazy(
  () => import('../pages/private/DataBencana/DetailDataBencanaPage'),
);
const DataLogpalPage = lazy(
  () => import('../pages/private/DataLogpal/DataLogpalPage'),
);
const BeritaPage = lazy(() => import('../pages/private/Publikasi/BeritaPage'));
const TambahBeritaPage = lazy(() => import('../pages/private/Publikasi/TambahBeritaPage'));
const UbahBeritaPage = lazy(() => import('../pages/private/Publikasi/UbahBeritaPage'));
const MajalahPage = lazy(
  () => import('../pages/private/Publikasi/MajalahPage'),
);
const VideoAssetPage = lazy(() => import('../pages/private/Publikasi/VideoAssetPage'));

const DokumenPage = lazy(() => import('../pages/private/Dokumen/DokumenPage'));
// Pengelolah
const PenggunaPage = lazy(
  () => import('../pages/private/Pengguna/PenggunaPage'),
);
const RoleAccessPage = lazy(
  () => import('../pages/private/Role/RoleAccessPage'),
);
const TambahRolePage = lazy(
  () => import('../pages/private/Role/TambahRolePage'),
);
const UbahRolePage = lazy(
  () => import('../pages/private/Role/UbahRolePage'),
);
const JenisBencanaPage = lazy(
  () => import('../pages/private/JenisBencana/JenisBencanaPage'),
);
const JenisDokumenPage = lazy(
  () => import('../pages/private/JenisDokumen/JenisDokumenPage'),
);
// lanjutkan disini jika ingin menambahkan

// Batas Akhir import page fix
const Calendar = lazy(() => import('../pages/templates/Calendar'));
const FormElements = lazy(() => import('../pages/templates/FormElements'));
const FormLayout = lazy(() => import('../pages/templates/FormLayout'));
const Profile = lazy(() => import('../pages/templates/Profile'));
const Settings = lazy(() => import('../pages/templates/Settings'));
const Tables = lazy(() => import('../pages/templates/Tables'));
const Alerts = lazy(() => import('../pages/templates/Alerts'));
const Buttons = lazy(() => import('../pages/templates/Buttons'));

const coreRoutes = [
  // Batas Awal import page fix
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/data-bencana',
    title: 'Data Bencana',
    component: DataBencanaPage,
  },
  {
    path: '/tambah-data-bencana',
    title: 'Tambah Data Bencana',
    component: TambahDataBencanaPage,
  },
  {
    path: '/ubah-data-bencana/:id',
    title: 'Ubah Data Bencana',
    component: UbahDataBencanaPage,
  },
  {
    path: '/detail-data-bencana/:id',
    title: 'Detail Data Bencana',
    component: DetailDataBencanaPage,
  },
  {
    path: '/data-logpal',
    title: 'Data Logpal',
    component: DataLogpalPage,
  },
  {
    path: '/berita',
    title: 'Berita',
    component: BeritaPage,
  },
  {
    path: '/tambah-berita',
    title: 'Tambah Berita',
    component: TambahBeritaPage,
  },
  {
    path: '/ubah-berita/:id',
    title: 'Ubah Berita',
    component: UbahBeritaPage,
  },
  {
    path: '/majalah',
    title: 'majalah',
    component: MajalahPage,
  },
  {
    path: '/asset-video',
    title: 'Video Youtube',
    component: VideoAssetPage,
  },
  {
    path: '/dokumen',
    title: 'Dokumen',
    component: DokumenPage,
  },
  // Pengelola
  {
    path: '/pengguna',
    title: 'Pengguna',
    component: PenggunaPage,
  },
  {
    path: '/role',
    title: 'Role',
    component: RoleAccessPage,
  },
  {
    path: '/tambah-role',
    title: 'Tambah Data Role',
    component: TambahRolePage,
  },
  {
    path: '/ubah-role/:id',
    title: 'Ubah Data Role',
    component: UbahRolePage,
  },
  {
    path: '/jenis-bencana',
    title: 'Jenis-Bencana',
    component: JenisBencanaPage,
  },
  {
    path: '/jenis-dokumen',
    title: 'Jenis Dokumen',
    component: JenisDokumenPage,
  },
  // lanjutkan disini jika ingin menambahkan

  // Batas Akhir import page fix
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
