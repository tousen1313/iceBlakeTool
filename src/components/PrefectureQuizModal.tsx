"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "@/components/Modal";

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県",
  "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];
const capitals = [
  "札幌市", "青森市", "盛岡市", "仙台市", "秋田市", "山形市", "福島市",
  "水戸市", "宇都宮市", "前橋市", "さいたま市", "千葉市", "新宿区", "横浜市",
  "新潟市", "富山市", "金沢市", "福井市", "甲府市", "長野市", "岐阜市", "静岡市", "名古屋市",
  "津市", "大津市", "京都市", "大阪市", "神戸市", "奈良市", "和歌山市",
  "鳥取市", "松江市", "岡山市", "広島市", "山口市", "徳島市", "高松市", "松山市", "高知市",
  "福岡市", "佐賀市", "長崎市", "熊本市", "大分市", "宮崎市", "鹿児島市", "那覇市",
];
const regions = [
  { name: "北海道地方", color: "#dbeafe", prefectures: ["北海道"] },
  { name: "東北地方", color: "#dcfce7", prefectures: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東地方", color: "#fef3c7", prefectures: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"] },
  { name: "中部地方", color: "#fce7f3", prefectures: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"] },
  { name: "近畿地方", color: "#ede9fe", prefectures: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
  { name: "中国地方", color: "#ffedd5", prefectures: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
  { name: "四国地方", color: "#cffafe", prefectures: ["徳島県", "香川県", "愛媛県", "高知県"] },
  { name: "九州地方", color: "#fee2e2", prefectures: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] },
];
const regionFor = (prefecture: string) => regions.find((region) => region.prefectures.includes(prefecture))!;
const mapUrl = "https://raw.githubusercontent.com/lalamalink/japan-map-svg/main/svg/deformed-japan-prefecture-map.svg";

function NumberedJapanMap({ target }: { target: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(mapUrl)
      .then((response) => {
        if (!response.ok) throw new Error("地図を読み込めませんでした");
        return response.text();
      })
      .then((svgText) => {
        if (!active || !mapRef.current) return;
        const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svg = document.importNode(parsed.documentElement, true) as unknown as SVGSVGElement;
        if (svg.querySelector("parsererror")) throw new Error("地図データが不正です");
        svg.setAttribute("class", "w-full h-auto max-h-[68vh]");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        mapRef.current.replaceChildren(svg);
        svg.querySelectorAll("path[data-code]").forEach((path) => {
          const code = Number(path.getAttribute("data-code"));
          const prefecture = prefectures[code - 1];
          if (!prefecture) return;
          const region = regionFor(prefecture);
          path.setAttribute("fill", prefecture === target ? "#f87171" : region.color);
          path.setAttribute("stroke", region.color);
          path.setAttribute("stroke-width", "6");
          path.setAttribute("paint-order", "stroke");
          if (prefecture === target) path.setAttribute("filter", "drop-shadow(0 0 10px rgba(239,68,68,.8))");
          const box = (path as SVGGraphicsElement).getBBox();
          const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
          label.setAttribute("x", String(box.x + box.width / 2));
          label.setAttribute("y", String(box.y + box.height / 2));
          label.setAttribute("text-anchor", "middle");
          label.setAttribute("dominant-baseline", "central");
          label.setAttribute("font-size", String(Math.max(12, Math.min(22, box.width * 0.38))));
          label.setAttribute("font-weight", "700");
          label.setAttribute("fill", prefecture === target ? "#ffffff" : "#52647b");
          label.setAttribute("pointer-events", "none");
          label.textContent = String(code).padStart(2, "0");
          path.parentNode?.appendChild(label);
        });
      })
      .catch(() => { if (active) setLoadError(true); });
    return () => { active = false; };
  }, [target]);

  return (
    <div className="min-h-[360px] flex items-center justify-center rounded-2xl bg-sky-50 p-5">
      {loadError ? (
        <p className="text-center text-sm text-gray-500">地図を読み込めませんでした。ネットワーク接続を確認してください。</p>
      ) : (
        <div ref={mapRef} className="w-full" aria-label="番号付き都道府県マップ" />
      )}
    </div>
  );
}

export function PrefectureQuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(() => prefectures[Math.floor(Math.random() * prefectures.length)]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const targetNumber = useMemo(() => String(prefectures.indexOf(target) + 1).padStart(2, "0"), [target]);
  const targetRegion = regionFor(target);

  const openQuiz = () => {
    const nextTarget = prefectures[Math.floor(Math.random() * prefectures.length)];
    setTarget(nextTarget);
    setIsAnswerShown(false);
    setIsOpen(true);
  };
  const next = () => {
    const nextTarget = prefectures[Math.floor(Math.random() * prefectures.length)];
    setTarget(nextTarget);
    setIsAnswerShown(false);
  };

  return (
    <>
      <button onClick={openQuiz} className="fixed bottom-4 right-4 hidden md:flex items-center justify-center px-4 h-10 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-red-100" aria-label="都道府県クイズを開く">
        <span className="text-sm font-bold text-red-500">都道府県クイズ</span>
      </button>
      {isOpen && (
        <Modal title="都道府県クイズ" onClose={() => setIsOpen(false)} maxWidthClass="max-w-6xl" desktopOnly>
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-7 items-center">
            <div>
              <p className="text-center text-gray-500 mb-3">赤く光っている番号の都道府県は？</p>
              <NumberedJapanMap target={target} />
              <p className="mt-2 text-center text-xs text-gray-400">番号は都道府県コード（01〜47）です。</p>
            </div>
            <div className="flex flex-col items-center gap-5">
              {isAnswerShown ? (
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{target}</p>
                  <p className="mt-1 text-lg font-semibold text-blue-700">{targetRegion.name}</p>
                  <p className="mt-3 text-sm text-gray-500">（県庁所在地）</p>
                  <p className="text-xl font-semibold text-gray-700">{capitals[prefectures.indexOf(target)]}</p>
                  <p className="mt-2 text-sm text-gray-400">番号：{targetNumber}</p>
                  <button onClick={next} className="mt-5 rounded-full bg-purple-500 px-6 py-2 font-bold text-white shadow hover:bg-purple-600">次の問題</button>
                </div>
              ) : (
                <button onClick={() => setIsAnswerShown(true)} className="rounded-full bg-purple-500 px-6 py-3 font-bold text-white shadow hover:bg-purple-600">答えを見る</button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
