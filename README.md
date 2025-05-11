GenAIColab Frontend is the client-side graphical user interface for my final year project at NCI (National College of Ireland). It's a React-based application that provides users with an interactive interface to create and communicate with LLM agents, both individual agent and in collaborative team of agents.

The application allows:

Creating custom agents with specific specialisations
Building teams of three agents for collaborative problem-solving
Real-time conversations with agents using WebSockets
Managing and reviewing chat history
Secure user authentication and account management

Stack used:
Frontend:

React with TypeScript - Component-based UI library
Vite - Fast build tool and development server
React Bootstrap - UI component library
React Router - Client-side routing
Socket.io-client - WebSocket client for real-time communication
Auth0 React SDK - Authentication integration

Other technologies:

CSS animations - Custom loading and transition effects
Session Storage - Client-side data storage

Features
1. Single Agent Chat

Interact with unconfigured or custom agents
Uses HTTP and WebSocket implementations
Real-time response streaming - single agent communication

2. Team Chat

Select teams of 3 agents with different specialisations
Agents collaborate autonomously to solve problems

3. Custom Agent Creation

Define agent specialisations
Configure agent behaviour with detailed prompts
Store custom agents configurations

4. Team Management

Create teams from available agents
Name and describe team purposes
Select existing teams for conversations

5. Chat History

View all previous conversations
Read full chat - previous chat
Delete chats

6. User Management

Auth0 integration for secure authentication, account creation
Complete account deletion with user and agent data removal

Prerequisites

Node - 20.17.0
npm - 11.2.0
Auth0 account configured
Backend API running 

Installation
Clone the repository:
git clone https://github.com/craig-reddin/Specialised_Agents_Frontend.git

cd Specialised_Agents_Frontend

Install dependencies:

npm install @auth0/auth0-react@^2.2.4
npm install axios@^1.7.7
npm install bootstrap@^5.3.3
npm install bootstrap-icons@^1.11.3
npm install react@^18.3.1
npm install react-bootstrap@^2.10.5
npm install react-dom@^18.3.1
npm install react-icons@^5.4.0
npm install react-router-dom@^7.0.2
npm install socket.io-client@^4.8.1

Start the development server:

npm run dev
The application runs on http://localhost:5173 

API Endpoints
The frontend communicates with these backend endpoints:

/chat - Single agent conversations
/team_question - Team agent conversations
/create_agent - Create custom agents
/gather_agents - Retrieve agents
/store_team - Save team configurations
/gather_teams - Gether existing teams
/gather_chat_names - List user's previous chats
/gather_chat - Retrieve specific chat
/store_chat - Save conversation
/delete_chat - Remove chat record
/review_sign_in - Verify user authentication
/delete_user - Delete user account
