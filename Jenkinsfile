void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/Flow-PDA/Client.git"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent any
	post {
    failure {
      setBuildStatus("Build failed", "FAILURE");
    }
    success {
      setBuildStatus("Build succeeded", "SUCCESS");
    }
  }
  stages {
    stage('init') {
        steps {
            echo 'init pipeline, check changes'
            setBuildStatus("Pending", "PENDING")
        }
    }
    stage('cofing') {
      steps {
        echo 'copy configuration files'
        sh 'pwd'
        sh 'cp /var/jenkins_home/workspace/config/.env.client .env'
        sh 'cp /var/jenkins_home/workspace/config/nginx.conf ./nginx.conf'
      }
    }
    stage('build') {
      steps {
        echo 'build react'
        sh 'docker-compose -p deploy --profile nginx build'
      }
    }
    stage('stop') {
      steps {
        echo 'stop container'
        sh 'docker-compose -p deploy stop nginx react'
        echo 'remove container'
        sh 'docker-compose -p deploy rm -f'
      }
    }
    stage('deploy') {
      steps {
        echo 'run docker container'
        sh 'docker-compose -p deploy --profile nginx up -d'
      }
    }
  }
}
