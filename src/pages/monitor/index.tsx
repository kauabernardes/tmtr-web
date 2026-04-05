import { Badge, Card, CardTitle, Container, Table } from "react-bootstrap";
import { useTournament } from "../../hooks/useTournament";
import { EmblaCarousel } from "./components/EmblaCarousel";
import "./style.css";
import { useEffect } from "react";

function Monitor() {
  const { tables } = useTournament();

  useEffect(() => {
    console.log(tables);
  }, [tables]);

  return (
    <Container fluid className="min-vh-100 p-4 bg-cyan">
      {Object.keys(tables).length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
          <img
            width="50%"
            src="./logo-robot.png"
            className="mb-4 opacity-50"
            alt="Logo"
          />
          <h4 className="text-center text-secondary">Aguardando...</h4>
        </div>
      ) : (
        <>
          <header className="d-flex align-items-start justify-content-center">
            <img src="./logo-robot.png" height={130} />
            <Badge className=" position-fixed end-0 me-5" as="div" bg="danger">
              Ao Vivo
            </Badge>
          </header>
          <EmblaCarousel>
            {tables &&
              Object.entries(tables).map(([secaoNome, tabelasDaSecao]) => {
                return Object.entries(tabelasDaSecao).map(
                  ([tabelaNome, linhasDaTabela]) => {
                    if (!linhasDaTabela || linhasDaTabela.length === 0)
                      return null;

                    const headers = Object.keys(linhasDaTabela[0]);

                    return (
                      <div
                        key={`${secaoNome}-${tabelaNome}`}
                        className="embla__slide text-light p-4"
                      >
                        <h2 className="text-light">{secaoNome}</h2>

                        <Card className=" overflow-hidden rounded-4 border-0">
                          <CardTitle className="bg-warning text-black py-2 text-center m-0">
                            {tabelaNome}
                          </CardTitle>
                          <Table variant="light" striped>
                            <thead>
                              <tr>
                                {headers.map((col, index) => (
                                  <th
                                    className="px-4 py-2 bg-yellow"
                                    key={index}
                                  >
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {linhasDaTabela.map((row, index) => (
                                <tr key={index}>
                                  {headers.map((colHeader, colIndex) => (
                                    <td className="px-4" key={colIndex}>
                                      {row[colHeader]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card>
                      </div>
                    );
                  },
                );
              })}
          </EmblaCarousel>
        </>
      )}
    </Container>
  );
}

export default Monitor;
