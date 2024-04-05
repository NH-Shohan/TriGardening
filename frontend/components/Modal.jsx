import { AnimatePresence, motion } from "framer-motion";

const Overlay = ({ children }) => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-[2px] flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const ModalContainer = ({ children }) => (
  <motion.div
    className="z-[100] bg-white absolute h-[660px] overflow-y-auto top-[5%] left-[50&] rounded-lg shadow p-4"
    initial={{ y: "-50%" }}
    animate={{ y: "10%" }}
    exit={{ y: "-50%" }}
    transition={{ type: "spring" }}
  >
    {children}
  </motion.div>
);

const CloseButton = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="w-3 h-3 absolute top-4 right-4 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.39 20.39"
  >
    <title>close</title>
    <line
      x1="19.39"
      y1="19.39"
      x2="1"
      y2="1"
      fill="none"
      stroke="#007700"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <line
      x1="1"
      y1="19.39"
      x2="19.39"
      y2="1"
      fill="none"
      stroke="#007700"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);

const Modal = ({ handleClose, children, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <Overlay>
        <ModalContainer>
          <CloseButton onClick={handleClose} />
          {children}
        </ModalContainer>
      </Overlay>
    )}
  </AnimatePresence>
);

export default Modal;
