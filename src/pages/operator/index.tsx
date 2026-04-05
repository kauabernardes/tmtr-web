import {
  FormControl,
  Card,
  CardBody,
  FormGroup,
  FormLabel,
  Button,
  Row,
  Col,
  Spinner,
  FormSelect,
  CardTitle,
  CardSubtitle,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTournament } from "../../hooks/useTournament";
import { Aside } from "./components/aside";
import { Trash } from "lucide-react";

function App() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Seguidor de Linha");
  const [tableName, setTableName] = useState("Fase de Grupos");

  const { sync, tables, del } = useTournament();
  const [isLoading, setIsLoading] = useState(false);

  const [secaoSelect, setSecaoSelect] = useState<string>("");
  const [tabelaSelect, setTabelaSelect] = useState<string>("");

  const handleSincronizar = async () => {
    try {
      setIsLoading(true);
      await sync(text, tableName, category);
      setIsLoading(false);
      toast("Tabela sincronizada com sucesso!", {
        type: "success",
        position: "bottom-right",
      });
    } catch {
      setIsLoading(false);
      toast("Erro ao sincronizar tabela", {
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const handleDel = async (secao: string, table?: string) => {
    try {
      setIsLoading(true);
      await del(secao, table);
      setIsLoading(false);
      toast(
        `${table ? "Tabela " + table + " da seção " + secao + " apagada com sucesso." : "Seção " + secao + " apagada com sucesso."}`,
        {
          type: "warning",
          position: "bottom-right",
        },
      );
      setSecaoSelect("");
      setTabelaSelect("");
    } catch (error) {
      setIsLoading(false);
      toast("Erro ao sincronizar tabela", {
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const handleSelecionarTabela = (nomeDaTabela: string) => {
    setTabelaSelect(nomeDaTabela);

    if (!nomeDaTabela || !tables[secaoSelect]) return;

    const dadosDaTabela = tables[secaoSelect][nomeDaTabela];

    if (!dadosDaTabela || dadosDaTabela.length === 0) {
      toast.warning("Esta tabela está vazia.", { theme: "colored" });
      return;
    }

    const headers = Object.keys(dadosDaTabela[0]).join("\t");
    const linhas = dadosDaTabela
      .map((linha) => Object.values(linha).join("\t"))
      .join("\n");
    const TSVConvertido = `${headers}\n${linhas}`;

    setCategory(secaoSelect);
    setTableName(nomeDaTabela);
    setText(TSVConvertido);

    toast.info(`Dados da tabela "${nomeDaTabela}" carregados para edição!`, {
      position: "bottom-right",
    });
  };

  return (
    <>
      <div className="min-vh-100 bg-cyan">
        <main className="container min-vh-100 d-flex flex-column py-5">
          <Row className="my-auto justify-content-center g-4">
            <Col md={12} lg={8} className="d-flex flex-column gap-4">
              <img
                width="220"
                src="./logo-robot.png"
                alt="Logo TMTR"
                className="mx-auto"
              />

              <Card className="rounded-4 overflow-hidden border-0">
                <div className="bg-info" style={{ height: "6px" }}></div>
                <CardBody className="p-4">
                  <CardTitle className="d-flex justify-content-between">
                    Tabela{" "}
                    <Badge
                      bg={tables[category]?.[tableName] ? "primary" : "success"}
                    >
                      {tables[category]?.[tableName]
                        ? "Editando Tabela"
                        : "Inserindo Tabela"}
                    </Badge>
                  </CardTitle>
                  <CardSubtitle className="text-muted mb-4">
                    Preencha os dados abaixo para enviar ao painel de exibição.
                  </CardSubtitle>

                  <Row className="g-3">
                    <Col md={6}>
                      <FormGroup>
                        <FormLabel className="text-muted">Seção</FormLabel>
                        <FormControl
                          type="text"
                          className="py-2"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Ex: Sumô Lego..."
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <FormLabel className="text-muted">
                          Título da Tabela
                        </FormLabel>
                        <FormControl
                          type="text"
                          className="py-2"
                          value={tableName}
                          onChange={(e) => setTableName(e.target.value)}
                          placeholder="Ex: Grupo A, Finais..."
                        />
                      </FormGroup>
                    </Col>

                    <Col md={12}>
                      <FormGroup className="mt-2">
                        <FormLabel className="text-muted">
                          <span>Dados da Planilha (Células)</span>
                        </FormLabel>
                        <FormControl
                          as="textarea"
                          rows={7}
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Cole as células do Excel aqui..."
                          className="font-monospace bg-light"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    variant="warning"
                    onClick={handleSincronizar}
                    disabled={isLoading || text.trim() === ""}
                    className="w-100 mt-4"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" />
                        Sincronizando...
                      </>
                    ) : (
                      "Sincronizar"
                    )}
                  </Button>
                </CardBody>
              </Card>

              <Card className="rounded-4 border-0 overflow-hidden">
                <div className="bg-warning" style={{ height: "6px" }}></div>
                <CardBody className="p-4">
                  <CardTitle>Gerenciar Exibição</CardTitle>
                  <CardSubtitle className="text-muted mb-4">
                    Puxe os dados de uma tabela ativa para editá-la acima ou
                    removê-la.
                  </CardSubtitle>

                  <Row className="g-3">
                    <Col md={6}>
                      <FormLabel className="text-muted">
                        Selecionar Seção
                      </FormLabel>
                      <InputGroup>
                        <FormSelect
                          className="py-2 cursor-pointer"
                          value={secaoSelect}
                          onChange={(e) => {
                            setSecaoSelect(e.target.value);
                            setTabelaSelect("");
                          }}
                        >
                          <option value="">Escolha uma opção...</option>
                          {Object.entries(tables).map(([secao]) => (
                            <option key={secao} value={secao}>
                              {secao}
                            </option>
                          ))}
                        </FormSelect>
                        {secaoSelect && (
                          <Button
                            variant="danger"
                            onClick={() => handleDel(secaoSelect)}
                          >
                            <Trash size={20} />
                          </Button>
                        )}
                      </InputGroup>
                    </Col>

                    <Col md={6}>
                      <FormLabel className="text-muted">
                        Selecionar Tabela
                      </FormLabel>
                      <InputGroup>
                        <FormSelect
                          className="py-2 cursor-pointer"
                          value={tabelaSelect}
                          onChange={(e) =>
                            handleSelecionarTabela(e.target.value)
                          }
                          disabled={!secaoSelect || !tables[secaoSelect]}
                        >
                          <option value="">Escolha uma tabela...</option>
                          {tables[secaoSelect] &&
                            Object.entries(tables[secaoSelect]).map(
                              ([tabela]) => (
                                <option key={tabela} value={tabela}>
                                  {tabela}
                                </option>
                              ),
                            )}
                        </FormSelect>
                        {tabelaSelect && (
                          <Button
                            variant="danger"
                            onClick={() => handleDel(secaoSelect, tabelaSelect)}
                          >
                            <Trash size={20} />
                          </Button>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Aside />
          </Row>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
