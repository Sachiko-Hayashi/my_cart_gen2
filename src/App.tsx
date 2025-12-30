
import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

function App() {
  const [codes, setCodes] = useState<string[]>([]);

  const handleDetected = (code: string) => {
    setCodes((prev) => [...prev, code]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>バーコード読み取り</h2>

      <BarcodeScanner onDetected={handleDetected} />

      <h3>読み取ったコード</h3>
      <ul>
        {codes.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
