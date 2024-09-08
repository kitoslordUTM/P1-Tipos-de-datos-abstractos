import React, { useReducer, useState } from 'react';
import { ChakraProvider, Box, Input, Button, Select, Stack, Heading, Text, Image } from '@chakra-ui/react';
import { BudgetReducer, initialState, AreaActions } from '../reducer/reducer'; // Importa tu reducer

// Componente principal
const AreaCalculator = () => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);
  const [figure, setFigure] = useState(''); // Para seleccionar el tipo de figura
  const [inputs, setInputs] = useState({ base: '', altura: '', radio: '', largo: '', ancho: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

 
  const handleCalculate = () => {
    switch (figure) {
      case 'CuatroLados':
        dispatch({
          type: 'añadir-CuatroLados',
          payload: { cuatroLados: { largo: parseFloat(inputs.largo), ancho: parseFloat(inputs.ancho) } },
        });
        break;
      case 'Triangulo':
        dispatch({
          type: 'añadir-triangulo',
          payload: { triangulo: { base: parseFloat(inputs.base), altura: parseFloat(inputs.altura) } },
        });
        break;
      case 'Circulo':
        dispatch({
          type: 'añadir-circulo',
          payload: { circulo: { radio: parseFloat(inputs.radio) } },
        });
        break;
      default:
        break;
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="600px" margin="0 auto" padding="20px" bg="gray.100" borderRadius="10px">
        <Heading as="h1" textAlign="center" marginBottom="20px">Calculadora de Áreas</Heading>
        
        <Stack spacing={4}>
          {/* Selector de Figura */}
          <Select placeholder="Selecciona la figura" onChange={(e) => setFigure(e.target.value)}>
            <option value="CuatroLados">Cuadrado / Rectángulo</option>
            <option value="Triangulo">Triángulo</option>
            <option value="Circulo">Círculo</option>
          </Select>

          {/* Inputs para Cuadrado / Rectángulo */}
          {figure === 'CuatroLados' && (
            <>
              <Input 
                placeholder="Largo" 
                name="largo" 
                value={inputs.largo} 
                onChange={handleInputChange} 
                type="number"
              />
              <Input 
                placeholder="Ancho" 
                name="ancho" 
                value={inputs.ancho} 
                onChange={handleInputChange} 
                type="number"
              />
            </>
          )}

          {/* Inputs para Triángulo */}
          {figure === 'Triangulo' && (
            <>
              <Input 
                placeholder="Base" 
                name="base" 
                value={inputs.base} 
                onChange={handleInputChange} 
                type="number"
              />
              <Input 
                placeholder="Altura" 
                name="altura" 
                value={inputs.altura} 
                onChange={handleInputChange} 
                type="number"
              />
            </>
          )}

          {/* Input para Círculo */}
          {figure === 'Circulo' && (
            <Input 
              placeholder="Radio" 
              name="radio" 
              value={inputs.radio} 
              onChange={handleInputChange} 
              type="number"
            />
          )}

          {/* Botón de Calcular */}
          <Button colorScheme="blue" onClick={handleCalculate} >
            Calcular Área
          </Button>

          {/* Mostrar resultados */}
          <Box marginTop="20px" padding="10px" bg="white" borderRadius="8px">
            <Heading as="h3" size="lg">Resultados:</Heading>
            {state.respuestasCuatroLados.length > 0 && (
              <Box marginTop="10px">
                <Text>Cuadrilateros:</Text>
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src='https://illustoon.com/photo/7259.png'
                />
                {state.respuestasCuatroLados.map((res, idx) => (
                  <Text key={idx}>Área: {res.area} (Figura: {res.figura})</Text>
                ))}
              </Box>
            )}
            {state.respuestasCirculo.length > 0 && (
              <Box marginTop="10px">
                <Text>Círculos:</Text>
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src='https://png.pngtree.com/png-clipart/20201029/ourmid/pngtree-circle-clipart-red-circle-png-image_2381952.jpg'
                    alt='Dan Abramov'
                />
                {state.respuestasCirculo.map((res, idx) => (
                  <Text key={idx}>Área: {res.area} (Figura: {res.figura})</Text>
                ))}
              </Box>
            )}
            {state.respuestasTriangulo.length > 0 && (
              <Box marginTop="10px">
                <Text>Triángulos:</Text>
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosaXcGmdEbMw0c4Rtw6OTBH6t7DjleuEm3A&s'
                    alt='Dan Abramov'
                />
                {state.respuestasTriangulo.map((res, idx) => (
                  <Text key={idx}>Área: {res.area} (Figura: {res.figura})</Text>
                ))}
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default AreaCalculator;
