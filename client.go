package main

import (
	"context"
	"fmt"
	"github.com/dgraph-io/node_executor/rpc"
	"google.golang.org/grpc"
	"log"
)

func main() {
	fmt.Println("Hello client ...")

	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("127.0.0.1:50051", opts)
	if err != nil {
		log.Fatal(err)
	}
	defer cc.Close()

	client := rpc.NewCodeServiceClient(cc)
	request := &rpc.JSReq{Code: ""}

	resp, err := client.Executejs(context.Background(), request)
	if err != nil {
	    panic(err)
	}
	fmt.Printf("Receive response => [%v]", resp)
}