import { iCuatroLados, iCirculo, iTriangulo, iRespuesta } from "../interface/iAreas";

export type AreaActions =
  | { type: 'añadir-CuatroLados'; payload: { cuatroLados: iCuatroLados } }
  | { type: 'añadir-circulo'; payload: { circulo: iCirculo } }
  | { type: 'añadir-triangulo'; payload: { triangulo: iTriangulo } };

export type AreaState = {
  respuestasCuatroLados: iRespuesta[];
  respuestasCirculo: iRespuesta[];
  respuestasTriangulo: iRespuesta[];
};

export const initialState: AreaState = {
  respuestasCuatroLados: [],
  respuestasCirculo: [],
  respuestasTriangulo: [],
};

export const BudgetReducer = (
  state: AreaState = initialState,
  action: AreaActions
) => {
  if (action.type === 'añadir-CuatroLados') {
    const { largo, ancho } = action.payload.cuatroLados;
    const area = largo * ancho;
    const respuesta: iRespuesta = { figura: 'CuatroLados', area };

    return {
      ...state,
      respuestasCuatroLados: [...state.respuestasCuatroLados, respuesta],
    };
  }

  if (action.type === 'añadir-circulo') {
    const { radio } = action.payload.circulo;
    const area = Math.PI * Math.pow(radio, 2);
    const respuesta: iRespuesta = { figura: 'Circulo', area };

    return {
      ...state,
      respuestasCirculo: [...state.respuestasCirculo, respuesta],
    };
  }

  if (action.type === 'añadir-triangulo') {
    const { base, altura } = action.payload.triangulo;
    const area = 0.5 * base * altura;
    const respuesta: iRespuesta = { figura: 'Triangulo', area };

    return {
      ...state,
      respuestasTriangulo: [...state.respuestasTriangulo, respuesta],
    };
  }

  return state;
};