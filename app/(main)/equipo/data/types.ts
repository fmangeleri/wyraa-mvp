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




export const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "pagos",
    label: "Pagos",
  },
  {
    value: "contador",
    label: "Contador",
  },
  {
    value: "user",
    label: "User",
  },
]

export const grupos = [
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

export const ubicaciones = [
  {
    value: "centro",
    label: "Centro",
  },
  {
    value: "pilar",
    label: "Pilar",
  },
]



export type Usuario = {
  id: string,
  email: string,
  nombre: string,
  apellido: string,
  rol: 'admin' | 'pagos' | 'contador' | 'user'
  grupo: 'marketing' | 'producto' | 'logistica' | 'finanzas' | 'recursos humanos' | 'legales' | 'informatica',
  ubicacion: 'centro' | 'pilar',
};