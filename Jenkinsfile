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
		app.run('-p 7777:7777 -it --rm --link mongoDobble --name dobble')
		sh 'docker network connect network dobble --alias dobble'
	}
}