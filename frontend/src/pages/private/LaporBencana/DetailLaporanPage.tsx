/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import * as api from '../../../utils/Api';
import { Error as AlertError, Success } from '../../../utils/Alerts';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const statusOptions = ['Menunggu Verifikasi', 'Terverifikasi', 'Sedang Ditangani', 'Selesai', 'Tidak Valid'];

const statusColors: Record<string, string> = {
    'Menunggu Verifikasi': 'bg-warning bg-opacity-10 text-warning',
    'Terverifikasi': 'bg-primary bg-opacity-10 text-primary',
    'Sedang Ditangani': 'bg-info bg-opacity-10 text-info',
    'Selesai': 'bg-success bg-opacity-10 text-success',
    'Tidak Valid': 'bg-danger bg-opacity-10 text-danger',
};

export default function DetailLaporanPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [status, setStatus] = useState('');
    const [catatan, setCatatan] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.fetchLaporanById(id);
                setData(res.data);
                setStatus(res.data.status);
                setCatatan(res.data.catatan_admin || '');
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.patchLaporan(id, { status, catatan_admin: catatan });
            Success();
            setData({ ...data, status, catatan_admin: catatan });
        } catch {
            AlertError();
        } finally {
            setLoading(false);
        }
    };

    if (!data) return <div className="p-8 text-center text-gray-500">Memuat...</div>;

    const sectionClass = "rounded-xl bg-white dark:bg-boxdark shadow-md p-5";
    const labelClass = "text-xs text-gray-500 dark:text-gray-400";
    const valueClass = "text-sm font-medium text-black dark:text-white";

    const dampakItems = [
        { label: 'Meninggal', value: data.korban_meninggal },
        { label: 'Luka-luka', value: data.korban_luka },
        { label: 'Hilang', value: data.korban_hilang },
        { label: 'Pengungsi', value: data.pengungsi },
        { label: 'Rumah Rusak', value: data.rumah_rusak },
        { label: 'Jalan Rusak', value: data.jalan_rusak },
        { label: 'Jembatan Rusak', value: data.jembatan_rusak },
        { label: 'Fas. Umum Rusak', value: data.fasilitas_umum_rusak },
        { label: 'Sekolah', value: data.sekolah_terdampak },
    ].filter(d => d.value > 0);

    return (
        <>
            <Breadcrumb pageName="Detail Laporan" />

            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className={sectionClass}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-2xl font-bold text-primary">{data.nomor_tiket}</p>
                            <p className="text-sm text-gray-500 mt-1">Dilaporkan: {new Date(data.created_at).toLocaleString('id-ID')}</p>
                        </div>
                        <span className={`inline-flex rounded-full py-2 px-5 text-sm font-semibold ${statusColors[data.status] || ''}`}>
                            {data.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informasi Kejadian */}
                    <div className={sectionClass}>
                        <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">📋 Informasi Kejadian</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><p className={labelClass}>Jenis Kejadian</p><p className={valueClass}>{data.jenis_kejadian}</p></div>
                            <div><p className={labelClass}>Tanggal</p><p className={valueClass}>{data.tanggal_kejadian}</p></div>
                            <div><p className={labelClass}>Jam</p><p className={valueClass}>{data.jam_kejadian || '-'}</p></div>
                            <div><p className={labelClass}>Lokasi</p><p className={valueClass}>{data.alamat_lokasi || '-'}</p></div>
                        </div>
                        {data.kronologi && (
                            <div className="mt-4">
                                <p className={labelClass}>Kronologi</p>
                                <p className="text-sm text-black dark:text-white mt-1 whitespace-pre-wrap">{data.kronologi}</p>
                            </div>
                        )}
                    </div>

                    {/* Peta Lokasi */}
                    <div className={sectionClass}>
                        <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">📍 Lokasi di Peta</h3>
                        {data.latitude && data.longitude ? (
                            <>
                                <div className="rounded-lg overflow-hidden border border-stroke dark:border-strokedark" style={{ height: '250px' }}>
                                    <MapContainer center={[data.latitude, data.longitude]} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                                        <Marker position={[data.latitude, data.longitude]} />
                                    </MapContainer>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Koordinat: {data.latitude}, {data.longitude}</p>
                            </>
                        ) : (
                            <p className="text-gray-400">Koordinat tidak tersedia</p>
                        )}
                    </div>

                    {/* Dampak */}
                    {(dampakItems.length > 0 || data.dampak_lainnya) && (
                        <div className={sectionClass}>
                            <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">⚠️ Dampak</h3>
                            {dampakItems.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {dampakItems.map((d, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-meta-4 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-danger">{d.value}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{d.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.dampak_lainnya && (
                                <div className="mt-4 bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dampak Lainnya</p>
                                    <p className="text-sm text-black dark:text-white whitespace-pre-wrap">{data.dampak_lainnya}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Informasi Pelapor */}
                    <div className={sectionClass}>
                        <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">👤 Pelapor</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><p className={labelClass}>Nama</p><p className={valueClass}>{data.nama_pelapor}</p></div>
                            <div><p className={labelClass}>No. HP</p><p className={valueClass}>{data.no_hp}</p></div>
                            <div><p className={labelClass}>Email</p><p className={valueClass}>{data.email || '-'}</p></div>
                            <div><p className={labelClass}>Bersedia Dihubungi</p><p className={valueClass}>{data.bersedia_dihubungi ? '✅ Ya' : '❌ Tidak'}</p></div>
                        </div>
                        {data.bersedia_dihubungi && data.no_hp && (
                            <a
                                href={`https://wa.me/62${data.no_hp.replace(/^0/, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 py-2 px-4 bg-success bg-opacity-10 text-success rounded-lg font-semibold text-sm hover:bg-opacity-20 transition"
                            >
                                💬 Hubungi via WhatsApp
                            </a>
                        )}
                    </div>
                </div>

                {/* Dokumentasi */}
                {data.dokumentasi && data.dokumentasi.length > 0 && (
                    <div className={sectionClass}>
                        <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">📷 Dokumentasi ({data.dokumentasi.length} file)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data.dokumentasi.map((doc: any) => (
                                <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="rounded-lg overflow-hidden border border-stroke dark:border-strokedark hover:opacity-80 transition">
                                    <img src={doc.url} alt="Dokumentasi" className="w-full h-40 object-cover" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Update Status */}
                <div className={sectionClass}>
                    <h3 className="font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">🔄 Update Status</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Status Laporan</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            >
                                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Catatan Penanganan</label>
                            <textarea
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                rows={3}
                                placeholder="Catatan dari admin..."
                                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => navigate('/laporan-bencana')} className="px-5 py-2 border border-stroke rounded-md text-black dark:text-white hover:bg-gray-50 dark:hover:bg-meta-4 transition">
                                Kembali
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-5 py-2 bg-primary rounded-md text-white font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Status'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
