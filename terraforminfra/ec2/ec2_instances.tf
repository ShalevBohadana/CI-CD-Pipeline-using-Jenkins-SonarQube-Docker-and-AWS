# ec2/ec2_instances.tf

resource "aws_instance" "jenkins_server" {
  ami           = "ami-0069aa073aac75299" # Use a valid Ubuntu AMI for your region
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  security_groups = [aws_security_group.allow_ssh_http_https.name]
  key_name      = "devops-key.pem" # Replace with your SSH key pair name

  tags = {
    Name = "Jenkins Server"
  }
}

resource "aws_instance" "k8s_master" {
  ami           = "ami-0069aa073aac75299" # Use a valid Ubuntu AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.private.id
  security_groups = [aws_security_group.allow_ssh_http_https.name]
  key_name      = "devops-key.pem"

  tags = {
    Name = "Kubernetes Master Node"
  }
}

resource "aws_instance" "k8s_worker" {
  ami           = "ami-0069aa073aac75299" # Use a valid Ubuntu AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.private.id
  security_groups = [aws_security_group.allow_ssh_http_https.name]
  key_name      = "devops-key.pem"

  tags = {
    Name = "Kubernetes Worker Node"
  }
}
