import shortid from 'shortid';

// Give every card in a list an _id and the color white UNLESS those properties already exist
const appendAttributes = list =>
  list.map(card => ({
    color: 'white',
    _id: shortid.generate(),
    ...card
  }));

const completedListId = shortid.generate();
const habitsListId = shortid.generate();
const listId1 = shortid.generate();

const categoryId1 = shortid.generate();
const categoryId2 = shortid.generate();
const categoryId3 = shortid.generate();

const habitId1 = shortid.generate();
const habitId2 = shortid.generate();
const habitId3 = shortid.generate();

const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3));
const fourDaysAgo = new Date(new Date().setDate(new Date().getDate() - 4));

const dateToSring = date =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const dateToTimeMs = date => date.getTime();

const category1 = {
  name: 'none',
  short: '',
  color: 'white',
  _id: categoryId1
};

const category2 = {
  name: 'Todo',
  short: 'T',
  color: 'rgba(233, 141, 90, 1)',
  _id: categoryId2
};

const category3 = {
  name: 'Work',
  short: 'W',
  color: 'rgba(0, 163, 192, 1)',
  _id: categoryId3
};

const item1 = {
  text: '### A kanban application with extra sauce',
  _id: shortid.generate(),
  difficulty: 1,
  minutes: 5
};

const item2 = {
  text: `Check out the [source code on GitHub](https://github.com/amelieoller/kanban-2.0)`,
  _id: shortid.generate(),
  difficulty: 1,
  minutes: 20,
  categoryId: categoryId2
};

const item3 = {
  text: 'With Pomodoro Timer',
  _id: shortid.generate(),
  difficulty: 1,
  minutes: 0,
  categoryId: categoryId3
};

const item4 = {
  text: `### Supports GitHub flavored markdown
  Featuring cutting edge HTML features like
  * Headings
  * Bullet points
  * **Bold** and *italic* text
  * Links
  * Images
  * \`\`\`
  () => {
    // Code blocks
  }
  \`\`\`
`,
  _id: shortid.generate(),
  difficulty: 1,
  minutes: 0,
  categoryId: categoryId1
};

const item5 = {
  text: `### Works on mobile devices
  More or less...`,
  _id: shortid.generate(),
  difficulty: 1,
  minutes: 0,
  categoryId: categoryId1
};

const item6 = {
  text: `### And more!
  [x] Categories
  [x] Colors
  [x] Deadlines
  [x] Minutes
  [x] Checkboxes`,
  date: today,
  _id: shortid.generate(),
  difficulty: 3,
  minutes: 10,
  categoryId: categoryId3
};

const completed1 = {
  text: `Take out trash`,
  completedAt: dateToTimeMs(today),
  _id: shortid.generate(),
  difficulty: 3,
  minutes: 10,
  categoryId: categoryId3
};

const completed2 = {
  text: `Send birthday card`,
  completedAt: dateToTimeMs(today),
  _id: shortid.generate(),
  difficulty: 3,
  minutes: 10,
  categoryId: categoryId2
};

const completed3 = {
  text: `Do laundry`,
  completedAt: dateToTimeMs(today),
  _id: shortid.generate(),
  difficulty: 3,
  minutes: 10,
  categoryId: categoryId3
};

const completed4 = {
  text: `Finish proposal`,
  completedAt: dateToTimeMs(yesterday),
  _id: shortid.generate(),
  difficulty: 3,
  minutes: 10,
  categoryId: categoryId3
};

const habit1 = {
  text: 'Exercise',
  _id: habitId1,
  difficulty: 3,
  minutes: 5,
  createdAt: dateToTimeMs(today)
};

const habit2 = {
  text: 'Read 30 min',
  _id: habitId2,
  difficulty: 2,
  minutes: 5,
  createdAt: dateToTimeMs(today)
};

const habit3 = {
  text: '[Browse Reddit](https://www.reddit.com/)',
  _id: habitId3,
  difficulty: 1,
  minutes: 5,
  createdAt: dateToTimeMs(today)
};

const createWelcomeBoard = userId => {
  const list1 = [item1, item2, item3];
  const list2 = [item4, item5, item6];

  const list3 = [
    {
      text: `### Edit a card
You can edit the contents of a card by clicking on it. Remember to use Shift + Enter to create a newline.`
    },
    {
      text: `### Drag a card or list
Reposition cards and lists by dragging them with a mouse or touch gesture.`
    },
    {
      text: `### Create a card or list
Add a new card to an existing list by clicking the + button below each list. You can add a new list by clicking the "Add a list"-button to the right`
    },
    {
      text: `### Add a checklist
For a task that has many sub-tasks, you can create a checklist with markdown.
[x] Like this
[ ] Click me`
    },
    {
      text: `### Change the board
You can edit the title of the board by clicking it.`
    }
  ];

  // Append a warning message to the top of list3 for guest users only
  if (!userId) {
    list3.unshift({
      text: `### Sign in to save changes
Since you are not signed in, your changes will not persist after you leave the website. Go back to the login screen by pressing the 'Sign in' button in the top right corner.`
    });
  }

  return {
    _id: shortid.generate(),
    title: 'Tutorial board',
    lists: [
      {
        _id: listId1,
        title: 'Today',
        cards: appendAttributes(list1)
      },
      {
        _id: shortid.generate(),
        title: 'Tomorrow',
        cards: appendAttributes(list2)
      },
      {
        _id: shortid.generate(),
        title: 'Inbox',
        cards: appendAttributes(list3)
      },
      {
        _id: habitsListId,
        title: 'Habits',
        cards: [habit1, habit2, habit3],
        special: 'habits'
      },
      {
        _id: completedListId,
        title: 'Completed',
        cards: [completed1, completed2, completed3, completed4],
        special: 'completed'
      }
    ],
    users: userId ? [userId] : [],
    stats: {
      habits: {
        [dateToSring(today)]: [habitId1, habitId2, habitId3, habitId3],
        [dateToSring(yesterday)]: [
          habitId1,
          habitId2,
          habitId2,
          habitId3,
          habitId3
        ],
        [dateToSring(twoDaysAgo)]: [habitId1, habitId2, habitId3],
        [dateToSring(threeDaysAgo)]: [habitId2],
        [dateToSring(fourDaysAgo)]: [habitId1, habitId2]
      }
    },
    settings: {
      pomodoro: { notification: true, audio: true },
      goals: {
        habits: 8
      },
      categories: [category1, category2, category3],
      defaultCategory: 'none',
      eventCalendarId: '',
      eventFilter: '',
      defaultList: listId1,
      defaultCardTime: 0,
      color: 'light',
      completedListId,
      habitsListId,
      pomodoroFocusMode: true,
      sidebarOpen: {
        pomodoroOpen: true,
        eventsOpen: true,
        habitsOpen: false,
        tasksOpen: false
      }
    }
  };
};

export default createWelcomeBoard;
