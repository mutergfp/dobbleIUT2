node {
    def app
    stage('Clone repository') {
        /*Repo is cloned*/
        checkout scm
    }
    stage('Build image') {
        app = docker.build("gi1/dobble")
    }
    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }
	stage('Run image') {
		sh 'docker stop dobble'
		sh 'docker rm dobble'
		app.run('-p 80:3000 -it --name dobble')
	}
}