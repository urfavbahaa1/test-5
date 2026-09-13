import React, { useState, useEffect, useRef } from "react";

/* هذا الملف يحمّل بشكل كسول (lazy) من PrestigeRent.jsx — خلفية الموقع
   العامة وسكشن الإنارة السينمائي، وكلاهما يعتمد على نفس الصورة الأصلية
   وغير مطلوبين في أول رسم للصفحة، ففصلهما يجعل الـHero يظهر أسرع. ---- */

// الصورة الأصلية التي أرسلها صاحب المشروع — تُستخدم كما هي حرفيًا، بدون
// أي توليد أو رسم بالذكاء الاصطناعي أو تعديل للسيارات نفسها. يشترك فيها
// كل من الخلفية العامة وسكشن الإنارة السينمائي أسفله.
const HEADLIGHTS_PHOTO_IMG = "data:image/jpeg;base64,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";

/* ----------------------------------------------------------------------
   SITE-WIDE AMBIENT BACKGROUND — uses the real reference wallpaper photo
   (Audi / Mercedes / BMW marks with the glowing teal light-ray fan)
   directly as the background image, instead of a hand-drawn SVG
   recreation. Fixed behind the whole site (not just one section), so it
   stays visible the entire time the person is browsing, not only during
   the hero. Reuses the same "ignite once, then breathe forever"
   automation the old background used: a gradual rise-in, then an
   endless slow rise/fall of the glow — applied to the photo itself via
   opacity/brightness. ---------------------------------------------------
------------------------------------------------------------------------ */
/* ---------------------- CINEMATIC HEADLIGHTS SECTION ----------------------
   سكشن جديد ومستقل أسفل الـHero مباشرة. يستخدم الصورة الأصلية التي أرسلها
   صاحب المشروع كما هي (بدون أي توليد أو تعديل للسيارات نفسها) — كل التأثير
   هنا عبارة عن طبقات إضاءة/تعتيم فوق الصورة، مرتبطة بتقدّم الـscroll فعليًا
   (وليس بتوقيت ثابت)، عبر custom properties تُحدَّث داخل requestAnimationFrame
   حتى لا يسبب أي Lag أثناء التمرير. --------------------------------------- */

// منحنى تدرّج الإضاءة حسب طلب المشروع: عتمة كاملة عند 0%، بصيص بسيط عند 20%،
// ثم إضاءة تدريجية حتى الاكتمال عند 100% — بدون أن تضيء الصورة دفعة واحدة.
const HEADLIGHT_CURVE = [
  [0, 0],
  [0.2, 0.08],
  [0.4, 0.38],
  [0.6, 0.7],
  [0.8, 0.9],
  [1, 1],
];
function curveValue(points, p) {
  if (p <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (p <= x1) {
      const t = (p - x0) / (x1 - x0 || 1);
      return y0 + (y1 - y0) * t;
    }
  }
  return points[points.length - 1][1];
}

// إحداثيات تقريبية (% من أبعاد الصورة الأصلية) لمركز كل مصباح أمامي —
// BMW يسار/يمين ثم Audi يسار/يمين — مقاسة يدويًا من نفس الصورة المرسلة.
const HEADLIGHT_SPOTS = [
  { key: "bmw-l", x: 9.7, y: 48.2, rx: 10, ry: 15 },
  { key: "bmw-r", x: 40.3, y: 48.2, rx: 10, ry: 15 },
  { key: "audi-l", x: 63.2, y: 47, rx: 9, ry: 13 },
  { key: "audi-r", x: 94.4, y: 45.5, rx: 9, ry: 13 },
];
// منطقة أضيق داخل كل مصباح (الحافة الخارجية) لضوء الـhazard الكهرماني —
// أصغر من منطقة الهيدلايت نفسها حتى لا يغطيها بالكامل.
const HAZARD_SPOTS = [
  { key: "bmw-l", x: 6, y: 51.5, rx: 4.4, ry: 5.5 },
  { key: "bmw-r", x: 44, y: 51.5, rx: 4.4, ry: 5.5 },
  { key: "audi-l", x: 59.5, y: 50, rx: 3.6, ry: 4.8 },
  { key: "audi-r", x: 98, y: 48, rx: 3.6, ry: 4.8 },
];

