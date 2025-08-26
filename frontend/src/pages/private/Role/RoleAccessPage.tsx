import { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { MdOutlineEdit } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import * as api from '../../../utils/Api';
import { Error, Success } from '../../../utils/Alerts'

export default function RoleAccessPage() {
  const[data, setData] = useState<Array<any>>([])


  const Reload = async () => {
    const response = await api.fetchRole()
    setData(response?.data);
  }
  useEffect(() => {
      Reload()
  }, [])

  const OnDelete = async (id_role: string) => {
    try {
      await api.deleteRole(id_role)
      Reload()
      Success()
    } catch (error) {
      Error()
    }
  }


  return (
    <>
    <Breadcrumb pageName="Role" />

    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5">
        <div className="my-5 flex flex-row justify-end">
          <NavLink
              to={'/tambah-role'}
              className="flex w-50 justify-center rounded border border-gray-200 px-8 bg-primary p-2 font-medium text-gray"
            >
              <h3 className="mr-2">Tambah Role</h3>
              <FiPlus size={18} />
            </NavLink>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  No
                </th>
                <th className="py-4 px-4 font-semibold text-black dark:text-white">
                  Title
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
                      {value?.title}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`/ubah-role/${value?.id_role}`} className="hover:text-primary">
                        <MdOutlineEdit />
                      </Link>
                      <button onClick={() => OnDelete(value?.id_role)} className="hover:text-primary">
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
    </div>
    
    </>
  )
}
