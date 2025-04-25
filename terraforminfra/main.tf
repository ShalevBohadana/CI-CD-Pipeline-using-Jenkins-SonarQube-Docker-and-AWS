# AWS Provider Configuration
provider "aws" {
  region = "us-east-1"  # You can change this to the region you prefer
}

# VPC Setup: Virtual Private Cloud
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "my-vpc"
  }
}

# Subnets: Public and Private Subnets
resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "private-subnet"
  }
}

# Internet Gateway for Public Subnet
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Security Group for EC2 (Node.js Backend API)
resource "aws_security_group" "node_sg" {
  name        = "node-sg"
  description = "Allow traffic to Node.js API server"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # You might want to restrict SSH access in production
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance: Node.js Backend API
resource "aws_instance" "node_backend" {
  ami           = "ami-xxxxxxxx"  # Replace with your Node.js AMI ID or custom AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.private_subnet.id
  security_groups = [aws_security_group.node_sg.name]
  key_name      = "my-key-pair"  # Ensure you have created an SSH key in AWS
  tags = {
    Name = "Node-Backend"
  }

  # Associate Elastic IP (optional)
  associate_public_ip_address = false
}

# S3 Bucket for React Frontend (Static Website)
resource "aws_s3_bucket" "react_frontend" {
  bucket = "my-react-app-bucket"  # Change to your desired bucket name
  acl    = "public-read"
  website {
    index_document = "index.html"
    # If you're using React Router with HTML5 history mode
    # error_document = "index.html"
  }
}

# MongoDB: Using Amazon DocumentDB (or you can use MongoDB Atlas)
resource "aws_docdb_cluster" "mongodb" {
  cluster_identifier      = "my-mongo-cluster"
  master_username         = "admin"
  master_password         = "password123"  # Use a stronger password in production
  engine                  = "docdb"
  engine_version          = "3.6"
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.node_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.mongodb_subnet_group.name

  tags = {
    Name = "MongoDB Cluster"
  }
}

# MongoDB Subnet Group
resource "aws_docdb_subnet_group" "mongodb_subnet_group" {
  name       = "mongodb-subnet-group"
  subnet_ids = [aws_subnet.private_subnet.id]
  tags = {
    Name = "MongoDB Subnet Group"
  }
}

# Route53: DNS for React Frontend (Optional)
resource "aws_route53_record" "react_dns" {
  zone_id = "your-zone-id"  # Provide your Route53 hosted zone ID
  name    = "react.yourdomain.com"
  type    = "A"
  alias {
    name                   = aws_s3_bucket.react_frontend.website_endpoint
    zone_id                = aws_s3_bucket.react_frontend.hosted_zone_id
    evaluate_target_health = true
  }
}


# Autoscaling Setup for Node.js Backend (Optional for production)
resource "aws_autoscaling_group" "node_backend_asg" {
  desired_capacity     = 2
  max_size             = 5
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.private_subnet.id]
  launch_configuration = aws_launch_configuration.node_backend_lc.id
  tags = [
    {
      key                 = "Name"
      value               = "NodeJS Backend"
      propagate_at_launch = true
    }
  ]
}

# Launch Configuration for Auto Scaling (Node.js)
resource "aws_launch_configuration" "node_backend_lc" {
  image_id        = "ami-xxxxxxxx"  # Replace with your custom Node.js AMI
  instance_type  = "t2.micro"
  security_groups = [aws_security_group.node_sg.name]
  key_name        = "my-key-pair"

  lifecycle {
    create_before_destroy = true
  }
}

# IAM Role for EC2 to allow access to other AWS Services (Optional)
resource "aws_iam_role" "node_role" {
  name               = "node-backend-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Effect    = "Allow"
        Sid       = ""
      },
    ]
  })
}
