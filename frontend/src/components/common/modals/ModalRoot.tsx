import { ModalType } from '../../../types/modal'

type ModalRootProps = {
  modalType: ModalType
  modalProps: unknown
}
const ModalRoot: React.FC<ModalRootProps> = ({ modalType, modalProps }) => {
  if (modalType === null) {
    return <></>
  }

  return <>모달</>
}

export default ModalRoot
