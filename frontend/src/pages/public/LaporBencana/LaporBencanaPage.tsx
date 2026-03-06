/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import * as api from '../../../utils/Api';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const jenisKejadianOptions = [
    'Banjir', 'Longsor', 'Gempa Bumi', 'Angin Kencang', 'Kebakaran', 'Tsunami', 'Kekeringan', 'Lainnya'
];

// Map click handler component
function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

const LaporBencanaPage = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [tiket, setTiket] = useState('');
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tracking state
    const [trackTiket, setTrackTiket] = useState('');
    const [trackResult, setTrackResult] = useState<any>(null);
    const [trackLoading, setTrackLoading] = useState(false);
    const [trackError, setTrackError] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(tiket);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTrack = async () => {
        if (!trackTiket.trim()) return;
        setTrackLoading(true);
        setTrackResult(null);
        setTrackError('');
        try {
            const res = await api.trackLaporan(trackTiket.trim().toUpperCase());
            setTrackResult(res.data);
        } catch (err: any) {
            setTrackError(err.response?.data?.message || 'Gagal mencari laporan.');
        } finally {
            setTrackLoading(false);
        }
    };

    // Form state
    const [form, setForm] = useState({
        jenis_kejadian: '',
        tanggal_kejadian: '',
        jam_kejadian: '',
        kronologi: '',
        latitude: -0.9,
        longitude: 119.87,
        alamat_lokasi: '',
        korban_meninggal: 0,
        korban_luka: 0,
        korban_hilang: 0,
        pengungsi: 0,
        rumah_rusak: 0,
        jalan_rusak: 0,
        jembatan_rusak: 0,
        fasilitas_umum_rusak: 0,
        sekolah_terdampak: 0,
        dampak_lainnya: '',
        nama_pelapor: '',
        no_hp: '',
        email: '',
        bersedia_dihubungi: true,
    });

    const [files, setFiles] = useState<File[]>([]);
    const [markerPos, setMarkerPos] = useState<[number, number]>([-0.9, 119.87]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleNumberChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: parseInt(value) || 0 });
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setForm({ ...form, latitude: lat, longitude: lng });
        setMarkerPos([lat, lng]);
    };

    const handleGetGPS = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    setForm({ ...form, latitude: lat, longitude: lng });
                    setMarkerPos([lat, lng]);
                    Swal.fire({ icon: 'success', title: 'Lokasi ditemukan', text: `${lat.toFixed(6)}, ${lng.toFixed(6)}`, timer: 2000, showConfirmButton: false });
                },
                () => {
                    Swal.fire({ icon: 'error', title: 'Gagal', text: 'Tidak dapat mengakses GPS. Pastikan izin lokasi diaktifkan.' });
                }
            );
        }
    };

    const handleFileChange = (e: any) => {
        const selected = Array.from(e.target.files || []) as File[];
        if (selected.length > 5) {
            Swal.fire({ icon: 'error', title: 'Maksimal 5 file' });
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
        for (const f of selected) {
            if (!allowedTypes.includes(f.type)) {
                Swal.fire({ icon: 'error', title: 'Format tidak valid', text: `${f.name} harus JPG, PNG, atau MP4.` });
                return;
            }
            if (f.size > 10000000) {
                Swal.fire({ icon: 'error', title: 'File terlalu besar', text: `${f.name} melebihi 10 MB.` });
                return;
            }
        }
        setFiles(selected);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!form.jenis_kejadian || !form.tanggal_kejadian || !form.nama_pelapor || !form.no_hp) {
            Swal.fire({ icon: 'warning', title: 'Data belum lengkap', text: 'Isi jenis kejadian, tanggal, nama, dan nomor HP.' });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        files.forEach((f) => formData.append('dokumentasi', f));

        try {
            const response = await api.postLaporan(formData);
            setTiket(response.data.nomor_tiket);
            setSubmitted(true);
        } catch (error: any) {
            const msg = error.response?.data?.message || 'Gagal mengirim laporan. Coba lagi.';
            Swal.fire({ icon: 'error', title: 'Gagal', text: msg });
        } finally {
            setLoading(false);
        }
    };

    // =============== SUCCESS VIEW ===============
    if (submitted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white dark:bg-boxdark rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                        Laporan Berhasil Dikirim!
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Terima kasih atas laporan Anda. Tim BPBD akan segera menindaklanjuti.
                    </p>
                    <div className="bg-primary bg-opacity-10 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nomor Tiket Anda</p>
                        <p className="text-3xl font-bold text-primary mt-1">{tiket}</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className={`w-full py-3 rounded-xl font-semibold transition mb-3 flex items-center justify-center gap-2 ${copied
                            ? 'bg-success text-white'
                            : 'bg-gray-100 dark:bg-meta-4 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        {copied ? (
                            <><span>✓</span> Tersalin!</>
                        ) : (
                            <><span>📋</span> Salin Nomor Tiket</>
                        )}
                    </button>
                    <p className="text-xs text-gray-400 mb-6">Simpan nomor tiket ini untuk pelacakan laporan Anda.</p>
                    <button
                        onClick={() => { setSubmitted(false); setCopied(false); setForm({ ...form, jenis_kejadian: '', tanggal_kejadian: '', jam_kejadian: '', kronologi: '', alamat_lokasi: '', korban_meninggal: 0, korban_luka: 0, korban_hilang: 0, pengungsi: 0, rumah_rusak: 0, jalan_rusak: 0, jembatan_rusak: 0, fasilitas_umum_rusak: 0, sekolah_terdampak: 0, dampak_lainnya: '', nama_pelapor: '', no_hp: '', email: '', bersedia_dihubungi: true }); setFiles([]); }}
                        className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition"
                    >
                        Buat Laporan Baru
                    </button>
                </div>
            </div>
        );
    }

    // =============== FORM VIEW ===============
    const inputClass = "w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white";
    const labelClass = "mb-2 block text-sm font-medium text-black dark:text-white";
    const sectionClass = "rounded-xl bg-white dark:bg-boxdark shadow-md p-5 md:p-6";

    return (
        <div className="mx-auto max-w-3xl py-6 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">🚨 Lapor Bencana</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Laporkan kejadian bencana di sekitar Anda</p>
            </div>

            {/* =============== TRACKING SECTION =============== */}
            <div className={sectionClass + " mb-6"}>
                <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                    🔍 Lacak Laporan
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Masukkan nomor tiket untuk melihat status laporan Anda</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={trackTiket}
                        onChange={(e) => setTrackTiket(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                        placeholder="Contoh: LAP-2026-000001"
                        className={inputClass + " flex-1"}
                    />
                    <button
                        type="button"
                        onClick={handleTrack}
                        disabled={trackLoading}
                        className="px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 whitespace-nowrap"
                    >
                        {trackLoading ? '...' : 'Cari'}
                    </button>
                </div>
                {trackError && (
                    <div className="mt-3 p-3 bg-danger bg-opacity-10 rounded-lg">
                        <p className="text-sm text-danger">{trackError}</p>
                    </div>
                )}
                {trackResult && (
                    <div className="mt-4 border border-stroke dark:border-strokedark rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-primary text-lg">{trackResult.nomor_tiket}</p>
                            <span className={`inline-flex rounded-full py-1 px-3 text-xs font-semibold ${trackResult.status === 'Menunggu Verifikasi' ? 'bg-warning bg-opacity-10 text-warning' :
                                    trackResult.status === 'Terverifikasi' ? 'bg-primary bg-opacity-10 text-primary' :
                                        trackResult.status === 'Sedang Ditangani' ? 'bg-info bg-opacity-10 text-info' :
                                            trackResult.status === 'Selesai' ? 'bg-success bg-opacity-10 text-success' :
                                                'bg-danger bg-opacity-10 text-danger'
                                }`}>
                                {trackResult.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Jenis Kejadian</p>
                                <p className="font-medium text-black dark:text-white">{trackResult.jenis_kejadian}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Kejadian</p>
                                <p className="font-medium text-black dark:text-white">{trackResult.tanggal_kejadian}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lokasi</p>
                                <p className="font-medium text-black dark:text-white">{trackResult.alamat_lokasi || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Lapor</p>
                                <p className="font-medium text-black dark:text-white">{new Date(trackResult.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* === SECTION 1: INFORMASI KEJADIAN === */}
                <div className={sectionClass}>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                        📋 Informasi Kejadian
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className={labelClass}>Jenis Kejadian *</label>
                            <select name="jenis_kejadian" value={form.jenis_kejadian} onChange={handleChange} className={inputClass}>
                                <option value="">-- Pilih Jenis Kejadian --</option>
                                {jenisKejadianOptions.map((j) => <option key={j} value={j}>{j}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelClass}>Tanggal Kejadian *</label>
                                <input type="date" name="tanggal_kejadian" value={form.tanggal_kejadian} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Jam Kejadian</label>
                                <input type="time" name="jam_kejadian" value={form.jam_kejadian} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Kronologi Kejadian</label>
                            <textarea name="kronologi" value={form.kronologi} onChange={handleChange} rows={4} placeholder="Jelaskan bagaimana kejadian terjadi, kondisi saat ini, dan informasi penting lainnya..." className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* === SECTION 2: LOKASI === */}
                <div className={sectionClass}>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                        📍 Lokasi Kejadian
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className={labelClass}>Alamat / Deskripsi Lokasi</label>
                            <input type="text" name="alamat_lokasi" value={form.alamat_lokasi} onChange={handleChange} placeholder="Contoh: Jl. Merpati No. 5, Kel. Talise" className={inputClass} />
                        </div>
                        <div>
                            <button type="button" onClick={handleGetGPS} className="w-full py-3 rounded-lg bg-success bg-opacity-10 text-success font-semibold text-sm hover:bg-opacity-20 transition flex items-center justify-center gap-2">
                                📡 Ambil Lokasi GPS Otomatis
                            </button>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Atau klik pada peta di bawah untuk menentukan lokasi
                        </div>
                        <div className="rounded-lg overflow-hidden border border-stroke dark:border-strokedark" style={{ height: '300px' }}>
                            <MapContainer center={markerPos} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                                <Marker position={markerPos} />
                                <LocationPicker onLocationSelect={handleLocationSelect} />
                            </MapContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelClass}>Latitude</label>
                                <input type="text" value={form.latitude.toFixed(6)} readOnly className={inputClass + " bg-gray-50 dark:bg-meta-4"} />
                            </div>
                            <div>
                                <label className={labelClass}>Longitude</label>
                                <input type="text" value={form.longitude.toFixed(6)} readOnly className={inputClass + " bg-gray-50 dark:bg-meta-4"} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === SECTION 3: DAMPAK === */}
                <div className={sectionClass}>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                        ⚠️ Dampak / Yang Terdampak
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Isi dengan angka. Biarkan 0 jika tidak ada.</p>
                    <div className="space-y-3">
                        <p className="font-medium text-sm text-black dark:text-white">Korban Jiwa</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { name: 'korban_meninggal', label: 'Meninggal' },
                                { name: 'korban_luka', label: 'Luka-luka' },
                                { name: 'korban_hilang', label: 'Hilang' },
                                { name: 'pengungsi', label: 'Pengungsi' },
                            ].map((f) => (
                                <div key={f.name}>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{f.label}</label>
                                    <input type="number" name={f.name} value={(form as any)[f.name]} onChange={handleNumberChange} min="0" className={inputClass} />
                                </div>
                            ))}
                        </div>
                        <p className="font-medium text-sm text-black dark:text-white mt-4">Kerusakan Infrastruktur</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { name: 'rumah_rusak', label: 'Rumah' },
                                { name: 'jalan_rusak', label: 'Jalan' },
                                { name: 'jembatan_rusak', label: 'Jembatan' },
                                { name: 'fasilitas_umum_rusak', label: 'Fas. Umum' },
                                { name: 'sekolah_terdampak', label: 'Sekolah' },
                            ].map((f) => (
                                <div key={f.name}>
                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{f.label}</label>
                                    <input type="number" name={f.name} value={(form as any)[f.name]} onChange={handleNumberChange} min="0" className={inputClass} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className="font-medium text-sm text-black dark:text-white mb-2">Dampak Lainnya</p>
                            <textarea name="dampak_lainnya" value={form.dampak_lainnya} onChange={handleChange} rows={3} placeholder="Jelaskan dampak lainnya yang tidak tercantum di atas, misal: sawah terendam 5 Ha, ternak hanyut 10 ekor, dll..." className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* === SECTION 4: DOKUMENTASI === */}
                <div className={sectionClass}>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                        📷 Upload Dokumentasi
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Maks 5 file. Format: JPG, PNG, MP4. Maks 10 MB/file.</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,video/mp4"
                        onChange={handleFileChange}
                        className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:mr-4 file:border-0 file:bg-primary file:bg-opacity-10 file:py-3 file:px-4 file:text-primary file:font-semibold file:cursor-pointer dark:border-form-strokedark dark:bg-form-input dark:file:bg-white/10 dark:file:text-white"
                    />
                    {files.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {files.map((f, i) => (
                                <span key={i} className="text-xs bg-gray-100 dark:bg-meta-4 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                    📎 {f.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* === SECTION 5: INFO PELAPOR === */}
                <div className={sectionClass}>
                    <h2 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-stroke dark:border-strokedark pb-3">
                        👤 Informasi Pelapor
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className={labelClass}>Nama Lengkap *</label>
                            <input type="text" name="nama_pelapor" value={form.nama_pelapor} onChange={handleChange} placeholder="Nama lengkap Anda" className={inputClass} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className={labelClass}>Nomor HP / WhatsApp *</label>
                                <input type="tel" name="no_hp" value={form.no_hp} onChange={handleChange} placeholder="08xxxxxxxxxx" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Email (Opsional)</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com" className={inputClass} />
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="bersedia_dihubungi" checked={form.bersedia_dihubungi} onChange={handleChange}
                                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary dark:border-form-strokedark" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">Saya bersedia dihubungi oleh petugas BPBD</span>
                        </label>
                    </div>
                </div>

                {/* === SUBMIT === */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-danger text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Mengirim...</>
                    ) : (
                        <>🚨 Kirim Laporan Bencana</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default LaporBencanaPage;
