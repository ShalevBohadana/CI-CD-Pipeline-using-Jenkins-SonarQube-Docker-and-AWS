provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "fullboosts2" {
  ami           = "ami-002b32af8c6b8b958"  
  instance_type = "t2.micro"
  tags = {
    Name = "DevOps-Instance"
  }
}
# Create the key pair
resource "aws_key_pair" "fb" {
  key_name   = "fb"
  public_key ="terraforminfra/mykey.pem"
}