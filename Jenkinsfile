pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"
        DOCKER_CMD = "/opt/homebrew/bin/docker"
        DOCKER_IMAGE = "leevivl/better-jaksec-site"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-pat"
        APP_DIR = "BetterJaksec"
    }

    tools {
        nodejs "Node20"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                dir("${APP_DIR}") {
                    sh 'npm ci'
                }
            }
        }
        stage('Prepare Env') {
            steps {
                echo "Setting up .env for Vite build..."
                dir("${APP_DIR}") {
                    sh 'cp .env.sample .env'
                }
            }
        }
        
        stage('Build') {
            steps {
                echo "Building Vite production build..."
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
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
                            --build-arg VITE_API_BASE_URL=/api \
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