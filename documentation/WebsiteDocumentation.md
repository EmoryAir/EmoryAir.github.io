# Website Documentation
The Air Emory site is hosted on GitHub, and uses HTML, CSS, and JavaScript.

## Table of Contents

* [GitHub](#github)
* [Code](#code)

## GitHub
[Air Emory](www.airemory.com) is hosted on GitHub, and is stored under the [Emory Air repository](https://github.com/EmoryAir/EmoryAir.github.io). If you haven’t used GitHub before, read [this tutorial](https://guides.github.com/activities/hello-world/). Important GitHub rules:
* Never edit the master branch(this could break everything); create a new branch, edit it, then push it to the master once it is functional.
* Delete your branches once you are done with them.
* Fill out the -m message when you commit a branch.
* If you ever get a permission error, try using “sudo” (super user do) before the command.

### Test website on local machine
Once you have a branch you want to test, run this command (linux pls):

```terminal
$ sudo http-server ~/EmoryAir.github.io -c-1 -a localhost -p8000
```

View on: http://localhost:8000/

### Basic GitHub commands (in order)

```terminal
$ git pull origin master            pulls all up-to-date files from master branch
$ git status                        checks if branch is up to date
$ git checkout branch_name          get to a branch
$ git checkout -b new_branch_name   add and change to new branch
$ sudo git add file_name            add changes
$ git commit -m "commit message"    commit and describe changes
$ git push origin branch_name       push to send changes to github
```

Open a pull request on GitHub.

Merge your pull request on GitHub.

```terminal
$ git branch -d branch_name                 deletes branch on local machine
$ git push origin --delete branch_name      deletes branch on GitHub repo
$ git remote update --prune origin          syncs origin
```

## Code

A basic webpage is set up like this, with in depth descriptions below:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300|Open+Sans:300" rel="stylesheet">
	  <!-- include leaflet css and javascript -->
	  <link rel="stylesheet" crossorigin="" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
	  <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet-src.js"></script>
	  <!--JQuery library-->
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <!-- include our own css -->
	  <link rel="stylesheet" href="style.css" />

        <!-- include w3.js javascript -->
        <script src="https://www.w3schools.com/lib/w3.js"></script>

	  <!-- we include the javascript at the bottom, see below -->
        <title>TITLE | Air Emory</title>

    </head>
         <div w3-include-html="nav.html"></div>
         <script> w3.includeHTML(); </script>

	<body>
		EDIT HERE
		<!-- include our own javascript -->
		<script src="main.js"></script>
	</body>
    <footer>
        Contact us at <a href="mailto:emoryaq@gmail.com">emoryaq@gmail.com</a>
    </footer>
</html>
```

### Page Structure

Each webpage has 4 parts:
* Links
* Head
* Body
* Footer

#### Links

Here we include the links that are necessary for the web page to run.
* Fonts
* Leaflet CSS
* Leaflet Javascript
* Jquery Library
* CSS
* w3.js Javascript

#### Head

The head is where we put the stuff typically stored at the top of the page. Notice this links to another HTML sheet; this is for the navigation bar at the top. We do this so that we can easily change the header across all pages by changing one(1) HTML file.

#### Body

This is the fun part where we edit the front-end HTML!

#### Footer

This email link is included on every page as a way to contact Air Emory(and so we don't need a separate contact page).
