import { useModalState } from "@shared/hooks/useModalState";
import { ReactNode, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Popup } from "./Popup";

interface GalleryProps {
  children?: (openImage: (path: string) => void) => ReactNode;
}

export const Gallery = ({ children }: GalleryProps) => {
  const [isOpen, onOpen, onClose] = useModalState();
  const [image, setImage] = useState<string>();
  const [width, setWidth] = useState<number>();
  const [heigth, setHeight] = useState<number>();

  const openImage = (path: string) => {
    onOpen();
    setImage(path);
  };

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => {
        setHeight(height);
        setWidth(width);
      });
    }
  }, [image]);

  const getBlockSize = (): { width: number; heigth: number } => {
    if (!width || !heigth) return { heigth: 0, width: 0 };
    let aspectRatio = width / heigth;
    const windowHeight = Dimensions.get("screen").height;
    const windowWidth = Dimensions.get("screen").width;
    if (heigth > windowHeight || width > windowWidth) {
      return { width: windowWidth, heigth: windowWidth * aspectRatio };
    }

    return { heigth, width };
  };

  return (
    <>
      <Popup closePopup={onClose} isOpen={isOpen} closeStyles={styles.close}>
        <View style={[styles.modal, getBlockSize()]}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>
      </Popup>
      {children?.(openImage)}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 30,
  },
  close: {
    top: -5,
    right: 7,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
