import { useEffect, useState } from "react";
import * as api from '../../utils/Api';


export default function ViewKabupaten({id_kejadian, kab, kec}: string | boolean | any) {
    const[lokasi, setLokasi] = useState<Array<any>>([])

    useEffect(() => {
        const Reload = async () => {
          const response = await api.fetchLokasiByIdKejadian(id_kejadian);
          setLokasi(response?.data);
        };
        Reload();
    }, [id_kejadian]);

  return (
    <>
      {kab && (
       <span>{lokasi[0]?.kabupaten?.name}, </span>
      )}

      {kec && (
        lokasi.map((loc, index) => (
          <span key={index}> Kec. {loc?.kecamatan?.name}, Desa {loc?.kelurahan?.name};  </span>
        ))
      )}
    </>
  )
}
