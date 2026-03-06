/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { Error, Success } from '../../../utils/Alerts';
import * as api from '../../../utils/Api';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import Pagination from '../../../components/Module/Pagination';
import Swal from 'sweetalert2';

const InfografisPage = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState<Array<any>>([]);

    const [ids, setIds] = useState(null);
    const [file, setFile] = useState<any>("");
    const [preview, setPreview] = useState<string>("");
    const [item, setItem] = useState<any>({
        judul: "",
        tahun: "",
        kategori: "Bulanan",
    });

    const loadImage = (event: any) => {
        const image = event.target.files[0];
        if (image.size > 5000000) return Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Gagal",
            text: "File Melebihi Kapasitas Penyimpanan, Max 5 MB",
            showConfirmButton: false,
            timer: 1500
        });
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const OnSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul", item?.judul);
        formData.append("tahun", item?.tahun);
        formData.append("kategori", item?.kategori);
        if (file) formData.append("file", file);

        try {
            if (!ids) {
                await api.postInfografis(formData);
                Success();
                Reload();
                Clear();
            } else {
                await api.patchInfografis(ids, formData);
                Success();
                Reload();
                Clear();
            }
        } catch (error) {
            Error();
        }
    };

    const OnDelete = async (id: any) => {
        try {
            await api.deleteInfografis(id);
            Success();
            Reload();
        } catch (error) {
            Error();
        }
    };

    const Reload = async () => {
        const response = await api.fetchInfografisSearch(keyword, page, limit);
        setData(response?.data?.result);
        setPage(response?.data?.page);
        setPages(response?.data?.totalPage);
        setRows(response?.data?.totalRows);
    };

    useEffect(() => {
        Reload();
    }, [keyword, page, limit]);

    useEffect(() => {
        if (ids) {
            const loadData = async () => {
                const response = await api.fetchInfografisById(ids);
                setItem(response.data);
                setPreview(response?.data?.url);
            };
            loadData();
        }
    }, [ids]);

    const changePage = ({ selected }: any) => {
        setPage(selected);
    };

    const Clear = () => {
        setItem({ judul: "", tahun: "", kategori: "Bulanan" });
        setFile("");
        setPreview("");
        setIds(null);
    };

    return (
        <>
            <Breadcrumb pageName="Infografis" />

            <div className="flex flex-col gap-10">
                {/* Form Tambah/Edit */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {ids ? 'Ubah Infografis' : 'Tambah Infografis'}
                        </h3>
                    </div>
                    <form onSubmit={OnSubmit}>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={item?.judul}
                                    name="judul"
                                    onChange={(e) => setItem({ ...item, judul: e.target.value })}
                                    placeholder="Judul Infografis"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-3">
                                <div className="flex flex-col md:w-1/3">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Tahun
                                    </label>
                                    <input
                                        type="text"
                                        value={item?.tahun}
                                        name="tahun"
                                        onChange={(e) => setItem({ ...item, tahun: e.target.value })}
                                        placeholder="Contoh: 2025"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                                    />
                                </div>
                                <div className="flex flex-col md:w-1/3">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Kategori
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select
                                            name="kategori"
                                            value={item?.kategori}
                                            onChange={(e) => setItem({ ...item, kategori: e.target.value })}
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        >
                                            <option value="Bulanan">Bulanan</option>
                                            <option value="Tahunan">Tahunan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Unggah Gambar (JPG/PNG, Max 5MB)
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(event) => loadImage(event)}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                />
                                {preview && (
                                    <img src={preview} alt="Preview" className="mt-3 h-40 object-contain rounded-lg" />
                                )}
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button type='reset' onClick={Clear} className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
                                    Kosongkan
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-primary rounded-md text-white hover:bg-button-primary dark:bg-body dark:hover:bg-graydark"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div>
                            <input
                                type="text"
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
                                placeholder="Cari judul, tahun, atau kategori..."
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:border-form-strokedark"
                            />
                        </div>
                        <button onClick={() => setKeyword("")} className="flex w-full xl:w-auto justify-center rounded border border-primary px-5 p-2 font-medium text-primary">
                            Clear
                        </button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-[5%] py-4 px-4 font-semibold text-black dark:text-white">No</th>
                                    <th className="w-[15%] py-4 px-4 font-semibold text-black dark:text-white">Gambar</th>
                                    <th className="w-[30%] py-4 px-4 font-semibold text-black dark:text-white">Judul</th>
                                    <th className="w-[10%] py-4 px-4 font-semibold text-black dark:text-white">Tahun</th>
                                    <th className="w-[15%] py-4 px-4 font-semibold text-black dark:text-white">Kategori</th>
                                    <th className="py-4 px-4 font-semibold text-black dark:text-white">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value: any, _index: number) => (
                                    <tr key={value?.id}>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white">{_index + 1}</h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <img src={value?.url} alt={value?.judul} className="h-16 w-16 object-cover rounded" />
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{value?.judul}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{value?.tahun}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <p className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${value?.kategori === 'Tahunan' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-success bg-opacity-10 text-success'}`}>
                                                {value?.kategori}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button className="hover:text-primary" onClick={() => setIds(value?.id)}>
                                                    <MdOutlineEdit />
                                                </button>
                                                <button className="hover:text-primary" onClick={() => OnDelete(value?.id)}>
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            setLimit={setLimit}
                            rows={rows}
                            page={page}
                            pages={pages}
                            changePage={changePage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfografisPage;
