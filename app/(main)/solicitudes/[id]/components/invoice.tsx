'use client';

import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import { db, storage } from '@/app/db/firebase';
import { Button, buttonVariants } from '@/components/ui/button';
import { getInvoiceData } from '@/app/functions/ocr';
import { doc, updateDoc } from 'firebase/firestore';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FacturaNew } from '../../data/types';
import { parseDate, transformToNumber } from '../context/functions';

export function Invoice({ id }: { id: string }) {
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [extension, setExtension] = useState<string>();
  const [buttonText, setButtonText] = useState<string>('Agregar Factura');

  useEffect(() => {
    const invoiceRef = ref(storage, `facturas/${id}`);

    if (invoiceRef) {
      getDownloadURL(invoiceRef)
        .then((u) => setUrl(u))
        .catch((error) => console.error(error));

      getMetadata(invoiceRef)
        .then((metadata) => {
          if (metadata.contentType) {
            const fileNameParts = metadata.contentType.split('/');
            const fileExtension = fileNameParts[fileNameParts.length - 1];
            setExtension(fileExtension);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openInvoice = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSubmit = async () => {
    try {
      if (file) {
        const invoice = await getInvoiceData(file);
        const factura: FacturaNew = {
          nro: invoice.InvoiceId?.content || null,
          fechaEmision: parseDate(invoice.InvoiceDate?.content) || null,
          fechaVencimiento: parseDate(invoice.DueDate?.content) || null,
          proveedor: invoice.VendorName?.content || null,
          direccionProveedor: invoice.VendorAddress?.content || null,
          // cliente: invoice?.CustomerName?.content || null,
          // direccionCliente: invoice?.CustomerAddress?.content || null,
          cuit: invoice.VendorTaxId?.content || null,
          // ingBrutos: null,
          subtotal: transformToNumber(invoice.Subtotal?.content) || 0,
          impuestos: transformToNumber(invoice.TotalTax?.content) || 0,
          descuentos: transformToNumber(invoice.TotalDiscount?.content) || 0,
          total:
            transformToNumber(invoice.AmountDue?.content) ||
            transformToNumber(invoice.InvoiceTotal?.content) ||
            transformToNumber(invoice.Subtotal?.content) ||
            null,
          productos: [],
        };

        for (const { properties: item } of invoice.Items?.values ?? []) {
          factura?.productos?.push({
            descripcion: item.Description?.content || null,
            cantidad: transformToNumber(item.Quantity?.content) || 1,
            unidad: item.Unit?.content || 'unidad',
            precioUnitario:
              transformToNumber(item.UnitPrice?.content) ||
              transformToNumber(item.Amount?.content) ||
              null,
            impuesto: transformToNumber(item.Tax?.content) || null,
            total: transformToNumber(item.Amount?.content) || null,
          });
        }
        const solicitudDocRef = doc(db, 'solicitudes', id);
        await updateDoc(solicitudDocRef, { factura: factura });
        const storageRef = ref(storage, `facturas/${id}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log(snapshot);
        });
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <>
      {url && extension ? (
        <>
          {extension === 'pdf' ? (
            <embed
              src={url}
              width='100%'
              height='200'
              type='application/pdf'
            />
          ) : (
            <Image
              src={url}
              width={300}
              height={400}
              alt='Preview de la factura'
              onClick={openInvoice}
            />
          )}
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <span
              className={buttonVariants({ variant: 'default' })}
              onClick={() => setButtonText('Cancelar')}
            >
              {buttonText}
            </span>
          </DialogTrigger>
          <DialogContent className='max-h-max my-4'>
            <DialogHeader>
              {/* <DialogTitle >Ingrese el archivo de la factura</DialogTitle> */}
              <DialogDescription>
                <Label htmlFor='factura'>
                  Ingrese el archivo de la factura
                </Label>
                <Input
                  id='factura'
                  type='file'
                  onChange={handleFileInputChange}
                />
                <Button
                  className='mt-2 justify-self-center'
                  onClick={handleSubmit}
                >
                  Confirmar
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
