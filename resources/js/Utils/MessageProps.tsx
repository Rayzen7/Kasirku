import { useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MessageProps = () => {
  const { props } = usePage<any>();

  useEffect(() => {
    if (props?.success) {
      toast.success(props.success, {
        theme: 'colored',
        autoClose: 2000,
      });

      setTimeout(() => {
        router.visit(props?.redirect);
      }, 3000);
    }

    if (props?.message) {
      Swal.fire({
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        title: "Tunggu Sebentar...",
        timer: 1000,
        timerProgressBar: true
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: props?.message,
          confirmButtonText: 'Oke',
          confirmButtonColor: 'green'
        }).then(() => {
          router.visit(props?.redirect);
        });
      });
    }

    if (props?.error) {
      toast.error(props.error, {
        theme: 'colored',
        autoClose: 2000,
      });

      setTimeout(() => {
        router.visit(props?.redirect);
      }, 3000);
    }
  }, [props]);
};

export default MessageProps;
