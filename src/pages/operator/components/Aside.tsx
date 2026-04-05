import { BookMarked } from "lucide-react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  ListGroup,
} from "react-bootstrap";
import { LGItem } from "../../../components/LGItem";

export function Aside() {
  return (
    <Col md={12} lg={4} className="d-flex align-items-center mt-3 mt-lg-0">
      <Card className="rounded-4 ">
        <CardBody className="p-4">
          <CardTitle>
            <BookMarked /> Manual de Uso
          </CardTitle>

          <CardSubtitle className="text-muted mb-4x">
            Siga os passos abaixo para atualizar os paineis de exibição:
          </CardSubtitle>

          <ListGroup variant="flush">
            <LGItem
              title="1. Defina uma seção"
              description={
                <>
                  Digite o nome da modalidade que está acontecendo (Ex:{" "}
                  <em>Sumô Lego, Seguidor de Linha</em>).
                </>
              }
            />
            <LGItem
              title="2. Informe o título da tabela"
              description={
                <>
                  Identifique qual é a chave ou fase atual (Ex:{" "}
                  <em>Grupo A, Oitavas de Final, Repescagem</em>).
                </>
              }
            />

            <LGItem
              title="3. Copie e Cole os Dados"
              description={
                <>
                  Na planilha do torneio, selecione as células da tabela que
                  será exibida <strong>(incluindo o cabeçalho)</strong>, copie (
                  <code>Ctrl+C</code>) e cole (<code>Ctrl+V</code>) na caixa de
                  texto.
                </>
              }
            />

            <LGItem
              title="4. Sincronizar Inserção"
              description={
                <>
                  Clique no botão amarelo <strong>"Sincronizar"</strong>. Os
                  paineis de exibição serão atualizados instantaneamente com a
                  tabela inserida!
                </>
              }
            />
          </ListGroup>

          <hr />

          <div className="mt-3">
            <h6 className="fw-bold text-danger">
              ⚠️ Dica: Como apagar uma tabela?
            </h6>
            <p className="text-muted small mb-0">
              Para remover uma tabela do placar, digite a Categoria e o Título
              dela, deixe a caixa de texto em branco e clique em Sincronizar.
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}
