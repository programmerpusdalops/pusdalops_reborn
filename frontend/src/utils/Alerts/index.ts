import Swal from 'sweetalert2'

export const Success = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil",
        showConfirmButton: false,
        timer: 1500
    });
}

export const Warning = () => {
  Swal.fire({
    position: "top-end",
    icon: "warning",
    title: "Perhatian",
    showConfirmButton: false,
    timer: 1500
  });
}

export const Error = () => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "Gagal",
    showConfirmButton: false,
    timer: 1500
  });
}


/**
 * Konfirmasi sebelum melakukan aksi penting (misal hapus data)
 * @returns Promise<boolean> -> true jika user menekan "Ya", false jika "Batal"
 */
export const Confirm = async (pesan = "Apakah Anda yakin ingin melanjutkan proses ini?") => {
  const result = await Swal.fire({
    title: "Konfirmasi",
    text: pesan,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, lanjutkan",
    cancelButtonText: "Batal",
  });

  return result.isConfirmed; // true jika user klik "Ya"
};
