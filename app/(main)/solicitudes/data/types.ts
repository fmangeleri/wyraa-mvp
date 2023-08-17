import { Usuario } from "@/app/(main)/equipo/data/types"
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


export const estados = [
  {
    value: "solicitado",
    label: "Solicitado",
    icon: HelpCircle,
  },
  {
    value: "autorizado",
    label: "Autorizado",
    icon: Circle,
  },
  {
    value: "en ejecucion",
    label: "En Ejecucion",
    icon: ArrowUpCircle,
  },
  {
    value: "pagado",
    label: "Pagado",
    icon: ArrowUpCircle,
  }, {
    value: "controlado",
    label: "Controlado",
    icon: ArrowUpCircle,
  },
  {
    value: "finalizado",
    label: "Finalizado",
    icon: CheckCircle2,
  },
  {
    value: "rechazado",
    label: "Rechazado",
    icon: XCircle,
  },
]

export const prioridades = [
  {
    value: "baja",
    label: "Baja",
    icon: ArrowDownToLine,
  },
  {
    value: "media",
    label: "Media",
    icon: ArrowRightToLine,
  },
  {
    value: "alta",
    label: "Alta",
    icon: ArrowUpToLine,
  },
]

export const tipos = [
  {
    value: "compra",
    label: "Compra"
  },
  {
    value: "pago",
    label: "Pago"
  },
  {
    value: "reembolso",
    label: "Reembolso"
  }
]

export const areas = [
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "producto",
    label: "Producto",
  },
  {
    value: "logistica",
    label: "Logistica",
  },
  {
    value: "finanzas",
    label: "Finanzas",
  },
  {
    value: "recursos humanos",
    label: "Recursos Humanos",
  },
  {
    value: "legales",
    label: "Legales",
  },
  {
    value: "informatica",
    label: "Informatica",
  },
]

export type Firma = {
  estado:
  | 'solicitado' // todos
  | 'autorizado' // admin
  | 'rechazado'  // rechazado
  | 'controlado' // controlador
  | 'pagado' //pagos
  | 'finalizado' // controlador
  user: Usuario
  fecha: string
  comentario: string
}

export type FirmaReq = {
  estado:
  | 'solicitado' // todos
  | 'autorizado' // admin
  | 'rechazado'  // rechazado
  | 'controlado' // controlador
  | 'pagado' //pagos
  | 'finalizado' // controlador
  user: any
  fecha: any
  comentario: string
}

export type FirmaNew = {
  estado:
  | 'solicitado' // todos
  | 'autorizado' // admin
  | 'rechazado'  // rechazado
  | 'controlado' // controlador
  | 'pagado' //pagos
  | 'finalizado' // controlador
  user: string
  fecha: Date
  comentario: string
}


export type Solicitud = {
  id: string
  area: string  // agregar opciones de areas
  estado:
  | 'solicitado'
  | 'autorizado'
  | 'rechazado'
  | 'controlado'
  | 'pagado'
  | 'finalizado'
  monto: number
  prioridad: 'baja' | 'media' | 'alta'
  proveedor: string
  tema: string
  tipo: 'compra' | 'pago' | 'reembolso'
  firmas: Firma[]
};

export type SolicitudNew = {
  area: string  // agregar opciones de areas
  estado:
  | 'solicitado'
  | 'autorizado'
  | 'rechazado'
  | 'controlado'
  | 'pagado'
  | 'finalizado'
  monto: number
  prioridad: 'baja' | 'media' | 'alta'
  proveedor: string
  tema: string
  tipo: 'compra' | 'pago' | 'reembolso'
  firmas: FirmaNew[]
};