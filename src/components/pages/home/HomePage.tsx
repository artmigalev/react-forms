import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/utils/Button";
import { useState } from "react";
import { Modal } from "@/components/Portal/Portal";

export const HomePage = (): React.JSX.Element => {
  const [isShow, setShow] = useState(false);

  return (
    <div className="home w-[100%] h-[100%] flex justify-center items-center">
      {isShow && (
        <Modal>
          <p>{"hello"}</p>
        </Modal>
      )}
      <ButtonContainer>
        <Button onClickModal={() => setShow(true)} text="first modal" />
        <Button onClickModal={() => setShow(true)} text="second modal" />
      </ButtonContainer>
    </div>
  );
};
