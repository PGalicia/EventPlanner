# Event Planner

_OnGoing_

A web application that lets users create and manage events, including the attendees, and items needed for the events. This side project was made to help organize events in my friend group.

[See Demo](https://eventplanner-ccb48.firebaseapp.com/)

### How It Works

For the homepage, the web app displays a “create an event” button and all the events the user has created. The top event section will always showcase the latest upcoming event (if available), the middle section will always showcase the possible future events, and the last section would showcase the past events. In each event card, users can see the following information: event name, datetime, location, edit button, delete button, and “See more” button.

If the user pressed “See more”, they will not only see the core information about the event (as mentioned above) but also additional information, such as the attendees and the needed items for the event. For the items section, each item is color coded and each item’s color(s) corresponds to the color associated with each attendee, displaying which users are responsible for what items. In addition, users can reassign item responsibility by pressing the “Reassign Items” located at the bottom of the event page.

_Note: This project is currently still in its development stage. Please check the roadmap @ [Trello](https://trello.com/b/B8TSHhhH/event-planner-development-roadmap). In addition, the project is currently using my custom REST API. Information about the API can be found @ [Github Repo](https://github.com/PGalicia/EventPlannerRESTAPI)._
