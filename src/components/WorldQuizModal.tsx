"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Modal } from "@/components/Modal";

const worldMapUrl = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
// Major countries selected for familiarity and regional balance (50 countries).
const quizCountryCodes = new Set([
  // Asia
  "CN", "IN", "JP", "KR", "ID", "PK", "BD", "SA", "IR", "TR", "TH", "VN", "PH", "IL", "SG", "MY", "AE",
  // Europe
  "RU", "GB", "FR", "DE", "IT", "ES", "NL", "CH", "PL", "UA", "SE", "GR", "PT",
  // Africa
  "EG", "ZA", "NG", "KE", "ET", "MA", "GH", "DZ",
  // North America and the Caribbean
  "US", "CA", "MX", "CU",
  // South America
  "BR", "AR", "CL", "CO", "PE", "VE",
  // Oceania
  "AU", "NZ",
]);
type CountryFeature = {
  type: "Feature";
  properties: { name?: string; "ISO3166-1-Alpha-2"?: string; "ISO3166-1-Alpha-3"?: string };
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] };
};

function countryLabel(country: CountryFeature) {
  const code = country.properties["ISO3166-1-Alpha-2"];
  if (code && code !== "-99") {
    try {
      return new Intl.DisplayNames(["ja"], { type: "region" }).of(code) ?? country.properties.name ?? "";
    } catch { /* fall through to the map's country name */ }
  }
  return country.properties.name ?? "";
}

function countryFlag(country: CountryFeature) {
  const code = country.properties["ISO3166-1-Alpha-2"];
  if (!code || !/^[A-Z]{2}$/.test(code)) return null;
  return String.fromCodePoint(...code.split("").map((letter) => 127397 + letter.charCodeAt(0)));
}

