import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import ScrollArea from '../../../components/ScrollArea';

//import 'bootstrap/dist/css/bootstrap.min.css';

interface Room {
  description: string;
  exits: { [key: string]: string };
  items: string[];
}

interface Rooms {
  [key: string]: Room;
}


const EmailTemp: React.FC = () => {
  const rooms: Rooms = {
    start: {
      description: "You're in a dimly lit room. There's a door to the north.",
      exits: { north: 'hallway' },
      items: [],
    },
    hallway: {
      description: "You're in a long hallway. There are doors to the south, east, and west.",
      exits: { south: 'start', east: 'balcony', west: 'library' },
      items: ['key'],
    },
    balcony: {
      description: "You're on a balcony overlooking a beautiful garden. There's a door to the west.",
      exits: { west: 'hallway' },
      items: ['book'],
    },
    library: {
      description: "You're in a grand library filled with books. There's a locked chest in the corner and a door to the east.",
      exits: { east: 'hallway' },
      items: ['chest'],
    },
  };

  const [currentRoom, setCurrentRoom] = useState<string>('start');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>(['Welcome to the Text Adventure Game! Type "look" to begin.']);
  const [inventory, setInventory] = useState<string[]>([]);
  const [chestUnlocked, setChestUnlocked] = useState<boolean>(false);
  const [bookRead, setBookRead] = useState<boolean>(false);

  const addOutput = (message: string): void => {
    setOutput(prevOutput => [...prevOutput, message]);
  };

  const handleCommand = (command: string): void => {
    const words = command.toLowerCase().split(' ');
    const action = words[0];
    const target = words.slice(1).join(' ');

    switch (action) {
      case 'look':
        addOutput(rooms[currentRoom].description);
        if (rooms[currentRoom].items.length > 0) {
          addOutput(`You see: ${rooms[currentRoom].items.join(', ')}`);
        }
        break;
      case 'move':
      case 'go':
        if (rooms[currentRoom].exits[target]) {
          if (target === 'west' && currentRoom === 'hallway' && !bookRead) {
            addOutput('The library door is locked. You need to read something first.');
          } else {
            setCurrentRoom(rooms[currentRoom].exits[target]);
            addOutput(`You move ${target}.`);
            addOutput(rooms[rooms[currentRoom].exits[target]].description);
          }
        } else {
          addOutput("You can't go that way.");
        }
        break;
      case 'take':
        if (rooms[currentRoom].items.includes(target)) {
          setInventory([...inventory, target]);
          rooms[currentRoom].items = rooms[currentRoom].items.filter(item => item !== target);
          addOutput(`You take the ${target}.`);
        } else {
          addOutput("You don't see that here.");
        }
        break;
      case 'inventory':
        if (inventory.length === 0) {
          addOutput('Your inventory is empty.');
        } else {
          addOutput(`You are carrying: ${inventory.join(', ')}`);
        }
        break;
      case 'read':
        if (target === 'book' && inventory.includes('book')) {
          addOutput('You read the book. It contains a spell to unlock the library door.');
          setBookRead(true);
        } else {
          addOutput("You don't have anything to read.");
        }
        break;
      case 'unlock':
        if (target === 'chest' && currentRoom === 'library' && inventory.includes('key')) {
          setChestUnlocked(true);
          addOutput("You unlock the chest. Congratulations, you've completed the game!");
        } else {
          addOutput("You can't unlock that.");
        }
        break;
      default:
        addOutput("I don't understand that command.");
    }
  };

  const commandKey: string[] = [
    'look - Examine your surroundings',
    'move/go [direction] - Move in a direction (north, south, east, west)',
    'take [item] - Pick up an item',
    'inventory - Check your inventory',
    'read [item] - Read an item in your inventory',
    'unlock [item] - Attempt to unlock an item',
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <ScrollArea height={400}>
                {output.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </ScrollArea>
            </Card.Body>
          </Card>
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleCommand(input);
              setInput('');
            }}
          >
            <Form.Group className="mb-3" controlId="commandInput">
              <Form.Control
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Enter your command"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Command Key:</Card.Title>
              <ul className="list-unstyled">
                {commandKey.map((command, index) => (
                  <li key={index}>{command}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Command Key:</Card.Title>
              <ul className="list-unstyled">
                {commandKey.map((command, index) => (
                  <li key={index}>{command}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>                 
        </Col>
      </Row>
    </Container>
  );
};

export default EmailTemp;
