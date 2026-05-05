import { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { NotificationContext } from "../function/notification";

function GlobalToast() {
  const context = useContext(NotificationContext);

  if (!context) return null;

  const { notification, hideToast } = context;

  const bgColor =
    notification.type === "success"
      ? "success"
      : notification.type === "error"
        ? "danger"
        : notification.type === "warning"
          ? "warning"
          : notification.type === "primary"
            ? "primary"
            : "secondary";

  return (
    <ToastContainer
      className="p-3"
      style={{
        zIndex: 9999,
      }}
    >

      <Toast
        bg={bgColor}
        show={notification.show}
        onClose={hideToast}
        delay={3000}
        autohide
        className="shadow"
      >
        <Toast.Body className="text-white text-center">
          {notification.message}
        </Toast.Body>
      </Toast>

      <style>
        {`
  .toast-container {
    position: fixed !important;
  }

  /* Desktop - bottom right (safe zone) */
  @media (min-width: 768px) {
    .toast-container {
      top: auto !important;
      bottom: 20px !important;
      right: 20px !important;
      left: auto !important;
    }
  }

  /* Mobile - bottom center */
  @media (max-width: 767px) {
    .toast-container {
      bottom: 20px !important;
      left: 50% !important;
      transform: translateX(-50%);
      right: auto !important;
      top: auto !important;
    }
  }
`}
      </style>
    </ToastContainer>
  );
}

export default GlobalToast;