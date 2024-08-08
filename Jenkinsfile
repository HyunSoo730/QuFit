pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "whgustn730/qufit-backend"
        DOCKER_IMAGE_FRONTEND = "whgustn730/qufit-frontend"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the repository..."
                deleteDir()
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/dev-cicd']],
                    userRemoteConfigs: [[url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12A209.git',
                                         credentialsId: 'jenkins-gitlab']]])
                sh 'ls -la'
                echo "Checkout completed."
            }
        }

        stage('Prepare Environment') {
            steps {
                echo "Preparing environment..."
                withCredentials([
                    file(credentialsId: 'qufit-env-file', variable: 'ENV_FILE_BACKEND'),
                    file(credentialsId: 'qufit-front-env-file', variable: 'ENV_FILE_FRONTEND')
                ]) {
                    sh '''
                        echo "WORKSPACE value: $WORKSPACE"
                        mkdir -p "$WORKSPACE/back-end" "$WORKSPACE/front-end"
                        echo "Copying backend .env file..."
                        cp "$ENV_FILE_BACKEND" "$WORKSPACE/back-end/.env"
                        echo "Copying frontend .env file..."
                        cp "$ENV_FILE_FRONTEND" "$WORKSPACE/front-end/.env"
                        echo "Adding DOCKER_TAG to backend .env..."
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> "$WORKSPACE/back-end/.env"
                        echo "Adding DOCKER_TAG to frontend .env..."
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> "$WORKSPACE/front-end/.env"
                        echo "Adding DOCKER_IMAGE to backend .env..."
                        echo "DOCKER_IMAGE=${DOCKER_IMAGE_BACKEND}" >> "$WORKSPACE/back-end/.env"
                        echo "Adding DOCKER_IMAGE to frontend .env..."
                        echo "DOCKER_IMAGE=${DOCKER_IMAGE_FRONTEND}" >> "$WORKSPACE/front-end/.env"
                        echo "Contents of backend .env file:"
                        cat "$WORKSPACE/back-end/.env"
                        echo "Contents of frontend .env file:"
                        cat "$WORKSPACE/front-end/.env"
                        echo "Directory contents:"
                        ls -la "$WORKSPACE"
                    '''
                }
                echo "Environment preparation completed."
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        echo "Building backend Docker image..."
                        dir('back-end') {
                            sh 'ls -la'
                            sh 'cat Dockerfile'
                            script {
                                docker.build("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}", "-f Dockerfile .")
                            }
                        }
                        echo "Backend Docker image build completed."
                    }
                }
                stage('Build Frontend') {
                    steps {
                        echo "Building frontend Docker image..."
                        dir('front-end') {
                            sh 'ls -la'
                            sh 'cat Dockerfile'
                            script {
                                docker.build("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}", "-f Dockerfile .")
                            }
                        }
                        echo "Frontend Docker image build completed."
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to registry..."
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push("latest")
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push("latest")
                    }
                }
                echo "Docker images push completed."
            }
        }

//         stage('Transfer Files') {
//             steps {
//                 echo "Transferring files to EC2..."
//                 sshagent(['jenkins-ssh-key']) {
//                     sh '''
//                         ssh -o StrictHostKeyChecking=no ubuntu@i11a209.p.ssafy.io 'mkdir -p /home/ubuntu/qufit/back-end /home/ubuntu/qufit/front-end'
//                         scp -o StrictHostKeyChecking=no docker-compose.yml ubuntu@i11a209.p.ssafy.io:/home/ubuntu/qufit/
//                         scp -o StrictHostKeyChecking=no back-end/.env ubuntu@i11a209.p.ssafy.io:/home/ubuntu/qufit/back-end/.env
//                         scp -o StrictHostKeyChecking=no front-end/.env ubuntu@i11a209.p.ssafy.io:/home/ubuntu/qufit/front-end/.env
//                     '''
//                 }
//                 echo "File transfer completed."
//             }
//         }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to EC2..."
                sshagent(['jenkins-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@i11a209.p.ssafy.io '
                        cd /var/jenkins_home/workspace/Qufit Project
                        echo "Deploying backend image with tag: ${DOCKER_TAG}"
                        echo "Deploying frontend image with tag: ${DOCKER_TAG}"
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> back-end/.env
                        echo "DOCKER_TAG=${DOCKER_TAG}" >> front-end/.env
                        docker-compose down
                        docker-compose pull
                        docker-compose up -d --build
                        '
                    """
                }
                echo "Deployment completed."
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
//             cleanWs()
            echo "Workspace cleaned."
        }
    }
}