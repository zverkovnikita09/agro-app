import { addNotification, NotificationType } from "@entities/Notifications";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface useSendQueryHandlerArgs {
  successMessage?: string;
  errorMessage?: string;
}

export const useSendQueryHandler = (args?: useSendQueryHandlerArgs) => {
  const dispatch = useDispatch();

  const queryFunction = async <
    T extends Promise<{ data?: any; error?: any }>[]
  >(
    promises: T
  ) => {
    let error = null;
    for await (const promise of promises) {
      try {
        if (promise?.error) {
          dispatch(
            addNotification({
              type: NotificationType.ERROR,
              id: performance.now().toString(),
              message:
                args?.errorMessage ??
                (promise.error as any)?.data?.message ??
                "Произошла ошибка при отправке данных",
            })
          );
          error = promise?.error;
        }
      } catch (e) {
        error = e;
      }
    }
    if (!error && args?.successMessage) {
      dispatch(
        addNotification({
          type: NotificationType.SUCCESS,
          id: performance.now().toString(),
          message: args.successMessage,
        })
      );
    }
    return error;
  };

  return queryFunction;
};
