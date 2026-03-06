import QRCode from "react-qr-code";

export default function QRGenerator({value}) {
  const url = `${window.location.protocol}//${window.location.host}/readqr/${value.lessonId}`;
  return (
    <QRCode
      value={url}
      size={256}
      bgColor="transparent"
      fgColor="#000000"
    />
  );
}