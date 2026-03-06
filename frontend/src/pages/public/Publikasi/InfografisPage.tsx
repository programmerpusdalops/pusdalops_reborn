/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import * as api from '../../../utils/Api';
import { Link } from 'react-router-dom';

const InfografisPage = () => {
  const [infografis, setInfografis] = useState<Array<any>>([]);
  const currentYear = new Date().getFullYear();

  // Filter tahun: Tahunan max = currentYear - 1, Bulanan max = currentYear
  const [tahunTahunan, setTahunTahunan] = useState<number>(currentYear - 1);
  const [tahunBulanan, setTahunBulanan] = useState<number>(currentYear);

  // Ref untuk sinkronisasi tinggi
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.fetchInfografis();
        setInfografis(response.data);
      } catch (error) {
        console.error("Gagal memuat data infografis:", error);
      }
    };
    loadData();
  }, []);

  // Update tinggi kolom kiri saat data/tahun berubah
  useEffect(() => {
    const updateHeight = () => {
      if (leftColRef.current) {
        setLeftHeight(leftColRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [infografis, tahunTahunan]);

  // Ambil tahun unik dari data untuk dropdown
  const allYears = [...new Set(infografis.map((item) => Number(item.tahun)))].sort((a, b) => b - a);
  const tahunOpsiTahunan = allYears.filter((y) => y <= currentYear - 1);
  const tahunOpsiBulanan = allYears.filter((y) => y <= currentYear);

  // Filter data berdasarkan tahun dan kategori
  const tahunanData = infografis.filter(
    (item) => item.kategori === 'Tahunan' && Number(item.tahun) === tahunTahunan
  );
  const bulananData = infografis.filter(
    (item) => item.kategori === 'Bulanan' && Number(item.tahun) === tahunBulanan
  );

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Header */}
      <div className="flex flex-col">
        <label className="border-l-2 pl-3 border-l-meta-1 text-2xl text-black-2 dark:text-white">
          Infografis Kebencanaan
        </label>
      </div>

      {/* Layout 2 kolom (desktop) / 1 kolom (mobile) */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ========== KOLOM KIRI: INFOGRAFIS TAHUNAN ========== */}
        <div ref={leftColRef} className="w-full lg:w-7/12">
          <div className="rounded-xl bg-white shadow-md dark:bg-boxdark overflow-hidden">
            {/* Header + Filter */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stroke dark:border-strokedark">
              <h2 className="text-lg font-bold text-black dark:text-white">
                📊 Infografis Tahunan
              </h2>
              <select
                value={tahunTahunan}
                onChange={(e) => setTahunTahunan(Number(e.target.value))}
                className="rounded-lg border border-stroke bg-transparent py-2 px-4 text-sm font-medium outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              >
                {tahunOpsiTahunan.length === 0 && (
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                )}
                {tahunOpsiTahunan.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Konten */}
            <div className="p-4">
              {tahunanData.length > 0 ? (
                <Link to={tahunanData[0]?.url} target="_blank" className="block">
                  <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-meta-4">
                    <img
                      src={tahunanData[0]?.url}
                      alt={tahunanData[0]?.judul}
                      className="w-full object-contain"
                      style={{ maxHeight: '680px' }}
                      onLoad={() => {
                        if (leftColRef.current) {
                          setLeftHeight(leftColRef.current.offsetHeight);
                        }
                      }}
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <h3 className="text-base font-semibold text-black dark:text-white">
                      {tahunanData[0]?.judul}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Tahun {tahunanData[0]?.tahun}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-center py-20 text-gray-400">
                  <p>Belum ada infografis tahunan untuk tahun {tahunTahunan}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== KOLOM KANAN: INFOGRAFIS BULANAN ========== */}
        <div className="w-full lg:w-5/12">
          <div className="rounded-xl bg-white shadow-md dark:bg-boxdark overflow-hidden flex flex-col"
            style={{ height: leftHeight > 0 ? `${leftHeight}px` : 'auto' }}
          >
            {/* Header + Filter */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stroke dark:border-strokedark flex-shrink-0">
              <h2 className="text-lg font-bold text-black dark:text-white">
                📅 Infografis Bulanan
              </h2>
              <select
                value={tahunBulanan}
                onChange={(e) => setTahunBulanan(Number(e.target.value))}
                className="rounded-lg border border-stroke bg-transparent py-2 px-4 text-sm font-medium outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              >
                {tahunOpsiBulanan.length === 0 && (
                  <option value={currentYear}>{currentYear}</option>
                )}
                {tahunOpsiBulanan.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Scrollable List */}
            <div className="overflow-y-auto flex-1 p-4">
              {bulananData.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {bulananData.map((item: any) => (
                    <Link
                      key={item.id}
                      to={item?.url}
                      target="_blank"
                      className="flex flex-row rounded-lg bg-gray-50 dark:bg-meta-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-28 h-28">
                        <img
                          src={item?.url}
                          alt={item?.judul}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex flex-col justify-center px-4 py-3 flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-black dark:text-white leading-snug line-clamp-2">
                          {item?.judul}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Tahun {item?.tahun}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Belum ada infografis bulanan untuk tahun {tahunBulanan}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfografisPage;
