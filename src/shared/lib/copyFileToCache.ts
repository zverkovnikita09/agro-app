import { cacheDirectory, copyAsync } from "expo-file-system";

export const copyFileToCache = async (uri: string)=>  {
  const fileName = uri.split('/').pop();
  const newUri = `${cacheDirectory}${fileName}`;

  await copyAsync({
    from: uri,
    to: newUri
  })

  return newUri;
}