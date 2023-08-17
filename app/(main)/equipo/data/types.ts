
// export const roles = [
//   {
//     value: "admin",
//     label: "Admin",
//   },
//   {
//     value: "pagos",
//     label: "Pagos",
//   },
//   {
//     value: "contador",
//     label: "Contador",
//   },
//   {
//     value: "user",
//     label: "User",
//   },
// ]

// export const grupos = [
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

// export const ubicaciones = [
//   {
//     value: "centro",
//     label: "Centro",
//   },
//   {
//     value: "pilar",
//     label: "Pilar",
//   },
// ]

export enum Roles {
  Admin = "Admin",
  Director = "Director",
  Pagos = "Pagos",
  Contador = "Contador",
  Solicitante = "Solicitante",
}

export enum Grupos {
  Marketing = "Marketing",
  Producto = "Producto",
  Logistica = "Logistica",
  Finanzas = "Finanzas",
  RecursosHumanos = "Recursos Humanos",
  Legales = "Legales",
  Informatica = "Informatica",
}

export enum Ubicaciones {
  Centro = "Centro",
  Pilar = "Pilar",
}

export type Usuario = {
  id: string,
  nombre: string,
  apellido: string,
  email: string,
  empresa: string,
  rol: Roles,
  grupos: Grupos,
  ubicacion: Ubicaciones
};

export type UsuarioNew = {
  nombre: string,
  apellido: string,
  email: string,
  empresa: string,
  rol: Roles,
  grupos: Grupos,
  ubicacion: Ubicaciones
};
