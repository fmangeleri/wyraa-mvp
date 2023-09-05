import { Usuario } from '@/app/(main)/equipo/data/types';
import { SolicitudNew } from '@/app/(main)/solicitudes/data/types';

import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  solicitud: SolicitudNew;
  user: Usuario;
  id: string;
  newEstado: string;
}

export function reemplazarUltimaLetraConA(texto: string) {
  if (texto.length === 0) {
    return texto; // No se puede reemplazar la última letra de un string vacío.
  }

  const ultimaLetra = texto.charAt(texto.length - 1);

  if (ultimaLetra === 'o') {
    return texto.slice(0, -1) + 'a'; // Reemplaza solo si la última letra es 'o'.
  } else {
    return texto; // No se realiza ningún reemplazo.
  }
}

export const UpdateSolicitudTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ solicitud, user, id, newEstado }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Wyraa - Solicitud {reemplazarUltimaLetraConA(newEstado)}
      </Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Column
                style={tableCell}
                align='left'
              >
                <Text style={heading}>
                  Solicitud de {solicitud.tipo}{' '}
                  {reemplazarUltimaLetraConA(solicitud.estado)}
                </Text>
              </Column>
            </Section>
            <Section style={informationTable}>
              <Row style={informationTableRow}>
                <Column>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Tipo</Text>
                      <Text style={informationTableValue}>
                        {solicitud.tipo}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Area</Text>
                      <Text style={informationTableValue}>
                        {solicitud.area}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Proveedor</Text>
                      <Text style={informationTableValue}>
                        {solicitud.proveedor}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Solicitante</Text>
                      <Text style={informationTableValue}>
                        {user.nombre + ' ' + user.apellido}
                      </Text>
                    </Column>
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Prioridad</Text>
                      <Text style={informationTableValue}>
                        {solicitud.prioridad}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Tema</Text>
                      <Text style={informationTableValue}>
                        {solicitud.tema}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Monto</Text>
                      <Text style={informationTableValue}>
                        {solicitud.monto}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Email</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: '#15c',
                          textDecoration: 'underline',
                        }}
                      >
                        {user.email}
                      </Link>
                    </Column>
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>
                        Esta en Presupuesto?
                      </Text>
                      <Text style={informationTableValue}>
                        {solicitud.enPresupuesto}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Subtema</Text>
                      <Text style={informationTableValue}>
                        {solicitud.subtema}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Estado</Text>
                      <Text style={informationTableValue}>
                        {solicitud.estado}
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
            <Section className='flex justify-center items-center'>
              <Button
                href={`demo.wyraa.com/solicitudes/${id}`}
                className='text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 self-center'
              >
                Ir a la Solicitud
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
};

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
};

const tableCell = { display: 'table-cell' };

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
};

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
};

const informationTableRow = {
  height: '46px',
};

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
};

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
};

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};
