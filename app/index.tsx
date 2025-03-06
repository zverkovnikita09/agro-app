import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, removeToken } from "@entities/Auth";

import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useEffect } from "react";
import { Redirect, router, useRootNavigationState } from "expo-router";
import { Routes } from "@shared/lib/constants";
import { useGetUserDataQuery } from "@entities/User/model/User.api";

export default function Main() {
  const token = useSelector(AuthSelectors.selectToken);
  const dispatch = useDispatch();
  const { isLoading, isError, error, refetch } = useGetUserDataQuery();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (isLoading) return;
    if (!token || isError) {
      dispatch(removeToken());
      router.replace(Routes.login);
    }
  }, [token, isError]);

  // useEffect(() => {
  //   if (token) refetch();
  // }, [token]);

  if (isLoading) return <LoadingBlock />;

  return <Redirect href={Routes.main} />;
}
