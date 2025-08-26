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
