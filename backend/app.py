from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path="\.flaskenv")

import os
DB_PASSWORD = os.getenv("DB_PASSWORD")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{ DB_PASSWORD }@localhost/baby-tracker"
db = SQLAlchemy(app)
CORS(app)

app.app_context().push()

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"
    
    def __init__(self, description):
        self.description = description

def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at": event.created_at
    }

@app.route('/')
def hello():
    return "Hello Flask!"

# Create all events
@app.route('/events', methods = ['POST'])
def create_event():
    description = request.json['description']
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.order_by(Event.created_at.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {
        'events': event_list
    }

# Get a single event
@app.route('/events/<id>', methods=['GET'])
def get_one_event(id):
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {
        'event': formatted_event
    }

# Delete an event
@app.route('/events/<id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id}) deleted!'

# Update an event
@app.route('/events/<id>', methods={'PUT'})
def update_event(id):
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description = description, created_at = datetime.utcnow()))
    db.session.commit()
    return {
        'event': format_event(event.one())
    }

if __name__ == '__main__':
    app.run()