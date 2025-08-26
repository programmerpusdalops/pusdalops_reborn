import { useState, useEffect, Fragment, ChangeEvent} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as api from '../../../utils/Api';
import { Error, Success } from '../../../utils/Alerts';
import { Link, useNavigate } from 'react-router-dom';

export default function TambahRolePage() {
    const [role, setRole] = useState({
      id_role: uuidv4(),
      title: '',
    });

    const [roleAccess, setRoleAccess] = useState<Array<any>>([{
      menu: '', 
      role_id: role.id_role, 
      can_read: false, 
      can_create: false, 
      can_update: false, 
      can_delete: false, 
      can_other: false
    }])

    const navigate = useNavigate()
  
    const OnSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        await api.postRole(role)
        await api.postRoleAccess(roleAccess)
        Success()
        navigate("/role")
      } catch (error) {
        Error()
      }
    }

    const initialRole  =  [
        { menu: 'Dashboard', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'DataBencana', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'DataLogpal', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'Publikasi', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'Dokumen', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'User', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'Role', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'JenisBencana', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false},
        { menu: 'JenisDokumen', role_id: role.id_role, can_read: false, can_create: false, can_update: false, can_delete: false, can_other: false}
      ]

    const handleChangeRole = (_index: number, event: ChangeEvent<HTMLInputElement>) => {
        const values = [...roleAccess];
        values[_index][event.target.name] = event.target.checked;
        setRoleAccess(values);
    }

    useEffect(() => {
      setRoleAccess(initialRole)
    }, [])

  return (
        <form onSubmit={OnSubmit}>
          <div className="flex flex-col gap-9">
            <div className='p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>

              <div className="w-full mb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                    Jenis Role
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  onChange={(e) => setRole({ ...role, title: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

                          
                                <label className="mb-2.5 block text-black dark:text-white">Hak Akses Role</label>
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <tbody>
                                            
                                        {roleAccess.map((datas, _index) => (
                                                <Fragment key={_index}>
                                                <tr>
                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">{datas?.menu}</td>
                                                    <input className="relative mr-3" type="hidden" name="menu" onChange={event => handleChangeRole(_index, event)} />

                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                                        <div>
                                                            <label className="flex cursor-pointer select-none items-center">
                                                                <input className="relative mr-3" type="checkbox"  name="can_read" checked={datas?.can_read}  onChange={event => handleChangeRole(_index, event)} />
                                                                <span>Read</span>
                                                            </label>
                                                        </div>
                                                    </td>


                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                                        <div>
                                                            <label className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                                                <input className="relative mr-3" type="checkbox" name="can_create" checked={datas?.can_create}  onChange={event => handleChangeRole(_index, event)} />
                                                                <span>Create</span>
                                                            </label>
                                                        </div>
                                                    </td>


                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                                        <div>
                                                            <label className="flex cursor-pointer select-none items-center">
                                                                <input className="relative mr-3" type="checkbox" name="can_update" checked={datas?.can_update}  onChange={event => handleChangeRole(_index, event)}/>
                                                                <span>Update</span>
                                                            </label>
                                                        </div>
                                                    </td>


                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                                        <div>
                                                            <label className="flex cursor-pointer select-none items-center">
                                                                <input className="relative mr-3" type="checkbox" name="can_delete" checked={datas?.can_delete}  onChange={event => handleChangeRole(_index, event)} />
                                                                <span>Delete</span>
                                                            </label> 
                                                        </div>
                                                    </td>


                                                    <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                                                        <div>
                                                            <label className="form-check form-check-custom form-check-solid">
                                                                <input className="relative mr-3" type="checkbox" name="can_other" checked={datas?.can_other}  onChange={event => handleChangeRole(_index, event)} />
                                                                <span className="form-check-label">Export</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </Fragment> 
                                            ))}
                                        
                                        </tbody>
                                    </table>
                                </div>
            

              <div className='flex w-full justify-end my-7 gap-3'>
                <Link to="/role" className="flex w-full md:w-3/12 justify-center rounded border border-primary px-16 py-3 font-medium text-primary">
                    Kembali
                </Link>
                  <button type='submit' className='flex w-full md:w-3/12 justify-center rounded border border-gray-200 px-16 py-3 bg-primary p-3 font-medium text-gray'>
                    Simpan
                  </button>
              </div>
            </div>
          </div>
        </form>
  )
}
