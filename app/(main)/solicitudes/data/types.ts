import { Usuario } from "@/app/(main)/equipo/data/types"
import { DocumentReference } from "firebase/firestore"
import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react"

// export const estados = [
//   {
//     value: "solicitado",
//     label: "Solicitado",
//     icon: HelpCircle,
//     color: "text-yellow-400"
//   },
//   {
//     value: "autorizado",
//     label: "Autorizado",
//     icon: Circle,
//     color: "text-green"

//   },
//   {
//     value: "en ejecucion",
//     label: "En Ejecucion",
//     icon: ArrowUpCircle,
//     color: "text-orange-500"
//   },
//   {
//     value: "pagado",
//     label: "Pagado",
//     icon: ArrowUpCircle,
//     color: "text-green-700"
//   }, {
//     value: "controlado",
//     label: "Controlado",
//     icon: ArrowUpCircle,
//     color: "text-blue-500"

//   },
//   {
//     value: "finalizado",
//     label: "Finalizado",
//     icon: CheckCircle2,
//     color: "text-gray-800"
//   },
//   {
//     value: "rechazado",
//     label: "Rechazado",
//     icon: XCircle,
//     color: "text-red-600"
//   },
// ]

// export const prioridades = [
//   {
//     value: "baja",
//     label: "Baja",
//     icon: ArrowDownToLine,
//     color: "text-yellow-400"
//   },
//   {
//     value: "media",
//     label: "Media",
//     icon: ArrowRightToLine,
//     color: "text-orange-400"

//   },
//   {
//     value: "alta",
//     label: "Alta",
//     icon: ArrowUpToLine,
//     color: "text-red-500"

//   },
// ]

// export const tipos = [
//   {
//     value: "compra",
//     label: "Compra"
//   },
//   {
//     value: "pago",
//     label: "Pago"
//   },
//   {
//     value: "reembolso",
//     label: "Reembolso"
//   }
// ]

// export const areas = [
//   {
//     value: "marketing",
//     label: "Marketing",
//   },
//   {
//     value: "producto",
//     label: "Producto",
//   },
//   {
//     value: "logistica",
//     label: "Logistica",
//   },
//   {
//     value: "finanzas",
//     label: "Finanzas",
//   },
//   {
//     value: "recursos humanos",
//     label: "Recursos Humanos",
//   },
//   {
//     value: "legales",
//     label: "Legales",
//   },
//   {
//     value: "informatica",
//     label: "Informatica",
//   },
// ]

export enum Estados {
  Solicitado = "Solicitado",
  Autorizado = "Autorizado",
  EnEjecucion = "En Ejecucion",
  Pagado = "Pagado",
  Controlado = "Controlado",
  Finalizado = "Finalizado",
  Rechazado = "Rechazado",

}

export enum Prioridades {
  Baja = "Baja",
  Media = "Media",
  Alta = "Alta",

}

export enum Tipos {
  Compra = "Compra",
  Pago = "Pago",
  Reembolso = "Reembolso",
}

export enum Areas {
  Marketing = "Marketing",
  Producto = "Producto",
  Logistica = "Logistica",
  Finanzas = "Finanzas",
  RecursosHumanos = "Recursos Humanos",
  Legales = "Legales",
  Informatica = "Informatica",
}

export enum EnPresupuesto {
  Si = "Si",
  No = "No",
}

export type Firma = {
  estado: Estados
  user: Usuario
  fecha: string
  comentario: string
}

export type FirmaReq = {
  estado: Estados
  user: any
  fecha: any
  comentario: string
}

export type FirmaNew = {
  estado: Estados
  user: DocumentReference | null
  fecha: Date
  comentario: string
}

export type Producto = {
  descripcion: string | null
  cantidad: number | null
  unidad: string | null
  precioUnitario: number | null
  impuesto: number | null
  total: number | null
}

export type FacturaSimple = {
  nro: number,
  fechaEmision: string
  fechaVencimiento: string
  proveedor: string
  direccionProveedor: string
  // cliente: string
  // direccionCliente: string
  cuit: string,
  ingBrutos: string,
  subtotal: number
  impuestos: number
  descuentos: number
  total: number
}

