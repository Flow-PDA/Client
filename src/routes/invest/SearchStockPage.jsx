import React, { useEffect, useState, useContext } from "react";
import "./SearchStockPage";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchStockData } from "../../lib/apis/stock";
import TopNavigationBar from "../../components/common/nav/TopNavigationBar";
import { AuthContext } from "../../lib/contexts/AuthContext";
import {
  SearchBox,
  SearchResults,
} from "../../components/common/search/Search";

export default function SearchStockPage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState([]);
  const { throwAuthError } = useContext(AuthContext);
  const partyKey = useParams().partyKey;

  const fetchData = async () => {
    try {
      const response = await fetchStockData();
      setStockData(response);
    } catch (error) {
      if (error.response.status === 401) {
        throwAuthError();
      }
    }
  };

  async function fetchStocks(query) {
    await new Promise((r) => setTimeout(r, 2_000)); // 2초 지연
    return stockData.filter((data) =>
      data.stock_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  useEffect(() => {
    setSearching(true);
    fetchStocks(query).then((countries) => {
      setStocks(countries);
      setSearching(false);
    });
  }, [query]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TopNavigationBar text="검색하기"></TopNavigationBar>

      <Container>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
        <SearchResults
          stocks={stocks}
          searching={searching}
          partyKey={partyKey}
        />
      </Container>
    </>
  );
}
