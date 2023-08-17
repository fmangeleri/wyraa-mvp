'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Imputacion,
  Producto,
  Solicitud,
  SolicitudOptional,
} from '../../data/types';
import {
  formatFechaDays,
  onUpdateStateImputaciones,
  onUpdateStateSolicitud,
} from './functions';

interface ISolicitudContext {
  solicitud: Solicitud;
  editedProductos: Producto[] | undefined;
  editedImputaciones: Imputacion[] | undefined;
  setSolicitud: Dispatch<SetStateAction<Solicitud>>;
  onEdit: boolean;
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  setEditedSolicitud: (fieldName: string, fieldValue: any) => void;
  setEditedFactura: (fieldName: string, fieldValue: any) => void;
  setEditedProductos: (
    fieldName: string,
    fieldValue: string | number,
    index: number
  ) => void;
  deleteProductos: (index: number) => void;
  addProductos: () => void;
  setEditedImputaciones: (
    fieldName: string,
    fieldValue: string | number,
    index: number
  ) => void;
  deleteImputaciones: (index: number) => void;
  addImputaciones: () => void;
  saveAllChanges: () => void;
}

export const SolicitudContext = createContext<ISolicitudContext>({
  solicitud: {} as Solicitud,
  editedProductos: [] as Producto[],
  editedImputaciones: [] as Imputacion[],
  setSolicitud: (): void => {},
  onEdit: false,
  setOnEdit: (): void => {},
  setEditedSolicitud: (): void => {},
  setEditedFactura: (): void => {},
  setEditedProductos: (): void => {},
  deleteProductos: (): void => {},
  addProductos: (): void => {},
  setEditedImputaciones: (): void => {},
  deleteImputaciones: (): void => {},
  addImputaciones: (): void => {},
  saveAllChanges: (): void => {},
});

export default function SolicitudProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [solicitud, setSolicitud] = useState<Solicitud>({} as Solicitud);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editedSolicitud, setEditedSolicitud] = useState<SolicitudOptional>();
  // const [editedFactura, setEditedFactura] = useState<FacturaOptional>();
  const [editedProductos, setEditedProductos] = useState<Producto[]>();
  const [editedImputaciones, setEditedImputaciones] = useState<Imputacion[]>();

  useEffect(() => {
    if (solicitud.factura?.productos) {
      setEditedProductos(solicitud.factura.productos);
    } else {
      setEditedProductos([]);
    }
    if (solicitud.imputaciones?.data) {
      setEditedImputaciones(solicitud.imputaciones.data);
    } else {
      setEditedImputaciones([]);
    }
  }, [solicitud, onEdit]);

  const handleSetEditedSolicitud = (fieldName: string, fieldValue: any) => {
    setEditedSolicitud((editedSolicitud) => ({
      ...editedSolicitud,
      [fieldName]: fieldValue,
    }));
  };

  const handleSetEditedFactura = (fieldName: string, fieldValue: any) => {
    const field = 'factura.' + fieldName;
    setEditedSolicitud((editedSolicitud) => ({
      ...editedSolicitud,
      [field]: fieldValue,
    }));
  };

  const handleSetEditedProductos = (
    fieldName: string,
    fieldValue: string | number,
    index: number
  ) => {
    if (editedProductos) {
      const updatedObject = {
        ...editedProductos[index],
        [fieldName]: fieldValue,
      };
      const updatedData = [...editedProductos];
      updatedData[index] = updatedObject;
      setEditedProductos(updatedData);
      handleSetEditedFactura('productos', updatedData);
    }
  };

  const handleAddProductos = () => {
    if (editedProductos) {
      const newProducto: Producto = {
        descripcion: '',
        cantidad: 0,
        unidad: '',
        precioUnitario: 0,
        impuesto: 0,
        total: 0,
      };
      const newEditedProductos = [...editedProductos, newProducto];

      setEditedProductos(newEditedProductos);
      handleSetEditedFactura('productos', newEditedProductos);
    }
  };

  const handleDeleteProductos = (index: number) => {
    if (editedProductos) {
      const newEditedProductos = editedProductos.filter((_, i) => i !== index);

      setEditedProductos(newEditedProductos);
      handleSetEditedFactura('productos', newEditedProductos);
    }
  };

  const handleSetEditedImputaciones = (
    fieldName: string,
    fieldValue: string | number,
    index: number
  ) => {
    if (editedImputaciones) {
      const updatedObject = {
        ...editedImputaciones[index],
        [fieldName]: fieldValue,
      };
      const updatedData = [...editedImputaciones];
      updatedData[index] = updatedObject;
      setEditedImputaciones(updatedData);
    }
  };

  const handleDeleteImputaciones = (index: number) => {
    if (editedImputaciones) {
      const newEditedImputaciones = editedImputaciones.filter(
        (_, i) => i !== index
      );

      setEditedImputaciones(newEditedImputaciones);
    }
  };

  const handleAddImputaciones = () => {
    if (editedImputaciones) {
      const fecha = new Date();
      const fechaPlana = formatFechaDays(fecha);
      const newImputacion: Imputacion = {
        fecha: fechaPlana,
        centroDeCosto: solicitud.tema,
        cuenta: solicitud.subtema,
        monto: 0,
      };
      const newEditedImputaciones = [...editedImputaciones, newImputacion];

      setEditedImputaciones(newEditedImputaciones);
    }
  };

  const saveAllChanges = () => {
    if (editedSolicitud && solicitud.id) {
      onUpdateStateSolicitud(solicitud.id, editedSolicitud);
      // setEditedSolicitud(undefined);
    }

    if (
      editedImputaciones &&
      editedImputaciones != solicitud.imputaciones?.data &&
      solicitud.imputaciones?.id
    ) {
      onUpdateStateImputaciones(solicitud.imputaciones?.id, editedImputaciones);
    }
    // if (editedFactura) {
    //   onUpdateStateFactura(solicitud.id, editedFactura);
    //   setEditedFactura(undefined);
    // }
    setOnEdit(!onEdit);
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicitud,
        editedProductos,
        editedImputaciones,
        setSolicitud,
        onEdit,
        setOnEdit,
        setEditedSolicitud: handleSetEditedSolicitud,
        setEditedFactura: handleSetEditedFactura,
        setEditedProductos: handleSetEditedProductos,
        deleteProductos: handleDeleteProductos,
        addProductos: handleAddProductos,
        setEditedImputaciones: handleSetEditedImputaciones,
        deleteImputaciones: handleDeleteImputaciones,
        addImputaciones: handleAddImputaciones,
        saveAllChanges,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}

export const useSolicitudContext = () => useContext(SolicitudContext);
