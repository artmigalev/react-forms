import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/utils/Button";
import { useState } from "react";
import { Portal } from "@/components/Portal/Portal";
import { Modal } from "@/components/utils/modal/ModalBase";

export const HomePage = (): React.JSX.Element => {
  const [isShow, setShow] = useState(false);

  const closeModal = () => setShow(false);

  return (
    <div className="home w-[100%] h-[100%] flex justify-center items-center">
      {isShow && (
        <Portal>
          <Modal fnClose={closeModal} isShow={isShow}>
            <p>hello</p>
          </Modal>
        </Portal>
      )}
      <ButtonContainer>
        <Button onClickModal={() => setShow(true)} text="first modal" />
        <Button onClickModal={() => setShow(true)} text="second modal" />
      </ButtonContainer>
    </div>
  );
};
