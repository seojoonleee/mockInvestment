import { useMemo, useState } from "react";
import "../css/HomePage.css";

type TabKey = "summary" | "finance" | "issue";

type StockItem = {
  id: string;
  name: string;
  code: string;
  marketLabel: string; // 코스피/나스닥 등
  priceText: string;   // "107,900"
  changeText: string;  // "-0.46%"
  logoText?: string;   // 임시 로고 글자
};

type StockGroup = {
  title: string; // 국내종목/해외종목/가상화폐
  items: StockItem[];
};

export default function HomePage() {
  const tabs = useMemo(
    () => [
      { key: "summary" as const, label: "요약" },
      { key: "finance" as const, label: "재무" },
      { key: "issue" as const, label: "이슈" },
    ],
    []
  );

  // ✅ 왼쪽 리스트 더미(나중에 서버 데이터로 대체)
  const groups: StockGroup[] = [
    {
      title: "국내종목",
      items: [
        { id: "005930", name: "삼성전자", code: "005930", marketLabel: "코스피", priceText: "107,900", changeText: "-0.46%", logoText: "S" },
        { id: "086520", name: "에코프로", code: "086520", marketLabel: "코스닥", priceText: "116,500", changeText: "-1.10%", logoText: "E" },
        { id: "034020", name: "두산에너빌리티", code: "034020", marketLabel: "코스피", priceText: "76,700", changeText: "0.00%", logoText: "D" },
      ],
    },
    {
      title: "해외종목",
      items: [
        { id: "AAPL", name: "애플", code: "AAPL", marketLabel: "NASDAQ", priceText: "$277.18", changeText: "-0.26%", logoText: "A" },
        { id: "MSFT", name: "마이크로소프트", code: "MSFT", marketLabel: "NASDAQ", priceText: "$492.02", changeText: "+0.20%", logoText: "M" },
        { id: "TSLA", name: "테슬라", code: "TSLA", marketLabel: "NASDAQ", priceText: "$445.17", changeText: "+1.27%", logoText: "T" },
      ],
    },
    {
      title: "가상화폐",
      items: [
        { id: "BTC", name: "비트코인", code: "BTC", marketLabel: "KRW", priceText: "137,473,000", changeText: "+0.70%", logoText: "₿" },
      ],
    },
  ];

  const flatList = groups.flatMap((g) => g.items);
  const [selectedId, setSelectedId] = useState<string>(flatList[0]?.id ?? "");
  const selected = flatList.find((x) => x.id === selectedId);

  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  return (
    <div className="hp">
      {/* Top Bar */}
      <header className="hpTop">
        <div className="hpTopLeft">
          <div className="hpBrand">모의투자</div>
        </div>

        <div className="hpSearchWrap">
          <input className="hpSearch" placeholder="종목 검색 (Alt + s)" />
        </div>

        <div className="hpTopRight">
          <button className="hpBtn hpBtnOutline">로그인</button>
        </div>
      </header>

      {/* Body: Left(list) / Center(chart) / Right(info tabs) */}
      <main className="hpBody3">
        {/* LEFT: Watchlist */}
        <aside className="hpSidebar">
          <div className="hpSideHeader">
            <div className="hpSideTitle">≡ 새 관심목록</div>
            <button className="hpSideAdd">＋ 종목추가</button>
          </div>

          <div className="hpSideContent">
            {groups.map((g) => (
              <div key={g.title} className="hpGroup">
                <div className="hpGroupTitle">{g.title}</div>

                <div className="hpGroupList">
                  {g.items.map((item) => {
                    const isActive = item.id === selectedId;
                    const isUp = item.changeText.trim().startsWith("+");
                    const isDown = item.changeText.trim().startsWith("-");
                    return (
                      <button
                        key={item.id}
                        className={`hpStockRow ${isActive ? "isActive" : ""}`}
                        onClick={() => setSelectedId(item.id)}
                        type="button"
                      >
                        <div className="hpStockLogo">{item.logoText ?? item.name[0]}</div>

                        <div className="hpStockMeta">
                          <div className="hpStockName">{item.name}</div>
                          <div className="hpStockCode">{item.code}</div>
                        </div>

                        <div className="hpStockNums">
                          <div className="hpStockPrice">{item.priceText}</div>
                          <div
                            className={`hpStockChange ${
                              isUp ? "isUp" : isDown ? "isDown" : ""
                            }`}
                          >
                            {item.changeText}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER: Chart */}
        <section className="hpCenter">
          <div className="hpCenterHeader">
            <div className="hpCenterInfo">
              <div className="hpCenterName">
                {selected?.name ?? "-"}{" "}
                <span className="hpCenterCode">
                  {selected?.code ?? ""} · {selected?.marketLabel ?? ""}
                </span>
              </div>
              <div className="hpCenterPriceLine">
                <span className="hpCenterPrice">{selected?.priceText ?? "-"}</span>
                <span className="hpCenterChange">{selected?.changeText ?? ""}</span>
              </div>
            </div>

            <div className="hpCenterActions">
              <button className="hpIconBtn" aria-label="즐겨찾기">☆</button>
              <button className="hpActionBtn hpBuy">매수</button>
              <button className="hpActionBtn hpSell">매도</button>
            </div>
          </div>

          {/* 차트 자리(나중에 TradingView/차트 라이브러리로 교체) */}
          <div className="hpChartWrap">
            <div className="hpChartPlaceholder">
              <div className="hpChartHint">[주가 차트 영역]</div>
              <div className="hpChartSubHint">
                나중에 서버 데이터 + 차트 라이브러리(TradingView, Recharts 등)로 연결
              </div>
            </div>

            <div className="hpVolumePlaceholder">
              <div className="hpChartHint">[거래량 영역]</div>
            </div>
          </div>
        </section>

        {/* RIGHT: Tabs */}
        <aside className="hpRight">
          <div className="hpTabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`hpTab ${activeTab === t.key ? "isActive" : ""}`}
                onClick={() => setActiveTab(t.key)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="hpRightContent">
            {activeTab === "summary" && <div className="hpPlaceholderCard">요약 영역(추후 서버 데이터)</div>}
            {activeTab === "finance" && <div className="hpPlaceholderCard">재무 영역(추후 서버 데이터)</div>}
            {activeTab === "issue" && <div className="hpPlaceholderCard">이슈 영역(추후 서버 데이터)</div>}
          </div>
        </aside>
      </main>
    </div>
  );
}
