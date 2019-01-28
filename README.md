# Med "Mike" - 20190128

## Installation

This package uses mmmagic, please make sure you're running a node release build (some distributions ship a debug build).
In case your Linux or Mac comes with a debug build please install nvm and run `nvm install node`

To start the environment please follow these instructions:

Clone this repo & cd inside:
```sh
$ git clone repo-url
$ cd repo-name
```

Start the devops stack (Currently only used for mongodb).
```sh
$ cd devops
$ docker-compose up
```

Start the react app:
```sh
$ cd ../frontend
$ yarn install
$ yarn build
$ yarn serve
```

In another terminal start the API (Please change the IP on line 13 if your docker daemon runs on a different one):
```sh
$ cd ../backend
$ yarn install
$ yarn watch
```

You can run the tests in the frontend folder by running
```sh
$ yarn test --all --coverage
```

The API is accessible at `http://localhost:8080`
The React app is accessible at `http://localhost:9000`

## Security
### What has been addressed
* Double check for file size on both client and server.
* Files are saved under new names (a hash) on the server.
* Files are saved without extension (We're not really showing them anyway, the extension and correct mimetype can be added on the fly later).
* Files are checked for type using mmmagic (magic number detection).
* Content-security-policy is set.
* X-Permitted-Cross-Domain-Policies is set.
* Disallow DNS pre-fetching.
* X-Frame-Options to prevent clickjacking.
* X-Download-Options for old IE versions.
* Powered by header is hidden to disallow information disclosure.
* Disallowed caching.
* Disallowed mimetype sniffing.
* Added a Referrer Policy.
* Added XSS protection header (This might needs to be given more thought).

### What needs to be done
* Save files outside of the webserver directory.
* Run webserver under www-data or similar.
* Add antispam features (hashcash or similar).
* Log user IP.
* Limit uploads by IP.
* Disallow timebased endpoint enumeration.
* Multer has a DOS vulnerability. (A CVE does not exist for this, it was discovered while testing). This can be fixed by adding another middleware to  check for the body size or (the solution is was going for) is to limit the size on the reverse proxy.
* DB is insecure.
* Run a full security test suit.
* Add an expect-CT header.
* Add a feature policy header.
* Add Strict-Transport-Security header.

## Improvements
* The infrastructure would work much better in an AWS environment using API gateway, lambdas and S3.
* Alternatively, files should be streamed directly to a CDN. (Will require a bit of refactoring).
* Improve the errors and error handling in general (And simulate errors during tests).
* Add loading spinners for the XHR requests.
* Show a fallback UI with ErrorBoundaries.
* Use Flow for type checking.
* Use react-stories.
* Use immutablejs.
* Use normalizr. (If the API grows)
* Use redux and redux-saga from global state management.
* Add e2e tests.
* Add nginx as a proxy for the API and Frontend.
* Add an env file to the API to manage settings (docker IP, max upload size etc...)
* Improve the devops scripts (serve each component in a docker container).
* Add prod deployment scripts (ideally have a jenkins instance download the repo, build a static docker container that it pushes to a registry then have an EC2 instance run that image).
* Get rid of callback hell on the API.

## Libraries
### Frontend
* **create-react-app**: I usually like to fine tune my project but with the time constraint, create-react-app is perfect.
* **axios**: For network requests for the cancellation support (Has not been implemented due to time contraints).
* **react-notify-toast**: Nothing special here, it's just to show notification toasts on events (Would have preferred to write my own).
* **sass** : Personal choice.
* **normalize.css** : Make the rendering more consistent between browsers.
* **axios-mock-adapter**: Mocking for axios testing.
* **chai, enzyme, sinon**: My testing toolset of choice.

### Backend
* **expressjs**: For a fast API prototype.
* **helmet**: Add security measures to expressjs.
* **multer**: multipart/form-data handler (This needs to be removed ! It might lead to DOS).
* **mongoose**: ODM for mongodb, used to define a schema (Mongodb's flexibility is both a blessing and a curse).
* **cors**: To handle cross-origin requests in express.
* **mmmagic**: Determines mimetype using file magic numbers.
* **sanitize-filename**: Filename sanitization (Remove illegal characters, control characters etc..)

## API
### Get /v1/documents
* Get a list of documents
* onSuccess: 200 Array[Documents]
* OnError: 400 Error
* @query name : Filter by document name.

### Post /v1/documents
* Uploads a new document to the server
* onSuccess: 201 Document{_id, name, size}
* onError: 400 Error
* no parameters, this endpoint only handles a multipart/form-data request

### Delete /v1/documents/:id
* Deletes a file from the server
* onSuccess 200 Document{_id}
* onError: 400 Error
* @id: _id of the document to remove.

--

## Other notes
* All sizes are in use the SI representation instead of the binary representation for byte (the current implementation uses multiples of 1000), because the k in the wireframe is lowercase. (Was it a typo?)
* Not all security measures (headers) on the API are useful because the original intent was to have the API express app serve the static react files. I dropped this in favor of spinning a dedicated express / nginx instance for the frontend but that couldn't be done within the time limit.
* The API is written in one file and should be refactored.
* Apologies if the documentation is lacking or messy.
