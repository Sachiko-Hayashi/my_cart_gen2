import { APIGatewayProxyHandler  } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const barcode = body.barcode;

  const PRODUCTS: Record<string, { name: string; price: number }> = {
    "490000000001": { name: "牛乳", price: 180 },
    "490000000002": { name: "卵", price: 220 },
    "490000000003": { name: "りんご", price: 120 },
  };

  const item = PRODUCTS[barcode] || null;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(item),
  };
};
