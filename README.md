# Typescript gRPC nest prototype
A gateway that takes the incoming http requests, and using a decorator maps the Bearer token into the gRPC metadata to be sent to a grpc microservice. There is also an package that will take protos and do a bunch of ✨magic✨ to generate typescript, and create a typescript npm package to be used across all micro-services along with the gateway.

The microservice takes that request, decodes the token and verifies it. If there is an error it is returned to the gateway which using an interceptor, converts the errors back to an http format. 

This prototype is my best implementation of gRPC for typescript and nestjs.


The proto-npm package creates an npm package which has all the generated code exported to be used in typescript. I created a script which makes an index file to export each service and it's definitions individually along with creating a path to be used on the imports with nestjs.

To regenerate/ alter the package, add new protos (if any) to the src file and run:
```bash
$ npm run gen
```

### !!! It is very important that you make sure service names are thought out and consistent between file name and service name !!!