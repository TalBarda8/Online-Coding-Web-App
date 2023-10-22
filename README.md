# Online Coding Web Application
## Overview
The Online Coding Web Application is a collaborative code editor that allows multiple users to interact in real-time.
Built with React for the frontend and Express for the backend, it also leverages Socket.io to maintain real-time communication between clients and the server.

## Features
1. **Real-Time Collaboration:** Multiple users can join the same coding session and view live code changes.
2. **Role Assignment:** The first user to join a code block is assigned the role of a mentor, who gets read-only access to the code, while subsequent users are assigned as students, who get full edit permission to the code.
3. **Persistent Code Storage:** Code blocks are stored persistently using MongoDB, ensuring that code snippets remain available for future sessions.
4. **Interactive UI:** The frontend application provides a seamless user experience, allowing users to easily join coding sessions and collaborate.

## Live Demo
Visit the live application [here](https://unrivaled-starburst-e93483.netlify.app/).
To get a visual overview and a brief introduction to the functionality and features of this project, watch [this video](https://www.youtube.com/watch?v=LP2O4UTCfNA&ab_channel=TalBarda).

## Development Challenges
1. **CORS Issues:** One of the major challenges faced during development was handling Cross-Origin Resource Sharing (CORS) issues. With the frontend being hosted on Netlify and the backend on Railway, it was crucial to set up CORS headers correctly to allow seamless communication between the two. This was resolved by ensuring consistent URLs and correct configuration in the Express backend.
2. **Real-Time Communication:** Establishing real-time communication between multiple clients was achieved using Socket.io. This ensured that all users in a coding session could see live updates.
3. **Role Management:** Managing user roles (mentor/student) in a coding session required careful tracking of users as they joined and left. This was achieved through effective use of the backend's database and Socket.io events.
