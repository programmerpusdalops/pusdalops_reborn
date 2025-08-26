import { useEffect } from 'react'
import * as api from '../Api';

interface Props {
  setData: [] | any;
  store: {} | any
}

function Master({setData, store}: Props) {

    const role_id = store?.role_id

    useEffect(() => {
        const Requests = async () => {
        const response = await api.fetchRoleAccessById(role_id)
        setData(response?.data);
        }
        Requests();
    }, [role_id]);

  return null
}

export default Master