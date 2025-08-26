import { useEffect, useState } from "react"
import * as api from '../../utils/Api';
import { Icon } from '@iconify/react';

export default function SelectKabupaten({onChange, value, label}: string | any ) {
    const[data, setData] = useState<Array<any>>([])

    useEffect(() => {
        const Lokasi = async () => {
            const response = await api.fetchLokasiKabupaten()
            setData(response.data);
        }
        Lokasi();
    }, []);

    let title = ""
    data.filter((val) => (val?.id === value))
        .map((val) => {
        return title = val?.name
    })
                   

  return (
    <div className="relative z-20 bg-transparent dark:bg-form-input">
      <select name="kab" onChange={onChange} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
        <option value={value}>{value ? title : label}</option>
        {data.map((val) => (
          <option key={val?.id} value={val?.id}>{val?.name}</option>
        ))}
      </select>
      <Icon
        icon="mingcute:down-line"
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 fill-current w-5 h-5"
      />
    </div>
  )
}
