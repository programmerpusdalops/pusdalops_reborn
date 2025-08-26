import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as api from '../../utils/Api';

interface Props {
  kejadian: [] | any
}

export default function ExportBencana({kejadian}: Props) {

  let hasil: any[] = []
    kejadian.map(async (val: { id_kejadian: any; jenis_kejadian: { nama: any; }; tanggal: any; kronologis: any; titik_lokasi: any; status_ditangani: any; }) => {
      const response =  await api.fetchLokasiByIdKejadian(val?.id_kejadian);

      const data = response?.data

      hasil.push({
        "Kabupaten": data[0]?.kabupaten?.name,
        "Kecamtan": data[0]?.kecamatan?.name,
        "kelurahan": data[0]?.kelurahan?.name,
        "Jenis Kejadian": val?.jenis_kejadian?.nama,
        "Tanggal": val?.tanggal,
        "Kronologis": val?.kronologis,
        "Titik Lokasi": val?.titik_lokasi,
        "Status Ditangani": val?.status_ditangani
      })
    })

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(hasil);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data,"Data-Bencana" + fileExtension);
  };

  return (
    <button
        onClick={() => exportToCSV()}
        className="flex w-full xl:w-auto justify-center rounded border border-success px-5 p-2 font-medium text-success"
    >
    Export
    </button>
  )
}
