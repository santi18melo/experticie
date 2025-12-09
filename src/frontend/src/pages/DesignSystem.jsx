import React, { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { Heading, Text } from '../components/common/Typography';
import Navbar from '../components/common/Navbar';

const DesignSystem = () => {
  const [inputValue, setInputValue] = useState('');

  const containerStyle = {
    padding: 'var(--spacing-2xl)',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2xl)',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)',
  };

  const rowStyle = {
    display: 'flex',
    gap: 'var(--spacing-md)',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <Navbar 
        links={[
          { label: 'Inicio', path: '/' },
          { label: 'Design System', path: '/design-system' },
        ]}
      />
      
      <div style={containerStyle}>
        <Heading level={1}>Design System</Heading>
        <Text size="lg">Componentes atómicos estandarizados para PREXCOL.</Text>

        {/* Buttons */}
        <section style={sectionStyle}>
          <Heading level={2}>Botones</Heading>
          <Card>
            <div style={rowStyle}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div style={{ ...rowStyle, marginTop: '16px' }}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </Card>
        </section>

        {/* Typography */}
        <section style={sectionStyle}>
          <Heading level={2}>Tipografía</Heading>
          <Card>
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Text size="lg">Texto Grande (Large)</Text>
            <Text>Texto Base (Base) - Lorem ipsum dolor sit amet.</Text>
            <Text size="sm" color="tertiary">Texto Pequeño (Small) - Detalles secundarios.</Text>
            <Text color="error">Texto de Error</Text>
            <Text color="success">Texto de Éxito</Text>
          </Card>
        </section>

        {/* Inputs */}
        <section style={sectionStyle}>
          <Heading level={2}>Formularios</Heading>
          <Card>
            <div style={{ maxWidth: '400px' }}>
              <Input 
                label="Nombre de Usuario" 
                placeholder="Ej. juan.perez" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input 
                label="Correo Electrónico" 
                type="email" 
                placeholder="juan@ejemplo.com" 
                required
              />
              <Input 
                label="Contraseña" 
                type="password" 
                error="La contraseña es muy corta"
              />
              <Input 
                label="Deshabilitado" 
                disabled 
                value="No editable"
              />
            </div>
          </Card>
        </section>

        {/* Cards */}
        <section style={sectionStyle}>
          <Heading level={2}>Tarjetas</Heading>
          <div style={rowStyle}>
            <Card elevation="sm" padding="small"><Text>Elevation SM</Text></Card>
            <Card elevation="md" padding="medium"><Text>Elevation MD</Text></Card>
            <Card elevation="lg" padding="large"><Text>Elevation LG</Text></Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;
