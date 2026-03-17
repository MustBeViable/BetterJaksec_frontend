import { useContext, useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAttendanceHook from "../hooks/AttendanceHook";
import { UserContext } from "../contexts/UserContext";

export default function QRScanner() {
  const { t } = useTranslation("common");
  const { postAttendance } = useAttendanceHook();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    if (scanned) return;

    const scanner = new Html5QrcodeScanner(
      "scanner",
      { fps: 10, qrbox: 250 },
      false,
    );

    const onScanSuccess = async (decodedText) => {
      const parts = decodedText.split("/");
      const lessonId = parts[parts.length - 1];

      const reqBody = { studentId: user.id, lessonId, present: true };
      const success = await postAttendance(user.id, reqBody);
      scanner.clear().catch((err) => console.error(err));
      if (success) {
        setScanResult(t("attendanceRecordedSuccessfully"));
        setScanned(true);
      } else {
        setScanResult(t("failedToRecordAttendance"));
        setScanned(true);
      }
    };

    scanner.render(onScanSuccess, (error) => console.warn(error));

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [user, postAttendance, scanned, t]);

  if (scanned) {
    return (
      <div className="scanner-result">
        <p>{scanResult}</p>
        <button className="btn btn--primary" onClick={() => navigate("/")}>
          {t("goBack")}
        </button>
      </div>
    );
  }

  return <div id="scanner"></div>;
}
