import { useInstallPWA } from '../../hooks/useInstallPWA';
import Button from '../Button';
import styled from 'styled-components';

const InstallContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 400px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IOSInstructions = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
`;

export const InstallPWA = () => {
  const { supportsPWA, installPWA, isIOS } = useInstallPWA();

  if (!supportsPWA && !isIOS) return null;

  if (isIOS) {
    return (
      <InstallContainer>
        <IOSInstructions>
          Para instalar o app:
          <br />
          1. Toque no ícone de compartilhar
          <br />
          2. Selecione "Adicionar à Tela Inicial"
        </IOSInstructions>
      </InstallContainer>
    );
  }

  return (
    <InstallContainer>
      <Button
        type="main"
        text="Instalar App"
        action={installPWA}
      />
    </InstallContainer>
  );
}; 