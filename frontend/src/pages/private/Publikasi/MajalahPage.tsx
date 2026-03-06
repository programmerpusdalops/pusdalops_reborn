/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import * as api from '../../../utils/Api';
import { Error as AlertError, Success } from '../../../utils/Alerts';
import Swal from 'sweetalert2';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function MajalahPage() {
  const [data, setData] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<any>(null);
  const [judul, setJudul] = useState('');
  const [loading, setLoading] = useState(false);
  const sampulRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const [sampulPreview, setSampulPreview] = useState('');

  const loadData = async () => {
    try {
      const res = await api.fetchMajalahSearch(search, page, 10);
      setData(res.data.result);
      setTotalPage(res.data.totalPage);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, search]);

  const resetForm = () => {
    setJudul('');
    setEditId(null);
    setSampulPreview('');
    if (sampulRef.current) sampulRef.current.value = '';
    if (pdfRef.current) pdfRef.current.value = '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('judul', judul);
    if (sampulRef.current?.files?.[0]) formData.append('sampul', sampulRef.current.files[0]);
    if (pdfRef.current?.files?.[0]) formData.append('file_pdf', pdfRef.current.files[0]);

    try {
      if (editId) {
        await api.patchMajalah(editId, formData);
      } else {
        await api.postMajalah(formData);
      }
      Success();
      resetForm();
      setShowForm(false);
      loadData();
    } catch (err: any) {
      AlertError();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: any) => {
    try {
      const res = await api.fetchMajalahById(id);
      const d = res.data;
      setJudul(d.judul);
      setEditId(d.id);
      setSampulPreview(d.url_sampul);
      setShowForm(true);
    } catch {
      AlertError();
    }
  };

  const handleDelete = async (id: any) => {
    const confirm = await Swal.fire({
      title: 'Hapus majalah?',
      text: 'Data yang dihapus tidak dapat dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });
    if (!confirm.isConfirmed) return;
    try {
      await api.deleteMajalah(id);
      Success();
      loadData();
    } catch {
      AlertError();
    }
  };

  const handleSampulChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSampulPreview(URL.createObjectURL(file));
    }
  };

  const inputClass = "w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white";

  return (
    <>
      <Breadcrumb pageName="Majalah" />

      <div className="rounded-xl bg-white dark:bg-boxdark shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari judul majalah..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className={inputClass + " md:w-80"}
          />
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            {showForm ? 'Tutup Form' : '+ Tambah Majalah'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 border border-stroke dark:border-strokedark rounded-lg p-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Judul *</label>
              <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required className={inputClass} placeholder="Masukkan judul majalah" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">Sampul (JPG/PNG) {editId ? '' : '*'}</label>
                <input type="file" ref={sampulRef} accept="image/jpeg,image/png" onChange={handleSampulChange} required={!editId} className={inputClass} />
                {sampulPreview && (
                  <img src={sampulPreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">File PDF {editId ? '' : '*'}</label>
                <input type="file" ref={pdfRef} accept="application/pdf" required={!editId} className={inputClass} />
                <p className="text-xs text-gray-400 mt-1">Maks. 50 MB</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="px-4 py-2 border border-stroke rounded-md text-black dark:text-white hover:bg-gray-50 dark:hover:bg-meta-4 transition">
                Batal
              </button>
              <button type="submit" disabled={loading} className="px-5 py-2 bg-primary text-white rounded-md font-semibold hover:bg-opacity-90 transition disabled:opacity-50">
                {loading ? 'Menyimpan...' : editId ? 'Perbarui' : 'Simpan'}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4 text-left">
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">No</th>
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">Sampul</th>
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">Judul</th>
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">PDF</th>
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">Aksi</th>              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Belum ada data majalah</td></tr>
              ) : (
                data.map((item: any, idx) => (
                  <tr key={item.id} className="border-b border-stroke dark:border-strokedark">
                    <td className="py-3 px-4 text-sm">{page * 10 + idx + 1}</td>
                    <td className="py-3 px-4">
                      <img src={item.url_sampul} alt={item.judul} className="h-16 w-12 object-cover rounded" />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-black dark:text-white">{item.judul}</td>
                    <td className="py-3 px-4">
                      <a href={item.url_pdf} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">📄 Lihat PDF</a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(item.id)} className="text-primary hover:text-opacity-70 transition" title="Edit">
                          <FiEdit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-danger hover:text-opacity-70 transition" title="Hapus">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPage > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-3 py-1 rounded border text-sm disabled:opacity-30">←</button>
            <span className="px-3 py-1 text-sm">{page + 1} / {totalPage}</span>
            <button onClick={() => setPage(Math.min(totalPage - 1, page + 1))} disabled={page >= totalPage - 1} className="px-3 py-1 rounded border text-sm disabled:opacity-30">→</button>
          </div>
        )}
      </div>
    </>
  );
}
