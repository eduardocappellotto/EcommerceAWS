import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const method = event.httpMethod;

    const lambdaRequestId = context.awsRequestId;
    const apiRequestId = event.requestContext.requestId

    console.log(`API Gateway Request id: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`)

    if (event.resource === "/products") {
        if (method === "GET") {
            console.log('GET')

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET Products - OK"
                })
            }
        }
    }

    if (event.resource === "/products/{id}") {
        const productId = event.pathParameters!.id as string
        console.log(`GET /products/${productId}`)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `GET /products/${productId}`
            })
        }

    }



    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Bad Request"
        })
    }

}