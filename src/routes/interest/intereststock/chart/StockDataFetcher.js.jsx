import { Col, Container, Row } from "react-bootstrap";
import "./StockDataFetcher.css";
import HorizontalLine from "../../../../components/line/HorizontalLine";
export default function StockDataFetcher({ stockBalance }) {
  return (
    <Container>
      {stockBalance.data ? (
        <>
          <Row>
            <Col className="stock-data-partyname">
              {stockBalance.partyInfo.name}의 주식
            </Col>
          </Row>
          <Row className="stock-data-avg-row">
            <Col className="stock-data-avg">1주 평균 주식</Col>
            <Col className="stock-data-avg-data">
              {parseInt(stockBalance.data.pchs_avg_pric).toLocaleString()}원
            </Col>
          </Row>
          <HorizontalLine />
          <Row>
            <Col className="stock-data-quantity">보유수량</Col>
            <Col className="stock-data-quantity-data">
              {stockBalance.data.hldg_qty}주
            </Col>
          </Row>
          <HorizontalLine />
          <Row>
            <Col className="stock-data-total">평가 금액</Col>
            <Col>
              <Row>
                <Col className="stock-data-total-data">
                  {parseInt(stockBalance.data.evlu_amt).toLocaleString()}원
                </Col>
              </Row>
              <Row>
                <Col className="stock-data-total-profit">
                  <span
                    className={
                      parseInt(stockBalance.data.evlu_pfls_amt) < 0
                        ? "stock-data-total-negative-profit"
                        : "stock-data-total-profit"
                    }
                  >
                    {stockBalance.data.evlu_pfls_amt}원(
                    {stockBalance.data.evlu_pfls_rt})%
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <HorizontalLine />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
