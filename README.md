# accuRx Dashboard

A dashboard to view NHS patient data regarding COVID vaccinations.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Questions

- How did you approach solving the problem?
    - My core concern when creating this app was to show how I believe a production-ready app should look (code-wise, at least - the styling is, err, 'functional' at best).
    - As such, I chose to write the app using React, the framework I'm most familiar with and most relevant to what you use at accuRx.
    - I also chose to write it in Typescript, as I believe the type safety and inherent documentation types provide make a much more robust application that can be collaborated on effectively.
    - I used create-react-app to bootstrap the app and avoid too much tedious config
    - I also ended up using `axios`, as trying to use `fetch` generated a bunch of errors and I didn't want to sink too much time into figuring out why
    - I TDD'd the app, driven by user stories I've written out below
- How did you verify your solution works correctly?
  - I wrote unit tests for each piece of functionality I wanted to implement, and so when they passed I felt confident that particular behaviour was working
  - I then did manual testing between commits to make sure the app behaved as expected, and captured any unexpected behaviour in new tests to be fulfilled
- How long did you spend on the exercise?
  - About 8 hours 😅
  - On the 'you-can-only-have-2' triangle of software development, Scope, Quality, and Speed, I chose to opt for the first two
  - I know I could have gone quicker if I'd made some different choices (no TS, less testing) but for this role I felt it was important for you to see what I believe production-ready code looks like.
- What would you add if you had more time and how?
  - Much better styling!
  - Sass modules
  - Some automated accessibility testing (`jest-axe` is what I've used in the past) 
  - Some top level Cypress integration tests
  - Tighten up the error types


## User Stories

```
Given I am a user
When  the data is loaded
Then I want to see a table of patient information

* Patient’s first and last name
* Patient’s NHS Number
* The type of vaccine the patient had
```

```
Given I am a user
When the app is fetching data
Then I want to know to wait while it loads
```
```
Given I am user
When there is an issue loading the data
Then I am shown an error saying something has gone wrong
And I am asked if I want to retry
```

```
Given I am a user 
When I press the sort button
Then I want the patient info to toggle being sorted by last name in ascending/descending order
```

```
Given I am a user
When I search for a patient in the search bar
And I type in more 2 or more characters
Then the patient results are filtered accordingly
```

```
Given I am a user
When I search for a patient in the search bar 
Then no results are shown until I type 2 or more characters
```

```
Given I am a user
When I search for a patient in the search bar 
And there are no users returned for that search
Then I am shown a message informing me of this
```

```
Given I am a user
When I search for a patient in the search bar 
And there is an issue fetching the data
Then I am shown an error message asking them to try again
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
