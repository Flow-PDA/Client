import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="종목 이름을 입력하세요"
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        height: "5vh",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
      }}
    />
  );
}
export function SearchResults({ stocks, searching, partyKey }) {
  const navigate = useNavigate();

  return (
    <article aria-busy={searching} style={{ marginTop: "1rem" }}>
      {searching ? (
        "잠시만 기다려주세요. 종목을 검색하고 있습니다."
      ) : (
        <>
          <header style={{ marginTop: "1rem" }}>
            총 {stocks.length}개의 종목이 검색되었습니다.
          </header>

          {stocks.map(({ stock_code, stock_name }) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "1rem",
                // justifyContent: "space-between",
              }}
            >
              <img
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock_code}.png`}
                alt=""
                style={{ width: "10vw", height: "5vh", borderRadius: "50%" }}
              />
              <div
                key={stock_code}
                style={{ listStyle: "none", marginLeft: "1rem" }}
                onClick={() => {
                  navigate(`/stockDetail/${partyKey}/${stock_code}/chart`);
                }}
              >
                {stock_name}
              </div>
            </div>
          ))}
        </>
      )}
    </article>
  );
}

export default {
  SearchBox,
  SearchResults,
};
