# yelpcamp-clone

Yelpcamp clone project with  sign-in, log-in/out and CRUD functionalities.

## Getting Started

```
> cd directory
> git clone https://github.com/sjondegast/yelpcamp-clone.git
> npm install
```

### Prerequisites

- node
- npm
- mongoDB

install node with the terminal on a mac
```
> brew update
> brew install node
> node -v
```
install npm with the terminal on a mac
```
> brew update
> brew install npm
> npm -v
```
install mongo with the terminal on a mac
```
> brew update
> brew install mongodb
```

Make sure that the /data/db directory has the right permissions by running:
```
> sudo chown -R `id -un` /data/db
> # Enter your password
```

## Running the blog locally

```
> cd blog_directory
Run the mongo deamon:
> mongod
Run mongoDB in another instance of the terminal window:
> mongo
Run your app in another instance of the terminal window:
> node app.js
Go to your browser and open the app on: http://localhost:8080/
```
## Example app on Heroku

https://murmuring-dusk-62133.herokuapp.com/


## Built With

* [express](http://www.dropwizard.io/1.0.2/docs/) - The web framework for node.js
* [mongoDB](https://maven.apache.org/) - Database
* [mongoose](https://rometools.github.io/rome/) - Used to query mongoDB

## Authors

* **Sjon de Gast** - *Udemy Course* - [Yelpcamp-clone](https://github.com/sjondegast/yelpcamp-clone.git)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Udemy Instructor Colt Steele