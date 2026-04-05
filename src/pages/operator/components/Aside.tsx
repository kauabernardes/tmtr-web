import { BookMarked, Info, Trash2, Edit } from "lucide-react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  ListGroup,
} from "react-bootstrap";
import { LGItem } from "../../../components/LGItem";

function Aside() {
  return (
    <Col md={12} lg={4} className="d-flex align-items-center mt-3 mt-lg-0">
      <Card className="rounded-4 border-0 w-100 overflow-hidden">
        <div className="bg-secondary" style={{ height: "6px" }}></div>
        <CardBody className="p-4">
          <CardTitle className="d-flex align-items-center gap-2 fw-bold mb-3">
            <BookMarked size={22} className="text-primary" /> Manual de Uso
          </CardTitle>

          <CardSubtitle className="text-muted mb-4">
            Siga os passos abaixo para enviar dados para os painéis:
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
                  Na planilha do torneio, selecione as células da tabela{" "}
                  <strong>(incluindo o cabeçalho)</strong>, copie (
                  <code>Ctrl+C</code>) e cole (<code>Ctrl+V</code>) na caixa de
                  texto.
                </>
              }
            />

            <LGItem
              title="4. Sincronizar"
              description={
                <>
                  Clique no botão amarelo <strong>"Sincronizar"</strong>. A TV
                  será atualizada instantaneamente!
                </>
              }
            />
          </ListGroup>

          <hr className="my-4 text-muted" />

          <CardTitle className="d-flex align-items-center gap-2 fw-bold mb-3">
            <Info size={18} className="text-primary" /> Edição e Exclusão
          </CardTitle>

          <ListGroup variant="flush">
            <LGItem
              title={
                <>
                  <Edit size={16} className="me-1 mb-1" /> Como Editar?
                </>
              }
              description={
                <>
                  No quadro <strong>Gerenciar Exibição</strong>, selecione a
                  seção e a tabela. Os dados serão puxados para o formulário
                  acima. Altere o que precisar e clique em Sincronizar.
                </>
              }
            />

            <LGItem
              title={
                <>
                  <Trash2 size={16} className="me-1 mb-1 text-danger" /> Como
                  Apagar?
                </>
              }
              description={
                <>
                  Basta selecionar a seção ou a tabela que deseja remover no
                  quadro <strong>Gerenciar Exibição</strong> e clicar no botão
                  vermelho com o ícone de lixeira.
                </>
              }
            />
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Aside;
