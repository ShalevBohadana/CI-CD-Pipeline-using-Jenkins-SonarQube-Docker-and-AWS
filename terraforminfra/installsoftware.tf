resource "aws_instance" "fullboosts" {
  ami           = "ami-0069aa073aac75299"  
  instance_type = "t2.micro"

  provisioner "remote-exec" {
    inline = [
      # Install Docker
      "sudo yum update -y",
      "sudo yum install -y docker",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",

      # Install Kubernetes (for K3s)
      "curl -sfL https://get.k3s.io | sh -",

      # Install Helm
      "curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash",

      # Install Jenkins
      "wget -q -O - https://pkg.jenkins.io/ci.org.key | sudo tee /etc/apt/trusted.gpg.d/jenkins.asc",
      "sudo sh -c 'echo deb http://pkg.jenkins.io/debian/ / > /etc/apt/sources.list.d/jenkins.list'",
      "sudo apt-get update",
      "sudo apt-get install -y jenkins",
      "sudo systemctl start jenkins",
      "sudo systemctl enable jenkins",

      # Install Grafana
      "sudo apt-get install -y software-properties-common",
      "sudo add-apt-repository \"deb https://packages.grafana.com/oss/deb stable main\"",
      "sudo apt-get update",
      "sudo apt-get install -y grafana",
      "sudo systemctl start grafana-server",
      "sudo systemctl enable grafana-server",

      # Install Prometheus
      "wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz",
      "tar xvf prometheus-2.37.0.linux-amd64.tar.gz",
      "sudo mv prometheus-2.37.0.linux-amd64/prometheus /usr/local/bin/",
      "sudo mv prometheus-2.37.0.linux-amd64/promtool /usr/local/bin/",
      "sudo cp -r prometheus-2.37.0.linux-amd64/consoles /etc/prometheus",
      "sudo cp -r prometheus-2.37.0.linux-amd64/console_libraries /etc/prometheus"
    ]
  }
  connection {
  type        = "ssh"
  user        = "ec2-user"  
  private_key = file("devops-key.pem") 
  host        = self.public_ip 
}
}
