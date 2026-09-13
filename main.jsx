import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

// تحميل كسول (code-splitting): كل صفحة تُبنى في حزمة JS منفصلة، فزائر
// موقع الزبائن لا يُحمّل أبدًا كود لوحة التحكم (والعكس صحيح) — هذا يقلّص
// حجم أول تحميل بشكل كبير ويجعل التصفح أسرع وأكثر سلاسة على الجوال.
const PrestigeRent = lazy(() => import("./PrestigeRent.jsx"));
const OfficeDashboard = lazy(() => import("./OfficeDashboard.jsx"));

// موقع واحد يحتوي صفحتين: الرئيسية للزبائن، و /ugly للوحة تحكم الوكالة.
const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/ugly"
  || window.location.pathname.startsWith("/ugly/");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {isAdmin ? <OfficeDashboard /> : <PrestigeRent />}
    </Suspense>
  </React.StrictMode>
);
