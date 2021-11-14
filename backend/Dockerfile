FROM golang:1.17.3

WORKDIR /backend

COPY . .

RUN go mod tidy

EXPOSE 50051

CMD [ "go","run","." ]