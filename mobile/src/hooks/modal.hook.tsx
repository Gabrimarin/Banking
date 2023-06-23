import React from "react";
import { Modal as RNModal } from "react-native";

export function useModal() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const showModal = (data: any) => {
    setData(data);
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
    setData(null);
  };
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  function Component({ children }: { children: React.ReactNode }) {
    return (
      <RNModal
        animationType="slide"
        visible={isModalVisible}
        transparent
        onRequestClose={hideModal}
      >
        {children}
      </RNModal>
    );
  }

  return {
    visible: isModalVisible,
    show: showModal,
    hide: hideModal,
    toggleModal,
    Component,
    data,
  };
}
