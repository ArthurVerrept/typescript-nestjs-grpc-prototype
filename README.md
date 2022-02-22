# Typescript gRPC nest prototype
The gateway takes the incoming http request, and using a decorator maps the Bearer token into the gRPC metadata. 

The microservice takes that request, decodes the token and verifies it. If there is an error it is returned to the gateway which using an interceptor, converts the errors back to an http format. 

This prototype is my best implementation of gRPC for typescript and nestjs.