
import  { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

type Props = {
  onDetected: (code: string) => void;
};

export default function BarcodeScanner({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 追加：直前のバーコードを保持
  const lastCodeRef = useRef<string | null>(null);

  // 効果音（もし使っているなら）
  const beepSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepSound.current = new Audio("/beep.mp3");

    const reader = new BrowserMultiFormatReader();
    let controls: any;

    (async () => {
      controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result , error , controls) => {
          if (result) {
            const code = result.getText();

            // ★ ここで連続読み取りを防止
            if (code === lastCodeRef.current) {
              return; // 同じなら無視
            }

            lastCodeRef.current = code; // 更新

            // 効果音
            beepSound.current?.play();

            onDetected(code);
          }
        }
      );
    })();

    return () => {
      if (controls) controls.stop();
    };
  }, [onDetected]);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", border: "1px solid #ccc" }}
      />
    </div>
  );
}
