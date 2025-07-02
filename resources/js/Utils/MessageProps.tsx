import { useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

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

    if (props?.error) {
      toast.error(props.error, {
        theme: 'colored',
        autoClose: 2000,
      });
    }
  }, [props]);
};

export default MessageProps;
