pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
        DOCKER_CMD = "/opt/homebrew/bin/docker"
        DOCKER_IMAGE = "leevivl/better-jaksec-site"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-pat"
    }

    tools {
        nodejs "Node20"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo "Running linter..."
                sh 'npm run lint || true'
            }
        }

        stage('Build') {
            steps {
                echo "Building Vite production build..."
                sh 'npm run build'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "${DOCKER_CMD} login -u $DOCKER_USER --password-stdin <<< $DOCKER_PASS"
                }
            }
        }

        stage('Build & Push Multi-Arch Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo $DOCKER_PASS | ${DOCKER_CMD} login -u $DOCKER_USER --password-stdin

                        ${DOCKER_CMD} buildx build \
                            --platform linux/amd64,linux/arm64 \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                            --push \
                            .
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Frontend pipeline completed successfully!"
        }
        failure {
            echo "Frontend pipeline failed!"
        }
    }
}