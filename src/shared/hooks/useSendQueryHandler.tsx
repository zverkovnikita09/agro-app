import { addNotification, NotificationType } from "@entities/Notifications";
import { useDispatch } from "react-redux";

interface SendQueryHandlerArgs {
  successMessage?: string;
  errorMessage?: string;
}

export const SendQueryHandler = ({
  successMessage,
  errorMessage,
}: SendQueryHandlerArgs) => {
  const dispatch = useDispatch();

  const queryFunction = async () => {
    try {
      const response = await createOrder({ order_id: id });

      if (response.error) {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            id: performance.now().toString(),
            message:
              errorMessage ??
              (response.error as any)?.data?.message ??
              "Произошла ошибка",
          })
        );
        return;
      }
      if (successMessage) {
        dispatch(
          addNotification({
            type: NotificationType.SUCCESS,
            id: performance.now().toString(),
            message: successMessage,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return queryFunction;
};