function polygonPath(rings: number[][][]) {
  return rings.map((ring) => ring.map(([longitude, latitude], index) => {
    const x = ((longitude + 180) / 360) * 1000;
    const y = ((90 - latitude) / 180) * 500;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z").join(" ");
}

function smallCountryMarker(country: CountryFeature) {
  const polygons = country.geometry.type === "Polygon"
    ? [country.geometry.coordinates as number[][][]]
    : country.geometry.coordinates as number[][][][];
  const points = polygons.flatMap((polygon) => polygon[0] ?? []);
  if (!points.length) return null;

  const xs = points.map(([longitude]) => ((longitude + 180) / 360) * 1000);
  const ys = points.map(([, latitude]) => ((90 - latitude) / 180) * 500);
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  if (width > 16 || height > 16) return null;

  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2,
  };
}

export function WorldQuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [quizCountries, setQuizCountries] = useState<CountryFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [target, setTarget] = useState<CountryFeature | null>(null);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; panX: number; panY: number } | null>(null);

  const clampPan = (nextPan: { x: number; y: number }, zoomLevel: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return nextPan;
    const scale = zoomLevel / 100;
    const maxX = (viewport.clientWidth * (scale - 1)) / 2;
    const maxY = (viewport.clientHeight * (scale - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nextPan.x)),
      y: Math.max(-maxY, Math.min(maxY, nextPan.y)),
    };
  };

  const resetMapView = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };

  const changeZoom = (amount: number) => {
    const nextZoom = Math.max(100, Math.min(200, zoom + amount));
    setZoom(nextZoom);
    setPan((currentPan) => clampPan(currentPan, nextZoom));
  };

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom === 100 || (event.target as Element).closest("button")) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setIsDragging(true);
  };

  const moveMap = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setPan(clampPan({
      x: drag.panX + event.clientX - drag.startX,
      y: drag.panY + event.clientY - drag.startY,
    }, zoom));
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
  };

  useEffect(() => {
    let active = true;
    fetch(worldMapUrl)
      .then((response) => {
        if (!response.ok) throw new Error("地図を読み込めませんでした");
        return response.json();
      })
      .then((data: { features: CountryFeature[] }) => {
        const available = data.features.filter((feature) =>
          feature.properties.name && feature.properties["ISO3166-1-Alpha-3"] !== "ATA"
        );
        const quizAvailable = available.filter((feature) =>
          quizCountryCodes.has(feature.properties["ISO3166-1-Alpha-2"] ?? "")
        );
        if (active) {
          setCountries(available);
          setQuizCountries(quizAvailable);
          setTarget((current) => current ?? quizAvailable[Math.floor(Math.random() * quizAvailable.length)] ?? null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setLoadError(true);
          setIsLoading(false);
        }
      });
    return () => { active = false; };
  }, []);

  const start = () => {
    if (quizCountries.length) setTarget(quizCountries[Math.floor(Math.random() * quizCountries.length)]);
    setIsAnswerShown(false);
    resetMapView();
    setIsOpen(true);
  };
  const next = () => {
    const choices = quizCountries.filter((country) => country !== target);
    setTarget(choices[Math.floor(Math.random() * choices.length)] ?? quizCountries[0]);
    setIsAnswerShown(false);
    resetMapView();
  };
  const targetMarker = target ? smallCountryMarker(target) : null;

  return (
    <>
      <button onClick={start} className="fixed bottom-28 right-4 hidden md:flex items-center justify-center px-4 h-10 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-blue-100" aria-label="世界地図クイズを開く">
        <span className="text-sm font-bold text-blue-600">世界地図クイズ</span>
      </button>
      {isOpen && (
        <Modal title="世界地図クイズ" onClose={() => setIsOpen(false)} maxWidthClass="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-5 items-center">
            <div>
              <p className="text-center text-gray-500 mb-3">赤く光っている国はどこ？</p>
              {loadError ? (
                <div className="min-h-[300px] flex items-center justify-center rounded-2xl bg-sky-50 p-5 text-center text-sm text-gray-500">地図を読み込めませんでした。ネットワーク接続を確認してください。</div>
              ) : isLoading ? (
                <div className="min-h-[300px] flex items-center justify-center rounded-2xl bg-sky-50 p-5 text-sm text-gray-500">世界地図を読み込んでいます…</div>
              ) : countries.length === 0 || quizCountries.length === 0 ? (
                <div className="min-h-[300px] flex items-center justify-center rounded-2xl bg-sky-50 p-5 text-center text-sm text-gray-500">国の地図データが見つかりませんでした。ページを再読み込みしてください。</div>
              ) : (
                <div
                  ref={viewportRef}
                  className={`relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-sky-50 ${zoom > 100 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
                  onPointerDown={startDragging}
                  onPointerMove={moveMap}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                >
                  <svg
                    viewBox="0 0 1000 500"
                    role="img"
                    aria-label={`世界地図、拡大率${zoom}%`}
                    className="absolute inset-0 h-full w-full p-3"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
                      transformOrigin: "center",
                      transition: isDragging ? "none" : "transform 150ms ease-out",
                      touchAction: "none",
                    }}
                  >
                    {countries.map((country) => {
                      const polygons = country.geometry.type === "Polygon"
                        ? [country.geometry.coordinates as number[][][]]
                        : country.geometry.coordinates as number[][][][];
                      const selected = country === target;
                      return polygons.map((polygon, index) => <path key={`${country.properties["ISO3166-1-Alpha-3"]}-${index}`} d={polygonPath(polygon)} fill={selected ? "#f87171" : "#bfdbfe"} stroke="#fff" strokeWidth="0.7" className={selected ? "[filter:drop-shadow(0_0_5px_rgba(239,68,68,.85))]" : ""} />);
                    })}
                    {target && targetMarker && (
                      <g aria-label={`${countryLabel(target)}の位置`}>
                        <circle cx={targetMarker.x} cy={targetMarker.y} r="13" fill="none" stroke="#ef4444" strokeWidth="3" className="world-map-marker-pulse" />
                        <circle cx={targetMarker.x} cy={targetMarker.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
                      </g>
                    )}
                  </svg>
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-md" aria-label="地図の拡大縮小">
                    <button type="button" onClick={() => changeZoom(-25)} disabled={zoom <= 100} className="h-9 w-9 rounded-full text-xl font-bold text-blue-700 hover:bg-blue-50 disabled:text-gray-300" aria-label="地図を縮小">−</button>
                    <span className="min-w-12 text-center text-sm font-semibold tabular-nums text-gray-700" aria-live="polite">{zoom}%</span>
                    <button type="button" onClick={() => changeZoom(25)} disabled={zoom >= 200} className="h-9 w-9 rounded-full text-xl font-bold text-blue-700 hover:bg-blue-50 disabled:text-gray-300" aria-label="地図を拡大">+</button>
                    <button type="button" onClick={resetMapView} disabled={zoom === 100} className="rounded-full px-2 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 disabled:text-gray-300" aria-label="地図を100%に戻す">リセット</button>
                  </div>
                </div>
              )}
              <p className="mt-2 text-center text-xs text-gray-400">地図データ：Natural Earth / geo-countries</p>
            </div>
            <div className="flex flex-col items-center gap-5">
              {isAnswerShown && target ? (
                <div className="text-center">
                  {countryFlag(target) && (
                    <p className="mb-3 text-7xl leading-none" role="img" aria-label={`${countryLabel(target)}の国旗`}>
                      {countryFlag(target)}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-blue-600">{countryLabel(target)}</p>
                  <p className="mt-2 text-sm text-gray-400">{target.properties.name}</p>
                  <button onClick={next} className="mt-5 rounded-full bg-blue-500 px-6 py-2 font-bold text-white shadow hover:bg-blue-600">次の問題</button>
                </div>
              ) : target ? (
                <button onClick={() => setIsAnswerShown(true)} className="rounded-full bg-blue-500 px-6 py-3 font-bold text-white shadow hover:bg-blue-600">答えを見る</button>
              ) : null}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
