import React, { useState } from "react";
import Modal from "../components/shared/Modal";
import { toast } from "react-toastify";

export const Toast = {};
let count = 0;

const initialState = (props) => ({
  id: ++count + "",
  isOpen: true,
  type: "",
  ...props,
});

export default function useToastService(config) {
  const transitionTime = 0.4;

  Toast.success = (msg = "Success!") =>
    toast.success(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000,
    });
  Toast.error = (msg = "An error occured") =>
    toast.error(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000,
    });
  Toast.warn = (msg = "Watch out!") =>
    toast.warn(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000,
    });
  Toast.load = (msg = "Loading...") =>
    toast.loading(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000,
    });
  Toast.endLoader = (loaderInstance) => toast.dismiss(loaderInstance);

  const [stack, setStack] = useState([]);

  Toast.confirm = (msg = "Continue?") => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    setStack([
      ...stack,
      initialState({ type: "confirm", message: msg, resolve, reject }),
    ]);
    return promise;
  };

  Toast.prompt = (comp, props) => {
    if (comp) {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      setStack([
        ...stack,
        initialState({
          type: "prompt",
          Body: { Component: comp, props },
          resolve,
          reject,
        }),
      ]);
      return promise;
    }
    return;
  };

  const closeModal = (id) => {
    const modalItem = stack.find((modal) => modal.id === id);
    modalItem.isOpen = false;
    setStack([...stack]);

    setTimeout(() => {
      setStack(stack.filter((modal) => modal.id !== id));
      modalItem.reject();
    }, transitionTime);
  };

  return [
    Toast,
    [
      <div className="strl-toast-container">
        {stack.map((ModalItem) => (
          <Modal
            isOpen={ModalItem.isOpen}
            onClose={() => closeModal(ModalItem.id)}
            transitionTime={transitionTime}
            key={ModalItem.id}
          >
            {ModalItem.type === "confirm" && (
              <>
                <div className="text-center font-semibold pb-5">
                  {ModalItem.message}
                </div>
                <div className="flex justify-end">
                  <button
                    className="button button-primary mr-2 w-20"
                    onClick={() => {
                      ModalItem.resolve(true);
                      closeModal(ModalItem.id);
                    }}
                  >
                    OK
                  </button>
                  <button
                    className="button w-20"
                    onClick={() => {
                      ModalItem.resolve(false);
                      closeModal(ModalItem.id);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
            {ModalItem.type === "prompt" && (
              <>
                <div className="text-center font-semibold pb-5">
                  <ModalItem.Body.Component
                    {...ModalItem.Body.props}
                    resolveFn={(...args) => {
                      ModalItem.resolve(...args);
                      closeModal(ModalItem.id);
                    }}
                    rejectFn={(...args) => {
                      ModalItem.reject(...args);
                      closeModal(ModalItem.id);
                    }}
                  />
                </div>
              </>
            )}
          </Modal>
        ))}
      </div>,
    ],
  ];
}
