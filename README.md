# Spot Check

<br>

## Description

This is an app that helps skateboarders locate and keep track of skate spots within their current area. Users can add new skate spots on the community map for all other skateboarders to see, including photos and necessary information about the spot.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can gain access to skateboard spots in my area
- **Login:** As a user I can login to the platform so that I can find or add new skate spots to the Spot Check map
- **Logout:** As a user I can logout from the platform, via Navigation Panel, so no one else can use it
- **View Map:** As a user I can view the map of my current location and see surrounding skate spots
- **View Favorites:** As a user I can view a list of my favorite spots
- **Add Spots:** As a user I can add new skate spots by filling out a Spot Details form
- **Add Spot Images:** As a user I can add images to an existing skate spot
- **Add Favorites:** As a user I can add skate spots to a "Favorites" list
- **Edit Profile:** As a user I can edit my profile to display personalized information, a profile photo, and personal media
- **Navigation:** As a user I can navigate throughout the app using a Navigation Panel & back arrows

## Backlog

User profile:

- Upload images to skate spots (Cloudinary)
- Open up 'Google Maps' or other navigation app based off skate spot location
- Allow users to add comments to skate spots
- Implement a Search Bar function so users can find a skate spot by searching its name
- Filter feature on Map view
- Toggle map color to 'Dark Mode'
- 'Add Media' feature on Profile page - for images & video clips

<br>

# Client / Frontend

## Routes (React App)

| Path                       | Component         | Permissions | Behavior                                                                                                   |
| -------------------------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `/`                        | SplashPage        | public      | Home page, app name, basic information about app, buttons for signup & login                               |
| `/signup`             | SignupPage        | anon only   | Signup form, back button, navigate to homepage after signup                                                |
| `/login`              | LoginPage         | anon only   | Login form, back button, navigate to homepage after login                                                  |
| `/skatespots/map`          | Map               | user only   | Shows map view of skate spots near user location                                                           |
| `/skatespots/add-spot`  | AddSpotPage       | user only   | Add a new skate spot to map database                                                                       |
| `/skatespots/favorites`    | FavoritesListPage | user only   | Shows a list of favorite skate spots                                                                       |
| `/skatespots/spot/:id`     | SpotDetailsPage   | user only   | Details of a skate spot, back button                                                                       |
| `/profile`      | ProfilePage       | user only   | View user profile page, back button, edit profile button                                                   |
| `/edit-profile` | EditProfilePage   | user only   | Edit user profile page, back button, information form, upload picture & media, save changes , edit profile |

## Components

- SplashPage

- SignupPage

- LoginPage

- Map

- FavoritesListPage

- SpotDetailsPage

- ProfilePage

- EditProfilePage

- Navbar  -  Navigation panel, path to the following routes: /map, /favorites, /profile, /logout 


- HamburgerMenu

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous

- SkateSpot Service

  - spot.getAll()
  - spot.getOneById(spotId)
  - spot.create()
  - spot.removeOneById(spotId)
  - spot.updateOneById(spotId) - backlog
  - spot.getAllByCity(city) - backlog service

- User Service
  - user.profile()
  - user.favorites()
  - user.edit()

<br>

# Server / Backend

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: {type: String},
  favorites: [ {type: Schema.Types.ObjectId,ref:'SkateSpot'} ],
  mySpots: [ {type: Schema.Types.ObjectId,ref:'SkateSpot'} ],
  city: {type: String}
}
```

SkateSpot model

```javascript
 {
   name: {type: String, required: true},
   type: {type: String, required: true, enum: ['park', 'street', 'diy']},
   status: {type: String, required: true, enum: ['active', 'WIP', 'RIP']},
   indoor: {type: Boolean, required: true},
   images: [String],
   creator: {type: Schema.Types.ObjectId,ref:'User'},
   location: {type: String, coordinates: [] } 
 }
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                            | Request Body                      | Success status | Error Status | Description                                                                                                                     |
| ----------- | ------------------------------ | --------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile`                |                                   | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`                 | {username, email, password}       | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                  | {username, password}              | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`                 |                                   | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/skatespots/map?long=0&lat=0`              |                                   |     200           | 400          | Show map view of skate spots by current location                                                                                                  |
| GET         | `/skatespots/favorites`        |                        |     200           | 400          | Show list of favorite skate spots                                                                                               |
| GET         | `/skatespots/spot-details/:id` |                         |        200        | 400             | Show specific skate spot                                                                                                        |
| PUT         | `/skatespots/:id` | { imageUrl }                          |                |              | Add image to spot details                                                                                                       |
| POST        | `/skatespots`         | { name, type, status, indoor, description, location }                                | 201            | 400          | Create and save a new skate spot                                                                                                |
| DELETE      | `/skatespots/:id`       |                           | 204            | 400          | Delete skate spot from favorites list                                                                                           |
| GET         | `/user`          |                       |    200            | 400          | Get current user profile                                                                                                               |
| PUT         | `/user` | {username, password, city, image} |       200         | 400          | Update current user profile                                                                                                          |
| PATCH         | `/user` | {spotId} |       200         | 400          | Update current user's favorite spots                                                                                                          |

<br>

## Links

### Trello

[Link to Trello board](https://trello.com/b/AAw8XzFZ/ironhack-project-3-spot-check)

### Git

The url to your repository and to your deployed project

[Client repository Link]()

[Server repository Link]()

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
