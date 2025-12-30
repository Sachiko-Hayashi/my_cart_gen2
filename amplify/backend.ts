import { defineBackend } from '@aws-amplify/backend';
import { Stack } from "aws-cdk-lib"; 
import { RestApi, LambdaIntegration, Cors } from "aws-cdk-lib/aws-apigateway";
import { barcodeLookup } from './functions/barcodeLookup/resource';
// import { auth } from './auth/resource';
// import { data } from './data/resource';

const backend = defineBackend({
  // auth,
  // data,
  barcodeLookup,
});

// API 用のスタック
const apiStack = backend.createStack("api-stack");

// REST API 作成
const api = new RestApi(apiStack, "barcodeApi", {
  restApiName: "barcodeApi",
  deployOptions: { stageName: "dev" },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
  },
});

// Lambda を API に紐づけ
const lambdaIntegration = new LambdaIntegration(
  backend.barcodeLookup.resources.lambda
);

// /lookup POST
const lookup = api.root.addResource("lookup");
lookup.addMethod("POST", lambdaIntegration);

// 出力
backend.addOutput({
  custom: {
  API: {
    endpoint: api.url,
  },
},
});
