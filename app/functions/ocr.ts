

/*
  This code sample shows Prebuilt Invoice operations with the Azure Form Recognizer client library. 

  To learn more, please visit the documentation - Quickstart: Form Recognizer Javascript client library SDKs
  https://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/quickstarts/try-v3-javascript-sdk
*/

const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

/*
  Remember to remove the key from your code when you're done, and never post it publicly. For production, use
  secure methods to store and access your credentials. For more information, see 
  https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
*/


// sample document
const key = process.env.NEXT_PUBLIC_OCR_KEY
const endpoint = process.env.NEXT_PUBLIC_OCR_ENDPOINT
export async function getInvoiceData(url: File) {

  const invoiceUrl = url

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

  const poller = await client.beginAnalyzeDocument("prebuilt-invoice", invoiceUrl);

  const {
    documents: [result]
  } = await poller.pollUntilDone();

  if (result) {
    const invoice = result.fields;

    return invoice
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}