function CinematicLightsSection() {
  const sectionRef = useRef(null);
  const [hazardOn, setHazardOn] = useState(false);
  const settledRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    let ticking = false;
    let settledTimer = null;

    const compute = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 مع بداية دخول السكشن من أسفل الشاشة، 1 عند وصوله لأعلى الشاشة تقريبًا.
      const raw = (vh - rect.top) / (vh + rect.height * 0.55);
      const p = Math.max(0, Math.min(1, raw));

      const glow = curveValue(HEADLIGHT_CURVE, p);
      const darkness = 1 - glow;
      const parallax = (p - 0.5) * 24; // حركة parallax خفيفة جدًا فقط

      el.style.setProperty("--lp", p.toFixed(4));
      el.style.setProperty("--glow-op", glow.toFixed(4));
      el.style.setProperty("--dark-op", darkness.toFixed(4));
      el.style.setProperty("--parallax-y", parallax.toFixed(2) + "px");

      if (!settledRef.current && p >= 0.97) {
        settledRef.current = true;
        settledTimer = setTimeout(() => setHazardOn(true), 550);
      }
    };

    const onScroll = () => {
      // تخطَّ العملية بالكامل إن كان السكشن بعيدًا جدًا عن الشاشة — لا حاجة
      // لقراءة getBoundingClientRect ولا لتحديث أي custom property هنا.
      if (!visibleRef.current) return;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (settledTimer) clearTimeout(settledTimer);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // هامش سخي (نصف شاشة تقريبًا) حتى يبدأ التأثير قبل الوصول الفعلي بقليل
    // ولا ينقطع فجأة عند الحافة، لكن يتوقف تمامًا حين يبتعد السكشن كثيرًا.
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "50% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`cinematic-lights${hazardOn ? " hazard-on" : ""}`}>
      <div className="cl-media">
        <img src={HEADLIGHTS_PHOTO_IMG} alt="سيارات BMW وAudi" className="cl-photo" loading="lazy" decoding="async" />
        <div className="cl-haze" />
        <div className="cl-ground-reflection" />
        {HEADLIGHT_SPOTS.map((s) => (
          <span
            key={s.key}
            className="cl-headlight-glow"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.rx * 2}%`, height: `${s.ry * 2}%` }}
          />
        ))}
        {HAZARD_SPOTS.map((s) => (
          <span
            key={s.key}
            className="cl-hazard-glow"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.rx * 2}%`, height: `${s.ry * 2}%` }}
          />
        ))}
        <div className="cl-dark-overlay" />
      </div>
    </section>
  );
}

/* ---------------- DASHBOARD AMBIENT BACKGROUND ----------------
   نفس فكرة السكشن السينمائي أعلاه (نفس الصورة، نفس منحنى الإضاءة، نفس
   توهج المصابيح وأضواء الـhazard)، لكن بدل ربط التقدّم بالـscroll هنا
   التقدّم مرتبط بالوقت — يبدأ تلقائيًا فور دخول لوحة التحكم، يصل للإضاءة
   الكاملة خلال ثوانٍ معدودة، ثم يشعل الـhazard تلقائيًا ويبقى وامضًا،
   كخلفية سفلية ثابتة خلف كل صفحات اللوحة (بديل عن حرف "P" الكبير السابق).
   لا يوجد أي استماع لأحداث scroll هنا إطلاقًا. */
function DashboardAmbientLights() {
  const rootRef = useRef(null);
  const [hazardOn, setHazardOn] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // مدة الإشعال التدريجي التلقائي (بالمللي ثانية).
    const DURATION = 2600;
    const start =
      typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
    let raf = null;
    let hazardTimer = null;

    const tick = (now) => {
      const elapsed = (now || Date.now()) - start;
      const p = Math.max(0, Math.min(1, elapsed / DURATION));
      const glow = curveValue(HEADLIGHT_CURVE, p);
      const darkness = 1 - glow;

      el.style.setProperty("--lp", p.toFixed(4));
      el.style.setProperty("--glow-op", glow.toFixed(4));
      el.style.setProperty("--dark-op", darkness.toFixed(4));

      if (p < 1) {
        raf = window.requestAnimationFrame(tick);
      } else if (!hazardTimer) {
        // نفس مهلة الاستقرار المستخدمة في السكشن السينمائي قبل شعول الهازارد.
        hazardTimer = setTimeout(() => setHazardOn(true), 550);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (hazardTimer) clearTimeout(hazardTimer);
    };
  }, []);

  return (
    <div ref={rootRef} className={`dashboard-ambient${hazardOn ? " hazard-on" : ""}`} aria-hidden="true">
      <div className="cl-media">
        <img src={HEADLIGHTS_PHOTO_IMG} alt="" className="cl-photo" loading="eager" decoding="async" />
        <div className="cl-haze" />
        <div className="cl-ground-reflection" />
        {HEADLIGHT_SPOTS.map((s) => (
          <span
            key={s.key}
            className="cl-headlight-glow"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.rx * 2}%`, height: `${s.ry * 2}%` }}
          />
        ))}
        {HAZARD_SPOTS.map((s) => (
          <span
            key={s.key}
            className="cl-hazard-glow"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.rx * 2}%`, height: `${s.ry * 2}%` }}
          />
        ))}
        <div className="cl-dark-overlay" />
      </div>
    </div>
  );
}

export { HEADLIGHTS_PHOTO_IMG, CinematicLightsSection, DashboardAmbientLights };
