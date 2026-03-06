/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import * as api from '../../../utils/Api';
import { Error as AlertError, Success } from '../../../utils/Alerts';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import Pagination from '../../../components/Module/Pagination';
import { NavLink } from 'react-router-dom';

const statusColors: Record<string, string> = {
    'Menunggu Verifikasi': 'bg-warning bg-opacity-10 text-warning',
    'Terverifikasi': 'bg-primary bg-opacity-10 text-primary',
    'Sedang Ditangani': 'bg-info bg-opacity-10 text-info',
    'Selesai': 'bg-success bg-opacity-10 text-success',
    'Tidak Valid': 'bg-danger bg-opacity-10 text-danger',
};

export default function LaporBencanaPage() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [data, setData] = useState<Array<any>>([]);
    const [stats, setStats] = useState<any>({});

    const Reload = async () => {
        const response = await api.fetchLaporanSearch(keyword, page, limit, statusFilter);
        setData(response?.data?.result);
        setPage(response?.data?.page);
        setPages(response?.data?.totalPage);
        setRows(response?.data?.totalRows);
    };

    const loadStats = async () => {
        try {
            const response = await api.fetchLaporanStats();
            setStats(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        Reload();
        loadStats();
    }, [keyword, page, limit, statusFilter]);

    const changePage = ({ selected }: any) => setPage(selected);

    const OnDelete = async (id: any) => {
        try {
            await api.deleteLaporan(id);
            Success();
            Reload();
            loadStats();
        } catch (error) {
            AlertError();
        }
    };

    const statCards = [
        { label: 'Hari Ini', value: stats.totalHariIni || 0, color: 'bg-primary' },
        { label: 'Bulan Ini', value: stats.totalBulanIni || 0, color: 'bg-info' },
        { label: 'Menunggu', value: stats.menunggu || 0, color: 'bg-warning' },
        { label: 'Terverifikasi', value: stats.terverifikasi || 0, color: 'bg-primary' },
        { label: 'Ditangani', value: stats.ditangani || 0, color: 'bg-info' },
        { label: 'Selesai', value: stats.selesai || 0, color: 'bg-success' },
        { label: 'Tidak Valid', value: stats.tidakValid || 0, color: 'bg-danger' },
        { label: 'Total', value: stats.totalSemua || 0, color: 'bg-meta-5' },
    ];

    return (
        <>
            <Breadcrumb pageName="Laporan Bencana" />

            <div className="flex flex-col gap-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((s, i) => (
                        <div key={i} className="rounded-lg bg-white dark:bg-boxdark p-4 shadow-md">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-3 h-3 rounded-full ${s.color}`}></span>
                                <p className="text-2xl font-bold text-black dark:text-white">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
                    <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-center">
                        <div className="flex-1">
                            <input
                                type="text"
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setKeyword(e.target.value)}
                                placeholder="Cari tiket, jenis, pelapor, lokasi..."
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        >
                            <option value="">Semua Status</option>
                            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                            <option value="Terverifikasi">Terverifikasi</option>
                            <option value="Sedang Ditangani">Sedang Ditangani</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Tidak Valid">Tidak Valid</option>
                        </select>
                        <button onClick={() => { setKeyword(''); setStatusFilter(''); }} className="rounded border border-primary px-5 py-2 font-medium text-primary">
                            Clear
                        </button>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">No</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Tiket</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Jenis</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Lokasi</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Pelapor</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Status</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Tanggal</th>
                                    <th className="py-4 px-3 font-semibold text-black dark:text-white">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((val: any, idx: number) => (
                                    <tr key={val?.id}>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{idx + 1 + page * limit}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-primary font-semibold text-sm">{val?.nomor_tiket}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{val?.jenis_kejadian}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-black dark:text-white text-sm">{val?.alamat_lokasi || '-'}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{val?.nama_pelapor}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className={`inline-flex rounded-full py-1 px-3 text-xs font-medium ${statusColors[val?.status] || ''}`}>
                                                {val?.status}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <p className="text-sm text-black dark:text-white">{val?.tanggal_kejadian}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-3 dark:border-strokedark">
                                            <div className="flex items-center space-x-3">
                                                <NavLink to={`/detail-laporan/${val?.id}`} className="hover:text-primary">
                                                    <FiEye />
                                                </NavLink>
                                                <button className="hover:text-danger" onClick={() => OnDelete(val?.id)}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination setLimit={setLimit} rows={rows} page={page} pages={pages} changePage={changePage} />
                    </div>
                </div>
            </div>
        </>
    );
}