export type Factura = {
  nro: number,
  fechaEmision: string
  fechaVencimiento: string
  proveedor: string
  direccionProveedor: string
  // cliente: string
  // direccionCliente: string
  cuit: string,
  ingBrutos?: string,
  productos: Producto[]
  subtotal: number
  impuestos: number
  descuentos: number
  total: number
}

export type FacturaNew = {
  nro: number | null
  fechaEmision: Date | null
  fechaVencimiento: Date | null
  proveedor: string | null
  direccionProveedor: string | null
  // cliente: string | null
  // direccionCliente: string | null
  cuit: string | null
  ingBrutos?: string | null
  productos: ProductoOptional[] | null
  subtotal?: number | null
  impuestos?: number | null
  descuentos?: number | null
  total?: number | null
}

export type Solicitud = {
  id?: string
  area: Areas
  estado: Estados
  monto: number
  prioridad: Prioridades
  enPresupuesto: EnPresupuesto
  proveedor: string
  tema: string
  subtema: string
  tipo: Tipos
  firmas: Firma[]
  factura: Factura
  imputaciones?: ImputacionesSol
};

export type SolicitudNew = {
  area: Areas
  estado: Estados
  monto: number
  prioridad: Prioridades
  enPresupuesto: EnPresupuesto
  proveedor: string
  tema: string
  subtema: string
  tipo: Tipos
  firmas: FirmaNew[]
  factura?: FacturaNew
  imputaciones?: ImputacionesSolReq
};

export type SolicitudReq = {
  area: Areas
  estado: Estados
  monto: number
  prioridad: Prioridades
  enPresupuesto: EnPresupuesto
  proveedor: string
  tema: string
  subtema: string
  tipo: Tipos
  firmas: FirmaNew[]
  factura?: FacturaNew
  imputaciones?: ImputacionesSolReq
};

export type ImputacionNew = {
  fecha: Date,
  centroDeCosto: string,
  cuenta: string,
  monto: number
}

export type Imputacion = {
  fecha: string,
  centroDeCosto: string,
  cuenta: string,
  monto: number
}

export type ImputacionesNew = {
  data: ImputacionNew[] | null
}

export type Imputaciones = {
  data: Imputacion[]
}

export type ImputacionesSol = {
  data: Imputacion[]
  id: string
}

export type ImputacionesSolReq = {
  data: DocumentReference | null
  id: string
}

export type SolicitudOptional = Partial<Solicitud>
export type FacturaOptional = Partial<FacturaNew>
export type ProductoOptional = Partial<Producto>

export type SolicitudUpdate = SolicitudOptional & {
  'factura.nro'?: number | null
  'factura.fechaEmision'?: Date | string | null
  'factura.fechaVencimiento'?: Date | string | null
  'factura.proveedor'?: string | null
  'factura.direccionProveedor'?: string | null
  // 'factura.cliente'?: string | null
  // 'factura.direccionCliente'?: string | null
  'factura.cuit'?: string | null
  'factura.ingBrutos'?: string | null
  // 'factura.productos'?: ProductoOptional | null
  'factura.subtotal'?: number | null
  'factura.impuestos'?: number | null
  'factura.descuentos'?: number | null
  'factura.total'?: number | null
}

export type FacturaUpdate = {
  'factura.nro'?: number | null
  'factura.fechaEmision'?: Date | null
  'factura.fechaVencimiento'?: Date | null
  'factura.proveedor'?: string | null
  'factura.direccionProveedor'?: string | null
  'factura.cliente'?: string | null
  'factura.direccionCliente'?: string | null
  'factura.cuit'?: string | null
  'factura.ingBrutos'?: string | null
  'factura.productos'?: ProductoOptional[] | null
  'factura.subtotal'?: number | null
  'factura.impuestos'?: number | null
  'factura.descuentos'?: number | null
  'factura.total'?: number | null
}

export function formatEnumKey(value: string): string {
  return value.replace(/\s+/g, ''); // Eliminar espacios
}