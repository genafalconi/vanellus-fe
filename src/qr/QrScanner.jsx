import { useRef, useState, useEffect } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { VALIDATE_QR } from "../service/ticket.requests";
import "./qrSection.scss";
import QrScanner from "qr-scanner";

export default function QrSection() {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");
  const [validationFired, setValidationFired] = useState(false);

  // Success callback: fires validation only once.
  const onScanSuccess = async (result) => {
    console.log(result);
    if (validationFired) return; // Prevent multiple validations
    if (result && result.data) {
      setValidationFired(true);
      const validation = await VALIDATE_QR(result.data);
      console.log(validation);
      setScannedResult(result.data);
    }
  };

  // Fail callback.
  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl} className="video-box"></video>
      <div ref={qrBoxEl} className="qr-box">
        {!videoEl?.current && (
          <img
            src="/static/images/icons/scan_qr1.svg"
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        )}
      </div>

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
}
