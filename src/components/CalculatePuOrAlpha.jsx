import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";

function CalculatePuOrAlpha() {
  const [inputs, setInputs] = useState({
    pu: "",
    alpha: "",
    fy: "",
    Es: "",
    fc: "",
    b: "",
    h: "",
    d: "",
    dPrime: "",
    ghotrF: "",
    nf: "",
    ghotrK: "",
    nk: "",
    epsy: "",
    spsy: "",
  });
  const [results, setResults] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false); // State برای وضعیت محاسبه

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateInputs = async () => {
    const requiredFields = [
      "fy",
      "Es",
      "fc",
      "b",
      "h",
      "d",
      "dPrime",
      "ghotrF",
      "nf",
      "ghotrK",
      "nk",
      "pu",
      "alpha",
      "epsy",
      "spsy",
    ];

    const allFilled = requiredFields.every(
      (field) => inputs[field] !== null && inputs[field] !== ""
    );

    if (!allFilled) {
      setErrorMessage("لطفاً تمام فیلدهای ضروری را پر کنید.");
      setTimeout(() => setErrorMessage(""), 2000);
      return false;
    }
    return true;
  };

  const solveQuadratic = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      console.error("No real roots for quadratic equation");
      return [];
    }
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [root1, root2];
  };

  const calculate = async () => {
    const isValid = await validateInputs();
    if (!isValid) return;

    setIsCalculating(true); // نشان دادن پیغام در حال محاسبه

    const parsedInputs = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)]),
    );

    const {
      fy,
      Es,
      fc,
      b,
      h,
      d,
      dPrime,
      ghotrF,
      nf,
      ghotrK,
      nk,
      alpha,
      pu,
      epsy,
      spsy,
    } = parsedInputs;

    if (alpha <= 0 || pu <= 0 || fc <= 0 || b <= 0 || h <= 0 || d <= 0) {
      setErrorMessage("ورودی‌ها نامعتبر هستند. لطفاً مقادیر را بررسی کنید.");
      setIsCalculating(false); // مخفی کردن پیغام در حال محاسبه
      return;
    }

    // محاسبات اولیه
    const k1 = 0.85 - 0.05 * ((fc - 280) / 70);
    const cb = (6300 * d) / (6300 + fy);
    const ab = k1 * cb;
    const epsS = 0.003 * ((cb - dPrime) / cb);
    const f_s = epsS > epsy ? fy : Es * epsS;
    const epss = 0.003 * ((d - cb) / cb);
    const fs = epss > epsy ? fy : Es * epss;

    const A_s = Math.PI * Math.pow(ghotrF / 2, 2) * nf;
    const As = Math.PI * Math.pow(ghotrK / 2, 2) * nk;

    const p0 = 0.85 * fc * (b * h - As - A_s) + fy * (As + A_s);
    const pb = 0.085 * fc * b * ab + A_s * f_s - As * f_s;

    const sxbar =
      0.85 * fc * (b * h - As - A_s) * (d - h / 2) + A_s * fy * (d - dPrime);
    const mxbar = 0.85 * fc * (b * h - As - A_s) + (As + A_s) * fy;
    const xbar = sxbar / mxbar;

    const a = (pu / (0.85 * fc * b)) * alpha;
    const c = a / k1;

    const eps_s = 0.003 * ((c - dPrime) / c);

    let mu = null;
    if (eps_s > 0 && eps_s > epsy) {
      mu =
        0.85 * fc * b * a * (d - a / 2 - xbar) +
        A_s * fy * (d - dPrime - xbar) +
        As * fy * xbar;
    } else {
      const moadele_A = 0.85 * fc * b;
      const moadele_B = 0.003 * A_s * Es - As * fy - pu;
      const moadele_C = -0.003 * As * Es * k1 * dPrime;

      const roots = solveQuadratic(moadele_A, moadele_B, moadele_C);

      // بررسی ریشه‌ها و انتخاب معتبرترین ریشه
      let a_tot = roots.find((root) => root > h / 10 && root < (9 * h) / 10);

      // اگر هیچ ریشه‌ای پیدا نشد، مقدار پیش‌فرض را به a_tot نسبت بده
      if (a_tot === undefined) {
        console.warn("هیچ ریشه‌ای پیدا نشد، مقدار پیش‌فرض به a_tot اختصاص داده شد.");
        a_tot = h / 2; // یا مقدار مناسب دیگر برای a_tot
      }

      if (a_tot) {
        const c_new = a_tot / k1;
        const eps_s_new = 0.003 * ((c_new - dPrime) / c_new);
        if (eps_s_new < 0 && eps_s_new < spsy) {
          mu =
            0.85 * fc * b * a_tot * (d - a_tot / 2 - xbar) +
            A_s * Es * eps_s_new * (d - dPrime - xbar) +
            As * fy * xbar;
        }
      }
    }

    if (mu === null) {
      mu = 15151150;
    }

    setResults({
      k1,
      cb,
      ab,
      epsS,
      f_s,
      As,
      A_s,
      fs,
      epss,
      pb,
      p0,
      xbar,
      a,
      c,
      eps_s,
      mu,
      spsy,
    });

    // نمودار به‌صورت بهینه‌تری محاسبه می‌شود
    const graphPoints = [];
    for (let muValue = 0; muValue <= Math.min(p0, 10000); muValue += 0.1) {
      const puValue = (muValue / Math.max(alpha, 0.01)) * 0.85 * fc * b;
      graphPoints.push({ mu: muValue, pu: puValue });
    }

    setGraphData(graphPoints);

    setIsCalculating(false); // مخفی کردن پیغام در حال محاسبه پس از پایان محاسبات
  };

  return (
    <div className="container my-6 mx-auto p-8 bg-[#F2613F] rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">محاسبات سازه‌ای</h1>

      <div className="grid grid-cols-2 gap-6">
        {[{ field: "pu", label: "مقدار pu" }, { field: "alpha", label: "مقدار alpha" }].map(
          ({ field, label }) => (
            <div key={field} className="flex flex-col">
              <label className="block font-bold mb-2 text-black text-2xl">{label}:</label>
              <input
                type="number"
                name={field}
                value={inputs[field]}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
            </div>
          )
        )}

        {[{ field: "fy", label: "تنش تسلیم فولاد (Fy)" },
          { field: "Es", label: "مدول الاستیسیته فولاد (Es)" },
          { field: "fc", label: "مقاومت فشاری بتن (Fc)" },
          { field: "b", label: "عرض مقطع (b)" },
          { field: "h", label: "ارتفاع مقطع (h)" },
          { field: "d", label: "فاصله تا مرکز میلگرد کششی (d)" },
          { field: "dPrime", label: "فاصله تا مرکز میلگرد فشاری (d')" },
          { field: "ghotrF", label: "قطر میلگرد کششی (Φf)" },
          { field: "nf", label: "تعداد میلگرد کششی (Nf)" },
          { field: "ghotrK", label: "قطر میلگرد فشاری (Φk)" },
          { field: "nk", label: "تعداد میلگرد فشاری (Nk)" },
          { field: "epsy", label: "تنش تسلیم فولاد (εy)" },
          { field: "spsy", label: "تنش تسلیم فولاد (σsy)" }].map(({ field, label }) => (
            <div key={field} className="flex flex-col">
              <label className="block font-bold mb-2 text-black text-xl">{label}:</label>
              <input
                type="number"
                name={field}
                value={inputs[field]}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
            </div>
          ))}
      </div>

      <div className="mt-4 text-center">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md"
          onClick={calculate}
        >
          محاسبه
        </button>
      </div>

      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">
          <strong>{errorMessage}</strong>
        </div>
      )}

      {isCalculating && (
        <div className="mt-4 text-yellow-500 text-center">
          <strong>در حال محاسبه...</strong>
        </div>
      )}

      {results && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">نتایج محاسبات:</h2>
          <div className="grid grid-cols-4 gap-6">
            {Object.entries(results).map(([key, value]) => (
              <div
                key={key}
                className="bg-opacity-30 backdrop-blur-lg border-2 border-white rounded-lg p-4"
              >
                <h3 className="text-xl font-bold text-center">{key}</h3>
                <p className="text-center">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {graphData.length > 0 && (
        <div className="mt-6 flex justify-center items-center">
          <ChartComponent data={graphData} />
        </div>
      )}
    </div>
  );
}

export default CalculatePuOrAlpha;
