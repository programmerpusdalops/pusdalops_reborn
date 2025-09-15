/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { NavLink } from 'react-router-dom';
import { FiEye, FiPlus } from 'react-icons/fi';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import * as api from '../../../utils/Api';

import ViewKabupaten from '../../../components/Module/ViewKabupaten';
import Select from '../../../components/Module/Select';
import Pagination from '../../../components/Module/Pagination';
import { Success } from '../../../utils/Alerts';
import Error from '../../../layout/Error';

const DataBencana = () => {
  const [bencana, setBencana] = useState<Array<any>>([]);
  const [jenisBencana, setJenisBencana] = useState<Array<any>>([]);
  const [kabupaten, setKabupaten] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [kab, setKab] = useState('');
  const [jenis, setJenis] = useState('');
  const [tahun, setTahun] = useState('');
  const [bulan, setBulan] = useState('');
  const [status, setStatus] = useState('');

  const Reload = async () => {
    const response = await api.fetchKejadianSearch(kab, jenis, tahun, bulan, status, page, limit);
    setBencana(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };
  useEffect(() => {
    Reload();
  }, [kab, jenis, tahun, bulan, status, page, limit]);

  // hooks untuk menampilan data saat page on
  useEffect(() => {
    const Reload = async () => {
      const response = await api.fetchJenisKejadian();
      setJenisBencana(response.data);
    };
    Reload();

    const Lokasi = async () => {
      const response = await api.fetchLokasiKabupaten();
      setKabupaten(response.data);
    };
    Lokasi();
  }, []);

  const tahuns = [
    {
      value: 2025,
      label: 2025,
    },
    {
      value: 2024,
      label: 2024,
    },
    {
      value: 2023,
      label: 2023,
    },
    {
      value: 2022,
      label: 2022,
    },
  ];

  const bulans = [
    {
      value: '-01-',
      label: 'Januari',
    },
    {
      value: '-02-',
      label: 'Februari',
    },
    {
      value: '-03-',
      label: 'Maret',
    },
    {
      value: '-04-',
      label: 'April',
    },
    {
      value: '-05-',
      label: 'Mei',
    },
    {
      value: '-06-',
      label: 'Juni',
    },
    {
      value: '-07-',
      label: 'Juli',
    },
    {
      value: '-08-',
      label: 'Agustus',
    },
    {
      value: '-09-',
      label: 'September',
    },
    {
      value: '-10-',
      label: 'Oktober',
    },
    {
      value: '-11-',
      label: 'November',
    },
    {
      value: '-12-',
      label: 'Desember',
    },
  ];

  const changePage = ({ selected } : any) => {
    setPage(selected);
  };

  const OnDelete = async (id: any) => {
    try {
      await api.deleteKejadian(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  const clear = () => {
    setKab("")
    setJenis("")
    setTahun("")
    setBulan("")
    setStatus("")
  }

  return (
    <>
      <Breadcrumb pageName="Data Bencana" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
        <div className="flex flex-row justify-between">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Select
              label="--kabupaten--"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setKab(e.target.value)
              }
              option={kabupaten.map((a) => ({ value: a?.id, label: a?.name }))}
            />

            <Select
              label="--Jenis Bencana--"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setJenis(e.target.value)
              }
              option={jenisBencana.map((a) => ({
                value: a?.id,
                label: a?.nama,
              }))}
            />

            <Select
              label="--Tahun--"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setTahun(e.target.value)
              }
              option={tahuns}
            />

            <Select
              label="--Bulan--"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setBulan(e.target.value)
              }
              option={bulans}
            />

            <Select
              label="--Tindak Lanjut--"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setStatus(e.target.value)
              }
              option={[
                { value: 'Ya', label: 'Sudah Ditangani' },
                { value: 'Tidak', label: 'Belum Ditangani' },
              ]}
            />

            <button
              onClick={clear}
              className="flex w-full mr-2 xl:w-auto justify-center rounded border border-primary px-5 p-2 font-medium text-primary"
            >
              Clear
            </button>
          </div>
          <div>
            <NavLink
              to={'/tambah-data-bencana'}
              className="flex w-full justify-center rounded border border-gray-200 px-8 bg-primary p-2 font-medium text-gray"
            >
              <h3 className="mr-2">Tambah</h3>
              <FiPlus size={18} />
            </NavLink>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  No
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Kabupaten
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Lokasi
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Jenis Bencana
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Waktu Kejadian
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Tindak Lanjut
                </th>
                <th className="w-auto py-4 px-4 font-semibold text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {bencana.map((value, _index) => (
                <tr key={value?.id}>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {_index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      <ViewKabupaten
                        kab={true}
                        id_kejadian={value?.id_kejadian}
                      />
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      <ViewKabupaten
                        kec={true}
                        id_kejadian={value?.id_kejadian}
                      />
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {value?.jenis_kejadian?.nama}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {value?.tanggal}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                      {value?.status_ditangani === "Ya" ? (
                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">Sudah Ditangani</p>
                      ) : (
                        <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">Belum Ditangani</p>
                      )}
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <div className="flex justify-between">
                      <NavLink to={`/detail-data-bencana/${value?.id_kejadian}`}>
                        <FiEye />
                      </NavLink>
                      <NavLink
                        to={`/ubah-data-bencana/${value?.id_kejadian}`}
                        className="hover:text-primary"
                      >
                        <MdOutlineModeEditOutline />
                      </NavLink>

                      <button onClick={() => OnDelete(value?.id_kejadian)}>
                        <FaRegTrashAlt />
                      </button>
                      <a href="#">
                        <CiMenuKebab />
                      </a>
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
    </>
  );
};

export default DataBencana;
