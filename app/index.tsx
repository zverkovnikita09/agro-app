import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, removeToken } from "@entities/Auth";

import { useGetUserDataQuery } from "@entities/User/model/User.api";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useEffect } from "react";
import { Redirect, router } from "expo-router";

export default function Main() {
  const token = useSelector(AuthSelectors.selectToken);
  const dispatch = useDispatch();
  const { isLoading, isError } = useGetUserDataQuery();

  useEffect(() => {
    if (!token || isError) {
      dispatch(removeToken());
      router.replace("/login");
    }
  }, [token, isError]);

  if (isLoading) return <LoadingBlock />;

  return <Redirect href="/main" />;
}
