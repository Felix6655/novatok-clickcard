"use client";
import { useEffect, useState } from "react";
import { QRCode } from "qrcode.react";

export default function CardQRCode() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  if (!url) return null;

  return (
    <div className="flex justify-center">
      <QRCode value={url} size={128} />
    </div>
  );
}
