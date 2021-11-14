package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"strconv"

	"google.golang.org/grpc"
)

type config struct {
	port int
	env  string
	db   struct {
		url string
	}
	stripe struct {
		secret string
		key    string
	}
}

type server struct {
	config   *config
	infoLog  *log.Logger
	errorLog *log.Logger
}

func (s *server) start() error {
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", s.config.port))
	if err != nil {
		return err
	}
	grpcServer := grpc.NewServer()
	s.infoLog.Printf("Starting server on port: %d, in mode: %s", s.config.port, s.config.env)
	return grpcServer.Serve(lis)
}

func main() {
	var cfg config
	cfg.stripe.key = os.Getenv("STRIPE_KEY")
	cfg.stripe.secret = os.Getenv("STRIPE_SECRET")
	port, err := strconv.Atoi(os.Getenv("SERVER_PORT"))
	if err != nil {
		cfg.port = 50051
	}
	cfg.port = port
	cfg.env = os.Getenv("ENV")

	s := &server{
		config:   &cfg,
		infoLog:  log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime),
		errorLog: log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile),
	}
	if err := s.start(); err != nil {
		s.errorLog.Fatal(err)
	}

}
