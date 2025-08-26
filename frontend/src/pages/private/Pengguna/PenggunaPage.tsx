import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import * as api from '../../../utils/Api';
import Status from '../../../components/Module/Status';
import { Error, Success } from '../../../utils/Alerts';
import { MdOutlineEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';

const PenggunaPage = () => {
  // variabel array untuk menampung data dari useEffect
  const [data, setData] = useState<Array<any>>([])
  const [ids, setIds] = useState(null)
  const[role, setRole] = useState<Array<any>>([])
  const[kab, setKab] = useState<Array<any>>([])

  // variabel array untuk menampung data dari tag input
  const [item, setItem] = useState<any>({
    username: "",
    password: "",
    telepon: "",
    kab: "",
    role_id: "",
    is_active: false
  })

  // fun* untuk simpan data ke database secara Asinkronus
  const OnSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // menggunakan metode try & catch
    try {
      if (!ids) {
        await api.postUser(item) // "postUser" adalah fun* yang terdapat di dalam folder API
        Success() // Alert pesan berhasil, terdapat dalam folder Utils
        Reload() // dipanggil untuk menampilkan data secara realtime
      } else {
        await api.patchUser(ids, item)
        Success()
        Reload()
      }
    } catch (error) {
      Error() // Alert pesan gagal, terdapat dalam folder Utils
    }
  }

  const OnDelete = async (id: any) => {
    try {
      await api.deleteUser(id)
      Success()
      Reload()
    } catch (error) {
      Error()
    }
  }

  // fun* untuk menarik data secara Asinkronus
  const Reload = async () => {
    const response = await api.fetchUser(); // "fetchUser" adalah fun* yang terdapat di dalam folder API
    setData(response.data);
  };

  // hooks untuk menampilan data saat page on
  useEffect(() => {
    Reload();

    const RoleAccess = async () => {
      const response = await api.fetchRole();
      setRole(response?.data);
    };
    RoleAccess()

    const Kab = async () => {
      const response = await api.fetchLokasiKabupaten();
      setKab(response?.data);
    };
    Kab()
  }, []);

  useEffect(() => {
    if(ids){
      const Reload = async () => {
        const response = await api.fetchUserById(ids);
        setItem(response.data);
      };
      Reload();
    }
  }, [ids]);

  const Clear = () => {
    setItem({
      username: "",
      password: "",
      telepon: "",
      kab: "",
      role_id: "",
      is_active: false
    })
    setIds(null)
  }

  return (
    <>
      <Breadcrumb pageName="Pengguna" />
      
      <div className="mb-7 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Tambah Data
          </h3>
        </div>

        <form onSubmit={OnSubmit}>
          <div className="p-6.5">

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] text-black dark:text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Select Username"
                name="username"
                value={item?.username}
                onChange={(e) => setItem({ ...item, username: e.target.value })}
                className="w-full rounded border-[1.5px] lg:w-1/2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative w-full lg:w-1/2">
                <input
                  type="password"
                  placeholder="6+ Characters, 1 Capital letter"
                  name="password"
                  value={item?.password}
                  onChange={(e) => setItem({ ...item, password: e.target.value })}
                  className="w-full rounded border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                        fill=""
                      />
                      <path
                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] text-black dark:text-white">
                Telepon
              </label>
              <input
                type="text"
                placeholder="Telepon"
                name="telepon"
                value={item?.telepon}
                onChange={(e) => setItem({ ...item, telepon: e.target.value })}
                className="w-full rounded border-[1.5px] lg:w-1/2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] text-black dark:text-white">
                Kabupaten
              </label>
              <div className="relative w-full z-20 bg-transparent dark:bg-form-input lg:w-1/3">
                <select name="kab" onChange={(e) => setItem({ ...item, kab: e.target.value })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">{item?.kab ? item?.kabupaten?.name : "--Pilih Kabupaten--"}</option>
                  <optgroup>
                    <option value="1121">Provinsi Punya</option>
                  </optgroup>
                  {kab?.map((val) => (
                    <optgroup>
                      <option value={val?.id}>{val?.name}</option>
                    </optgroup>
                  ))}
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] text-black dark:text-white">
                Jenis Pengguna
              </label>
              <div className="relative w-full z-20 bg-transparent dark:bg-form-input lg:w-1/3">
                <select name="role_id" onChange={(e) => setItem({ ...item, role_id: e.target.value })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value={item?.role_id}>{item?.role_id ? item?.role?.title : "-- Pilih Jenis Pengguna--"}</option>
                  {role?.map((val) => (
                    <optgroup key={val?.id_role}>
                      <option value={val?.id_role}>{val?.title}</option>
                    </optgroup>
                  ))}
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-4.5 flex flex-col lg:flex-row lg:items-center">
              <label className="mb-2.5 w-[15%] text-black dark:text-white">
                Status
              </label>
              <Status
                enabled={item}
                setEnabled={setItem}
              />
            </div>

            <div className="flex gap-3 justify-end mt-5">
              <button onClick={Clear} type="reset" className="px-5 py-2 border border-primary rounded-md text-primary hover:text-button-primary hover:border-button-primary dark:text-bodydark dark:border-form-strokedark dark:hover:text-white dark:hover:border-white dark:hover:bg-transparent">
                Kosongkan
              </button>
              <button type="submit" className="px-5 py-2 bg-primary rounded-md text-white  hover:bg-button-primary dark:bg-body dark:hover:bg-graydark">
                Simpan
              </button>
            </div>
          </div>
        </form>



      </div>

      {/* tabel */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  No
                </th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  Username
                </th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  Jenis Pengguna
                </th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((value: {} | any, _index: any) => (
                <tr key={value?.id_user}>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {_index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {value?.username}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {value?.role?.title}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark flex items-center">
                    <div
                      className={`w-3 h-3 ${
                        value?.is_active === true ? 'bg-meta-3' : 'bg-meta-1'
                      } rounded-full mr-2`}
                    >
                      <div
                        className={`w-full h-full rounded-full ${
                          value?.is_active === true ? 'bg-meta-3' : 'bg-meta-1'
                        } animate-ping opacity-75`}
                      ></div>
                    </div>
                    <p className="text-black dark:text-white">
                      {value?.is_active === true ? 'Active' : 'Non Active'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button onClick={() => setIds(value?.id_user)} className="hover:text-primary">
                        <MdOutlineEdit />
                      </button>
                      <button onClick={() => OnDelete(value?.id_user)} className="hover:text-primary">
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PenggunaPage;
