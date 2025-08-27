/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5001'});
// const API = axios.create({baseURL: 'https://backendreboon.api.pusdalops-bpbdsulteng.com'});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    // menyimpan data token di local storage
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')!).token
    }`;
  }
  return req;
});

// API AUTH
export const signin = (data: {} | any) => API.post('/auth/login', data);
export const signup = (data: {} | any) => API.post('/auth/register', data);

// API USERS
export const fetchUser = () => API.get('/user'); // tampilan semua data
export const fetchUserById = (id: string | any) => API.get(`/user/${id}`); // tampilkan berdasarkan id
export const postUser = (data: {} | any) => API.post('/user', data); // tambah data
export const patchUser = (id: string | any, data: {} | any) =>
  API.patch(`/user/${id}`, data); // ubah data
export const patchPassword = (id: string | any, data: {} | any) =>
  API.patch(`/user/password/${id}`, data); // ubah spesifik password
export const deleteUser = (id: string | any) => API.delete(`/user/${id}`); // delete data

// API ROLE
export const fetchRole = () => API.get('/role');
export const fetchRoleById = (id: string | any) => API.get(`/role/${id}`);
export const postRole = (data: {} | any) => API.post('/role', data);
export const patchRole = (id: string | any, data: {} | any) =>
  API.patch(`/role/${id}`, data);
export const deleteRole = (id: string | any) => API.delete(`/role/${id}`);

// API ROLE ACCESS
export const fetchRoleAccessById = (id: string | any) =>
  API.get(`/role/access/${id}`);
export const postRoleAccess = (data: {} | any) =>
  API.post('/role/access', data);
export const patchRoleAccess = (id: string | any, data: {} | any) =>
  API.patch(`/role/access/${id}`, data);

// API KEJADIAN
export const fetchKejadian = () => API.get('/kejadian');
export const fetchCountKejadian = () => API.get('/kejadian/count/kejadian');
export const fetchKejadianPersentase = () => API.get('/kejadian/persentase');
export const fetchKejadianKorbanTerdampak = () => API.get('/kejadian/count/terdampak');
export const fetchKejadianPerJenis = () => API.get('/kejadian/jenis');
export const fetchCountKejadianPerTahun = () => API.get('/kejadian/count/tahun');
export const fetchCountKejadianPerWilayah = (tahun: string) => API.get(`/kejadian/count/wilayah?search_tahun=${tahun}`);
export const fetchCountKejadianPerJenisKejadian = (keyword: string, tahun: string) => API.get(`/kejadian/count/jenis?search_query=${keyword}&search_tahun=${tahun}`);
export const fetchKejadianSearch = (kab: any, jenis: any, tahun: any, bulan: any, status: any, page: any, limit: any) =>API.get(`/kejadian/search?kab=${kab}&jenis=${jenis}&tahun=${tahun}&bulan=${bulan}&status${status}&page=${page}&limit=${limit}`);

export const fetchKejadianTerdampak = (id: string | any) =>
  API.get(`/kejadian/update/${id}`);
export const fetchKejadianById = (id: string | any) =>
  API.get(`/kejadian/${id}`);
export const postKejadian = (data: {} | any) => API.post('/kejadian', data);
export const patchKejadian = (id: string | any, data: {} | any) =>
  API.patch(`/kejadian/${id}`, data);
export const deleteKejadian = (id: string | any) =>
  API.delete(`/kejadian/${id}`);

// API LOKASI
export const fetchLokasiKabupaten = () => API.get(`/lokasi/kab`);
export const fetchLokasiKecamatan = (id: string | any) =>
  API.get(`/lokasi/kec/${id}`);
export const fetchLokasiKelurahan = (id: string | any) =>
  API.get(`/lokasi/kal/${id}`);

export const fetchLokasiByIdKejadian = (id: string | any) =>
  API.get(`/asessment/lokasi/${id}`);
export const postLokasi = (data: {} | any) =>
  API.post('/asessment/lokasi', data);
export const patchLokasi = (id: string | any, data: {} | any) =>
  API.patch(`/asessment/lokasi/${id}`, data);

// API KORBAN
export const fetchCountKorban = () =>
  API.get(`/asessment/korban/countkorbanterdampak`);
export const fetchKorbanByIdLokasi = (id: string | any) =>
  API.get(`/asessment/korban/${id}`);
export const postKorban = (data: {} | any) =>
  API.post('/asessment/korban', data);
export const patchKorban = (id: string | any, data: {} | any) =>
  API.patch(`/asessment/korban/${id}`, data);

// KERUSAKAN
export const fetchKerusakanByIdLokasi = (id: string | any) =>
  API.get(`/asessment/kerusakan/${id}`);
export const postKerusakan = (data: {} | any) =>
  API.post('/asessment/kerusakan', data);
export const patchKerusakan = (id: string | any, data: {} | any) =>
  API.patch(`/asessment/kerusakan/${id}`, data);

// SKTD
export const fetchSktdById = (id: string | any) =>
  API.get(`/asessment/sktd/${id}`);
export const postSktd = (data: {} | any) => API.post('/asessment/sktd', data);
export const patchSktd = (id: string | any, data: {} | any) =>
  API.patch(`/asessment/sktd/${id}`, data);
export const deleteSktd = (id: string | any) =>
  API.delete(`/asessment/sktd/${id}`);

// DOKUMENTASI
export const fetchDokumentasiByIdKejadian = (id: string | any) =>
  API.get(`/asessment/dokumentasi/${id}`);
export const postDokumentasi = (data: {} | any) =>
  API.post('/asessment/dokumentasi', data);
export const postOneDokumentasi = (data: {} | any) =>
  API.post('/asessment/dokumentasi/one', data);
export const deleteDokumentasi = (id: string | any) =>
  API.delete(`/asessment/dokumentasi/${id}`);

// API DOKUMEN
export const fetchDokumen = () => API.get('/dokumen');
export const fetchDokumenSearch = (keyword: any, page: any, limit: any) =>
  API.get(
    `/dokumen/search?search_query=${keyword}&page=${page}&limit=${limit}`,
  );
export const fetchDokumenById = (id: string | any) => API.get(`/dokumen/${id}`);
export const postDokumen = (data: {} | any) => API.post('/dokumen', data);
export const patchDokumen = (id: string | any, data: {} | any) =>
  API.patch(`/dokumen/${id}`, data);
export const deleteDokumen = (id: string | any) => API.delete(`/dokumen/${id}`);

// API BERITA
export const fetchBerita = () => API.get('/berita');
export const fetchBeritaLatest = () => API.get('/berita/latest');
export const fetchBeritaLatestFour = () => API.get('/berita/latest/four');
export const fetchBeritaLatestRecommended = () => API.get('/berita/latest/recommended');
export const fetchBeritaLatestFavorit = () => API.get('/berita/latest/favorit');
export const fetchBeritaSearch = (keyword: any, page: any, limit: any) => API.get(`/berita/search?search_query=${keyword}&page=${page}&limit=${limit}`);
export const fetchBeritaById = (id: string | any) => API.get(`/berita/${id}`);
export const postBerita = (data: {} | any) => API.post('/berita', data);
export const patchBerita = (id: string | any, data: {} | any) =>
  API.patch(`/berita/${id}`, data);
export const deleteBerita = (id: string | any) => API.delete(`/berita/${id}`);

// ASET VIDEO
export const fetchAssetVideoLimit = () => API.get('/asset/limit');
export const fetchAssetVideo = () => API.get('/asset');
export const postAssetVideo = (data: {} | any) => API.post('/asset', data);
export const deleteAssetVideo = (id: string | any) => API.delete(`/asset/${id}`);

// API LOGPAL
export const fetchLogpalSearch = (keyword: any, page: any, limit: any) =>
  API.get(`/logpal/search?search_query=${keyword}&page=${page}&limit=${limit}`);
export const fetchLogpalById = (id: string | any) => API.get(`/logpal/${id}`);
export const postLogpal = (data: {} | any) => API.post('/logpal', data);
export const patchLogpal = (id: string | any, data: {} | any) =>
  API.patch(`/logpal/${id}`, data);
export const deleteLogpal = (id: string | any) => API.delete(`/logpal/${id}`);

// API JENIS DOKUMEN
export const fetchJenisDokumen = () => API.get('/jenisDokumen');
export const fetchJenisDokumenById = (id: string | any) =>
  API.get(`/jenisDokumen/${id}`);
export const postJenisDokumen = (data: {} | any) =>
  API.post('/jenisDokumen', data);
export const patchJenisDokumen = (id: string | any, data: {} | any) =>
  API.patch(`/jenisDokumen/${id}`, data);
export const deleteJenisDokumen = (id: string | any) =>
  API.delete(`/jenisDokumen/${id}`);

// API JENIS KEJADIAN
export const fetchJenisKejadian = () => API.get('/jenisKejadian');
export const fetchJenisKejadianById = (id: string | any) =>
  API.get(`/jenisKejadian/${id}`);
export const postJenisKejadian = (data: {} | any) =>
  API.post('/jenisKejadian', data);
export const patchJenisKejadian = (id: string | any, data: {} | any) =>
  API.patch(`/jenisKejadian/${id}`, data);
export const deleteJenisKejadian = (id: string | any) =>
  API.delete(`/jenisKejadian/${id}`);

// API BMKG
export const fetchPerkiraanCuaca = () => API.get('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-SulawesiTengah.xml');
export const fetchGempaBumiTerkini = () => API.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml');